import {
  ChatResponse,
  ProductClassificationRequest,
  ProductClassificationResponse,
  IPRecommendationRequest,
  IPRecommendationResponse,
  TKSearchMatch,
  ComplianceRoadmapResponse,
  ABSAssessmentResponse,
  LibraryDocument,
  ReportItem,
  DemoWorkflow
} from '../types';

const BASE_URL = '/api';

export const api = {
  // Chat
  async queryChat(message: string, language = 'en', domain?: string, sessionId?: string): Promise<ChatResponse> {
    const res = await fetch(`${BASE_URL}/chat/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, language, domain, session_id: sessionId })
    });
    if (!res.ok) throw new Error('Chat query failed');
    return res.json();
  },

  async getSuggestedQuestions() {
    const res = await fetch(`${BASE_URL}/chat/suggested-questions`);
    if (!res.ok) throw new Error('Failed to load questions');
    return res.json();
  },

  async uploadDocumentQuery(file: File, query?: string) {
    const formData = new FormData();
    formData.append('file', file);
    if (query) formData.append('query', query);

    const res = await fetch(`${BASE_URL}/chat/upload-document-query`, {
      method: 'POST',
      body: formData
    });
    if (!res.ok) throw new Error('Document analysis failed');
    return res.json();
  },

  // Classifier
  async classifyProduct(data: ProductClassificationRequest): Promise<ProductClassificationResponse> {
    const res = await fetch(`${BASE_URL}/classifier/classify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Classification failed');
    return res.json();
  },

  async getCategoriesInfo() {
    const res = await fetch(`${BASE_URL}/classifier/categories-info`);
    if (!res.ok) throw new Error('Failed to load category info');
    return res.json();
  },

  // IP Explorer
  async getIPOverview() {
    const res = await fetch(`${BASE_URL}/ip/overview`);
    if (!res.ok) throw new Error('Failed to fetch IP overview');
    return res.json();
  },

  async recommendIP(data: IPRecommendationRequest): Promise<IPRecommendationResponse> {
    const res = await fetch(`${BASE_URL}/ip/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('IP recommendation failed');
    return res.json();
  },

  // Traditional Knowledge
  async searchTK(query: string, search_type = 'botanical'): Promise<{ query: string; matches: TKSearchMatch[]; tkdl_access_disclaimer: string; search_limitations: string }> {
    const res = await fetch(`${BASE_URL}/tk/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, search_type })
    });
    if (!res.ok) throw new Error('TK search failed');
    return res.json();
  },

  async getFeaturedPlants(): Promise<any[]> {
    const res = await fetch(`${BASE_URL}/tk/featured-plants`);
    if (!res.ok) return [];
    return res.json();
  },

  // Compliance
  async getJurisdictions() {
    const res = await fetch(`${BASE_URL}/compliance/jurisdictions`);
    if (!res.ok) throw new Error('Failed to fetch jurisdictions');
    return res.json();
  },

  async getComplianceRoadmap(data: {
    product_category: string;
    origin_country: string;
    destination_country: string;
    ingredients: string[];
    intended_use: string;
    product_claims: string;
  }): Promise<ComplianceRoadmapResponse> {
    const res = await fetch(`${BASE_URL}/compliance/roadmap`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Compliance roadmap failed');
    return res.json();
  },

  // ABS
  async assessABS(data: {
    biological_resource_name: string;
    botanical_name?: string;
    geographical_source: string;
    user_entity_type: string;
    purpose_of_access: string;
    is_codified_traditional_knowledge: boolean;
    is_cultivated_resource: boolean;
  }): Promise<ABSAssessmentResponse> {
    const res = await fetch(`${BASE_URL}/abs/assess`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('ABS assessment failed');
    return res.json();
  },

  async getABSRules() {
    const res = await fetch(`${BASE_URL}/abs/rules-summary`);
    if (!res.ok) throw new Error('Failed to load ABS rules');
    return res.json();
  },

  // Knowledge Library
  async getLibraryDocuments(category?: string, authority?: string, search?: string): Promise<{ total_count: number; documents: LibraryDocument[] }> {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (authority) params.append('authority', authority);
    if (search) params.append('search', search);

    const res = await fetch(`${BASE_URL}/documents/list?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to load documents');
    return res.json();
  },

  async getLibraryCategories() {
    const res = await fetch(`${BASE_URL}/documents/categories`);
    if (!res.ok) return [];
    return res.json();
  },

  // Reports
  async getReports(): Promise<ReportItem[]> {
    const res = await fetch(`${BASE_URL}/reports/list`);
    if (!res.ok) return [];
    return res.json();
  },

  async generateReport(report_type: string, title: string, subject_data: Record<string, any>): Promise<ReportItem> {
    const res = await fetch(`${BASE_URL}/reports/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ report_type, title, subject_data })
    });
    if (!res.ok) throw new Error('Failed to generate report');
    return res.json();
  },

  // Workflows
  async getDemoWorkflows(): Promise<DemoWorkflow[]> {
    const res = await fetch(`${BASE_URL}/workflows/list`);
    if (!res.ok) return [];
    return res.json();
  },

  // Admin
  async getAdminMetrics() {
    const res = await fetch(`${BASE_URL}/admin/metrics`);
    if (!res.ok) throw new Error('Failed to fetch admin metrics');
    return res.json();
  },

  async getAdminQueries() {
    const res = await fetch(`${BASE_URL}/admin/recent-queries`);
    if (!res.ok) return [];
    return res.json();
  },

  async ingestDocument(doc: {
    title: string;
    issuing_authority: string;
    jurisdiction: string;
    legal_category: string;
    content: string;
    official_reference?: string;
    source_url?: string;
  }) {
    const res = await fetch(`${BASE_URL}/admin/ingest-document`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doc)
    });
    if (!res.ok) throw new Error('Failed to ingest document');
    return res.json();
  }
};
