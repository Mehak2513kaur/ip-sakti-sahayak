import React from 'react';
import {
  ShieldCheck,
  Sparkles,
  BookOpenCheck,
  Boxes,
  Globe2,
  Leaf,
  Scale,
  Award,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  SearchCheck
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (view: string) => void;
  onLanguageChange: (lang: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#202923] flex flex-col justify-between">
      {/* Hero Section - Optimized for Laptop Dimensions */}
      <section className="relative overflow-hidden py-8 sm:py-12 lg:py-14 border-b border-[#E5EDE5] bg-gradient-to-b from-[#E5EDE5]/40 to-[#F7F5EF]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 sm:space-y-5 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-[#123C32]/10 border border-[#197B5A]/30 text-[#123C32] px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#C6A45B] animate-pulse"></span>
            <span>Ministry of AYUSH • SIH 2026 Innovation Platform</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#123C32] tracking-tight max-w-4xl mx-auto leading-[1.2]">
            Protecting India's Ayurvedic Innovation with{' '}
            <span className="text-[#197B5A] italic">Intelligent Legal Guidance.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-base text-[#4B5A50] max-w-3xl mx-auto leading-relaxed">
            An AI-powered multilingual knowledge assistant for intellectual property, traditional knowledge protection, and regulatory compliance across India and global export markets.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('chat')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#123C32] hover:bg-[#0D2B24] text-[#F7F5EF] font-medium text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 border border-[#C6A45B]"
            >
              <Sparkles className="w-4 h-4 text-[#C6A45B]" />
              <span>Start AI Consultation</span>
              <ArrowRight className="w-4 h-4 text-[#C6A45B]" />
            </button>

            <button
              onClick={() => onNavigate('classifier')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-[#F2F7F2] text-[#123C32] font-semibold text-xs sm:text-sm border border-[#197B5A] shadow-xs transition-all flex items-center justify-center space-x-2"
            >
              <Boxes className="w-4 h-4 text-[#197B5A]" />
              <span>Classify Ayurvedic Product</span>
            </button>

            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-transparent hover:bg-[#E5EDE5] text-[#123C32] font-medium text-xs sm:text-sm transition flex items-center justify-center space-x-1.5"
            >
              <span>Explore Dashboard</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-4 sm:pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            <div className="bg-white p-2.5 sm:p-3 rounded-lg border border-[#E5EDE5] shadow-2xs">
              <div className="text-lg sm:text-xl font-bold text-[#123C32]">100%</div>
              <div className="text-[11px] sm:text-xs text-[#4B5A50]">Statutory Grounded RAG</div>
            </div>
            <div className="bg-white p-2.5 sm:p-3 rounded-lg border border-[#E5EDE5] shadow-2xs">
              <div className="text-lg sm:text-xl font-bold text-[#197B5A]">10</div>
              <div className="text-[11px] sm:text-xs text-[#4B5A50]">Indian Languages</div>
            </div>
            <div className="bg-white p-2.5 sm:p-3 rounded-lg border border-[#E5EDE5] shadow-2xs">
              <div className="text-lg sm:text-xl font-bold text-[#C6A45B]">6</div>
              <div className="text-[11px] sm:text-xs text-[#4B5A50]">Global Jurisdictions</div>
            </div>
            <div className="bg-white p-2.5 sm:p-3 rounded-lg border border-[#E5EDE5] shadow-2xs">
              <div className="text-lg sm:text-xl font-bold text-[#123C32]">2026</div>
              <div className="text-[11px] sm:text-xs text-[#4B5A50]">Biological Diversity Compliant</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Capabilities Grid */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-1.5">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#123C32]">
            Comprehensive Legal & Regulatory Intelligence Suite
          </h2>
          <p className="text-xs sm:text-sm text-[#4B5A50] max-w-2xl mx-auto">
            Engineered specifically to solve the intersectional challenges of Ayurvedic IPR, traditional medicine licensing, and international market access.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div 
            onClick={() => onNavigate('classifier')}
            className="bg-white p-6 rounded-2xl border border-[#E5EDE5] hover:border-[#197B5A] shadow-xs hover:shadow-md transition cursor-pointer space-y-3 group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#E5EDE5] flex items-center justify-center text-[#197B5A] group-hover:bg-[#123C32] group-hover:text-[#C6A45B] transition">
              <Boxes className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#123C32]">Ayurvedic Product Classifier</h3>
            <p className="text-xs text-[#4B5A50] leading-relaxed">
              Multi-step regulatory determination across Classical ASU, Patent & Proprietary (3h), Ayurveda Aahar (FSSAI), Phytopharmaceutical, or Cosmetic.
            </p>
            <div className="text-xs font-semibold text-[#197B5A] flex items-center space-x-1 pt-1">
              <span>Run Classifier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2 */}
          <div 
            onClick={() => onNavigate('ip_explorer')}
            className="bg-white p-6 rounded-2xl border border-[#E5EDE5] hover:border-[#197B5A] shadow-xs hover:shadow-md transition cursor-pointer space-y-3 group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#E5EDE5] flex items-center justify-center text-[#197B5A] group-hover:bg-[#123C32] group-hover:text-[#C6A45B] transition">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#123C32]">IP Protection & Section 3(p)</h3>
            <p className="text-xs text-[#4B5A50] leading-relaxed">
              Navigate patentability exclusions under Section 3(p) traditional knowledge, Section 3(e) mere admixture synergy proofs, trademarks, and industrial design.
            </p>
            <div className="text-xs font-semibold text-[#197B5A] flex items-center space-x-1 pt-1">
              <span>Explore IP Strategies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3 */}
          <div 
            onClick={() => onNavigate('abs_assistant')}
            className="bg-white p-6 rounded-2xl border border-[#E5EDE5] hover:border-[#197B5A] shadow-xs hover:shadow-md transition cursor-pointer space-y-3 group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#E5EDE5] flex items-center justify-center text-[#197B5A] group-hover:bg-[#123C32] group-hover:text-[#C6A45B] transition">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#123C32]">ABS Compliance Assistant</h3>
            <p className="text-xs text-[#4B5A50] leading-relaxed">
              Biological Diversity Act 2002 & 2023 Amendment assessment: NBA Form III for patents, SBB prior intimation, and Vaidya / cultivated plant exemptions.
            </p>
            <div className="text-xs font-semibold text-[#197B5A] flex items-center space-x-1 pt-1">
              <span>Assess ABS Mandate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4 */}
          <div 
            onClick={() => onNavigate('traditional_knowledge')}
            className="bg-white p-6 rounded-2xl border border-[#E5EDE5] hover:border-[#197B5A] shadow-xs hover:shadow-md transition cursor-pointer space-y-3 group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#E5EDE5] flex items-center justify-center text-[#197B5A] group-hover:bg-[#123C32] group-hover:text-[#C6A45B] transition">
              <BookOpenCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#123C32]">Traditional Knowledge & Prior Art</h3>
            <p className="text-xs text-[#4B5A50] leading-relaxed">
              Search botanical treatises (Charaka, Sushruta, Bhavaprakasha), analyze historic patent revocations, and review TKDL prior art limitations.
            </p>
            <div className="text-xs font-semibold text-[#197B5A] flex items-center space-x-1 pt-1">
              <span>Search Botanical Prior Art</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 5 */}
          <div 
            onClick={() => onNavigate('compliance')}
            className="bg-white p-6 rounded-2xl border border-[#E5EDE5] hover:border-[#197B5A] shadow-xs hover:shadow-md transition cursor-pointer space-y-3 group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#E5EDE5] flex items-center justify-center text-[#197B5A] group-hover:bg-[#123C32] group-hover:text-[#C6A45B] transition">
              <Globe2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#123C32]">International Export Roadmaps</h3>
            <p className="text-xs text-[#4B5A50] leading-relaxed">
              Destination compliance for US FDA DSHEA & MoCRA 2022, EU Traditional Herbal Medicinal Products (THMPD), UK MHRA, Australia TGA, and Health Canada.
            </p>
            <div className="text-xs font-semibold text-[#197B5A] flex items-center space-x-1 pt-1">
              <span>View Global Frameworks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 6 */}
          <div 
            onClick={() => onNavigate('reports')}
            className="bg-white p-6 rounded-2xl border border-[#E5EDE5] hover:border-[#197B5A] shadow-xs hover:shadow-md transition cursor-pointer space-y-3 group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#E5EDE5] flex items-center justify-center text-[#197B5A] group-hover:bg-[#123C32] group-hover:text-[#C6A45B] transition">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#123C32]">Dossiers & PDF Reports</h3>
            <p className="text-xs text-[#4B5A50] leading-relaxed">
              Instant generation of verifiable regulatory dossiers, patentability briefs, and export roadmaps with official citations.
            </p>
            <div className="text-xs font-semibold text-[#197B5A] flex items-center space-x-1 pt-1">
              <span>Browse Generated Reports</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* How it Works / Grounding Pipeline */}
      <section className="py-14 bg-[#123C32] text-[#F7F5EF]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs text-[#C6A45B] uppercase tracking-wider font-semibold">Grounded RAG Pipeline</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">How IP-SAKTI Sahayak Works</h2>
            <p className="text-xs sm:text-sm text-emerald-200/80 max-w-xl mx-auto">
              Zero hallucinations. Every generated legal provision cites verified government gazettes and official statutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#C6A45B] text-[#123C32] font-bold text-sm flex items-center justify-center mx-auto">1</div>
              <h4 className="font-bold text-sm">Multilingual Query</h4>
              <p className="text-xs text-gray-300">Enter query or upload product specification in any of 10 Indian languages.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#C6A45B] text-[#123C32] font-bold text-sm flex items-center justify-center mx-auto">2</div>
              <h4 className="font-bold text-sm">Hybrid Retrieval</h4>
              <p className="text-xs text-gray-300">Dense semantic + BM25 keyword matching across Ministry of AYUSH, IPO, and NBA statutes.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#C6A45B] text-[#123C32] font-bold text-sm flex items-center justify-center mx-auto">3</div>
              <h4 className="font-bold text-sm">Statutory Grounding</h4>
              <p className="text-xs text-gray-300">Passages reranked and cross-checked. If evidence is insufficient, explicit limitations are stated.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#C6A45B] text-[#123C32] font-bold text-sm flex items-center justify-center mx-auto">4</div>
              <h4 className="font-bold text-sm">Citations & Report</h4>
              <p className="text-xs text-gray-300">Direct response with clickable official links, licensing forms, and exportable PDF dossier.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D2B24] text-[#E5EDE5] py-8 border-t border-[#123C32]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-xs space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <span className="font-serif font-bold text-sm text-[#F7F5EF]">IP-SAKTI SAHAYAK</span>
            <span>•</span>
            <span className="text-[#C6A45B]">Smart India Hackathon 2026</span>
          </div>
          <div className="text-gray-400 text-center sm:text-right">
            Designed for the Ministry of AYUSH, Government of India.
            <div className="text-[10px] text-gray-500 mt-0.5">
              Patents Act 1970 • Drugs & Cosmetics Act 1940 • Biological Diversity Act 2023
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
