import React from 'react';
import { Globe, Sparkles, Building2, PanelLeft, Laptop } from 'lucide-react';

interface NavbarProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  activeView: string;
  onNavigate: (view: string) => void;
  isSidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
}

const LANGUAGES = [
  { code: 'en', label: 'English', script: 'English' },
  { code: 'hi', label: 'Hindi', script: 'हिंदी' },
  { code: 'pa', label: 'Punjabi', script: 'ਪੰਜਾਬੀ' },
  { code: 'ta', label: 'Tamil', script: 'தமிழ்' },
  { code: 'te', label: 'Telugu', script: 'తెలుగు' },
  { code: 'bn', label: 'Bengali', script: 'বাংলা' },
  { code: 'mr', label: 'Marathi', script: 'मराठी' },
  { code: 'gu', label: 'Gujarati', script: 'ગુજરાતી' },
  { code: 'kn', label: 'Kannada', script: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'Malayalam', script: 'മലയാളം' }
];

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onLanguageChange,
  activeView,
  onNavigate,
  isSidebarCollapsed,
  onToggleSidebar
}) => {
  return (
    <header className="bg-[#123C32] text-white border-b border-[#C6A45B]/30 sticky top-0 z-40 shadow-sm">
      {/* Top Gov Strip */}
      <div className="bg-[#0D2B24] px-4 py-0.5 text-[11px] flex justify-between items-center text-[#E5EDE5]/80 border-b border-emerald-950">
        <div className="flex items-center space-x-3">
          <span className="font-medium tracking-wide">MINISTRY OF AYUSH • GOVERNMENT OF INDIA</span>
          <span className="hidden md:inline text-gold">•</span>
          <span className="hidden md:inline text-emerald-300">Smart India Hackathon 2026</span>
        </div>
        <div className="flex items-center space-x-3 text-[10px]">
          <span className="hidden sm:inline-flex items-center space-x-1 text-emerald-300 bg-[#197B5A]/30 px-2 py-0.5 rounded border border-emerald-600/30">
            <Laptop className="w-3 h-3" />
            <span>Laptop Dimension View</span>
          </span>
          <span className="bg-[#197B5A]/40 text-emerald-200 px-2 py-0.5 rounded border border-emerald-600/30">
            Grounded RAG v1.0
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-5 lg:px-6 h-14 flex items-center justify-between">
        {/* Left Side: Toggle + Brand Logo */}
        <div className="flex items-center space-x-2.5">
          {activeView !== 'landing' && onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-[#0D2B24] transition mr-1"
              title="Toggle Sidebar width for laptop screen"
            >
              <PanelLeft className="w-4 h-4 text-[#C6A45B]" />
            </button>
          )}

          <div
            onClick={() => onNavigate('landing')}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#197B5A] to-[#123C32] border border-[#C6A45B] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#C6A45B]" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c2 2 2 5 0 8m-2-4c2 0 4-2 4-4" stroke="#E5EDE5" strokeWidth="1.5" />
              </svg>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-serif font-bold text-base tracking-wider text-[#F7F5EF]">
                  IP-SAKTI <span className="text-[#C6A45B]">SAHAYAK</span>
                </span>
                <span className="text-[9px] bg-[#C6A45B]/20 text-[#C6A45B] px-1 py-0.2 rounded uppercase font-bold tracking-wider border border-[#C6A45B]/30">
                  AYUSH
                </span>
              </div>
              <p className="text-[10px] text-[#E5EDE5]/70 hidden sm:block leading-none">
                AI Intellectual Property & Regulatory Assistant for Ayurveda
              </p>
            </div>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center space-x-2.5">
          {/* Multilingual Selector */}
          <div className="relative flex items-center">
            <Globe className="w-3.5 h-3.5 text-[#C6A45B] absolute left-2.5 pointer-events-none" />
            <select
              value={currentLanguage}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="bg-[#0D2B24] border border-[#197B5A] text-xs text-[#F7F5EF] pl-7 pr-6 py-1 rounded-lg focus:outline-none focus:border-[#C6A45B] appearance-none cursor-pointer hover:bg-[#123C32] transition"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.script} ({l.label})
                </option>
              ))}
            </select>
            <span className="absolute right-2 text-[9px] text-gray-400 pointer-events-none">▼</span>
          </div>

          {/* Quick CTA to AI Sahayak or Dashboard */}
          {activeView === 'landing' ? (
            <button
              onClick={() => onNavigate('dashboard')}
              className="bg-[#197B5A] hover:bg-[#146348] text-white text-xs px-3.5 py-1.5 rounded-lg font-medium border border-[#C6A45B]/40 transition shadow-xs flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C6A45B]" />
              <span>Launch Platform</span>
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onNavigate('chat')}
                className="bg-[#C6A45B] hover:bg-[#B3934B] text-[#123C32] text-xs px-3 py-1 rounded-lg font-bold transition flex items-center space-x-1 shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Sahayak</span>
              </button>

              <button
                onClick={() => onNavigate('admin')}
                className="text-xs text-[#E5EDE5] hover:text-[#C6A45B] p-1.5 rounded hover:bg-[#0D2B24] transition hidden md:flex items-center space-x-1"
                title="Admin Governance"
              >
                <Building2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
