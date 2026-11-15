import React, { useState, useEffect } from 'react';
import {
  Library,
  Search,
  ExternalLink,
  CheckCircle2,
  Filter,
  FileText,
  Building2,
  Calendar,
  BookOpen
} from 'lucide-react';
import { api } from '../services/api';
import { LibraryDocument } from '../types';

export const KnowledgeLibraryPage: React.FC = () => {
  const [documents, setDocuments] = useState<LibraryDocument[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCat, setSelectedCat] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadDocs();
    api.getLibraryCategories().then(setCategories).catch(() => {});
  }, [selectedCat]);

  const loadDocs = async () => {
    setIsLoading(true);
    try {
      const res = await api.getLibraryDocuments(selectedCat, undefined, searchQuery);
      setDocuments(res.documents);
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
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-lg bg-[#123C32] text-[#C6A45B]">
              <Library className="w-5 h-5" />
            </span>
            <div>
              <h1 className="font-serif text-xl font-bold text-[#123C32]">
                Document & Legal Research Library
              </h1>
              <p className="text-xs text-gray-500">
                Official repository of verified statutes, gazette notifications, and examination guidelines
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E5EDE5] shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && loadDocs()}
              placeholder="Search by statute name, section number, or keyword (e.g. Section 3(p), Rule 158-B, MoCRA)..."
              className="w-full bg-[#F7F5EF] border border-[#E5EDE5] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#202923] focus:outline-none focus:border-[#197B5A]"
            />
          </div>

          <button
            onClick={loadDocs}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#123C32] hover:bg-[#0D2B24] text-white rounded-xl text-xs font-semibold transition shrink-0"
          >
            {isLoading ? 'Filtering...' : 'Search Library'}
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pt-1 text-xs">
          <button
            onClick={() => setSelectedCat('')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition shrink-0 ${
              selectedCat === ''
                ? 'bg-[#123C32] text-white'
                : 'bg-[#F7F5EF] text-gray-600 hover:bg-[#E5EDE5]'
            }`}
          >
            All Statutes ({documents.length})
          </button>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCat(cat.name.split(' ')[0])}
              className={`px-3 py-1 rounded-full text-xs font-medium transition shrink-0 ${
                selectedCat === cat.name.split(' ')[0]
                  ? 'bg-[#123C32] text-white'
                  : 'bg-[#F7F5EF] text-gray-600 hover:bg-[#E5EDE5]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between text-xs text-gray-500 px-1">
          <span>Displaying {documents.length} verified statutory documents</span>
          <span className="flex items-center space-x-1 text-emerald-700 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>All Sources Gazette-Verified</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl p-5 border border-[#E5EDE5] hover:border-[#197B5A] shadow-xs space-y-3 flex flex-col justify-between transition"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif font-bold text-sm text-[#123C32] leading-snug">
                    {doc.document_title}
                  </h3>
                  {doc.section_number && (
                    <span className="bg-[#197B5A]/10 text-[#197B5A] text-[10px] font-bold px-2 py-0.5 rounded shrink-0 border border-[#197B5A]/20">
                      {doc.section_number}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Building2 className="w-3 h-3 text-gray-400" />
                    <span>{doc.issuing_authority}</span>
                  </span>
                  <span>•</span>
                  <span>{doc.jurisdiction}</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-medium">{doc.legal_category}</span>
                </div>

                <p className="text-xs text-gray-700 leading-relaxed bg-[#F7F5EF] p-3 rounded-xl border border-[#E5EDE5] italic">
                  "{doc.snippet}"
                </p>
              </div>

              <div className="pt-2 border-t border-[#E5EDE5] flex items-center justify-between text-xs">
                <span className="text-[10px] text-gray-400">
                  Status: <span className="text-emerald-600 font-bold">{doc.status}</span>
                </span>

                {doc.source_url && (
                  <a
                    href={doc.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#197B5A] hover:text-[#123C32] font-semibold flex items-center space-x-1 hover:underline text-[11px]"
                  >
                    <span>Official Gazette / URL</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
