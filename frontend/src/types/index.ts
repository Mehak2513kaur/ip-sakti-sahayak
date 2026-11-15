export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  organization?: string;
}

export interface SourceCitation {
  document_title: string;
  issuing_authority: string;
  jurisdiction: string;
  legal_category: string;
  section_number?: string;
  page_number?: number;
  official_source_url?: string;
  snippet: string;
  relevance_score: number;
  status: string;
}

export interface ChatResponse {
  session_id: string;
  direct_answer: string;
  relevant_legal_provisions: string[];
  simple_explanation: string;
  applicability: string;
  required_documents: string[];
  recommended_next_steps: string[];
  official_sources: SourceCitation[];
  confidence_and_limitations: string;
  detected_language: string;
  is_demo_mode: boolean;
}

export interface ProductClassificationRequest {
  product_name: string;
  ingredients: string[];
  botanical_names?: string[];
  intended_purpose: string;
  intended_use: string;
  claims_type: string;
  classical_text_reference?: string;
  product_composition?: string;
  target_market: string;
  manufacturing_location: string;
}

export interface ProductClassificationResponse {
  suggested_category: string;
  confidence_level: string;
  reasoning: string;
  relevant_legal_framework: string;
  licensing_considerations: string[];
  required_documentation_checklist: string[];
  potential_ip_protection: string[];
  official_statutory_references: SourceCitation[];
  uncertainties_requiring_expert_verification: string[];
  form_type?: string;
}

export interface IPRecommendationRequest {
  product_or_invention_name: string;
  description: string;
  is_novel_composition: boolean;
  has_classical_prior_art: boolean;
  process_novelty?: string;
  brand_name?: string;
  unique_packaging_design: boolean;
  origin_geographical_indication?: string;
}

export interface IPRecommendationResponse {
  patent_assessment: { feasibility: string; strategy: string };
  trademark_recommendation: { brand_name: string; strategy: string; recommended_classes: string[] };
  gi_assessment: { applicability: string };
  industrial_design: { applicability: string };
  trade_secret_guidance: { applicability: string };
  plant_variety_guidance: { applicability: string };
  section_3p_tk_analysis: string;
  section_3e_synergy_analysis: string;
  recommended_filing_sequence: string[];
  official_portals: { name: string; url: string }[];
}

export interface TKSearchMatch {
  id: string;
  sanskrit_name: string;
  botanical_name: string;
  classical_formulation: string;
  authoritative_texts: string[];
  traditional_indications: string[];
  relevant_patent_prior_art: { patent_title: string; jurisdiction: string; outcome: string }[];
  section_3p_applicability: string;
  tkdl_status_notice: string;
  source_reference: string;
}

export interface ComplianceRoadmapResponse {
  destination_country: string;
  regulatory_authority: string;
  foreign_product_classification: string;
  registration_or_notification_path: string;
  labeling_and_packaging_rules: string[];
  mandatory_testing_and_limits: string[];
  import_permit_and_facility_registration: string;
  ip_protection_options: string[];
  official_government_portals: { name: string; url: string }[];
  critical_risk_factors: string[];
}

export interface ABSAssessmentResponse {
  applicability_verdict: string;
  governing_section: string;
  relevant_authority: string;
  applicable_forms: string[];
  available_exemptions: string[];
  benefit_sharing_consideration: string;
  documentation_checklist: string[];
  statutory_citations: SourceCitation[];
  cautionary_advisory: string;
}

export interface LibraryDocument {
  id: number;
  document_title: string;
  issuing_authority: string;
  jurisdiction: string;
  legal_category: string;
  section_number?: string;
  official_reference?: string;
  source_url?: string;
  publication_year: number;
  status: string;
  is_verified: boolean;
  snippet: string;
}

export interface ReportItem {
  report_id: string;
  title: string;
  report_type: string;
  created_at: string;
  download_url_pdf: string;
  data_summary: Record<string, any>;
}

export interface DemoWorkflow {
  workflow_id: string;
  title: string;
  persona: string;
  description: string;
  product_data: Record<string, any>;
  classification_analysis: Record<string, any>;
  ip_strategy: Record<string, any>;
  abs_compliance?: Record<string, any>;
  international_compliance?: Record<string, any>;
}
