import React, { useState } from 'react';
import {
  Leaf,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ShieldCheck,
  Scale,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { api } from '../services/api';
import { ABSAssessmentResponse } from '../types';
import { SourceCitationModal } from '../components/SourceCitationModal';

export const ABSAssistantPage: React.FC = () => {
  const [form, setForm] = useState({
    biological_resource_name: 'Ashwagandha Root (Withania somnifera)',
    botanical_name: 'Withania somnifera (L.) Dunal',
    geographical_source: 'cultivated farm in Madhya Pradesh',
    user_entity_type: 'Indian commercial entity',
    purpose_of_access: 'Commercial utilization (Manufacturing Ayurvedic formulation)',
    is_codified_traditional_knowledge: true,
    is_cultivated_resource: true
  });

  const [result, setResult] = useState<ABSAssessmentResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCitationsOpen, setIsCitationsOpen] = useState(false);

  const handleAssess = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const resp = await api.assessABS(form);
      setResult(resp);
    } catch (err) {
      alert('Error during ABS assessment.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto p-3 sm:p-5 space-y-4 sm:space-y-5">
      {/* Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E5EDE5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-lg bg-[#123C32] text-[#C6A45B]">
              <Leaf className="w-5 h-5" />
            </span>
            <div>
              <h1 className="font-serif text-xl font-bold text-[#123C32]">
                ABS Compliance Assistant (Biodiversity Act)
              </h1>
              <p className="text-xs text-gray-500">
                Access and Benefit Sharing guidance under the Biological Diversity Act, 2002 & 2023 Amendment Act
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Assessment Questionnaire Form */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-[#E5EDE5] shadow-xs space-y-4">
          <h2 className="font-serif font-bold text-sm text-[#123C32] border-b border-[#E5EDE5] pb-2">
            Biological Resource & Entity Questionnaire
          </h2>

          <form onSubmit={handleAssess} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Biological Resource / Plant Name *</label>
              <input
                type="text"
                required
                value={form.biological_resource_name}
                onChange={(e) => setForm({ ...form, biological_resource_name: e.target.value })}
                className="w-full bg-[#F7F5EF] border border-[#E5EDE5] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#197B5A]"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Botanical / Taxonomic Name</label>
              <input
                type="text"
                value={form.botanical_name}
                onChange={(e) => setForm({ ...form, botanical_name: e.target.value })}
                className="w-full bg-[#F7F5EF] border border-[#E5EDE5] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#197B5A]"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Entity Classification *</label>
              <select
                value={form.user_entity_type}
                onChange={(e) => setForm({ ...form, user_entity_type: e.target.value })}
                className="w-full bg-[#F7F5EF] border border-[#E5EDE5] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#197B5A]"
              >
                <option value="Indian commercial entity">Indian Company / Citizen (Section 7)</option>
                <option value="Registered AYUSH practitioner (Vaidya)">Registered AYUSH Practitioner / Vaidya (Exempt Proviso)</option>
                <option value="Foreign entity or Indian company with foreign shareholding">Foreign Entity / FDI Shareholding (Section 3(2))</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Sourcing Origin</label>
              <select
                value={form.geographical_source}
                onChange={(e) => {
                  const val = e.target.value;
                  setForm({
                    ...form,
                    geographical_source: val,
                    is_cultivated_resource: val.includes('cultivated')
                  });
                }}
                className="w-full bg-[#F7F5EF] border border-[#E5EDE5] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#197B5A]"
              >
                <option value="cultivated farm in India">Certified Cultivated Agricultural Farm (Certificate of Origin)</option>
                <option value="wild forest collection in India">Wild Forest Collection / Natural Habitat</option>
                <option value="commercial raw herb wholesale mandi">Commercial Raw Herb Wholesale Mandi (Trader purchase)</option>
                <option value="imported biological resource">Imported from outside India</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Purpose of Access</label>
              <select
                value={form.purpose_of_access}
                onChange={(e) => setForm({ ...form, purpose_of_access: e.target.value })}
                className="w-full bg-[#F7F5EF] border border-[#E5EDE5] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#197B5A]"
              >
                <option value="Commercial utilization (Manufacturing Ayurvedic formulation)">Commercial Utilization / Formulation Manufacturing</option>
                <option value="Applying for IPR / Patent in India or abroad">Applying for IPR / Patent (Section 6)</option>
                <option value="Bio-survey and bio-utilization research">Bio-survey and Preclinical Research</option>
                <option value="Traditional dispensing to individual patients">Traditional Clinical Dispensing to Patients</option>
              </select>
            </div>

            <div className="space-y-2 pt-1 border-t border-[#E5EDE5]">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_cultivated_resource}
                  onChange={(e) => setForm({ ...form, is_cultivated_resource: e.target.checked })}
                  className="rounded text-[#197B5A] focus:ring-0"
                />
                <span>Sourced from certified agricultural cultivation (exemption eligible)</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_codified_traditional_knowledge}
                  onChange={(e) => setForm({ ...form, is_codified_traditional_knowledge: e.target.checked })}
                  className="rounded text-[#197B5A] focus:ring-0"
                />
                <span>Utilizes codified traditional knowledge (classical Ayurvedic treatises)</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#123C32] hover:bg-[#0D2B24] text-white font-semibold py-2.5 rounded-xl shadow-xs transition flex items-center justify-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4 text-[#C6A45B]" />
              <span>{isLoading ? 'Evaluating...' : 'Assess ABS Mandate'}</span>
            </button>
          </form>
        </div>

        {/* Results Roadmap */}
        <div className="lg:col-span-7 space-y-4">
          {result ? (
            <div className="bg-white rounded-2xl p-5 border border-[#197B5A]/40 shadow-xs space-y-4 animate-in fade-in duration-200">
              {/* Verdict Banner */}
              <div className="bg-gradient-to-r from-[#123C32] to-[#197B5A] text-white p-4 rounded-xl space-y-1">
                <span className="text-[10px] bg-[#C6A45B] text-[#123C32] px-2 py-0.5 rounded font-bold uppercase">
                  ABS Regulatory Verdict
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#F7F5EF]">
                  {result.applicability_verdict}
                </h3>
                <div className="text-xs text-emerald-100 flex items-center space-x-2 pt-0.5">
                  <span>Competent Authority:</span>
                  <span className="font-bold text-[#C6A45B]">{result.relevant_authority}</span>
                </div>
              </div>

              {/* Governing Section & Exemptions */}
              <div className="space-y-2 text-xs">
                <div className="font-bold text-[#123C32] text-xs">Governing Statutory Section</div>
                <div className="bg-[#F7F5EF] p-2.5 rounded-lg border border-[#E5EDE5] text-gray-800 font-medium">
                  {result.governing_section}
                </div>

                {result.available_exemptions?.length > 0 && (
                  <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 space-y-1">
                    <div className="font-bold text-emerald-900 flex items-center space-x-1 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>2023 Amendment Act Statutory Exemptions Applicable:</span>
                    </div>
                    <ul className="space-y-0.5 text-emerald-800 text-[11px]">
                      {result.available_exemptions.map((ex, idx) => (
                        <li key={idx}>✓ {ex}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Forms & Benefit Sharing Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-[#E5EDE5]/40 p-3 rounded-xl border border-[#E5EDE5] space-y-1">
                  <div className="font-bold text-[#123C32] text-[11px] uppercase">
                    Applicable Statutory Forms
                  </div>
                  <ul className="space-y-0.5 text-gray-700 text-[11px]">
                    {result.applicable_forms.map((f, idx) => (
                      <li key={idx} className="font-semibold text-[#197B5A]">• {f}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#E5EDE5]/40 p-3 rounded-xl border border-[#E5EDE5] space-y-1">
                  <div className="font-bold text-[#123C32] text-[11px] uppercase">
                    Benefit Sharing Matrix
                  </div>
                  <p className="text-gray-700 text-[11px] leading-relaxed">
                    {result.benefit_sharing_consideration}
                  </p>
                </div>
              </div>

              {/* Documentation Checklist */}
              <div className="bg-[#F7F5EF] p-3 rounded-xl border border-[#E5EDE5] space-y-1 text-xs">
                <div className="font-bold text-[#123C32] text-[11px] uppercase">
                  Statutory Submission & Supply Chain Checklist
                </div>
                <ul className="space-y-0.5 text-gray-700 text-[11px]">
                  {result.documentation_checklist.map((item, idx) => (
                    <li key={idx}>✓ {item}</li>
                  ))}
                </ul>
              </div>

              {/* Cautionary Advisory */}
              <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200 text-xs space-y-1">
                <div className="font-bold text-amber-900 flex items-center space-x-1 text-[11px]">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Statutory Caution & Non-Compliance Warning</span>
                </div>
                <p className="text-amber-800 text-[11px] leading-relaxed">
                  {result.cautionary_advisory}
                </p>
              </div>

              {/* Citations CTA */}
              {result.statutory_citations?.length > 0 && (
                <div className="pt-2 border-t border-[#E5EDE5] flex justify-end">
                  <button
                    onClick={() => setIsCitationsOpen(true)}
                    className="text-xs text-[#197B5A] font-semibold hover:underline flex items-center space-x-1"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>View Grounded NBA Citations ({result.statutory_citations.length})</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-10 border border-[#E5EDE5] text-center space-y-3">
              <Leaf className="w-12 h-12 text-[#197B5A]/40 mx-auto" />
              <h3 className="font-serif font-bold text-base text-[#123C32]">
                Run Access & Benefit Sharing Assessment
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                Specify your entity structure and raw botanical sourcing details to check NBA Form III patent requirements, SBB intimation, and 2023 amendment exemptions.
              </p>
            </div>
          )}
        </div>
      </div>

      {result && (
        <SourceCitationModal
          citations={result.statutory_citations}
          isOpen={isCitationsOpen}
          onClose={() => setIsCitationsOpen(false)}
        />
      )}
    </div>
  );
};
