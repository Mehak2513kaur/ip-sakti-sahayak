from typing import List, Dict, Any
from app.models.schemas import ComplianceRoadmapRequest, ComplianceRoadmapResponse

JURISDICTIONS_DATA: Dict[str, Any] = {
    "USA": {
        "regulatory_authority": "US Food and Drug Administration (FDA) CFSAN / Office of Dietary Supplement Programs & Office of Cosmetics and Colors",
        "oral_classification": "Dietary Supplement under DSHEA 1994 (21 U.S.C. 321(ff))",
        "topical_classification": "Cosmetic Product under Federal Food, Drug, and Cosmetic Act & MoCRA 2022",
        "registration_path": "Mandatory FDA Food Facility Registration (FFR) for dietary supplements; Mandatory Cosmetic Facility Registration & Product Listing via FDA Cosmetics Direct portal under MoCRA.",
        "labeling_rules": [
            "Structure/Function claims only (e.g. 'Supports joint mobility'); absolute prohibition on disease claims (e.g. 'cures arthritis').",
            "Mandatory DSHEA Disclaimer: 'These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.'",
            "Supplement Facts panel with serving size, dietary ingredients, and % Daily Value (DV).",
            "For cosmetics: complete ingredient listing in descending order of predominance using INCI nomenclature and fragrance allergen disclosure."
        ],
        "mandatory_testing": [
            "Current Good Manufacturing Practice (cGMP) compliance under 21 CFR Part 111",
            "Heavy metals testing per USP limits (Lead < 0.5 mcg/day, Arsenic < 10 mcg/day, Cadmium < 4.1 mcg/day, Mercury < 0.3 mcg/day)",
            "Pesticide residue screening per USP <561>",
            "Microbial contamination screening per USP <61> and <62>",
            "California Proposition 65 warning compliance for heavy metals"
        ],
        "import_permit": "FDA Prior Notice of Importation for each commercial consignment, US Customs CBP clearance, Foreign Supplier Verification Program (FSVP) importer of record.",
        "ip_protection": [
            "US Trademark registration in Class 5 (Supplements) or Class 3 (Cosmetics) via USPTO TEAS or WIPO Madrid Protocol",
            "US Copyright registration for label artwork with US Copyright Office",
            "US Process patent (if novel extraction technology is proven)"
        ],
        "official_portals": [
            {"name": "US FDA Dietary Supplements Portal", "url": "https://www.fda.gov/food/dietary-supplements"},
            {"name": "US FDA MoCRA Cosmetics Portal", "url": "https://www.fda.gov/cosmetics/cosmetics-laws-regulations/modernization-cosmetics-regulation-act-2022-mocra"},
            {"name": "USPTO Trademark Search (TESS)", "url": "https://www.uspto.gov/trademarks"}
        ],
        "critical_risks": [
            "CRITICAL: If label or marketing website makes disease treatment claims, FDA issues Warning Letters and detains shipments as 'Unapproved New Drugs'.",
            "Heavy metal adulteration remains the number one trigger for FDA Import Alerts (Alert 54-15) against Indian Ayurvedic manufacturers."
        ]
    },
    "European Union": {
        "regulatory_authority": "European Medicines Agency (EMA) Committee on Herbal Medicinal Products (HMPC) & National Competent Authorities (e.g. BfArM Germany, ANSM France)",
        "oral_classification": "Traditional Herbal Medicinal Product (THMP) under Directive 2004/24/EC OR Food Supplement under Directive 2002/46/EC",
        "topical_classification": "Cosmetic Product under Regulation (EC) No 1223/2009",
        "registration_path": "THMPD simplified registration requires 30 years documented medicinal use (including at least 15 years within the EU). If lacking 15-year EU history, product is typically notified as a Food Supplement under national competent authorities, subject to Novel Food Regulation (EU) 2015/2283.",
        "labeling_rules": [
            "Mandatory European language labeling in the official languages of the target member state.",
            "Health claims must be pre-authorized under Regulation (EC) No 1924/2006 on nutrition and health claims (on-hold list for botanical claims).",
            "Mandatory advisory on food supplements: 'Do not exceed recommended daily dose; food supplements should not replace a balanced diet.'"
        ],
        "mandatory_testing": [
            "European Pharmacopoeia (Ph. Eur.) heavy metal monograph limits (Lead < 3.0 ppm, Cadmium < 1.0 ppm, Mercury < 0.1 ppm)",
            "Pesticide residues screening compliant with Ph. Eur. 2.8.13",
            "Mycotoxins (Aflatoxins B1, B2, G1, G2 and Ochratoxin A) limits compliant with Regulation (EC) 1881/2006",
            "Pyrrolizidine alkaloids (PA) contamination testing"
        ],
        "import_permit": "Designation of an EU Responsible Person (RP) with an established EU address, EU Cosmetic Product Notification Portal (CPNP) notification for cosmetics with Cosmetic Product Safety Report (CPSR).",
        "ip_protection": [
            "European Union Trade Mark (EUTM) registered with EUIPO (Alicante, Spain)",
            "Community Design protection via EUIPO"
        ],
        "official_portals": [
            {"name": "EMA Herbal Medicinal Products", "url": "https://www.ema.europa.eu/en/human-regulatory/herbal-medicinal-products"},
            {"name": "EUIPO Trademark Portal", "url": "https://euipo.europa.eu"},
            {"name": "EU Cosmetic Product Notification Portal (CPNP)", "url": "https://ec.europa.eu/growth/sectors/cosmetics/cpnp_en"}
        ],
        "critical_risks": [
            "Difficulty meeting the 15-year EU traditional use threshold under THMPD.",
            "Strict Novel Food scrutiny: botanical extracts concentrated beyond traditional levels require pre-market European Commission approval."
        ]
    },
    "United Kingdom": {
        "regulatory_authority": "Medicines and Healthcare products Regulatory Agency (MHRA) & Food Standards Agency (FSA)",
        "oral_classification": "Traditional Herbal Registration (THR) under Human Medicines Regulations 2012 or Food Supplement",
        "topical_classification": "Cosmetic under UK Cosmetics Regulation (Schedule 34 of the Product Safety and Metrology Statutory Instrument)",
        "registration_path": "Traditional Herbal Registration (THR) scheme with THR certification mark on packaging, or food supplement notification.",
        "labeling_rules": [
            "THR products must display the official UK THR logo and registration number.",
            "UK Food Supplement labeling rules under FSA.",
            "For cosmetics: notification on the UK Submit Cosmetic Product Notifications (SCPN) portal."
        ],
        "mandatory_testing": [
            "British Pharmacopoeia (BP) / European Pharmacopoeia quality specifications",
            "Heavy metals, microbial bioburden, aflatoxin, and pesticide residue certificates from ISO 17025 accredited labs"
        ],
        "import_permit": "Designation of a UK-based Responsible Person, UK Customs declaration, EORI number.",
        "ip_protection": [
            "UK Trade Mark with Intellectual Property Office (UK IPO, Newport)"
        ],
        "official_portals": [
            {"name": "UK MHRA Herbal Medicines Scheme", "url": "https://www.gov.uk/guidance/apply-for-a-traditional-herbal-registration-thr"},
            {"name": "UK IPO Trademark Search", "url": "https://www.gov.uk/search-for-trademark"}
        ],
        "critical_risks": [
            "Post-Brexit divergence between EU and UK regulatory compliance regimes."
        ]
    },
    "Australia": {
        "regulatory_authority": "Therapeutic Goods Administration (TGA), Department of Health and Aged Care",
        "oral_classification": "Complementary Medicine (Listed Medicine on ARTG yielding AUST L number)",
        "topical_classification": "Cosmetic or Listed Therapeutic Goods depending on claims and SPF/therapeutic presence",
        "registration_path": "Electronic application for 'Listed Medicine' on the Australian Register of Therapeutic Goods (ARTG). All ingredients must be pre-approved permitted ingredients in the TGA Permissible Ingredients Determination.",
        "labeling_rules": [
            "Must display the AUST L (or AUST R) registration number prominently on the front of pack.",
            "Permitted Indications only: indications selected from the TGA list of pre-approved Permitted Indications.",
            "Sponsor name and Australian address must appear on label."
        ],
        "mandatory_testing": [
            "TGA Good Manufacturing Practice (GMP) clearance for overseas manufacturers",
            "Heavy metal testing: Lead < 5 ppm, Arsenic < 3 ppm, Cadmium < 0.3 ppm, Mercury < 0.1 ppm",
            "Assay of active herbal markers matching ARTG entry"
        ],
        "import_permit": "Must have an Australian Sponsor (resident business entity) responsible for the ARTG entry and product release.",
        "ip_protection": [
            "Australian Trademark with IP Australia in Class 5"
        ],
        "official_portals": [
            {"name": "TGA Complementary Medicines", "url": "https://www.tga.gov.au/complementary-medicines"},
            {"name": "IP Australia", "url": "https://www.ipaustralia.gov.au"}
        ],
        "critical_risks": [
            "TGA post-market compliance audits are stringent. If evidence for permitted indications is not immediately available, product is cancelled from ARTG with public notice."
        ]
    },
    "Canada": {
        "regulatory_authority": "Health Canada - Natural and Non-prescription Health Products Directorate (NNHPD)",
        "oral_classification": "Natural Health Product (NHP) under the Natural Health Products Regulations (NHPR)",
        "topical_classification": "Cosmetic under Canadian Cosmetic Regulations or NHP if therapeutic claims made",
        "registration_path": "Product License application leading to an eight-digit Natural Product Number (NPN) displayed as 'NPN 800XXXXX'. Applications citing existing Health Canada Ayurvedic Monographs (Compendial Applications) are processed in 60 days.",
        "labeling_rules": [
            "Mandatory bilingual labeling in both official Canadian languages (English and French).",
            "Prominent display of the 8-digit NPN number.",
            "Recommended use or purpose, dose, risk information, and Canadian contact information."
        ],
        "mandatory_testing": [
            "Finished product testing compliant with Health Canada Quality of Natural Health Products Guide",
            "Heavy metals: Lead < 10 mcg/day, Arsenic < 10 mcg/day, Cadmium < 0.09 mcg/kg bw/day, Mercury < 0.29 mcg/kg bw/day",
            "Pesticide residues, microbial limits, and disintegration testing"
        ],
        "import_permit": "Canadian importer must hold an active Site License issued by Health Canada demonstrating compliance with Canadian GMPs.",
        "ip_protection": [
            "Canadian Trademark registration with Canadian Intellectual Property Office (CIPO)"
        ],
        "official_portals": [
            {"name": "Health Canada NHP Directorate", "url": "https://www.canada.ca/en/health-canada/services/drugs-health-products/natural-non-prescription.html"},
            {"name": "CIPO Trademarks", "url": "https://www.cipo.ic.gc.ca"}
        ],
        "critical_risks": [
            "Attempting to sell in Canada without an NPN number or without a Canadian Site License holder leads to border seizures and import bans."
        ]
    },
    "India": {
        "regulatory_authority": "Ministry of AYUSH (State Licensing Authorities) & FSSAI",
        "oral_classification": "Ayurvedic Medicine (Form 25-D) under Drugs & Cosmetics Act OR Ayurveda Aahar under FSSAI",
        "topical_classification": "Ayurvedic Medicine or Ayurvedic Cosmetic (Form 32-A)",
        "registration_path": "State Licensing Authority manufacturing license or loan license; FSSAI Central License for Ayurveda Aahar.",
        "labeling_rules": [
            "Drugs and Cosmetics Rules Rule 161: Full ingredient listing with botanical/classical names, batch number, license number, manufacturing date, and expiry.",
            "For Ayurveda Aahar: Official 'AYURVEDA AAHAR' logo on front of pack."
        ],
        "mandatory_testing": [
            "Schedule T GMP compliance",
            "API standards for raw herbs and finished formulations",
            "Heavy metals (Lead, Cadmium, Arsenic, Mercury), aflatoxins, pesticide residues, microbial limits"
        ],
        "import_permit": "Form 10 / Form 10-A (for import into India) or DGFT Free Sale Certificate (for export).",
        "ip_protection": [
            "Trademark with IP India in Class 5 / Class 3",
            "Process patent with IP India under Patents Act, 1970"
        ],
        "official_portals": [
            {"name": "Ministry of AYUSH", "url": "https://ayush.gov.in"},
            {"name": "IP India", "url": "https://ipindia.gov.in"},
            {"name": "FSSAI", "url": "https://fssai.gov.in"}
        ],
        "critical_risks": [
            "Misleading advertisements prohibited under Drugs and Magic Remedies (Objectionable Advertisements) Act, 1954."
        ]
    }
}

class ComplianceService:
    def generate_roadmap(self, req: ComplianceRoadmapRequest) -> ComplianceRoadmapResponse:
        dest = req.destination_country
        category = req.product_category
        
        info = JURISDICTIONS_DATA.get(dest, JURISDICTIONS_DATA["USA"])
        is_topical = "cosmetic" in category.lower() or "topical" in req.intended_use.lower()
        foreign_class = info.get("topical_classification") if is_topical else info.get("oral_classification")

        return ComplianceRoadmapResponse(
            destination_country=dest,
            regulatory_authority=info["regulatory_authority"],
            foreign_product_classification=foreign_class,
            registration_or_notification_path=info["registration_path"],
            labeling_and_packaging_rules=info["labeling_rules"],
            mandatory_testing_and_limits=info["mandatory_testing"],
            import_permit_and_facility_registration=info["import_permit"],
            ip_protection_options=info["ip_protection"],
            official_government_portals=info["official_portals"],
            critical_risk_factors=info["critical_risks"]
        )

compliance_service = ComplianceService()
