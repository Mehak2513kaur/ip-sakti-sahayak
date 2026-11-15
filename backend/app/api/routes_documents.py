from typing import Optional, List
from fastapi import APIRouter, Query
from app.services.rag_engine import rag_engine

router = APIRouter(prefix="/documents", tags=["Knowledge Library"])

@router.get("/list")
def list_library_documents(
    category: Optional[str] = Query(None),
    authority: Optional[str] = Query(None),
    search: Optional[str] = Query(None)
):
    docs = []
    for idx, doc in enumerate(rag_engine.corpus):
        # Filter checks
        if category and category.lower() not in doc.get("legal_category", "").lower():
            continue
        if authority and authority.lower() not in doc.get("issuing_authority", "").lower():
            continue
        if search:
            s = search.lower()
            text = doc.get("_searchable_text", "").lower()
            if s not in text:
                continue

        docs.append({
            "id": idx + 1,
            "document_title": doc.get("document_title"),
            "issuing_authority": doc.get("issuing_authority"),
            "jurisdiction": doc.get("jurisdiction", "India"),
            "legal_category": doc.get("legal_category"),
            "section_number": doc.get("section_number"),
            "official_reference": doc.get("official_reference"),
            "source_url": doc.get("source_url"),
            "publication_year": doc.get("publication_year", 2022),
            "status": doc.get("status", "Active"),
            "is_verified": True,
            "snippet": doc.get("snippet", "")
        })

    return {
        "total_count": len(docs),
        "documents": docs
    }

@router.get("/categories")
def get_library_categories():
    return [
        {"name": "Patent Law & Section 3(p)", "count": 5},
        {"name": "Drugs and Cosmetics Act & Rules", "count": 5},
        {"name": "Biological Diversity Act & ABS", "count": 4},
        {"name": "FSSAI Ayurveda Aahar Regulations", "count": 2},
        {"name": "Trade Marks & Geographical Indications", "count": 2},
        {"name": "Global Export Regulations (US, EU, AU, CA)", "count": 5}
    ]
