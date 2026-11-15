import datetime
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

# --- Auth Schemas ---
class UserLogin(BaseModel):
    email: str
    password: str

class UserRegister(BaseModel):
    name: str
    email: str
    password: str
    role: str = "entrepreneur"
    organization: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    role: str
    organization: Optional[str] = None
    created_at: datetime.datetime

    class Config:
        from_attributes = True

# --- Citation & Grounding ---
class SourceCitation(BaseModel):
    document_title: str
    issuing_authority: str
    jurisdiction: str
    legal_category: str
    section_number: Optional[str] = None
    page_number: Optional[int] = None
    official_source_url: Optional[str] = None
    snippet: str
    relevance_score: float = 1.0
    status: str = "Active"

# --- AI Chat Assistant Schemas ---
class ChatMessageRequest(BaseModel):
    session_id: Optional[str] = None
    message: str
    language: str = "en"
    domain: Optional[str] = None # patents, trademarks, regulations, abs, traditional_knowledge, exports

class ChatResponse(BaseModel):
    session_id: str
    direct_answer: str
    relevant_legal_provisions: List[str]
    simple_explanation: str
    applicability: str
    required_documents: List[str]
    recommended_next_steps: List[str]
    official_sources: List[SourceCitation]
    confidence_and_limitations: str
    detected_language: str
    is_demo_mode: bool = False

# --- Ayurvedic Product Classifier ---
class ProductClassificationRequest(BaseModel):
    product_name: str
    ingredients: List[str]
    botanical_names: Optional[List[str]] = None
    intended_purpose: str
    intended_use: str # oral, topical, dietary, personal_care
    claims_type: str # therapeutic, cosmetic, nutritional, general_wellness
    classical_text_reference: Optional[str] = None # e.g., Charaka Samhita, Sahasrayogam, None
    product_composition: Optional[str] = None # raw powder, aqueous extract, hydroalcoholic extract, oil infusion, tablet
    target_market: str = "India" # India, Export
    manufacturing_location: str = "India"

class ProductClassificationResponse(BaseModel):
    suggested_category: str # Classical Ayurvedic Medicine, Patent/Proprietary Ayurvedic Medicine, Phytopharmaceutical, Ayurveda-Aahar, Cosmetic, New/Non-Classical Drug
    confidence_level: str
    reasoning: str
    relevant_legal_framework: str
    licensing_considerations: List[str]
    required_documentation_checklist: List[str]
    potential_ip_protection: List[str]
    official_statutory_references: List[SourceCitation]
    uncertainties_requiring_expert_verification: List[str]
    form_type: Optional[str] = None # e.g., Form 24-D, Form 25-D, FSSAI Central License

# --- IP Protection Explorer & Recommendation ---
class IPRecommendationRequest(BaseModel):
    product_or_invention_name: str
    description: str
    is_novel_composition: bool = False
    has_classical_prior_art: bool = True
    process_novelty: Optional[str] = None # standard extraction, novel supercritical CO2, novel purification
    brand_name: Optional[str] = None
    unique_packaging_design: bool = False
    origin_geographical_indication: Optional[str] = None

class IPRecommendationResponse(BaseModel):
    patent_assessment: Dict[str, Any]
    trademark_recommendation: Dict[str, Any]
    gi_assessment: Dict[str, Any]
    industrial_design: Dict[str, Any]
    trade_secret_guidance: Dict[str, Any]
    plant_variety_guidance: Dict[str, Any]
    section_3p_tk_analysis: str
    section_3e_synergy_analysis: str
    recommended_filing_sequence: List[str]
    official_portals: List[Dict[str, str]]

# --- Traditional Knowledge & Prior Art ---
class TKSearchRequest(BaseModel):
    query: str
    search_type: str = "botanical" # botanical, sanskrit, classical_formulation, therapeutic_indication, prior_art_keyword

class TKSearchMatch(BaseModel):
    id: str
    sanskrit_name: str
    botanical_name: str
    classical_formulation: str
    authoritative_texts: List[str]
    traditional_indications: List[str]
    relevant_patent_prior_art: List[Dict[str, str]]
    section_3p_applicability: str
    tkdl_status_notice: str
    source_reference: str

class TKSearchResponse(BaseModel):
    query: str
    matches: List[TKSearchMatch]
    tkdl_access_disclaimer: str
    search_limitations: str

# --- International Compliance Explorer ---
class ComplianceRoadmapRequest(BaseModel):
    product_category: str # herbal_supplement, traditional_medicine, herbal_cosmetic, topical_ayurvedic
    origin_country: str = "India"
    destination_country: str # USA, European Union, United Kingdom, Australia, Canada, India
    ingredients: List[str]
    intended_use: str
    product_claims: str

class ComplianceRoadmapResponse(BaseModel):
    destination_country: str
    regulatory_authority: str
    foreign_product_classification: str
    registration_or_notification_path: str
    labeling_and_packaging_rules: List[str]
    mandatory_testing_and_limits: List[str] # heavy metals, pesticide residues, microbial limits
    import_permit_and_facility_registration: str
    ip_protection_options: List[str]
    official_government_portals: List[Dict[str, str]]
    critical_risk_factors: List[str]

# --- ABS Assistant (Biological Diversity Act) ---
class ABSAssessmentRequest(BaseModel):
    biological_resource_name: str
    botanical_name: Optional[str] = None
    geographical_source: str # Indian forest, cultivated farm, market purchase, imported
    user_entity_type: str # Indian citizen/company, Foreign citizen/foreign-controlled entity (Section 3(2)), Registered AYUSH practitioner (Vaidya)
    purpose_of_access: str # Commercial utilization, Research for IPR/Patent, Bio-survey, Export
    is_codified_traditional_knowledge: bool = True
    is_cultivated_resource: bool = False

class ABSAssessmentResponse(BaseModel):
    applicability_verdict: str
    governing_section: str
    relevant_authority: str # National Biodiversity Authority (NBA) or State Biodiversity Board (SBB)
    applicable_forms: List[str] # Form I, Form III (IPR), Form B (Fair & Equitable Benefit Sharing)
    available_exemptions: List[str] # 2023 Amendment exemptions for Vaidyas/codified knowledge/cultivated plants
    benefit_sharing_consideration: str # Percentage of ex-factory gross sale or purchase price
    documentation_checklist: List[str]
    statutory_citations: List[SourceCitation]
    cautionary_advisory: str

# --- Report Generation ---
class ReportGenerateRequest(BaseModel):
    report_type: str # patentability, classification, abs, global_export, legal_summary
    title: str
    subject_data: Dict[str, Any]
    user_id: Optional[int] = None

class ReportResponse(BaseModel):
    report_id: str
    title: str
    report_type: str
    created_at: datetime.datetime
    download_url_pdf: str
    data_summary: Dict[str, Any]

# --- Document Management & Admin ---
class DocumentCreate(BaseModel):
    title: str
    issuing_authority: str
    jurisdiction: str
    legal_category: str
    publication_year: Optional[int] = None
    official_reference: Optional[str] = None
    source_url: Optional[str] = None
    content: str

class DocumentSummary(BaseModel):
    id: int
    title: str
    issuing_authority: str
    jurisdiction: str
    legal_category: str
    publication_year: Optional[int] = None
    official_reference: Optional[str] = None
    source_url: Optional[str] = None
    status: str
    is_verified: bool
    chunks_count: int
    created_at: datetime.datetime

    class Config:
        from_attributes = True
