import React, { useState } from 'react';
import {
  Globe2,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Building2,
  ArrowRight
} from 'lucide-react';
import { api } from '../services/api';
import { ComplianceRoadmapResponse } from '../types';

export const GlobalCompliancePage: React.FC = () => {
  const [destCountry, setDestCountry] = useState('USA');
  const [category, setCategory] = useState('herbal_supplement');
  const [ingredients, setIngredients] = useState('Ashwagandha root extract, Brahmi, Tulsi');
  const [intendedUse, setIntendedUse] = useState('Oral dietary supplement for stress and cognitive vitality');
  const [claims, setClaims] = useState('Supports cognitive wellness, helps adapt to daily mental fatigue');
  const [roadmap, setRoadmap] = useState<ComplianceRoadmapResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const countries = [
    { id: 'USA', name: 'United States', flag: '🇺🇸', auth: 'US FDA (CFSAN & MoCRA)' },
    { id: 'European Union', name: 'European Union', flag: '🇪🇺', auth: 'EMA & National Authorities' },
    { id: 'United Kingdom', name: 'United Kingdom', flag: '🇬🇧', auth: 'UK MHRA & FSA' },
    { id: 'Australia', name: 'Australia', flag: '🇦🇺', auth: 'TGA Complementary Medicines' },
    { id: 'Canada', name: 'Canada', flag: '🇨🇦', auth: 'Health Canada (NNHPD)' },
    { id: 'India', name: 'India (Domestic)', flag: '🇮🇳', auth: 'Ministry of AYUSH & FSSAI' }
  ];

  const handleGenerateRoadmap = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const resp = await api.getComplianceRoadmap({
        destination_country: destCountry,
        product_category: category,
        origin_country: 'India',
        ingredients: ingredients.split(',').map((s) => s.trim()),
        intended_use: intendedUse,
        product_claims: claims
      });
      setRoadmap(resp);
    } catch (err) {
      alert('Error generating compliance roadmap.');
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
              <Globe2 className="w-5 h-5" />
            </span>
            <div>
              <h1 className="font-serif text-xl font-bold text-[#123C32]">
                International Export Compliance Explorer
              </h1>
              <p className="text-xs text-gray-500">
                Destination-specific regulatory roadmaps for Ayurvedic formulations across key global markets
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Country & Formulation Form */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-[#E5EDE5] shadow-xs space-y-4">
          <h2 className="font-serif font-bold text-sm text-[#123C32] border-b border-[#E5EDE5] pb-2">
            Target Export Destination & Claims
          </h2>

          <form onSubmit={handleGenerateRoadmap} className="space-y-3.5 text-xs">
            {/* Country Radio / Cards */}
            <div>
              <label className="block font-medium text-gray-700 mb-1.5">Destination Country *</label>
              <div className="grid grid-cols-2 gap-2">
                {countries.map((c) => (
                  <button
                    type="button"
                    key={c.id}
                    onClick={() => setDestCountry(c.id)}
                    className={`p-2 rounded-xl text-left border transition text-xs flex items-center space-x-2 ${
                      destCountry === c.id
                        ? 'border-[#197B5A] bg-[#E5EDE5]/60 text-[#123C32] font-bold shadow-2xs'
                        : 'border-[#E5EDE5] bg-[#F7F5EF] text-gray-600 hover:bg-[#E5EDE5]'
                    }`}
                  >
                    <span className="text-lg">{c.flag}</span>
                    <span className="truncate">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Product Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#F7F5EF] border border-[#E5EDE5] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#197B5A]"
              >
                <option value="herbal_supplement">Oral Dietary Supplement / Herbal Tea</option>
                <option value="traditional_medicine">Traditional Medicinal Product</option>
                <option value="herbal_cosmetic">Herbal Cosmetic (Hair Oil / Serum / Face Cream)</option>
                <option value="topical_ayurvedic">Topical Ayurvedic Pain Oil / Ointment</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Ingredients (comma separated)</label>
              <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="w-full bg-[#F7F5EF] border border-[#E5EDE5] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#197B5A]"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Intended Use</label>
              <input
                type="text"
                value={intendedUse}
                onChange={(e) => setIntendedUse(e.target.value)}
                className="w-full bg-[#F7F5EF] border border-[#E5EDE5] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#197B5A]"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Intended Marketing Claims</label>
              <textarea
                rows={2}
                value={claims}
                onChange={(e) => setClaims(e.target.value)}
                className="w-full bg-[#F7F5EF] border border-[#E5EDE5] rounded-xl p-2 text-xs focus:outline-none focus:border-[#197B5A]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#123C32] hover:bg-[#0D2B24] text-white font-semibold py-2.5 rounded-xl shadow-xs transition flex items-center justify-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4 text-[#C6A45B]" />
              <span>{isLoading ? 'Generating Roadmap...' : 'Generate Export Compliance Roadmap'}</span>
            </button>
          </form>
        </div>

        {/* Results Roadmap */}
        <div className="lg:col-span-7 space-y-4">
          {roadmap ? (
            <div className="bg-white rounded-2xl p-5 border border-[#197B5A]/40 shadow-xs space-y-4 animate-in fade-in duration-200">
              {/* Destination Header Banner */}
              <div className="bg-gradient-to-r from-[#123C32] to-[#197B5A] text-white p-4 rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] bg-[#C6A45B] text-[#123C32] px-2 py-0.5 rounded font-bold uppercase">
                    Target Jurisdiction
                  </span>
                  <span className="text-xs text-emerald-200 font-semibold">
                    {roadmap.destination_country}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#F7F5EF]">
                  {roadmap.foreign_product_classification}
                </h3>
                <div className="text-xs text-emerald-100 flex items-center space-x-1">
                  <span>Regulatory Body:</span>
                  <span className="font-bold text-[#C6A45B]">{roadmap.regulatory_authority}</span>
                </div>
              </div>

              {/* Registration Path */}
              <div className="bg-[#F7F5EF] p-3.5 rounded-xl border border-[#E5EDE5] space-y-1 text-xs">
                <div className="font-bold text-[#123C32] text-[11px] uppercase">
                  Statutory Registration or Notification Pathway
                </div>
                <p className="text-gray-700 leading-relaxed text-[11px]">
                  {roadmap.registration_or_notification_path}
                </p>
              </div>

              {/* Labeling & Testing Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-[#E5EDE5]/40 p-3 rounded-xl border border-[#E5EDE5] space-y-1.5">
                  <div className="font-bold text-[#123C32] flex items-center space-x-1 text-[11px] uppercase">
                    <FileText className="w-3.5 h-3.5 text-[#197B5A]" />
                    <span>Labeling & Packaging Mandates</span>
                  </div>
                  <ul className="space-y-1 text-gray-700 text-[11px]">
                    {roadmap.labeling_and_packaging_rules.map((rule, idx) => (
                      <li key={idx}>• {rule}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#E5EDE5]/40 p-3 rounded-xl border border-[#E5EDE5] space-y-1.5">
                  <div className="font-bold text-[#123C32] flex items-center space-x-1 text-[11px] uppercase">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A45B]" />
                    <span>Mandatory Laboratory Testing</span>
                  </div>
                  <ul className="space-y-1 text-gray-700 text-[11px]">
                    {roadmap.mandatory_testing_and_limits.map((test, idx) => (
                      <li key={idx}>✓ {test}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Import Permit & Facilities */}
              <div className="bg-[#F7F5EF] p-3 rounded-xl border border-[#E5EDE5] space-y-1 text-xs">
                <div className="font-bold text-[#123C32] text-[11px] uppercase">
                  Import Clearance & Facility Authorization
                </div>
                <p className="text-gray-700 text-[11px] leading-relaxed">
                  {roadmap.import_permit_and_facility_registration}
                </p>
              </div>

              {/* Critical Risk Factors */}
              {roadmap.critical_risk_factors?.length > 0 && (
                <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200 text-xs space-y-1">
                  <div className="font-bold text-amber-900 flex items-center space-x-1 text-[11px]">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Critical Regulatory Border Risks</span>
                  </div>
                  <ul className="space-y-0.5 text-amber-800 text-[11px]">
                    {roadmap.critical_risk_factors.map((risk, idx) => (
                      <li key={idx}>⚠️ {risk}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Official Portals */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E5EDE5] text-xs">
                <div className="flex items-center space-x-2">
                  {roadmap.official_government_portals.map((portal, idx) => (
                    <a
                      key={idx}
                      href={portal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#197B5A] hover:underline flex items-center space-x-1 font-medium bg-[#E5EDE5]/50 px-2.5 py-1 rounded-lg"
                    >
                      <span>{portal.name}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-10 border border-[#E5EDE5] text-center space-y-3">
              <Globe2 className="w-12 h-12 text-[#197B5A]/40 mx-auto" />
              <h3 className="font-serif font-bold text-base text-[#123C32]">
                Select Export Destination
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                Choose United States, European Union, United Kingdom, Australia, or Canada to review jurisdiction-specific product classification and import mandates.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
