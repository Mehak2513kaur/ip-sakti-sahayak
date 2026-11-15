from fastapi import APIRouter
from app.models.schemas import TKSearchRequest, TKSearchResponse
from app.services.tk_service import tk_service

router = APIRouter(prefix="/tk", tags=["Traditional Knowledge Explorer"])

@router.post("/search", response_model=TKSearchResponse)
def search_traditional_knowledge(req: TKSearchRequest):
    return tk_service.search_tk(req)

@router.get("/featured-plants")
def get_featured_plants():
    from app.services.tk_service import TK_DATABASE
    return [
        {
            "id": p["id"],
            "sanskrit_name": p["sanskrit_name"],
            "botanical_name": p["botanical_name"],
            "common_names": p["common_names"],
            "indications": p["traditional_indications"][:3],
            "section_3p": p["section_3p_applicability"][:140] + "..."
        }
        for p in TK_DATABASE
    ]
