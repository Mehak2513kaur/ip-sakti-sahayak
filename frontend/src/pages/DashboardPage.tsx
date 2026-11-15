import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Boxes,
  ShieldCheck,
  Globe2,
  Leaf,
  BookOpenCheck,
  ArrowRight,
  FileText,
  Clock,
  CheckCircle2,
  Download,
  AlertTriangle,
  PlayCircle
} from 'lucide-react';
import { api } from '../services/api';
import { DemoWorkflow } from '../types';

interface DashboardPageProps {
  onNavigate: (view: string) => void;
  selectedWorkflowId?: string;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigate,
  selectedWorkflowId
}) => {
  const [quickQuery, setQuickQuery] = useState('');
  const [workflows, setWorkflows] = useState<DemoWorkflow[]>([]);
  const [activeWf, setActiveWf] = useState<DemoWorkflow | null>(null);

  useEffect(() => {
    api.getDemoWorkflows().then((wfs) => {
      setWorkflows(wfs);
      if (wfs.length > 0) {
        if (selectedWorkflowId) {
          const match = wfs.find((w) => w.workflow_id === selectedWorkflowId);
          setActiveWf(match || wfs[0]);
        } else {
          setActiveWf(wfs[0]);
        }
      }
    });
  }, [selectedWorkflowId]);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickQuery.trim()) return;
    onNavigate('chat');
  };

  const quickActionCards = [
    {
      id: 'patentability',
      title: 'Check Patentability & Section 3(p)',
      desc: 'Evaluate traditional knowledge bar, synergy proof requirements, and process patent feasibility.',
      target: 'ip_explorer',
      icon: ShieldCheck,
      color: 'border-l-4 border-l-[#197B5A]'
    },
    {
      id: 'classify',
      title: 'Classify My Ayurvedic Product',
      desc: 'Step-by-step determination: Classical ASU, Patent & Proprietary, Ayurveda Aahar, or Cosmetic.',
      target: 'classifier',
      icon: Boxes,
      color: 'border-l-4 border-l-[#C6A45B]'
    },
    {
      id: 'trademark',
      title: 'Explore Trademark Protection',
      desc: 'Check registrability of Ayurvedic brand names in Nice Class 5, 3, and 30 without Section 9 objections.',
      target: 'ip_explorer',
      icon: ShieldCheck,
      color: 'border-l-4 border-l-[#123C32]'
    },
    {
      id: 'export',
      title: 'Check Export Requirements',
      desc: 'US FDA MoCRA 2022 & DSHEA, EU THMPD 2004/24/EC, UK MHRA, Australia TGA, and Health Canada.',
      target: 'compliance',
      icon: Globe2,
      color: 'border-l-4 border-l-blue-700'
    },
    {
      id: 'abs',
      title: 'Understand ABS Compliance',
      desc: 'Biological Diversity Act 2023 amendment: NBA Form III for patents, SBB intimation, and Vaidya exemptions.',
      target: 'abs_assistant',
      icon: Leaf,
      color: 'border-l-4 border-l-emerald-600'
    },
    {
      id: 'tk',
      title: 'Search Traditional Knowledge',
      desc: 'Classical formulations, authoritative texts (Charaka, Sushruta), and patent prior art revocations.',
      target: 'traditional_knowledge',
      icon: BookOpenCheck,
      color: 'border-l-4 border-l-amber-700'
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-5 w-full max-w-[1600px] mx-auto p-3 sm:p-5">
      {/* Welcome & Quick AI Box */}
      <div className="bg-gradient-to-r from-[#123C32] to-[#197B5A] text-white rounded-2xl p-4 sm:p-5 shadow-md border border-[#C6A45B]/40 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] bg-[#C6A45B] text-[#123C32] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                Authorized Session
              </span>
              <span className="text-xs text-emerald-200">National AYUSH Startup Portal</span>
            </div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#F7F5EF]">
              Welcome, Dr. Rajesh Sharma
            </h1>
            <p className="text-[11px] text-emerald-100/80">
              AyurTech Innovations Pvt Ltd • Registered AYUSH Manufacturer (Form 25-D)
            </p>
          </div>

          <div className="flex items-center space-x-2.5 text-xs">
            <div className="bg-black/20 backdrop-blur-xs px-2.5 py-1.5 rounded-xl border border-white/10 text-center">
              <div className="font-bold text-sm text-[#C6A45B]">14</div>
              <div className="text-[9px] text-gray-300">Consultations</div>
            </div>
            <div className="bg-black/20 backdrop-blur-xs px-2.5 py-1.5 rounded-xl border border-white/10 text-center">
              <div className="font-bold text-sm text-emerald-300">6</div>
              <div className="text-[9px] text-gray-300">Dossiers Generated</div>
            </div>
            <div className="bg-black/20 backdrop-blur-xs px-2.5 py-1.5 rounded-xl border border-white/10 text-center">
              <div className="font-bold text-sm text-[#F7F5EF]">100%</div>
              <div className="text-[9px] text-gray-300">Grounded RAG</div>
            </div>
          </div>
        </div>

        {/* Quick Consultation Input */}
        <form onSubmit={handleQuickSubmit} className="relative mt-1">
          <input
            type="text"
            value={quickQuery}
            onChange={(e) => setQuickQuery(e.target.value)}
            placeholder="Ask AI Sahayak anything (e.g. 'Can I patent an Ashwagandha extraction process with supercritical CO2?')"
            className="w-full bg-[#0D2B24] border border-[#C6A45B]/50 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#C6A45B] pr-24 shadow-inner"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#C6A45B] hover:bg-[#B3934B] text-[#123C32] px-3 rounded-lg text-xs font-bold transition flex items-center space-x-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consult</span>
          </button>
        </form>
      </div>

      {/* Interactive Demonstration Workflow Viewer */}
      {activeWf && (
        <div className="bg-white rounded-2xl p-5 border border-[#C6A45B]/40 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5EDE5] pb-3">
            <div className="flex items-center space-x-2">
              <PlayCircle className="w-5 h-5 text-[#197B5A]" />
              <div>
                <span className="text-[10px] bg-[#E5EDE5] text-[#123C32] font-bold px-2 py-0.5 rounded uppercase">
                  Active Demonstration Workflow
                </span>
                <h3 className="font-serif font-bold text-sm sm:text-base text-[#123C32] mt-0.5">
                  {activeWf.title}
                </h3>
              </div>
            </div>

            {/* Workflow Switcher Tabs */}
            <div className="flex items-center space-x-1.5 overflow-x-auto">
              {workflows.map((wf) => (
                <button
                  key={wf.workflow_id}
                  onClick={() => setActiveWf(wf)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-medium transition whitespace-nowrap ${
                    activeWf.workflow_id === wf.workflow_id
                      ? 'bg-[#123C32] text-white shadow-2xs'
                      : 'bg-[#F7F5EF] text-gray-600 hover:bg-[#E5EDE5]'
                  }`}
                >
                  {wf.workflow_id.includes('hair') ? 'Hair Oil' : wf.workflow_id.includes('ashwagandha') ? 'Ashwagandha' : 'US Export'}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed">
            {activeWf.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
            <div className="bg-[#F7F5EF] p-3 rounded-xl border border-[#E5EDE5] space-y-1">
              <span className="text-[10px] font-bold text-[#197B5A] uppercase tracking-wider">Classification Verdict</span>
              <div className="font-bold text-[#123C32]">
                {activeWf.classification_analysis.category || activeWf.classification_analysis.indian_category}
              </div>
              <p className="text-[11px] text-gray-600 leading-normal">
                {activeWf.classification_analysis.licensing_path || activeWf.classification_analysis.boundary_warning}
              </p>
            </div>

            <div className="bg-[#F7F5EF] p-3 rounded-xl border border-[#E5EDE5] space-y-1">
              <span className="text-[10px] font-bold text-[#C6A45B] uppercase tracking-wider">IP & Patent Strategy</span>
              <div className="font-bold text-[#123C32]">Section 3(p) & 3(e) Assessment</div>
              <p className="text-[11px] text-gray-600 leading-normal line-clamp-3">
                {activeWf.ip_strategy.patentability}
              </p>
            </div>

            <div className="bg-[#F7F5EF] p-3 rounded-xl border border-[#E5EDE5] space-y-1">
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Mandatory Compliance</span>
              <div className="font-bold text-[#123C32]">
                {activeWf.abs_compliance ? 'Biological Diversity Act' : 'US FDA MoCRA 2022'}
              </div>
              <p className="text-[11px] text-gray-600 leading-normal line-clamp-3">
                {activeWf.abs_compliance?.applicability || activeWf.international_compliance?.us_regulatory_body}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 text-xs">
            <span className="text-[11px] text-gray-500 italic">
              Persona: {activeWf.persona}
            </span>
            <button
              onClick={() => onNavigate('reports')}
              className="text-[#197B5A] hover:text-[#123C32] font-semibold flex items-center space-x-1"
            >
              <span>Download Detailed Dossier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 6 Quick Action Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-serif text-lg font-bold text-[#123C32]">
            Key Regulatory & IP Modules
          </h2>
          <span className="text-xs text-gray-500">6 Specialized Workspaces</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActionCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => onNavigate(card.target)}
                className={`bg-white p-4 rounded-xl border border-[#E5EDE5] ${card.color} hover:shadow-md transition cursor-pointer space-y-2 group`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-xs sm:text-sm text-[#123C32] group-hover:text-[#197B5A] transition">
                    {card.title}
                  </span>
                  <Icon className="w-4 h-4 text-[#197B5A]" />
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {card.desc}
                </p>
                <div className="text-[11px] font-semibold text-[#197B5A] flex items-center space-x-1 pt-1">
                  <span>Launch Workspace</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Split: Regulatory Updates & Saved Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Regulatory Updates Ticker */}
        <div className="bg-white rounded-xl p-4 border border-[#E5EDE5] space-y-3 shadow-2xs">
          <div className="flex items-center justify-between border-b border-[#E5EDE5] pb-2">
            <div className="flex items-center space-x-1.5 font-bold text-xs text-[#123C32]">
              <Clock className="w-4 h-4 text-[#C6A45B]" />
              <span>Latest Regulatory Gazette Updates</span>
            </div>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">
              Live Feed
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-2.5 rounded-lg bg-[#F7F5EF] border border-[#E5EDE5] space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#123C32]">Biological Diversity (Amendment) Act</span>
                <span className="text-[10px] text-gray-500">Gazette Notified</span>
              </div>
              <p className="text-[11px] text-gray-600">
                Registered AYUSH practitioners (Vaidyas/Hakims) and cultivated medicinal plant users granted statutory exemption from prior intimation and ABS fee liabilities.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-[#F7F5EF] border border-[#E5EDE5] space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#123C32]">FSSAI Ayurveda Aahar Regulations</span>
                <span className="text-[10px] text-gray-500">Ministry of AYUSH Joint</span>
              </div>
              <p className="text-[11px] text-gray-600">
                Mandatory display of the green 'AYURVEDA AAHAR' logo on front-of-pack. Synthetic vitamins and isolated chemicals strictly prohibited.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-[#F7F5EF] border border-[#E5EDE5] space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#123C32]">US FDA MoCRA 2022 Full Enforcement</span>
                <span className="text-[10px] text-gray-500">Export Compliance</span>
              </div>
              <p className="text-[11px] text-gray-600">
                Mandatory cosmetic facility registration, cosmetic listing, and safety substantiation enforced for all Indian herbal cosmetic exporters to the USA.
              </p>
            </div>
          </div>
        </div>

        {/* Verified Statutory Frameworks */}
        <div className="bg-white rounded-xl p-4 border border-[#E5EDE5] space-y-3 shadow-2xs">
          <div className="flex items-center justify-between border-b border-[#E5EDE5] pb-2">
            <div className="flex items-center space-x-1.5 font-bold text-xs text-[#123C32]">
              <CheckCircle2 className="w-4 h-4 text-[#197B5A]" />
              <span>Frequently Accessed Statutory Frameworks</span>
            </div>
            <button
              onClick={() => onNavigate('library')}
              className="text-[11px] text-[#197B5A] hover:underline font-semibold"
            >
              View All Statutes
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div 
              onClick={() => onNavigate('library')}
              className="p-2.5 rounded-lg border border-[#E5EDE5] hover:bg-[#F2F7F2] transition cursor-pointer flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-[#123C32]">The Patents Act, 1970 (Section 3(p) & 3(e))</div>
                <div className="text-[11px] text-gray-500">Office of the CGPDTM (IP India) • Traditional Knowledge & Synergy</div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>

            <div 
              onClick={() => onNavigate('library')}
              className="p-2.5 rounded-lg border border-[#E5EDE5] hover:bg-[#F2F7F2] transition cursor-pointer flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-[#123C32]">Drugs and Cosmetics Act, 1940 & Rules 1945</div>
                <div className="text-[11px] text-gray-500">Ministry of AYUSH • Section 3(a), 3(h), Rule 158-B & Form 24D/25D</div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>

            <div 
              onClick={() => onNavigate('library')}
              className="p-2.5 rounded-lg border border-[#E5EDE5] hover:bg-[#F2F7F2] transition cursor-pointer flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-[#123C32]">The Biological Diversity Act, 2002 & Amendments</div>
                <div className="text-[11px] text-gray-500">National Biodiversity Authority • Section 6 Form III & ABS Rules</div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
