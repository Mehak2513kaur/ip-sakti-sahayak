import json
import os
import re
from typing import List, Dict, Any, Tuple
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from app.models.schemas import SourceCitation

class RAGEngine:
    def __init__(self, data_dir: str = None):
        if data_dir is None:
            base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            self.data_dir = os.path.join(base_dir, "data", "knowledge_base")
        else:
            self.data_dir = data_dir
            
        self.corpus: List[Dict[str, Any]] = []
        self.vectorizer: TfidfVectorizer = None
        self.tfidf_matrix = None
        self.load_corpus()

    def load_corpus(self):
        """Loads all verified statutory json files from the knowledge base directory."""
        self.corpus = []
        if os.path.exists(self.data_dir):
            for file_name in os.listdir(self.data_dir):
                if file_name.endswith(".json"):
                    file_path = os.path.join(self.data_dir, file_name)
                    try:
                        with open(file_path, "r", encoding="utf-8") as f:
                            docs = json.load(f)
                            if isinstance(docs, list):
                                for doc in docs:
                                    # Ensure searchable text combines title, section, snippet, keywords
                                    searchable_text = f"{doc.get('document_title', '')} {doc.get('section_number', '')} {doc.get('legal_category', '')} {doc.get('keywords', '')} {doc.get('snippet', '')}"
                                    doc["_searchable_text"] = searchable_text
                                    self.corpus.append(doc)
                    except Exception as e:
                        print(f"Error loading {file_name}: {e}")
        
        self._rebuild_index()

    def _rebuild_index(self):
        """Rebuilds the TF-IDF and BM25 index over the corpus."""
        if not self.corpus:
            self.vectorizer = None
            self.tfidf_matrix = None
            return

        texts = [doc["_searchable_text"] for doc in self.corpus]
        self.vectorizer = TfidfVectorizer(
            stop_words="english",
            ngram_range=(1, 2),
            sublinear_tf=True
        )
        self.tfidf_matrix = self.vectorizer.fit_transform(texts)

    def add_document(self, doc_data: Dict[str, Any]) -> int:
        """Adds a new document or chunk to the corpus and updates the index."""
        searchable_text = f"{doc_data.get('document_title', '')} {doc_data.get('section_number', '')} {doc_data.get('legal_category', '')} {doc_data.get('keywords', '')} {doc_data.get('snippet', '')}"
        doc_data["_searchable_text"] = searchable_text
        self.corpus.append(doc_data)
        self._rebuild_index()
        return len(self.corpus)

    def hybrid_search(self, query: str, top_k: int = 5, domain_filter: str = None) -> List[Tuple[Dict[str, Any], float]]:
        """
        Performs hybrid retrieval:
        1. TF-IDF vector cosine similarity (semantic representation)
        2. Exact keyword frequency bonus (BM25 principle)
        3. Domain specific weighting
        """
        if not self.corpus or self.vectorizer is None:
            return []

        # Step 1: Semantic Vector Cosine Similarity
        query_vec = self.vectorizer.transform([query])
        cosine_scores = cosine_similarity(query_vec, self.tfidf_matrix).flatten()

        # Step 2: Keyword overlap bonus
        query_tokens = set(re.findall(r'\b[a-z0-9_-]+\b', query.lower()))
        combined_scores = []

        for idx, doc in enumerate(self.corpus):
            base_score = float(cosine_scores[idx])
            
            # Domain filter matching bonus
            doc_category = doc.get("legal_category", "").lower()
            doc_text = doc["_searchable_text"].lower()

            if domain_filter and domain_filter.lower() in doc_category:
                base_score *= 1.25

            # Keyword hit ratio
            doc_tokens = set(re.findall(r'\b[a-z0-9_-]+\b', doc_text))
            common = query_tokens.intersection(doc_tokens)
            keyword_bonus = (len(common) / max(len(query_tokens), 1)) * 0.35

            # Section number exact match bonus
            section = str(doc.get("section_number", "")).lower()
            if any(token in section for token in query_tokens if len(token) > 2):
                keyword_bonus += 0.25

            final_score = base_score + keyword_bonus
            combined_scores.append((doc, final_score))

        # Sort descending by final score
        combined_scores.sort(key=lambda x: x[1], reverse=True)
        return combined_scores[:top_k]

    def get_grounded_citations(self, query: str, top_k: int = 4, threshold: float = 0.12) -> Tuple[List[SourceCitation], bool]:
        """
        Retrieves top source citations and checks if sufficient grounding evidence exists.
        Returns: (List[SourceCitation], has_sufficient_evidence)
        """
        results = self.hybrid_search(query, top_k=top_k)
        citations: List[SourceCitation] = []
        
        has_sufficient = False
        for doc, score in results:
            if score >= threshold:
                has_sufficient = True
            
            citations.append(
                SourceCitation(
                    document_title=doc.get("document_title", "Official Regulatory Document"),
                    issuing_authority=doc.get("issuing_authority", "Government of India"),
                    jurisdiction=doc.get("jurisdiction", "India"),
                    legal_category=doc.get("legal_category", "Ayurvedic Regulation"),
                    section_number=doc.get("section_number"),
                    page_number=doc.get("page_number", 1),
                    official_source_url=doc.get("source_url"),
                    snippet=doc.get("snippet", ""),
                    relevance_score=round(float(score), 3),
                    status=doc.get("status", "Active")
                )
            )

        return citations, has_sufficient

rag_engine = RAGEngine()
