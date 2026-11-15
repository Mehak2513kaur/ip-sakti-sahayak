from fastapi import APIRouter
from app.models.schemas import ComplianceRoadmapRequest, ComplianceRoadmapResponse
from app.services.compliance_service import compliance_service, JURISDICTIONS_DATA

router = APIRouter(prefix="/compliance", tags=["Global Regulatory Compliance"])

@router.get("/jurisdictions")
def list_jurisdictions():
    return [
        {"id": "USA", "name": "United States", "flag": "🇺🇸", "authority": "US FDA (CFSAN & MoCRA)"},
        {"id": "European Union", "name": "European Union", "flag": "🇪🇺", "authority": "EMA & National Competent Authorities"},
        {"id": "United Kingdom", "name": "United Kingdom", "flag": "🇬🇧", "authority": "UK MHRA & FSA"},
        {"id": "Australia", "name": "Australia", "flag": "🇦🇺", "authority": "TGA Complementary Medicines"},
        {"id": "Canada", "name": "Canada", "flag": "🇨🇦", "authority": "Health Canada NNHPD"},
        {"id": "India", "name": "India (Domestic)", "flag": "🇮🇳", "authority": "Ministry of AYUSH & FSSAI"}
    ]

@router.post("/roadmap", response_model=ComplianceRoadmapResponse)
def get_compliance_roadmap(req: ComplianceRoadmapRequest):
    return compliance_service.generate_roadmap(req)
