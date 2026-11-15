from fastapi import APIRouter
from app.models.schemas import IPRecommendationRequest, IPRecommendationResponse
from app.services.ip_service import ip_service

router = APIRouter(prefix="/ip", tags=["IP Protection Explorer"])

@router.get("/overview")
def get_ip_overview():
    return ip_service.get_ip_overview()

@router.post("/recommend", response_model=IPRecommendationResponse)
def recommend_ip_strategy(req: IPRecommendationRequest):
    return ip_service.generate_recommendation(req)
