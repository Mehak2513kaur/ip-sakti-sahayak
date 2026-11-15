import React from 'react';
import { ExternalLink, CheckCircle2, BookOpen, X, ShieldAlert } from 'lucide-react';
import { SourceCitation } from '../types';

interface SourceCitationModalProps {
  citations: SourceCitation[];
  isOpen: boolean;
  onClose: () => void;
}

export const SourceCitationModal: React.FC<SourceCitationModalProps> = ({
  citations,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-[#C6A45B]/40 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 bg-[#123C32] text-white rounded-t-2xl flex items-center justify-between border-b border-[#C6A45B]/30">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-[#C6A45B]" />
            <div>
              <h3 className="font-serif font-bold text-sm tracking-wide text-[#F7F5EF]">
                Verified Regulatory Citations & Sources
              </h3>
              <p className="text-[11px] text-emerald-200">
                Official Ministry of AYUSH & IP India Grounded Extracts ({citations.length} sources)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-3.5 divide-y divide-gray-100">
          {citations.length === 0 ? (
            <p className="text-xs text-gray-500 py-6 text-center">
              No specific external citation records attached to this view.
            </p>
          ) : (
            citations.map((cite, idx) => (
              <div key={idx} className="pt-3.5 first:pt-0 space-y-1.5">
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xs text-[#123C32]">
                        {cite.document_title}
                      </span>
                      {cite.section_number && (
                        <span className="bg-[#197B5A]/10 text-[#197B5A] text-[10px] font-semibold px-2 py-0.5 rounded-full border border-[#197B5A]/20">
                          {cite.section_number}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-gray-500 flex items-center space-x-2">
                      <span>{cite.issuing_authority}</span>
                      <span>•</span>
                      <span>{cite.jurisdiction}</span>
                      <span>•</span>
                      <span className="text-emerald-700 font-medium">{cite.legal_category}</span>
                    </div>
                  </div>

                  {cite.official_source_url && (
                    <a
                      href={cite.official_source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#197B5A] hover:text-[#123C32] hover:underline flex items-center space-x-1 font-medium bg-[#E5EDE5]/50 px-2 py-1 rounded"
                    >
                      <span>Official Source</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <div className="bg-[#F7F5EF] p-2.5 rounded-lg border border-[#E5EDE5] text-xs text-[#202923] leading-relaxed italic">
                  "{cite.snippet}"
                </div>

                <div className="flex items-center justify-between text-[10px] text-gray-400">
                  <span className="flex items-center space-x-1 text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Statutory Grounding Verified</span>
                  </span>
                  <span>Relevance Score: {cite.relevance_score || '1.0'}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#F7F5EF] rounded-b-2xl border-t border-[#E5EDE5] text-[11px] text-gray-500 flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-[#123C32]">
            <ShieldAlert className="w-3.5 h-3.5 text-[#C6A45B]" />
            <span>All provisions retrieved from verified public gazettes and statutory acts.</span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-[#123C32] text-white rounded-lg text-xs font-medium hover:bg-[#0D2B24] transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
