from typing import Dict, Any, List
from app.models.schemas import IPRecommendationRequest, IPRecommendationResponse

class IPService:
    def get_ip_overview(self) -> Dict[str, Any]:
        """Returns comprehensive statutory overview for all 7 IP mechanisms in Ayurveda."""
        return {
            "patents": {
                "title": "Patents (The Patents Act, 1970)",
                "protects": "Inventions that are novel, involve an inventive step, and are industrially applicable.",
                "eligibility": "Novel technological processes (e.g. green extraction, micro-encapsulation) or synergistic combinations with empirical comparative data. Classical formulations and mere admixtures are barred under Section 3(p) and 3(e).",
                "indian_laws": "The Patents Act, 1970 (Sections 2(1)(j), 3(p), 3(e), 3(d), 10(4)(ii)(D))",
                "international_filing": "PCT (Patent Cooperation Treaty) 30/31-month national phase in 157+ countries",
                "official_portal": "https://ipindia.gov.in"
            },
            "trademarks": {
                "title": "Trademarks (Trade Marks Act, 1999)",
                "protects": "Brand names, logos, distinctive symbols, slogans, and trade dress identifying the source of Ayurvedic products.",
                "eligibility": "Arbitrary, fanciful, or suggestive brand names. Purely descriptive Sanskrit/botanical terms (e.g. 'Ashwagandha', 'Triphala') are barred as word marks under Section 9.",
                "key_classes": "Class 5 (Pharmaceutical & Ayurvedic medicines), Class 3 (Herbal cosmetics & toiletries), Class 30 (Herbal teas & infusions)",
                "international_filing": "Madrid Protocol via IP India Office of Origin",
                "official_portal": "https://ipindia.gov.in/trade-marks.htm"
            },
            "geographical_indications": {
                "title": "Geographical Indications (GI Act, 1999)",
                "protects": "Goods possessing qualities, reputation or characteristics attributable to their specific geographical origin in India.",
                "examples": "Navara Rice (Panchakarma medicinal rice), Nilambur Teak, Kashmir Saffron, Kangra Tea, Malabar Pepper.",
                "eligibility": "Producers and associations in designated geographical territory. Enables authorized user certification.",
                "official_portal": "https://ipindia.gov.in/gi.htm"
            },
            "industrial_designs": {
                "title": "Industrial Designs (The Designs Act, 2000)",
                "protects": "Features of shape, configuration, pattern, ornament, or composition of lines applied to an article in 2D or 3D form.",
                "application_areas": "Unique ergonomic Ayurvedic oil bottles, roll-on dispensers, blister packs, and decorative traditional cosmetic containers.",
                "duration": "10 years + 5 years renewable (total 15 years)",
                "official_portal": "https://ipindia.gov.in/designs.htm"
            },
            "trade_secrets": {
                "title": "Trade Secrets & Undisclosed Information",
                "protects": "Proprietary processing temperatures, soaking durations (Bhavana), secret blending ratios, and vendor supply chain know-how.",
                "legal_basis": "Indian common law of breach of confidence, Contract Act 1872 (Non-Disclosure Agreements / NDAs).",
                "advantages": "No disclosure requirement, indefinite protection as long as confidentiality is rigorously maintained."
            },
            "plant_variety_protection": {
                "title": "Protection of Plant Varieties & Farmers' Rights (PPV&FR Act, 2001)",
                "protects": "New, distinct, uniform, and stable (NDUS) plant varieties, essentially derived varieties, and farmer varieties of medicinal herbs.",
                "authority": "Protection of Plant Varieties and Farmers' Rights Authority, New Delhi",
                "official_portal": "https://plantauthority.gov.in"
            },
            "copyright": {
                "title": "Copyright (The Copyright Act, 1957)",
                "protects": "Original artistic works on packaging boxes, label illustrations, marketing brochures, and educational treatises.",
                "duration": "Author's lifetime + 60 years",
                "official_portal": "https://copyright.gov.in"
            }
        }

    def generate_recommendation(self, req: IPRecommendationRequest) -> IPRecommendationResponse:
        name = req.product_or_invention_name
        is_novel = req.is_novel_composition
        has_tk = req.has_classical_prior_art
        process = req.process_novelty or ""
        brand = req.brand_name or name

        # Patent assessment
        if "novel" in process.lower() or "supercritical" in process.lower():
            patent_feasibility = "High (Process Patent Recommended)"
            patent_strategy = (
                f"Your technological process ('{process}') has strong patent potential under Section 2(1)(j). "
                "Because process claims focus on extraction parameters, temperature gradients, or solvent separation rather than the herbal composition itself, they successfully overcome Section 3(p) traditional knowledge exclusions."
            )
        elif is_novel and not has_tk:
            patent_feasibility = "Moderate to High (Composition Patent with Synergy Proof)"
            patent_strategy = (
                "To patent a novel composition, you must substantiate non-obvious synergistic efficacy under Section 3(e) with comparative in-vitro/in-vivo data showing the combination exceeds the sum of individual components."
            )
        else:
            patent_feasibility = "Low (Classical Formulation / Mere Admixture)"
            patent_strategy = (
                "Direct composition patentability is barred by Section 3(p) (traditional knowledge) and Section 3(e) (mere admixture). "
                "Do not spend capital attempting to patent the herbal mixture; instead, heavily protect your Brand Name (Trademark), Packaging Design (Design Registration), and Sourcing/Processing Nuances (Trade Secrets)."
            )

        # Trademark recommendation
        brand_clean = brand.strip()
        is_descriptive = any(term in brand_clean.lower() for term in ["ashwagandha", "triphala", "taila", "churna", "ghrita", "amla", "neem"])
        if is_descriptive:
            tm_strategy = (
                f"The term '{brand_clean}' contains generic/descriptive Ayurvedic terms. Under Section 9 of the Trade Marks Act, pure word marks will be objected to. "
                "RECOMMENDATION: Combine this with a distinctive brand prefix (e.g. 'AyuVeda [BrandName]') and register as a stylized Composite Device Mark / Logo with disclaimer on descriptive elements."
            )
        else:
            tm_strategy = (
                f"The brand '{brand_clean}' appears distinctive and registrable as a Word Mark and Device Mark in Class 5 (Medicines) and Class 3 (Cosmetics)."
            )

        # Mandatory NBA Section 6 guidance
        sec_3p = (
            "Section 3(p) of the Patents Act, 1970 strictly excludes traditional knowledge. Indian Patent Office examiners cross-reference TKDL (Traditional Knowledge Digital Library). "
            "If your ingredients are known for the same therapeutic indications in classical treatises, the combination is presumed unpatentable without extraordinary inventive step proof."
        )
        sec_3e = (
            "Section 3(e) requires empirical laboratory proof that your combination achieves a true synergistic biological response, not just an aggregation of known properties."
        )

        filing_sequence = [
            "1. Conduct exhaustive Trademark search on IP India public search portal (Classes 3, 5, 30, 35).",
            "2. File Trademark Application (Form TM-A) to secure brand priority.",
            "3. If patentable process exists, submit NBA Form III to National Biodiversity Authority prior to patent filing/grant.",
            "4. File Provisional Patent Specification (Form 2) before any public commercial disclosure or marketing.",
            "5. Apply for Design Registration (Form 1) for proprietary bottle, jar, or packaging shapes.",
            "6. Execute Non-Disclosure Agreements (NDAs) with all manufacturing partners and employees to preserve trade secrets."
        ]

        portals = [
            {"name": "IP India (Patents, Designs, Trademarks, GI)", "url": "https://ipindia.gov.in"},
            {"name": "National Biodiversity Authority (NBA)", "url": "http://nbaindia.org"},
            {"name": "PPV&FR Authority (Plant Varieties)", "url": "https://plantauthority.gov.in"},
            {"name": "WIPO Madrid System (Global Trademarks)", "url": "https://www.wipo.int/madrid/en/"}
        ]

        return IPRecommendationResponse(
            patent_assessment={"feasibility": patent_feasibility, "strategy": patent_strategy},
            trademark_recommendation={"brand_name": brand_clean, "strategy": tm_strategy, "recommended_classes": ["Class 5 (Medicines)", "Class 3 (Cosmetics)", "Class 35 (E-commerce retail)"]},
            gi_assessment={"applicability": "Assess whether any raw ingredients (e.g. Navara rice, Kashmir saffron) possess registered GI status to enhance marketing authenticity."},
            industrial_design={"applicability": "Protect unique packaging shapes, bottles, and dispensers under the Designs Act, 2000."},
            trade_secret_guidance={"applicability": "Maintain strict confidentiality on exact supplier sourcing, batch temperature curves, and maceration timings."},
            plant_variety_guidance={"applicability": "Relevant only if breeding or domesticating a distinct, uniform, and stable new medicinal plant cultivar."},
            section_3p_tk_analysis=sec_3p,
            section_3e_synergy_analysis=sec_3e,
            recommended_filing_sequence=filing_sequence,
            official_portals=portals
        )

ip_service = IPService()
