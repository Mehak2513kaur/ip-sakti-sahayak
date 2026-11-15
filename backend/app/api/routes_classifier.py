from fastapi import APIRouter
from app.models.schemas import ProductClassificationRequest, ProductClassificationResponse
from app.services.classifier_service import classifier_service

router = APIRouter(prefix="/classifier", tags=["Product Classifier"])

@router.post("/classify", response_model=ProductClassificationResponse)
def classify_product(req: ProductClassificationRequest):
    return classifier_service.classify_product(req)

@router.get("/categories-info")
def get_categories_info():
    return [
        {
            "category": "Classical Ayurvedic Medicine",
            "statute": "Drugs & Cosmetics Act 1940 Section 3(a)",
            "license": "Form 25-D",
            "authority": "State AYUSH Licensing Authority",
            "key_condition": "Must strictly follow recipes and procedures in First Schedule authoritative texts without modification.",
            "ip_status": "No composition patent (Section 3(p) TK). Brand trademark and packaging design only."
        },
        {
            "category": "Patent or Proprietary Ayurvedic Medicine",
            "statute": "Drugs & Cosmetics Act 1940 Section 3(h)",
            "license": "Form 25-D (under Rule 158-B)",
            "authority": "State AYUSH Licensing Authority",
            "key_condition": "Contains ingredients from First Schedule texts in a proprietary ratio or modern dosage form.",
            "ip_status": "Patentable only if comparative clinical data proves non-obvious synergistic efficacy (Section 3(e)). Trademark in Class 5."
        },
        {
            "category": "Phytopharmaceutical Drug",
            "statute": "New Drugs and Clinical Trials Rules 2019 Chapter V",
            "license": "Form CT-18 / CT-21",
            "authority": "CDSCO Central Licensing Authority",
            "key_condition": "Purified, standardized fraction with minimum 4 analytical/bioactive markers.",
            "ip_status": "High patentability for novel extraction process and marker composition."
        },
        {
            "category": "Ayurveda-Aahar / Nutraceutical",
            "statute": "FSSAI (Ayurveda Aahar) Regulations 2022",
            "license": "FSSAI Central Food License",
            "authority": "FSSAI & Ministry of AYUSH",
            "key_condition": "Nutritional food formulated per Schedule A Ayurvedic recipes. Strictly no synthetic vitamins or minerals.",
            "ip_status": "Trademark in Class 29/30/32. Mandatory green AYURVEDA AAHAR logo on packaging."
        },
        {
            "category": "Ayurvedic Cosmetic",
            "statute": "Drugs and Cosmetics Act 1940 Part XV",
            "license": "Form 32-A",
            "authority": "State Licensing Authority",
            "key_condition": "Topical product for cleansing or beautifying without therapeutic disease claims.",
            "ip_status": "Trademark in Class 3. Industrial bottle/applicator design under Designs Act 2000."
        },
        {
            "category": "New or Non-Classical Drug",
            "statute": "Drugs and Cosmetics Act & CDSCO Guidelines",
            "license": "Form CT-23 (CDSCO)",
            "authority": "CDSCO",
            "key_condition": "Herbal formulation with non-textual plant species or novel chemical modifications requiring full Phase I-III trials.",
            "ip_status": "Subject to normal pharmaceutical patent evaluation."
        }
    ]
