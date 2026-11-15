from fastapi import APIRouter
from app.models.schemas import ABSAssessmentRequest, ABSAssessmentResponse
from app.services.abs_service import abs_service

router = APIRouter(prefix="/abs", tags=["ABS Compliance Assistant"])

@router.post("/assess", response_model=ABSAssessmentResponse)
def assess_abs_compliance(req: ABSAssessmentRequest):
    return abs_service.assess_abs(req)

@router.get("/rules-summary")
def get_abs_rules_summary():
    return {
        "title": "Biological Diversity Act ABS Regulatory Matrix (2002 Act & 2023 Amendment)",
        "entity_rules": [
            {
                "entity": "Foreign Company or Indian Entity with Foreign Equity (Section 3(2))",
                "authority": "National Biodiversity Authority (NBA)",
                "statutory_form": "Form I",
                "prior_approval_needed": True,
                "benefit_sharing": "0.5% - 1.0% of ex-factory sales or negotiated agreement"
            },
            {
                "entity": "Indian Commercial Manufacturer accessing wild biological resources",
                "authority": "State Biodiversity Board (SBB)",
                "statutory_form": "Form I (Prior Intimation)",
                "prior_approval_needed": True,
                "benefit_sharing": "0.1% - 0.5% of ex-factory sales or 3.0% - 5.0% purchase price"
            },
            {
                "entity": "Registered AYUSH Practitioner (Vaidya / Hakim / Siddha)",
                "authority": "State Biodiversity Board",
                "statutory_form": "None (Statutorily Exempted)",
                "prior_approval_needed": False,
                "benefit_sharing": "0.0% (Exempt under 2023 Amendment Act)"
            },
            {
                "entity": "User accessing Cultivated Medicinal Plants (with Certificate of Origin)",
                "authority": "State Biodiversity Board",
                "statutory_form": "Certificate of Origin Declaration",
                "prior_approval_needed": False,
                "benefit_sharing": "0.0% (Exempt from ABS fee under 2023 Amendment Act)"
            },
            {
                "entity": "Any person applying for IPR / Patent on biological invention",
                "authority": "National Biodiversity Authority (NBA)",
                "statutory_form": "Form III",
                "prior_approval_needed": True,
                "benefit_sharing": "0.2% - 1.0% of commercial sales or 2% - 5% of licensing royalty"
            }
        ]
    }
