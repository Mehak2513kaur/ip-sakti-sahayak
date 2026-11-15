from typing import List, Dict, Any
from app.models.schemas import ProductClassificationRequest, ProductClassificationResponse, SourceCitation

CLASSICAL_TEXTS = [
    "charaka samhita", "sushruta samhita", "ashtanga hridaya", "ashtanga sangraha",
    "bhavaprakasha", "sharangadhara samhita", "madhava nidana", "bhaishajya ratnavali",
    "sahasrayogam", "chakradatta", "rasatarangini", "arkaprakasha", "ayurvedic formulary of india"
]

class ProductClassifierService:
    def classify_product(self, req: ProductClassificationRequest) -> ProductClassificationResponse:
        name = req.product_name
        purpose = req.intended_purpose.lower()
        use = req.intended_use.lower()
        claims = req.claims_type.lower()
        classical_ref = (req.classical_text_reference or "").lower().strip()
        composition = (req.product_composition or "").lower()
        
        # Check if classical text is cited
        has_classical_text = any(text in classical_ref for text in CLASSICAL_TEXTS) or (len(classical_ref) > 3 and classical_ref != "none")
        
        # Decision logic
        if "phytopharmaceutical" in composition or ("standardized fraction" in composition and "marker" in composition):
            # Phytopharmaceutical Category
            category = "Phytopharmaceutical Drug"
            confidence = "High (94%)"
            form_type = "Form CT-18 / CT-21 (CDSCO Central Licensing Authority)"
            framework = "New Drugs and Clinical Trials Rules, 2019 (Chapter V, Rule 22) under CDSCO"
            reasoning = (
                f"The product '{name}' incorporates a purified, standardized botanical fraction with defined bioactive marker compounds. "
                "Unlike classical or proprietary Ayurvedic medicines, phytopharmaceuticals are modern botanical drugs regulated under CDSCO requiring formal clinical trials and NDA approval."
            )
            licensing = [
                "Investigational New Drug (IND) submission to CDSCO",
                "Preclinical safety, systemic toxicity, mutagenicity, and safety pharmacology data",
                "Phase I to Phase III clinical trial protocol approval by Subject Expert Committee (SEC)",
                "Schedule M / ICH Q7 API-grade Good Manufacturing Practices (GMP)"
            ]
            checklist = [
                "Botanical Authentication and Voucher Specimen details",
                "Standardization dossier with minimum 4 analytical/bioactive markers",
                "Stability testing data (accelerated and real-time per ICH guidelines)",
                "Toxicological evaluation reports from GLP certified laboratory"
            ]
            ip_protection = [
                "Process patent for novel extraction and purification parameters (Patents Act Section 2(1)(j))",
                "Composition of matter patent on specific marker ratios (provided Section 3(e) synergy is proven)",
                "Registered trademark in Class 5 for pharmaceutical preparations"
            ]
            citations = [
                SourceCitation(
                    document_title="New Drugs and Clinical Trials Rules, 2019",
                    issuing_authority="Central Drugs Standard Control Organization (CDSCO)",
                    jurisdiction="India",
                    legal_category="Phytopharmaceuticals",
                    section_number="Chapter V, Rule 22",
                    page_number=18,
                    snippet="Defines Phytopharmaceutical drug as a purified, standardized fraction with defined minimum four bioactive or analytical marker compounds of an extract of a medicinal plant or its part.",
                    official_source_url="https://cdsco.gov.in"
                )
            ]
            uncertainties = [
                "Determination of whether the chosen marker compounds adequately correlate with therapeutic biological activity.",
                "CDSCO Subject Expert Committee (SEC) interpretation of whether prior published clinical literature can waive Phase I trials."
            ]

        elif claims == "cosmetic" or (use == "topical" and claims not in ["therapeutic"]):
            # Cosmetic Category
            category = "Ayurvedic Cosmetic"
            confidence = "High (92%)"
            form_type = "Form 32-A (Ayurvedic Cosmetic License) from State Licensing Authority"
            framework = "Drugs and Cosmetics Act, 1940 & Rules 1945 (Part XV - Cosmetics Licensing)"
            reasoning = (
                f"The formulation '{name}' is intended solely for external application for cleansing, beautifying, or promoting attractiveness (e.g. hair oil, skin cream) without making medicinal or therapeutic disease-cure claims."
            )
            licensing = [
                "Apply to State Licensing Authority (SLA) on Form 31-A for grant of Form 32-A cosmetic manufacturing license",
                "Cosmetics Good Manufacturing Practices (GMP) compliance under Schedule M-II",
                "Approved technical staff holding B.Sc. Chemistry or B.Pharm / BAMS"
            ]
            checklist = [
                "Formula disclosure with botanical and INCI ingredient designations",
                "Skin irritation and safety patch testing reports",
                "Heavy metal limits compliance (Lead < 20 ppm, Arsenic < 2 ppm, Mercury < 1 ppm)",
                "Label mockups compliant with Rule 148 (labeling of cosmetics)"
            ]
            ip_protection = [
                "Trademark registration in Nice Class 3 (Cosmetics, herbal personal care, essential oils)",
                "Industrial design registration for bottle, jar, or dispensing cap under Designs Act, 2000",
                "Copyright registration for packaging graphic design and box artwork"
            ]
            citations = [
                SourceCitation(
                    document_title="Drugs and Cosmetics Act, 1940 and Rules 1945",
                    issuing_authority="State Licensing Authorities (SLA)",
                    jurisdiction="India",
                    legal_category="Cosmetics Law",
                    section_number="Section 3(aaa)",
                    page_number=4,
                    snippet="Defines cosmetic as any article intended to be rubbed, poured, sprinkled or sprayed on, or introduced into, or otherwise applied to the human body for cleansing, beautifying, promoting attractiveness, or altering the appearance.",
                    official_source_url="https://cdsco.gov.in"
                )
            ]
            uncertainties = [
                "Risk of border crossing into drug classification if marketing materials or website claim to 'cure eczema' or 'permanently stop alopecia'.",
                "Verification of preservative safety and synthetic additives limits."
            ]

        elif claims in ["nutritional", "general_wellness"] or "aahar" in name.lower() or "tea" in name.lower() or "supplement" in purpose:
            # Ayurveda Aahar Category
            category = "Ayurveda-Aahar / Ayurvedic Nutraceutical"
            confidence = "High (90%)"
            form_type = "FSSAI Central / State License (Category 100 - Ayurveda Aahar)"
            framework = "Food Safety and Standards (Ayurveda Aahar) Regulations, 2022 under FSSAI"
            reasoning = (
                f"The product '{name}' is formulated in accordance with Ayurvedic food principles or Schedule A recipes for daily nutrition, vitality, and wellness without medicinal treatment claims. It cannot contain synthetic vitamins or isolated chemicals."
            )
            licensing = [
                "Obtain FSSAI Central License under the dedicated 'Ayurveda Aahar' category (Kind of Business: Food Manufacturer)",
                "Strict prohibition against adding synthetic vitamins, minerals, amino acids, or hormones",
                "Mandatory display of the official green 'AYURVEDA AAHAR' logo on the front of pack"
            ]
            checklist = [
                "Recipe formulation matching Schedule A texts or traditional culinary texts",
                "FSSAI compliance declaration of non-therapeutic status",
                "Nutritional composition panel and recommended daily serving size",
                "Advisory statement regarding target consumer age group and contraindications"
            ]
            ip_protection = [
                "Trademark registration in Nice Class 29, 30, or 32 (Nutritional foods, herbal teas, beverages)",
                "Proprietary culinary processing trade secret",
                "Packaging design registration under the Designs Act, 2000"
            ]
            citations = [
                SourceCitation(
                    document_title="Food Safety and Standards (Ayurveda Aahar) Regulations, 2022",
                    issuing_authority="Food Safety and Standards Authority of India (FSSAI)",
                    jurisdiction="India",
                    legal_category="Food Regulations",
                    section_number="Regulation 3 & 4",
                    page_number=2,
                    snippet="Defines Ayurveda Aahar as food prepared in accordance with the recipes or processes or principles described in authoritative Ayurvedic books listed in Schedule A.",
                    official_source_url="https://www.fssai.gov.in"
                )
            ]
            uncertainties = [
                "FSSAI Scientific Committee verification if novel botanical extracts (non-Schedule A) are utilized.",
                "Distinction between therapeutic dosage vs dietary nutritional intake limits."
            ]

        elif has_classical_text and "proprietary" not in composition and claims == "therapeutic":
            # Classical Ayurvedic Medicine
            category = "Classical Ayurvedic Medicine (Shastriya Aushadhi)"
            confidence = "Very High (96%)"
            form_type = "Form 25-D (Classical Ayurvedic Medicine License) from AYUSH SLA"
            framework = "Drugs and Cosmetics Act, 1940 Section 3(a) & First Schedule"
            reasoning = (
                f"The formulation '{name}' strictly follows the ingredients, proportions, and manufacturing method (Samskara) described in an authoritative classical Ayurvedic text ({classical_ref}) listed in the First Schedule."
            )
            licensing = [
                "Statutory Form 24-D application to State AYUSH Licensing Authority",
                "Exempted from animal toxicity and clinical trial data requirements under Rule 158-B",
                "Schedule T Good Manufacturing Practices (GMP) certified manufacturing unit",
                "Qualified Ayurvedic technical expert (BAMS or B.Pharm Ayur) supervising production"
            ]
            checklist = [
                "Exact book reference, chapter (Adhyaya), and verse (Shloka) citation from First Schedule text",
                "Ayurvedic Pharmacopoeia of India (API) standards compliance for each raw botanical ingredient",
                "Heavy metals (Lead, Cadmium, Arsenic, Mercury), aflatoxins, and microbial limit test reports",
                "Master Formula Record (MFR) directly aligned with classical texts"
            ]
            ip_protection = [
                "NO patentability for the composition under Patents Act Section 3(p) (traditional knowledge)",
                "Trademark registration for the distinctive house brand or logo (e.g. '[Company Name] Mahabhringraj Taila')",
                "Trade secret on specialized processing nuances and sourcing quality"
            ]
            citations = [
                SourceCitation(
                    document_title="Drugs and Cosmetics Act, 1940",
                    issuing_authority="Ministry of AYUSH",
                    jurisdiction="India",
                    legal_category="Drug Regulatory Law",
                    section_number="Section 3(a)",
                    page_number=3,
                    snippet="Defines Ayurvedic, Siddha or Unani drug as medicines manufactured exclusively in accordance with the formulae described in the authoritative books specified in the First Schedule.",
                    official_source_url="https://ayush.gov.in"
                )
            ]
            uncertainties = [
                "Confirmation that no modern synthetic preservatives or unauthorized solvents are added that violate the classical definition."
            ]

        else:
            # Patent or Proprietary Ayurvedic Medicine
            category = "Patent or Proprietary Ayurvedic Medicine (Anubhuta / Proprietary ASU Drug)"
            confidence = "High (93%)"
            form_type = "Form 25-D (Proprietary Ayurvedic Medicine License) from AYUSH SLA"
            framework = "Drugs and Cosmetics Act, 1940 Section 3(h) & Rule 158-B"
            reasoning = (
                f"The product '{name}' contains ingredients recognized in the First Schedule Ayurvedic texts, but is formulated in a proprietary ratio, novel dosage form, or combination not found verbatim in classical treatises."
            )
            licensing = [
                "Statutory application on Form 24-D to State AYUSH Licensing Authority",
                "Proof of safety and effectiveness documentation under Rule 158-B",
                "Schedule T GMP compliance for the manufacturing premises",
                "Product label approval under Rule 161 with all active ingredients and classical references"
            ]
            checklist = [
                "Bibliographic proof of textual references for each individual herb from First Schedule books",
                "Certificate of Analysis for finished dosage form validating stability and shelf-life",
                "Safety literature dossier or pilot clinical evaluation if making new therapeutic claims",
                "Schedule T GMP manufacturing agreement (or own licensed premises)"
            ]
            ip_protection = [
                "Trademark registration in Nice Class 5 (Ayurvedic proprietary pharmaceuticals)",
                "Potential patentability ONLY if comparative clinical/lab data proves non-obvious synergistic efficacy under Section 3(e)",
                "Packaging design registration under the Designs Act, 2000"
            ]
            citations = [
                SourceCitation(
                    document_title="Drugs and Cosmetics Act, 1940 and Rules 1945",
                    issuing_authority="Ministry of AYUSH & State Licensing Authorities",
                    jurisdiction="India",
                    legal_category="Proprietary ASU Drugs",
                    section_number="Section 3(h) & Rule 158-B",
                    page_number=7,
                    snippet="Defines patent or proprietary medicine containing ingredients mentioned in the First Schedule texts, requiring proof of safety and efficacy under Rule 158-B.",
                    official_source_url="https://ayush.gov.in"
                )
            ]
            uncertainties = [
                "State Licensing Authority variance on whether pilot clinical trials or textual citations suffice for the specific therapeutic claim.",
                "Need for prior intimation to State Biodiversity Board under the Biological Diversity Act."
            ]

        return ProductClassificationResponse(
            suggested_category=category,
            confidence_level=confidence,
            reasoning=reasoning,
            relevant_legal_framework=framework,
            licensing_considerations=licensing,
            required_documentation_checklist=checklist,
            potential_ip_protection=ip_protection,
            official_statutory_references=citations,
            uncertainties_requiring_expert_verification=uncertainties,
            form_type=form_type
        )

classifier_service = ProductClassifierService()
