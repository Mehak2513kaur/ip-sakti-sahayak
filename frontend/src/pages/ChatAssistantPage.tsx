import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Upload,
  Sparkles,
  BookOpen,
  Copy,
  Check,
  Download,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  FileText,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Languages
} from 'lucide-react';
import { api } from '../services/api';
import { ChatResponse, SourceCitation } from '../types';
import { SourceCitationModal } from '../components/SourceCitationModal';

interface MessageItem {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  data?: ChatResponse;
  timestamp: string;
}

interface ChatAssistantPageProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
}

export const ChatAssistantPage: React.FC<ChatAssistantPageProps> = ({
  currentLanguage,
  onLanguageChange
}) => {
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      content:
        'Namaste! I am IP-SAKTI Sahayak, your official AI-powered regulatory and intellectual property assistant for Ayurveda. Ask any question regarding Ayurvedic patentability under Section 3(p) & 3(e), classical product classification, ABS compliance under the Biological Diversity Act, or international export requirements.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('Querying AYUSH knowledge base...');
  const [suggestedQuestions, setSuggestedQuestions] = useState<any[]>([]);
  const [selectedCitations, setSelectedCitations] = useState<SourceCitation[]>([]);
  const [isCitationModalOpen, setIsCitationModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<Record<string, 'up' | 'down'>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    api.getSuggestedQuestions().then(setSuggestedQuestions).catch(() => {});
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: MessageItem = {
      id: `user_${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    // Simulated multi-stage RAG loading indicator
    setLoadingStep('Searching verified Indian Patent Office & AYUSH corpus...');
    const stepTimer1 = setTimeout(() => {
      setLoadingStep('Evaluating Section 3(p) Traditional Knowledge & Section 3(e) synergy...');
    }, 400);
    const stepTimer2 = setTimeout(() => {
      setLoadingStep('Synthesizing grounded statutory response with citations...');
    }, 800);

    try {
      const resp = await api.queryChat(text, currentLanguage);
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);

      const assistantMsg: MessageItem = {
        id: `assist_${Date.now()}`,
        sender: 'assistant',
        content: resp.direct_answer,
        data: resp,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          sender: 'assistant',
          content: 'Unable to retrieve statutory information at this moment. Please check your query or backend connection.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const userMsg: MessageItem = {
      id: `user_${Date.now()}`,
      sender: 'user',
      content: `Uploaded Document: ${file.name} - Please analyze the IPR patentability and regulatory classification for this dossier.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setLoadingStep(`Extracting text from ${file.name} and indexing semantic vectors...`);

    try {
      const res = await api.uploadDocumentQuery(file);
      const analysis: ChatResponse = res.analysis;
      const assistantMsg: MessageItem = {
        id: `assist_${Date.now()}`,
        sender: 'assistant',
        content: analysis.direct_answer,
        data: analysis,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          sender: 'assistant',
          content: `Failed to process ${file.name}. Please ensure it is a valid PDF document.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleGenerateReportFromChat = async (msgData: ChatResponse) => {
    try {
      const rep = await api.generateReport('legal_summary', 'AI Sahayak Legal Research Summary', {
        summary: msgData.direct_answer,
        provisions: msgData.relevant_legal_provisions,
        simple_explanation: msgData.simple_explanation,
        applicability: msgData.applicability,
        documents: msgData.required_documents,
        next_steps: msgData.recommended_next_steps,
        citations: msgData.official_sources
      });
      window.open(rep.download_url_pdf, '_blank');
    } catch (err) {
      alert('Error generating report.');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4.5rem)] w-full max-w-[1500px] mx-auto p-2 sm:p-3.5 space-y-2">
      {/* Top Bar inside Chat */}
      <div className="bg-white p-2.5 sm:p-3 rounded-t-2xl border border-[#E5EDE5] flex items-center justify-between shadow-2xs shrink-0">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-[#123C32] text-[#C6A45B] flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-serif font-bold text-xs sm:text-sm text-[#123C32]">AI Sahayak</h2>
              <span className="text-[9px] sm:text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                100% Grounded
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-gray-500 hidden sm:block">
              Grounded in Ministry of AYUSH, IP India, CDSCO & NBA statutory documents
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setMessages([messages[0]])}
            className="text-xs text-gray-500 hover:text-[#123C32] px-2.5 py-1 rounded-lg border border-[#E5EDE5] hover:bg-[#F2F7F2] transition flex items-center space-x-1"
            title="Start New Consultation"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">New Session</span>
          </button>
        </div>
      </div>

      {/* Messages Scroll Area - Laptop Height Fitting */}
      <div className="flex-1 min-h-0 bg-[#F7F5EF] p-3 sm:p-4 overflow-y-auto space-y-3.5 border-x border-[#E5EDE5] rounded-lg">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-3xl rounded-2xl p-4 space-y-3 shadow-xs ${
                msg.sender === 'user'
                  ? 'bg-[#123C32] text-[#F7F5EF] rounded-br-xs'
                  : 'bg-white text-[#202923] border border-[#E5EDE5] rounded-bl-xs'
              }`}
            >
              {/* Header inside bubble */}
              <div className="flex items-center justify-between text-[11px] opacity-75 border-b border-current/10 pb-1.5">
                <span className="font-semibold">
                  {msg.sender === 'user' ? 'Applicant / Entrepreneur' : 'IP-SAKTI Sahayak'}
                </span>
                <span>{msg.timestamp}</span>
              </div>

              {/* Main Content */}
              <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                {msg.content}
              </div>

              {/* Structured Sections for Assistant Responses */}
              {msg.data && (
                <div className="space-y-3 pt-2 border-t border-gray-100 text-xs">
                  {/* Relevant Legal Provisions */}
                  {msg.data.relevant_legal_provisions?.length > 0 && (
                    <div className="bg-[#F7F5EF] p-2.5 rounded-xl border border-[#E5EDE5] space-y-1">
                      <div className="font-bold text-[#123C32] flex items-center space-x-1 text-[11px] uppercase tracking-wide">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#197B5A]" />
                        <span>Relevant Statutory Provisions</span>
                      </div>
                      <ul className="list-disc list-inside space-y-0.5 text-gray-700">
                        {msg.data.relevant_legal_provisions.map((prov, i) => (
                          <li key={i} className="font-medium text-[11px]">{prov}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Simple Explanation */}
                  {msg.data.simple_explanation && (
                    <div className="space-y-1">
                      <div className="font-bold text-[#123C32] text-[11px] uppercase tracking-wide">
                        Plain Language Explanation
                      </div>
                      <p className="text-gray-700 leading-relaxed text-[11px]">
                        {msg.data.simple_explanation}
                      </p>
                    </div>
                  )}

                  {/* Required Documents & Next Steps */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {msg.data.required_documents?.length > 0 && (
                      <div className="bg-[#E5EDE5]/50 p-2.5 rounded-lg border border-[#E5EDE5] space-y-1">
                        <div className="font-bold text-[#123C32] text-[10px] uppercase">
                          Required Documentation
                        </div>
                        <ul className="space-y-0.5 text-[10px] text-gray-700">
                          {msg.data.required_documents.slice(0, 4).map((d, i) => (
                            <li key={i}>• {d}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {msg.data.recommended_next_steps?.length > 0 && (
                      <div className="bg-[#E5EDE5]/50 p-2.5 rounded-lg border border-[#E5EDE5] space-y-1">
                        <div className="font-bold text-[#197B5A] text-[10px] uppercase">
                          Recommended Action Path
                        </div>
                        <ul className="space-y-0.5 text-[10px] text-gray-700">
                          {msg.data.recommended_next_steps.slice(0, 4).map((s, i) => (
                            <li key={i}>✓ {s}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Sources button & Report CTA */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      {msg.data.official_sources?.length > 0 && (
                        <button
                          onClick={() => {
                            setSelectedCitations(msg.data!.official_sources);
                            setIsCitationModalOpen(true);
                          }}
                          className="bg-[#123C32] hover:bg-[#0D2B24] text-white text-[11px] px-2.5 py-1 rounded-lg font-medium transition flex items-center space-x-1"
                        >
                          <BookOpen className="w-3 h-3 text-[#C6A45B]" />
                          <span>View Citations ({msg.data.official_sources.length})</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleGenerateReportFromChat(msg.data!)}
                        className="bg-[#C6A45B] hover:bg-[#B3934B] text-[#123C32] text-[11px] px-2.5 py-1 rounded-lg font-bold transition flex items-center space-x-1"
                      >
                        <Download className="w-3 h-3" />
                        <span>Export PDF Dossier</span>
                      </button>
                    </div>

                    <div className="flex items-center space-x-1.5 text-gray-400">
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="p-1 hover:text-[#123C32] transition"
                        title="Copy Response"
                      >
                        {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => setFeedbackState((prev) => ({ ...prev, [msg.id]: 'up' }))}
                        className={`p-1 transition ${feedbackState[msg.id] === 'up' ? 'text-emerald-700' : 'hover:text-[#123C32]'}`}
                        title="Accurate & Grounded"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setFeedbackState((prev) => ({ ...prev, [msg.id]: 'down' }))}
                        className={`p-1 transition ${feedbackState[msg.id] === 'down' ? 'text-rose-600' : 'hover:text-[#123C32]'}`}
                        title="Insufficient Evidence"
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Confidence & Limitations Notice */}
                  {msg.data.confidence_and_limitations && (
                    <div className="text-[10px] text-gray-500 italic bg-[#F7F5EF] p-2 rounded border border-[#E5EDE5]">
                      {msg.data.confidence_and_limitations}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-[#E5EDE5] rounded-2xl p-4 rounded-bl-xs space-y-2 shadow-xs">
              <div className="flex items-center space-x-2 text-xs font-semibold text-[#123C32]">
                <Sparkles className="w-4 h-4 text-[#C6A45B] animate-spin" />
                <span>{loadingStep}</span>
              </div>
              <div className="w-48 h-1 bg-[#E5EDE5] rounded-full overflow-hidden">
                <div className="h-full bg-[#197B5A] animate-pulse w-3/4"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Chips */}
      {messages.length < 3 && suggestedQuestions.length > 0 && (
        <div className="bg-white p-2.5 border-x border-[#E5EDE5] flex items-center space-x-2 overflow-x-auto">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider shrink-0">
            Suggested Queries:
          </span>
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q.query)}
              className="text-[11px] bg-[#F7F5EF] hover:bg-[#E5EDE5] text-[#123C32] px-3 py-1 rounded-full border border-[#E5EDE5] shrink-0 transition"
            >
              {q.query}
            </button>
          ))}
        </div>
      )}

      {/* Input Box & File Upload */}
      <div className="bg-white p-3 rounded-b-2xl border border-[#E5EDE5] shadow-xs">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputQuery);
          }}
          className="flex items-center space-x-2"
        >
          {/* File Upload Hidden Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf,.txt,.doc,.docx"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2.5 rounded-xl border border-[#E5EDE5] hover:bg-[#F2F7F2] text-gray-600 hover:text-[#123C32] transition"
            title="Upload PDF Specification for Grounded Analysis"
          >
            <Upload className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Type your legal or regulatory question in any of 10 Indian languages..."
            className="flex-1 bg-[#F7F5EF] border border-[#E5EDE5] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#202923] placeholder-gray-400 focus:outline-none focus:border-[#197B5A]"
          />

          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="bg-[#123C32] hover:bg-[#0D2B24] disabled:opacity-40 text-white p-2.5 rounded-xl font-medium transition"
          >
            <Send className="w-4 h-4 text-[#C6A45B]" />
          </button>
        </form>
      </div>

      {/* Citations Modal Drawer */}
      <SourceCitationModal
        citations={selectedCitations}
        isOpen={isCitationModalOpen}
        onClose={() => setIsCitationModalOpen(false)}
      />
    </div>
  );
};
