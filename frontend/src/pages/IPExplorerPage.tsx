import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  Sparkles,
  ExternalLink,
  ArrowRight,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Building2
} from 'lucide-react';
import { api } from '../services/api';
import { IPRecommendationResponse } from '../types';

export const IPExplorerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'explorer' | 'recommendation'>('explorer');
  const [selectedIPType, setSelectedIPType] = useState('patents');

  // Recommendation tool form state
  const [recForm, setRecForm] = useState({
    product_or_invention_name: 'WithaPure-SCFE Standardized Ashwagandha Extract',
    description: 'Supercritical fluid CO2 extraction isolating withanolides at 98% purity without chemical solvents.',
    is_novel_composition: true,
    has_classical_prior_art: true,
    process_novelty: 'Novel supercritical CO2 temperature-pressure gradient extraction',
    brand_name: 'WithaPure',
    unique_packaging_design: true
  });

  const [recResult, setRecResult] = useState<IPRecommendationResponse | null>(null);
  const [isLoadingRec, setIsLoadingRec] = useState(false);

  const ipDetails: Record<string, any> = {
    patents: {
      title: 'Patents (The Patents Act, 1970)',
      protects: 'Inventions that are novel, non-obvious, and industrially applicable.',
      eligibility: 'Novel technological extraction processes, synergistic herbal combinations with empirical comparative data. Classical formulations and mere admixtures are barred under Section 3(p) & 3(e).',
      process: [
        '1. Prior-art search across Indian Patent Office databases and TKDL.',
        '2. Execute NBA Form III application for prior approval under Section 6 of Biological Diversity Act.',
        '3. File Provisional Specification (Form 2) to establish priority.',
        '4. Submit Complete Specification with biological origin disclosure within 12 months.',
        '5. File Request for Examination (Form 18).'
      ],
      required_docs: ['Form 1 (Application)', 'Form 2 (Complete Specification & Claims)', 'Form 3 (Foreign filing statement)', 'Form 5 (Declaration of inventorship)', 'NBA Form III Approval'],
      indian_laws: 'The Patents Act, 1970 (Section 2(1)(j), Section 3(p), Section 3(e), Section 10(4)(ii)(D))',
      international_options: 'PCT (Patent Cooperation Treaty) 30/31-month national phase in 157+ member countries.',
      portal: 'https://ipindia.gov.in'
    },
    trademarks: {
      title: 'Trademarks (Trade Marks Act, 1999)',
      protects: 'Brand names, logos, distinctive composite labels, trade dress, and slogans identifying the commercial origin.',
      eligibility: 'Arbitrary, fanciful, or suggestive names. Generic Sanskrit/botanical terms (e.g. Ashwagandha, Triphala) cannot be registered as word marks under Section 9 absolute grounds.',
      process: [
        '1. Conduct comprehensive search on IP India public trademark portal in Classes 3, 5, 30, 35.',
        '2. File Application (Form TM-A) online via e-filing gateway.',
        '3. Respond to Examination Report within 30 days if Section 9/11 objections are raised.',
        '4. Publication in Trade Marks Journal for 4-month public opposition period.',
        '5. Certificate of Registration issued (valid 10 years, renewable).'
      ],
      required_docs: ['Form TM-A', 'Logo / Label specimen representation', 'User affidavit with documentary evidence of use if prior use claimed', 'Power of Attorney (Form TM-48)'],
      indian_laws: 'Trade Marks Act, 1999 & Trade Marks Rules, 2017 (Nice Classification Class 3, 5, 30)',
      international_options: 'Madrid Protocol international registration system administered by WIPO.',
      portal: 'https://ipindia.gov.in/trade-marks.htm'
    },
    gi: {
      title: 'Geographical Indications (GI Act, 1999)',
      protects: 'Agricultural, natural, or manufactured goods originating in a specific geographic territory with recognized reputation or quality.',
      eligibility: 'Collective associations or producers in designated geographical areas. Examples: Navara Rice, Kashmir Saffron, Nilambur Teak, Kangra Tea.',
      process: [
        '1. Collective application by association of producers (Form GI-1).',
        '2. Consultative Expert Group review at GI Registry, Chennai.',
        '3. Publication in GI Journal.',
        '4. Grant of registration to Association.',
        '5. Individual farmers/manufacturers apply as Authorized Users (Form GI-3).'
      ],
      required_docs: ['Statement of case explaining historical geographical connection', 'Map of designated territory', 'Quality control inspection mechanism', 'Authorized user affidavits'],
      indian_laws: 'The Geographical Indications of Goods (Registration and Protection) Act, 1999',
      international_options: 'Bilateral trade agreements and Lisbon Agreement on Appellations of Origin.',
      portal: 'https://ipindia.gov.in/gi.htm'
    },
    industrial_designs: {
      title: 'Industrial Designs (The Designs Act, 2000)',
      protects: 'Novel aesthetic shape, configuration, pattern, ornament, or composition applied to an article in 2D or 3D form.',
      eligibility: 'Unique ergonomic bottles, herbal oil dispensers, custom glass jars, blister packs, and traditional cosmetic compacts.',
      process: ['1. Prior design search in Locarno Classification.', '2. File Form 1 with 4-side orthogonal representations.', '3. Examination and grant (valid 10 years + 5 years renewal).'],
      required_docs: ['Form 1', 'Representation sheets (Front, Rear, Perspective, Top, Bottom views)', 'Power of authority'],
      indian_laws: 'The Designs Act, 2000 & Design Rules, 2001',
      international_options: 'Hague System for the International Registration of Industrial Designs (WIPO).',
      portal: 'https://ipindia.gov.in/designs.htm'
    },
    plant_varieties: {
      title: 'Plant Variety Protection (PPV&FR Act, 2001)',
      protects: 'New, distinct, uniform, and stable (NDUS) plant varieties, essentially derived varieties, and farmer varieties of medicinal plants.',
      eligibility: 'Plant breeders, agricultural universities, and traditional farming communities domesticating distinct medicinal herb strains.',
      process: ['1. Submission of seed / propagule samples.', '2. DUS field trials over 2 crop seasons.', '3. Registration certificate issued by PPV&FR Authority.'],
      required_docs: ['Application Form', 'DUS test fee receipt', 'Affidavit of parent lineage and origin', 'Declaration of non-GMO status'],
      indian_laws: 'Protection of Plant Varieties and Farmers Rights Act, 2001',
      international_options: 'UPOV Convention principles.',
      portal: 'https://plantauthority.gov.in'
    },
    trade_secrets: {
      title: 'Trade Secrets & Confidential Know-How',
      protects: 'Secret processing temperatures, maceration curves, extraction ratios, and exclusive grower network contacts.',
      eligibility: 'Information that has commercial value because it is secret, and where reasonable steps have been taken to keep it secret.',
      process: ['Implement strict Non-Disclosure Agreements (NDAs)', 'Fragment manufacturing steps across vendors', 'Maintain access logs and physical/digital security.'],
      required_docs: ['Employment Non-Disclosure Agreements', 'Vendor Confidentiality Contracts', 'Standard Operating Procedure secrecy protocols'],
      indian_laws: 'Indian Contract Act, 1872 & Common Law of Breach of Confidence',
      international_options: 'TRIPS Agreement Article 39 (Protection of Undisclosed Information).'
    }
  };

  const handleRunRecommendation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingRec(true);
    try {
      const resp = await api.recommendIP(recForm);
      setRecResult(resp);
    } catch (err) {
      alert('Error running recommendation tool.');
    } finally {
      setIsLoadingRec(false);
    }
  };

  const activeIP = ipDetails[selectedIPType] || ipDetails.patents;

  return (
    <div className="w-full max-w-[1600px] mx-auto p-3 sm:p-5 space-y-4 sm:space-y-5">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E5EDE5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-lg bg-[#123C32] text-[#C6A45B]">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <h1 className="font-serif text-xl font-bold text-[#123C32]">
                IP Protection Explorer & Strategy Engine
              </h1>
              <p className="text-xs text-gray-500">
                Patents, Trademarks, GI, Industrial Designs, Plant Varieties, and Trade Secrets for Ayurveda
              </p>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-1 bg-[#F7F5EF] p-1 rounded-xl border border-[#E5EDE5] text-xs">
          <button
            onClick={() => setActiveTab('explorer')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'explorer'
                ? 'bg-[#123C32] text-white shadow-2xs font-semibold'
                : 'text-gray-600 hover:text-[#123C32]'
            }`}
          >
            Statutory Frameworks (7 IP Pillars)
          </button>
          <button
            onClick={() => setActiveTab('recommendation')}
            className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center space-x-1 ${
              activeTab === 'recommendation'
                ? 'bg-[#123C32] text-white shadow-2xs font-semibold'
                : 'text-gray-600 hover:text-[#123C32]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C6A45B]" />
            <span>Smart IP Recommendation Tool</span>
          </button>
        </div>
      </div>

      {activeTab === 'explorer' ? (
        /* Explorer Section */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* IP Selector Sidebar */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E5EDE5] space-y-1.5 shadow-xs">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-2 mb-2">
              Select IP Category
            </div>
            {Object.keys(ipDetails).map((key) => {
              const item = ipDetails[key];
              const isSelected = selectedIPType === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedIPType(key)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#123C32] text-[#F7F5EF] shadow-sm'
                      : 'text-gray-700 hover:bg-[#F2F7F2]'
                  }`}
                >
                  <span>{item.title.split('(')[0].trim()}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-[#C6A45B]' : 'text-gray-400'}`} />
                </button>
              );
            })}
          </div>

          {/* Detailed IP View */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-[#E5EDE5] shadow-xs space-y-5">
            <div className="border-b border-[#E5EDE5] pb-3 space-y-1">
              <span className="text-[10px] bg-[#E5EDE5] text-[#123C32] px-2 py-0.5 rounded font-bold uppercase">
                Indian Intellectual Property System
              </span>
              <h2 className="font-serif text-lg font-bold text-[#123C32]">
                {activeIP.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#F7F5EF] p-3.5 rounded-xl border border-[#E5EDE5] space-y-1">
                <div className="font-bold text-[#123C32] text-[11px] uppercase">What It Protects</div>
                <p className="text-gray-700 leading-relaxed text-[11px]">{activeIP.protects}</p>
              </div>

              <div className="bg-[#F7F5EF] p-3.5 rounded-xl border border-[#E5EDE5] space-y-1">
                <div className="font-bold text-[#197B5A] text-[11px] uppercase">Eligibility in Ayurveda</div>
                <p className="text-gray-700 leading-relaxed text-[11px]">{activeIP.eligibility}</p>
              </div>
            </div>

            {/* Application Process Steps */}
            <div className="space-y-2 text-xs">
              <div className="font-bold text-[#123C32] text-xs">Statutory Application & Prosecution Process</div>
              <div className="space-y-1.5">
                {activeIP.process.map((step: string, idx: number) => (
                  <div key={idx} className="p-2 rounded-lg bg-[#E5EDE5]/40 border border-[#E5EDE5] text-[11px] text-gray-800">
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* Docs & Legal Basis */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <div className="font-bold text-[#123C32] text-[11px] uppercase">Required Statutory Documents</div>
                <ul className="space-y-0.5 text-gray-700 text-[11px]">
                  {activeIP.required_docs?.map((doc: string, idx: number) => (
                    <li key={idx}>• {doc}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-[#123C32] text-[11px] uppercase">Governing Indian Laws & Treaties</div>
                <p className="text-gray-700 text-[11px] font-medium">{activeIP.indian_laws}</p>
                <p className="text-[10px] text-gray-500 pt-1">
                  <span className="font-bold text-gray-700">International:</span> {activeIP.international_options}
                </p>
              </div>
            </div>

            {/* Portal Link */}
            {activeIP.portal && (
              <div className="pt-2 border-t border-[#E5EDE5] flex justify-end">
                <a
                  href={activeIP.portal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-[#123C32] hover:bg-[#0D2B24] text-white px-3.5 py-1.5 rounded-lg font-medium transition flex items-center space-x-1.5"
                >
                  <span>Official Government Filing Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#C6A45B]" />
                </a>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Smart Recommendation Tool */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-[#E5EDE5] shadow-xs space-y-4">
            <h2 className="font-serif font-bold text-sm text-[#123C32] border-b border-[#E5EDE5] pb-2">
              Smart IP Assessment Input
            </h2>

            <form onSubmit={handleRunRecommendation} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Product / Invention Name *</label>
                <input
                  type="text"
                  required
                  value={recForm.product_or_invention_name}
                  onChange={(e) => setRecForm({ ...recForm, product_or_invention_name: e.target.value })}
                  className="w-full bg-[#F7F5EF] border border-[#E5EDE5] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#197B5A]"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Proposed Brand Name</label>
                <input
                  type="text"
                  value={recForm.brand_name}
                  onChange={(e) => setRecForm({ ...recForm, brand_name: e.target.value })}
                  className="w-full bg-[#F7F5EF] border border-[#E5EDE5] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#197B5A]"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Invention Description</label>
                <textarea
                  rows={2}
                  value={recForm.description}
                  onChange={(e) => setRecForm({ ...recForm, description: e.target.value })}
                  className="w-full bg-[#F7F5EF] border border-[#E5EDE5] rounded-xl p-2 text-xs focus:outline-none focus:border-[#197B5A]"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Process Novelty (if any)</label>
                <input
                  type="text"
                  value={recForm.process_novelty}
                  onChange={(e) => setRecForm({ ...recForm, process_novelty: e.target.value })}
                  placeholder="e.g. Novel supercritical CO2 extraction, nano-liposomal carrier"
                  className="w-full bg-[#F7F5EF] border border-[#E5EDE5] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#197B5A]"
                />
              </div>

              <div className="space-y-2 pt-1 border-t border-[#E5EDE5]">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={recForm.has_classical_prior_art}
                    onChange={(e) => setRecForm({ ...recForm, has_classical_prior_art: e.target.checked })}
                    className="rounded text-[#197B5A] focus:ring-0"
                  />
                  <span>Ingredients are mentioned in classical treatises (Charaka / Sushruta)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={recForm.is_novel_composition}
                    onChange={(e) => setRecForm({ ...recForm, is_novel_composition: e.target.checked })}
                    className="rounded text-[#197B5A] focus:ring-0"
                  />
                  <span>Novel combination or specific non-obvious ratio</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={recForm.unique_packaging_design}
                    onChange={(e) => setRecForm({ ...recForm, unique_packaging_design: e.target.checked })}
                    className="rounded text-[#197B5A] focus:ring-0"
                  />
                  <span>Novel bottle, applicator, or packaging shape (Design Protection)</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoadingRec}
                className="w-full bg-[#123C32] hover:bg-[#0D2B24] text-white font-semibold py-2.5 rounded-xl shadow-xs transition flex items-center justify-center space-x-1.5"
              >
                <Sparkles className="w-4 h-4 text-[#C6A45B]" />
                <span>{isLoadingRec ? 'Evaluating IP...' : 'Generate IP Roadmap'}</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {recResult ? (
              <div className="bg-white rounded-2xl p-5 border border-[#197B5A]/40 shadow-xs space-y-4 animate-in fade-in duration-200">
                {/* Patentability vs Brand Strategy */}
                <div className="bg-[#123C32] text-white p-4 rounded-xl space-y-1">
                  <span className="text-[10px] bg-[#C6A45B] text-[#123C32] px-2 py-0.5 rounded font-bold uppercase">
                    Patentability Feasibility
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#F7F5EF]">
                    {recResult.patent_assessment.feasibility}
                  </h3>
                  <p className="text-xs text-emerald-100/90 leading-relaxed pt-1">
                    {recResult.patent_assessment.strategy}
                  </p>
                </div>

                {/* Section 3(p) & 3(e) Analysis */}
                <div className="bg-[#F7F5EF] p-3.5 rounded-xl border border-[#E5EDE5] space-y-2 text-xs">
                  <div className="font-bold text-[#123C32] text-[11px] uppercase">
                    Statutory Analysis: Section 3(p) & Section 3(e)
                  </div>
                  <p className="text-gray-700 leading-relaxed text-[11px]">
                    {recResult.section_3p_tk_analysis}
                  </p>
                  <p className="text-gray-700 leading-relaxed text-[11px] border-t border-[#E5EDE5] pt-1.5">
                    {recResult.section_3e_synergy_analysis}
                  </p>
                </div>

                {/* Trademark Strategy */}
                <div className="bg-[#E5EDE5]/40 p-3.5 rounded-xl border border-[#E5EDE5] space-y-1.5 text-xs">
                  <div className="font-bold text-[#123C32] text-[11px] uppercase">
                    Trademark Strategy (Class 3 & Class 5)
                  </div>
                  <p className="text-gray-700 leading-relaxed text-[11px]">
                    {recResult.trademark_recommendation.strategy}
                  </p>
                  <div className="text-[10px] text-gray-500 font-semibold">
                    Recommended Classes: {recResult.trademark_recommendation.recommended_classes.join(', ')}
                  </div>
                </div>

                {/* Filing Sequence Roadmap */}
                <div className="space-y-1.5 text-xs">
                  <div className="font-bold text-[#123C32] text-xs">Recommended Statutory Filing Sequence</div>
                  <div className="space-y-1">
                    {recResult.recommended_filing_sequence.map((step, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-[#F7F5EF] border border-[#E5EDE5] text-[11px] text-gray-800">
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-10 border border-[#E5EDE5] text-center space-y-3">
                <ShieldCheck className="w-12 h-12 text-[#197B5A]/40 mx-auto" />
                <h3 className="font-serif font-bold text-base text-[#123C32]">
                  Run the Smart IP Recommendation Tool
                </h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                  Enter your invention details on the left to obtain customized patentability feasibility, Section 3(p) analysis, trademark strategy, and priority sequence.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
