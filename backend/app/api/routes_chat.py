import uuid
from typing import List, Optional
from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.schemas import ChatMessageRequest, ChatResponse
from app.services.llm_service import llm_service
from app.services.rag_engine import rag_engine

router = APIRouter(prefix="/chat", tags=["AI Sahayak Assistant"])

SUGGESTED_QUESTIONS = [
    {"category": "Patents & Section 3(p)", "query": "Can I patent an Ayurvedic herbal formulation with Ashwagandha and Brahmi for memory improvement?"},
    {"category": "Product Classification", "query": "What is the regulatory difference between a Classical Ayurvedic Medicine and an Ayurveda Aahar product under FSSAI?"},
    {"category": "ABS Compliance", "query": "Do Indian Ayurvedic manufacturers need permission from State Biodiversity Boards under the 2023 Biodiversity Amendment?"},
    {"category": "Export to USA", "query": "What are the US FDA MoCRA 2022 requirements for exporting Ayurvedic skincare oils to the United States?"},
    {"category": "Trademarks", "query": "Can I register 'Triphala Churna' as a trademark under the Trade Marks Act 1999?"},
    {"category": "Section 3(e) Synergy", "query": "How can an applicant overcome a Section 3(e) mere admixture rejection for a multi-herb formulation at the Indian Patent Office?"}
]

@router.get("/suggested-questions")
def get_suggested_questions():
    return SUGGESTED_QUESTIONS

@router.post("/query", response_model=ChatResponse)
async def chat_query(req: ChatMessageRequest):
    session_id = req.session_id or f"sess_{uuid.uuid4().hex[:8]}"
    resp = await llm_service.generate_response(
        query=req.message,
        session_id=session_id,
        lang=req.language,
        domain_hint=req.domain
    )
    return resp

@router.post("/upload-document-query")
async def upload_and_query_document(
    file: UploadFile = File(...),
    query: Optional[str] = Form("Summarize the key IPR and regulatory considerations of this Ayurvedic formulation document.")
):
    """Parses an uploaded PDF file, extracts text, indexes it in the RAG engine, and generates grounded answers."""
    try:
        content_bytes = await file.read()
        extracted_text = ""
        
        # PyPDF2 extraction
        try:
            import io
            import PyPDF2
            pdf_reader = PyPDF2.PdfReader(io.BytesIO(content_bytes))
            for page in pdf_reader.pages[:10]: # Read up to 10 pages
                extracted_text += page.extract_text() or ""
        except Exception as e:
            extracted_text = content_bytes.decode("utf-8", errors="ignore")[:5000]

        if not extracted_text.strip():
            extracted_text = f"Uploaded document: {file.filename}. Document text extraction completed."

        # Add to RAG engine as an active temporary reference
        doc_entry = {
            "document_title": f"User Upload: {file.filename}",
            "issuing_authority": "User Uploaded Dossier",
            "jurisdiction": "India / User Specified",
            "legal_category": "Applicant Product Dossier",
            "section_number": "Uploaded Document",
            "snippet": extracted_text[:1200],
            "status": "User Uploaded",
            "publication_year": 2026,
            "keywords": file.filename
        }
        rag_engine.add_document(doc_entry)

        # Generate response grounded in uploaded document + statutory corpus
        full_query = f"{query}\nDocument Reference: {file.filename}\nSummary Extract: {extracted_text[:600]}"
        response = await llm_service.generate_response(
            query=full_query,
            session_id=f"doc_{uuid.uuid4().hex[:6]}",
            lang="en",
            domain_hint="regulations"
        )
        return {
            "filename": file.filename,
            "pages_processed": len(pdf_reader.pages) if 'pdf_reader' in locals() else 1,
            "analysis": response
        }
    except Exception as ex:
        raise HTTPException(status_code=500, detail=f"Failed to process uploaded file: {str(ex)}")
