import React, { useState, useEffect } from 'react';
import {
  Building2,
  Database,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  ShieldCheck,
  Search,
  FileText
} from 'lucide-react';
import { api } from '../services/api';

export const AdminDashboardPage: React.FC = () => {
  const [metrics, setMetrics] = useState<any>(null);
  const [queries, setQueries] = useState<any[]>([]);
  const [newDoc, setNewDoc] = useState({
    title: '',
    issuing_authority: 'Ministry of AYUSH',
    jurisdiction: 'India',
    legal_category: 'Ayurvedic Drug Regulation',
    content: '',
    official_reference: '',
    source_url: ''
  });
  const [isIngesting, setIsIngesting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const m = await api.getAdminMetrics();
      setMetrics(m);
      const q = await api.getAdminQueries();
      setQueries(q);
    } catch (err) {
      console.error(err);
    }
  };

  const handleIngest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoc.title || !newDoc.content) return;

    setIsIngesting(true);
    setSuccessMessage('');
    try {
      const res = await api.ingestDocument(newDoc);
      setSuccessMessage(res.message);
      setNewDoc({
        title: '',
        issuing_authority: 'Ministry of AYUSH',
        jurisdiction: 'India',
        legal_category: 'Ayurvedic Drug Regulation',
        content: '',
        official_reference: '',
        source_url: ''
      });
      loadData();
    } catch (err) {
      alert('Error ingesting document.');
    } finally {
      setIsIngesting(false);
    }
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto p-3 sm:p-5 space-y-4 sm:space-y-5">
      {/* Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E5EDE5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-lg bg-[#123C32] text-[#C6A45B]">
              <Building2 className="w-5 h-5" />
            </span>
            <div>
              <h1 className="font-serif text-xl font-bold text-[#123C32]">
                Admin Knowledge & RAG Governance Dashboard
              </h1>
              <p className="text-xs text-gray-500">
                Corpus ingestion, vector index monitoring, and statutory retrieval freshness control
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full border border-emerald-200">
            Role: National AYUSH Administrator
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      {metrics && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-[#E5EDE5] shadow-xs space-y-1">
            <div className="text-[11px] font-bold text-gray-400 uppercase">Total Corpus Docs</div>
            <div className="text-2xl font-bold text-[#123C32]">{metrics.total_corpus_documents}</div>
            <div className="text-[10px] text-emerald-700 font-semibold">{metrics.indexed_chunks} semantic chunks</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#E5EDE5] shadow-xs space-y-1">
            <div className="text-[11px] font-bold text-gray-400 uppercase">Grounding Accuracy</div>
            <div className="text-2xl font-bold text-[#197B5A]">{metrics.grounding_accuracy_rate}</div>
            <div className="text-[10px] text-gray-500">Zero hallucinations</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#E5EDE5] shadow-xs space-y-1">
            <div className="text-[11px] font-bold text-gray-400 uppercase">Consultations Logged</div>
            <div className="text-2xl font-bold text-[#C6A45B]">{metrics.total_consultations_logged}</div>
            <div className="text-[10px] text-gray-500">SIH 2026 Test Traffic</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#E5EDE5] shadow-xs space-y-1">
            <div className="text-[11px] font-bold text-gray-400 uppercase">Avg Retrieval Latency</div>
            <div className="text-2xl font-bold text-[#123C32]">{metrics.average_rag_latency_ms} ms</div>
            <div className="text-[10px] text-emerald-700 font-semibold">Sub-second response</div>
          </div>
        </div>
      )}

      {/* Ingestion & Monitoring Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Document Ingestion Form */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-[#E5EDE5] shadow-xs space-y-4">
          <div className="border-b border-[#E5EDE5] pb-2 flex items-center justify-between">
            <h2 className="font-serif font-bold text-sm text-[#123C32]">
              Ingest Official Gazette / Statute
            </h2>
            <span className="text-[10px] bg-[#E5EDE5] text-[#123C32] px-2 py-0.5 rounded font-bold">
              Automatic Vector Indexing
            </span>
          </div>

          {successMessage && (
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleIngest} className="space-y-3 text-xs">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Document Title *</label>
              <input
                type="text"
                required
                value={newDoc.title}
                onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                placeholder="e.g. Gazette Notification No. G.S.R. 560(E) - ASU Safety Proofs"
                className="w-full bg-[#F7F5EF] border border-[#E5EDE5] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#197B5A]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Issuing Authority</label>
                <select
                  value={newDoc.issuing_authority}
                  onChange={(e) => setNewDoc({ ...newDoc, issuing_authority: e.target.value })}
                  className="w-full bg-[#F7F5EF] border border-[#E5EDE5] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#197B5A]"
                >
                  <option value="Ministry of AYUSH">Ministry of AYUSH</option>
                  <option value="Office of the CGPDTM (IP India)">IP India (Patents & Trademarks)</option>
                  <option value="National Biodiversity Authority (NBA)">National Biodiversity Authority</option>
                  <option value="FSSAI">FSSAI</option>
                  <option value="CDSCO">CDSCO</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Legal Category</label>
                <select
                  value={newDoc.legal_category}
                  onChange={(e) => setNewDoc({ ...newDoc, legal_category: e.target.value })}
                  className="w-full bg-[#F7F5EF] border border-[#E5EDE5] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#197B5A]"
                >
                  <option value="Patent Law & Section 3(p)">Patent Law & Section 3(p)</option>
                  <option value="Ayurvedic Drug Regulation">Ayurvedic Drug Regulation</option>
                  <option value="Biodiversity & ABS">Biodiversity & ABS</option>
                  <option value="Ayurveda Aahar">Ayurveda Aahar</option>
                  <option value="International Export">International Export</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Official Reference / Gazette No.</label>
              <input
                type="text"
                value={newDoc.official_reference}
                onChange={(e) => setNewDoc({ ...newDoc, official_reference: e.target.value })}
                placeholder="e.g. Act No. 10 of 2023, Section 7"
                className="w-full bg-[#F7F5EF] border border-[#E5EDE5] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#197B5A]"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Statutory Content / Gazette Text *</label>
              <textarea
                rows={4}
                required
                value={newDoc.content}
                onChange={(e) => setNewDoc({ ...newDoc, content: e.target.value })}
                placeholder="Paste authorized statutory extract, section text, or rule provisions..."
                className="w-full bg-[#F7F5EF] border border-[#E5EDE5] rounded-xl p-2 text-xs focus:outline-none focus:border-[#197B5A]"
              />
            </div>

            <button
              type="submit"
              disabled={isIngesting || !newDoc.title || !newDoc.content}
              className="w-full bg-[#123C32] hover:bg-[#0D2B24] disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl shadow-xs transition flex items-center justify-center space-x-1.5"
            >
              <Upload className="w-4 h-4 text-[#C6A45B]" />
              <span>{isIngesting ? 'Ingesting...' : 'Ingest & Re-Index Corpus'}</span>
            </button>
          </form>
        </div>

        {/* Live Query Logs & Grounding Verification */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-[#E5EDE5] shadow-xs space-y-4">
          <div className="border-b border-[#E5EDE5] pb-2 flex items-center justify-between">
            <h2 className="font-serif font-bold text-sm text-[#123C32]">
              Recent Retrieval & Grounding Audit Log
            </h2>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
              Audited Logs
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            {queries.map((q, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#F7F5EF] border border-[#E5EDE5] space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#123C32] truncate max-w-[280px]">
                    "{q.query}"
                  </span>
                  <span className="text-[10px] bg-[#E5EDE5] text-[#123C32] px-1.5 py-0.5 rounded uppercase font-bold">
                    {q.domain}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-500 pt-0.5">
                  <span className="flex items-center space-x-1 text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Citations Retrieved: {q.citations_retrieved}</span>
                  </span>
                  <span>{new Date(q.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Freshness Status Card */}
          <div className="bg-[#123C32] text-white p-4 rounded-xl space-y-2 text-xs">
            <div className="flex items-center space-x-2 font-bold text-sm text-[#C6A45B]">
              <ShieldCheck className="w-4 h-4" />
              <span>Statutory Freshness & Versioning Policy</span>
            </div>
            <p className="text-emerald-100/80 leading-relaxed text-[11px]">
              All statutes are tracked against the Gazette of India. Biological Diversity Act is pinned to the 2023 Amendment Act (Act No. 10 of 2023); FSSAI regulations are aligned with the 2022 Ayurveda Aahar Gazette.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
