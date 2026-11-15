import React, { useState, useEffect } from 'react';
import {
  BookOpenCheck,
  Search,
  AlertTriangle,
  ExternalLink,
  ShieldAlert,
  Sparkles,
  BookMarked,
  Scale
} from 'lucide-react';
import { api } from '../services/api';
import { TKSearchMatch } from '../types';

export const TraditionalKnowledgePage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('botanical');
  const [matches, setMatches] = useState<TKSearchMatch[]>([]);
  const [featured, setFeatured] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [disclaimer, setDisclaimer] = useState('');

  useEffect(() => {
    // Initial fetch of classical plants
    handleSearch('');
    api.getFeaturedPlants().then(setFeatured).catch(() => {});
  }, []);

  const handleSearch = async (searchTerm: string) => {
    setIsLoading(true);
    try {
      const res = await api.searchTK(searchTerm, searchType);
      setMatches(res.matches);
      setDisclaimer(res.tkdl_access_disclaimer);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto p-3 sm:p-5 space-y-4 sm:space-y-5">
      {/* Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E5EDE5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <span className="p-2 rounded-lg bg-[#123C32] text-[#C6A45B]">
            <BookOpenCheck className="w-5 h-5" />
          </span>
          <div>
            <h1 className="font-serif text-xl font-bold text-[#123C32]">
              Traditional Knowledge & Prior Art Explorer
            </h1>
            <p className="text-xs text-gray-500">
              Verified Ayurvedic classical compendiums (Charaka, Sushruta, Bhavaprakasha) & Patent Prior Art
            </p>
          </div>
        </div>
      </div>

      {/* Mandatory TKDL Access Limitation Notice */}
      <div className="bg-[#F7F5EF] border-l-4 border-[#C6A45B] p-4 rounded-r-xl text-xs space-y-1.5 shadow-2xs">
        <div className="flex items-center space-x-1.5 font-bold text-[#123C32]">
          <ShieldAlert className="w-4 h-4 text-[#C6A45B] shrink-0" />
          <span>Statutory TKDL Access Notice & Search Scope</span>
        </div>
        <p className="text-[11px] text-gray-700 leading-relaxed">
          {disclaimer ||
            'The Traditional Knowledge Digital Library (TKDL) is a classified Government of India repository governed by bilateral non-disclosure agreements with international patent offices (USPTO, EPO, JPO). This public explorer references verified classical Sanskrit compendiums (Ayurvedic Pharmacopoeia of India, Charaka, Sushruta) and published landmark patent revocation dossiers (e.g. Turmeric, Neem). It does not claim direct unmediated access to restricted TKDL classified records without authorized institutional credentials.'}
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E5EDE5] shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
              placeholder="Search by botanical name (e.g. Withania somnifera), Sanskrit name, formulation, or symptom..."
              className="w-full bg-[#F7F5EF] border border-[#E5EDE5] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#202923] focus:outline-none focus:border-[#197B5A]"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="bg-[#F7F5EF] border border-[#E5EDE5] rounded-xl px-3 py-2.5 text-xs font-medium text-gray-700 focus:outline-none focus:border-[#197B5A]"
            >
              <option value="botanical">Botanical / Common Name</option>
              <option value="sanskrit">Sanskrit Name</option>
              <option value="classical_formulation">Classical Formulation</option>
              <option value="therapeutic_indication">Therapeutic Indication</option>
            </select>

            <button
              onClick={() => handleSearch(query)}
              className="px-4 py-2.5 bg-[#123C32] hover:bg-[#0D2B24] text-white rounded-xl text-xs font-semibold transition shrink-0"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {/* Quick Filter Botanical Tags */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pt-1 text-xs">
          <span className="text-[10px] text-gray-400 font-bold uppercase shrink-0">Quick Herbs:</span>
          {['Ashwagandha', 'Haridra (Turmeric)', 'Bhringraj', 'Guduchi (Giloy)', 'Triphala'].map((h, i) => (
            <button
              key={i}
              onClick={() => {
                setQuery(h.split(' ')[0]);
                handleSearch(h.split(' ')[0]);
              }}
              className="text-[11px] bg-[#F7F5EF] hover:bg-[#E5EDE5] text-[#123C32] px-2.5 py-0.5 rounded-full border border-[#E5EDE5] shrink-0 transition"
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-gray-500 px-1">
          <span>Found {matches.length} classical Ayurvedic botanical entries</span>
          <span>Patents Act Section 3(p) Analysis Active</span>
        </div>

        {matches.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-5 border border-[#E5EDE5] hover:border-[#197B5A] shadow-xs space-y-4 transition"
          >
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5EDE5] pb-3">
              <div>
                <h3 className="font-serif font-bold text-base text-[#123C32]">
                  {item.sanskrit_name}
                </h3>
                <div className="text-xs text-emerald-800 italic font-medium">
                  {item.botanical_name}
                </div>
              </div>
              <div className="text-[11px] bg-[#E5EDE5] text-[#123C32] px-2.5 py-1 rounded-lg font-semibold border border-[#197B5A]/20">
                {item.source_reference}
              </div>
            </div>

            {/* Classical Indications & Authoritative Texts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#F7F5EF] p-3 rounded-xl border border-[#E5EDE5] space-y-1.5">
                <div className="font-bold text-[#123C32] text-[11px] uppercase flex items-center space-x-1">
                  <BookMarked className="w-3.5 h-3.5 text-[#197B5A]" />
                  <span>Authoritative Classical Compendiums</span>
                </div>
                <ul className="space-y-0.5 text-gray-700 text-[11px]">
                  {item.authoritative_texts.map((t, idx) => (
                    <li key={idx}>• {t}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#F7F5EF] p-3 rounded-xl border border-[#E5EDE5] space-y-1.5">
                <div className="font-bold text-[#123C32] text-[11px] uppercase">
                  Traditional Therapeutic Indications
                </div>
                <ul className="space-y-0.5 text-gray-700 text-[11px]">
                  {item.traditional_indications.map((ind, idx) => (
                    <li key={idx}>✓ {ind}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section 3(p) Analysis */}
            <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200 text-xs space-y-1">
              <div className="font-bold text-amber-900 flex items-center space-x-1 text-[11px]">
                <Scale className="w-3.5 h-3.5 text-amber-700" />
                <span>Patents Act Section 3(p) Prior Art Risk Assessment</span>
              </div>
              <p className="text-amber-800 leading-relaxed text-[11px]">
                {item.section_3p_applicability}
              </p>
            </div>

            {/* Landmark Patent Challenges */}
            {item.relevant_patent_prior_art?.length > 0 && (
              <div className="bg-[#E5EDE5]/30 p-3 rounded-xl border border-[#E5EDE5] text-xs space-y-1.5">
                <span className="font-bold text-[#123C32] text-[11px] uppercase">
                  Landmark Patent Examination & Revocation Records:
                </span>
                {item.relevant_patent_prior_art.map((pat, idx) => (
                  <div key={idx} className="text-[11px] text-gray-700">
                    <span className="font-semibold text-[#123C32]">{pat.patent_title}</span> ({pat.jurisdiction}): {pat.outcome}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
