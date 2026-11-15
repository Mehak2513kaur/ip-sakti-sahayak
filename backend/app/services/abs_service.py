from typing import List, Dict, Any
from app.models.schemas import ABSAssessmentRequest, ABSAssessmentResponse, SourceCitation

class ABSService:
    def assess_abs(self, req: ABSAssessmentRequest) -> ABSAssessmentResponse:
        resource = req.biological_resource_name
        origin = req.geographical_source.lower()
        entity = req.user_entity_type.lower()
        purpose = req.purpose_of_access.lower()
        is_cultivated = req.is_cultivated_resource or "cultivated" in origin or "farm" in origin
        is_vaidya = "vaidya" in entity or "practitioner" in entity
        is_foreign = "foreign" in entity or "non-citizen" in entity

        exemptions: List[str] = []
        forms: List[str] = []
        citations: List[SourceCitation] = []

        # Case 1: Patent / IPR application based on biological resource
        if "patent" in purpose or "ipr" in purpose:
            verdict = "MANDATORY PRIOR APPROVAL REQUIRED (Section 6, Biological Diversity Act)"
            authority = "National Biodiversity Authority (NBA), Chennai"
            governing_sec = "Section 6 of Biological Diversity Act, 2002 (as amended 2023)"
            forms = ["Form III (Application for approval of NBA for applying for Intellectual Property Rights)"]
            benefit_sharing = (
                "Upon commercialization of the patent: Benefit sharing fee between 0.2% to 1.0% of annual gross ex-factory sales, "
                "or 2.0% to 5.0% of royalty received if licensed to third parties."
            )
            caution = (
                "CRITICAL STATUTORY REQUIREMENT: Form III must be submitted to NBA before the grant of the patent. "
                "Failing to seek NBA approval is an offense under Section 55 and constitutes a valid statutory ground for patent opposition or revocation under Section 25/64 of the Patents Act."
            )
            citations.append(
                SourceCitation(
                    document_title="The Biological Diversity Act, 2002",
                    issuing_authority="National Biodiversity Authority",
                    jurisdiction="India",
                    legal_category="Biodiversity & IPR",
                    section_number="Section 6",
                    snippet="Application for intellectual property rights not to be made without approval of National Biodiversity Authority for inventions based on Indian biological resources.",
                    official_source_url="http://nbaindia.org"
                )
            )

        # Case 2: Registered AYUSH Practitioner (Vaidya)
        elif is_vaidya:
            verdict = "STATUTORILY EXEMPT FROM ABS & PRIOR INTIMATION (2023 Amendment Act)"
            authority = "State Biodiversity Board (SBB) - Exemption Applicable"
            governing_sec = "Section 7 Proviso & Section 40 Amendments of Act No. 10 of 2023"
            exemptions = [
                "Explicit exemption for registered AYUSH practitioners (Vaidyas, Siddha practitioners, Hakims) practicing traditional healthcare systems.",
                "No requirement of prior intimation to State Biodiversity Board.",
                "No liability for payment of Access and Benefit Sharing (ABS) fees."
            ]
            benefit_sharing = "0.0% (Exempt by statutory mandate)"
            caution = (
                "The exemption applies strictly to classical practice and traditional formulations prepared for personal dispensing to patients. "
                "If large-scale industrial commercial manufacturing under a corporate banner is commenced, ordinary commercial provisions apply."
            )

        # Case 3: Certified Cultivated Medicinal Plants
        elif is_cultivated:
            verdict = "EXEMPT FROM ABS FEE (Certificate of Origin Required)"
            authority = "State Biodiversity Board (SBB)"
            governing_sec = "Biological Diversity (Amendment) Act, 2023 - Cultivated Plants Exemption"
            exemptions = [
                "Cultivated medicinal plants and agricultural species are exempted from Access and Benefit Sharing (ABS) fee liabilities.",
                "Requires submission of a Certificate of Origin from local agricultural mandi, horticulture department, or cultivator invoice."
            ]
            forms = ["Declaration Form / Certificate of Cultivated Origin to State Biodiversity Board"]
            benefit_sharing = "0.0% (Exempt upon verification of cultivated origin)"
            caution = (
                "Ensure robust audit trail (farmer receipts, land records, or mandi purchase invoices) proving the herbs were harvested from cultivated lands rather than wild forest extraction."
            )

        # Case 4: Foreign Person or Foreign-Controlled Entity
        elif is_foreign:
            verdict = "MANDATORY PRIOR NBA APPROVAL (Section 3)"
            authority = "National Biodiversity Authority (NBA), Chennai"
            governing_sec = "Section 3 of Biological Diversity Act, 2002"
            forms = ["Form I (Application for access to biological resources and associated traditional knowledge)"]
            benefit_sharing = "0.5% to 1.0% of ex-factory gross sales or mutually agreed benefit-sharing matrix with NBA."
            caution = (
                "Entities with ANY foreign equity, FDI, or foreign director shareholding are strictly categorized under Section 3(2) and cannot access Indian biological resources without prior NBA approval."
            )
            citations.append(
                SourceCitation(
                    document_title="The Biological Diversity Act, 2002",
                    issuing_authority="National Biodiversity Authority",
                    jurisdiction="India",
                    legal_category="Foreign Entity Access",
                    section_number="Section 3",
                    snippet="Certain persons including non-citizens and foreign-controlled entities not to undertake biodiversity-related activities without approval of National Biodiversity Authority.",
                    official_source_url="http://nbaindia.org"
                )
            )

        # Case 5: Indian Commercial Entity Utilizing Wild/Forest Harvested Resources
        else:
            verdict = "PRIOR INTIMATION TO STATE BIODIVERSITY BOARD (SBB) REQUIRED (Section 7)"
            authority = "Respective State Biodiversity Board (SBB) of the harvesting state"
            governing_sec = "Section 7 of Biological Diversity Act, 2002"
            forms = ["Form I (Prior intimation to the concerned State Biodiversity Board)"]
            benefit_sharing = "0.1% to 0.5% of ex-factory gross sales of the finished product, or 3.0% to 5.0% of purchase price of the biological resource."
            caution = (
                "Prior intimation must be delivered to the State Biodiversity Board before commencing commercial extraction. Failure to comply invites penalties under Section 55(2)."
            )

        checklist = [
            "Botanical authentication and botanical name verification of accessed resource",
            "Purchase invoice and transit permit (Ravana Challan / Forest Transit Pass) if wild-collected",
            "Certificate of Origin if sourcing from certified agricultural cultivation",
            "Company incorporation documents indicating Indian shareholding percentage",
            "Proposed utilization disclosure and annual production forecast",
            "Filled statutory form (Form I or Form III) with requisite statutory processing fee"
        ]

        return ABSAssessmentResponse(
            applicability_verdict=verdict,
            governing_section=governing_sec,
            relevant_authority=authority,
            applicable_forms=forms,
            available_exemptions=exemptions,
            benefit_sharing_consideration=benefit_sharing,
            documentation_checklist=checklist,
            statutory_citations=citations,
            cautionary_advisory=caution
        )

abs_service = ABSService()
