# IP-SAKTI SAHAYAK (इंटेलेक्ट-शक्ति सहायक)
### AI-Powered Multilingual Intellectual Property & Regulatory Assistant for Ayurveda
**Ministry of AYUSH, Government of India • Smart India Hackathon (SIH) 2026**

---

## 1. Project Overview

**IP-SAKTI Sahayak** is an official-grade, multilingual legal technology and regulatory intelligence web platform designed for Ayurvedic entrepreneurs, researchers, manufacturers, practitioners (Vaidyas), startups, and legal professionals.

The platform provides **100% source-cited, grounded guidance** derived from authoritative Government of India gazettes, statutory acts, and international regulatory frameworks:
- **The Patents Act, 1970** (Section 3(p) Traditional Knowledge exclusion, Section 3(e) mere admixture & synergy requirements, Section 3(d), Section 10(4)(ii)(D) biological source disclosure).
- **Drugs and Cosmetics Act, 1940 & Rules 1945** (Section 3(a) Classical ASU Drugs, Section 3(h) Patent or Proprietary Medicines, Rule 158-B proof of safety/effectiveness, Form 24-D/25-D licensing, Phytopharmaceutical drugs under CDSCO).
- **The Biological Diversity Act, 2002 & Biological Diversity (Amendment) Act, 2023** (Section 3 foreign entity approval, Section 6 Form III mandatory patent clearance from NBA, Section 7 SBB prior intimation, and 2023 statutory exemptions for registered Vaidyas and certified cultivated medicinal plants).
- **Food Safety and Standards (Ayurveda Aahar) Regulations, 2022** (Schedule A recipes, green "AYURVEDA AAHAR" logo mandates, strict prohibition on synthetic vitamins/isolated chemicals, non-therapeutic claim boundaries).
- **Trade Marks Act, 1999 & Geographical Indications Act, 1999** (Nice Classes 3, 5, 30; Section 9 absolute grounds against generic Sanskrit herb names; registered Ayurvedic GIs like Navara Rice and Kashmir Saffron).
- **International Export Compliance** (US FDA DSHEA 1994 & MoCRA 2022, EU THMPD Directive 2004/24/EC & Novel Food, UK MHRA THR scheme, Australian TGA Listed Complementary Medicines ARTG AUST L, Health Canada NPN product licensing).

---

## 2. Technology Stack

### Frontend
- **Framework**: React 19 with Vite & TypeScript
- **Styling**: Tailwind CSS v4 with custom royal AYUSH heritage palette (Forest Green `#123C32`, Emerald `#197B5A`, Warm Ivory `#F7F5EF`, Gold Accent `#C6A45B`, Charcoal `#202923`, Muted Sage `#E5EDE5`)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Analytics**: Recharts

### Backend
- **Framework**: Python 3.10+ with FastAPI
- **Architecture**: Modular Service-Oriented Architecture (SOA) with RESTful APIs
- **Database**: SQLAlchemy ORM (SQLite default for zero-friction local run; PostgreSQL-ready)
- **PDF Generation**: ReportLab 5.0 (official printable Government of India format dossiers)
- **Document Processing**: PyPDF2 & text chunker with section metadata tracking

### AI & Retrieval-Augmented Generation (RAG)
- **Hybrid RAG Engine**: Semantic vector representation via TF-IDF / Cosine Similarity combined with BM25 keyword matching and domain weighting.
- **Configurable LLM**: Google Gemini API (`gemini-2.5-flash` or configurable) with fallback high-precision grounded statutory reasoning engine when no API key is set.
- **Multilingual Support**: Supports 10 Indian languages: English, Hindi (हिंदी), Punjabi (ਪੰਜਾਬੀ), Tamil (தமிழ்), Telugu (తెలుగు), Bengali (বাংলা), Marathi (मराठी), Gujarati (ગુજરાતી), Kannada (ಕನ್ನಡ), and Malayalam (മലയാളം).
- **Grounding & Verification**: Automatic relevance scoring and evidence-sufficiency verification. Explicit disclaimers when reliable evidence is unavailable.

---

## 3. Application Structure & Pages

1. **Landing Page**: Official portal hero, mission statement, trust metrics, 6 feature cards, how it works, and government source verification.
2. **Main Dashboard**: Personalized dashboard with metrics, quick consultation box, 6 quick-action cards, regulatory updates ticker, and demonstration workflow switcher.
3. **AI Sahayak (Main Chatbot)**: Interactive conversational assistant with streaming simulation, 10-language selector, PDF specification upload, suggested question chips, citation drawer, copy response, and PDF dossier download.
4. **Ayurvedic Product Classifier**: Multi-step interactive wizard classifying formulations into 6 statutory categories (Classical ASU Drug, Patent or Proprietary Medicine, Phytopharmaceutical, Ayurveda Aahar, Cosmetic, New Drug) with legal reasoning, licensing path, and document checklist.
5. **IP Protection Explorer**: Comprehensive exploration of 7 IP pillars (Patents, Trademarks, GI, Copyright, Industrial Designs, Plant Varieties, Trade Secrets) plus Smart IP Recommendation Engine.
6. **Traditional Knowledge Explorer**: Searchable botanical treatise database with Sanskrit/botanical names, classical formulations, patent revocation records (Turmeric, Neem), Section 3(p) analysis, and mandatory TKDL access limitation notice.
7. **Global Compliance Explorer**: Country-specific roadmaps for USA (MoCRA & DSHEA), European Union (THMPD & Novel Food), UK (MHRA), Australia (TGA), Canada (Health Canada), and India.
8. **ABS Compliance Assistant**: Guided assessment under the Biological Diversity Act, evaluating Section 3, Section 6 (Form III for patents), Section 7, and the 2023 Amendment Act exemptions.
9. **Document & Legal Research Library**: Searchable directory of verified statutes, gazette notifications, and examination guidelines with section-level citations and freshness badges.
10. **Generated Reports**: Downloadable official PDF dossiers generated via ReportLab with verifiable government citations.
11. **Admin Dashboard**: RAG governance, corpus metrics, query audit logs, statutory freshness tracking, and gazette document ingestion pipeline.

---

## 4. Quick Start & Execution Instructions

### Prerequisites
- Node.js v20+ and pnpm / npm
- Python 3.10+

### Setup & Run Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. (Optional) Configure environment variables in `.env`:
   ```bash
   cp .env.example .env
   # Add your GEMINI_API_KEY if desired; if omitted, the system runs in local grounded demo mode
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Launch the FastAPI server:
   ```bash
   python run.py
   ```
   The backend API will be live at `http://127.0.0.1:8000` (API Docs at `http://127.0.0.1:8000/docs`).

### Setup & Run Frontend

1. In a new terminal, navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Run the Vite development server:
   ```bash
   pnpm run dev
   ```
   Open `http://localhost:5173` in your web browser.

---

## 5. Demonstration Workflows (SIH 2026 Test Cases)

The application includes three pre-configured end-to-end demonstration workflows accessible directly from the Overview Dashboard:

### Workflow 1: Ayurvedic Herbal Hair Oil Launch
- **Persona**: Ayurvedic Entrepreneur / D2C Founder
- **Product**: Kesh-Tejas Ayurvedic Hair Oil (Bhringraj, Amla, Brahmi in Sesame Oil base)
- **Determination**: Patent or Proprietary Ayurvedic Medicine (Section 3(h), Form 25-D from AYUSH SLA).
- **IP Strategy**: Low composition patentability under Section 3(p) & 3(e); primary protection focused on Trademark in Class 3/5 and Design Registration for the bottle shape.
- **ABS Mandate**: Section 7 intimation to State Biodiversity Board; exempt if sourcing certified cultivated herbs under the 2023 Amendment Act.

### Workflow 2: Ashwagandha Supercritical Extraction Patent
- **Persona**: Ayurvedic Phytochemistry Researcher & Tech Transfer Officer
- **Invention**: WithaPure-SCFE (Supercritical CO2 extraction isolating withanolides at 98% purity without chemical solvents).
- **Determination**: Phytopharmaceutical Drug (CDSCO Chapter V / Rule 22).
- **IP Strategy**: High process patentability under Section 2(1)(j). Successfully overcomes Section 3(p) traditional knowledge exclusion.
- **Mandatory Biodiversity Action**: Section 6 Form III application must be submitted to the National Biodiversity Authority (NBA) before the grant of the patent.

### Workflow 3: Herbal Cosmetic Export to the United States
- **Persona**: Indian Herbal Cosmetics Exporter
- **Product**: Mandukaparni (Gotu Kola) & Haridra (Turmeric) Radiance Serum
- **US Regulatory Classification**: Cosmetic Product under FDA MoCRA 2022.
- **Compliance Roadmap**: Mandatory FDA Cosmetic Facility Registration via Cosmetics Direct, Cosmetic Product Listing, US Agent appointment, safety substantiation dossier, and heavy metal testing (Lead < 10 ppm, Arsenic < 3 ppm, Mercury < 1 ppm). Strict prohibition on cellular age-reversal disease claims.

---

## 6. Legal & Ethical Safeguards

- **No Hallucinated Citations**: The RAG retrieval pipeline exclusively cites verified acts, sections, and gazette notifications present in the knowledge corpus.
- **Non-Advisory Notice**: The platform prominently displays statutory notices clarifying that generated intelligence serves preliminary technical orientation and does not constitute a formal advocate-client relationship or guarantee of patent grant or regulatory licensing.
- **TKDL Confidentiality Safeguard**: The system explicitly disclaims unmediated access to classified, non-disclosure TKDL records and references only publicly available classical compendiums and published patent revocation case studies.
