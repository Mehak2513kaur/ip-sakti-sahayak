import React from 'react';
import {
  LayoutDashboard,
  MessageSquareText,
  Boxes,
  ShieldCheck,
  BookOpenCheck,
  Globe2,
  Leaf,
  Library,
  FileText,
  Settings,
  Sparkles,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onSelectWorkflow?: (workflowId: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  onSelectWorkflow,
  isCollapsed = false,
  onToggleCollapse
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'chat', label: 'AI Sahayak', icon: MessageSquareText, badge: 'Live RAG' },
    { id: 'classifier', label: 'Product Classifier', icon: Boxes },
    { id: 'ip_explorer', label: 'IP Protection', icon: ShieldCheck },
    { id: 'traditional_knowledge', label: 'Traditional Knowledge', icon: BookOpenCheck },
    { id: 'compliance', label: 'Global Compliance', icon: Globe2 },
    { id: 'abs_assistant', label: 'ABS Assistant', icon: Leaf },
    { id: 'library', label: 'Knowledge Library', icon: Library },
    { id: 'reports', label: 'My Reports', icon: FileText },
    { id: 'admin', label: 'Admin Dashboard', icon: Settings }
  ];

  const demoWorkflows = [
    { id: 'wf_1_hair_oil', label: 'Herbal Hair Oil Launch' },
    { id: 'wf_2_ashwagandha_extraction', label: 'Ashwagandha SCFE Patent' },
    { id: 'wf_3_usa_export_serum', label: 'USA Serum MoCRA Export' }
  ];

  return (
    <aside
      className={`bg-white border-r border-[#E5EDE5] flex flex-col justify-between h-[calc(100vh-4.5rem)] sticky top-[4.5rem] shadow-xs transition-all duration-200 shrink-0 select-none ${
        isCollapsed ? 'w-16' : 'w-60'
      }`}
    >
      <div className="p-2 sm:p-3 space-y-4 overflow-y-auto">
        {/* Top Header & Collapse Toggle */}
        <div className="flex items-center justify-between px-2 pt-1 pb-0.5">
          {!isCollapsed && (
            <span className="text-[10px] font-bold text-[#123C32]/60 uppercase tracking-wider">
              Navigation
            </span>
          )}
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className={`p-1.5 rounded-lg text-gray-500 hover:text-[#123C32] hover:bg-[#F2F7F2] transition ${
                isCollapsed ? 'mx-auto' : ''
              }`}
              title={isCollapsed ? 'Expand Sidebar (Laptop View)' : 'Collapse Sidebar to Icon Mode'}
            >
              {isCollapsed ? (
                <PanelLeftOpen className="w-4 h-4 text-[#197B5A]" />
              ) : (
                <PanelLeftClose className="w-4 h-4 text-gray-400 hover:text-[#123C32]" />
              )}
            </button>
          )}
        </div>

        {/* Navigation Group */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center ${
                  isCollapsed ? 'justify-center px-2 py-2.5' : 'justify-between px-2.5 py-1.5'
                } text-xs font-medium rounded-lg transition-all ${
                  isActive
                    ? 'bg-[#123C32] text-[#F7F5EF] shadow-xs font-semibold'
                    : 'text-[#202923] hover:bg-[#F2F7F2] hover:text-[#123C32]'
                }`}
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-[#C6A45B]' : 'text-[#197B5A]'
                    }`}
                  />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </div>
                {!isCollapsed && item.badge && (
                  <span className="text-[9px] bg-[#C6A45B]/20 text-[#123C32] px-1 py-0.5 rounded font-bold shrink-0">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Guided Demo Workflows Card (Visible only when expanded) */}
        {!isCollapsed && (
          <div className="bg-[#F7F5EF] p-2.5 rounded-xl border border-[#C6A45B]/30 shadow-2xs">
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-[#123C32] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A45B]" />
              <span>SIH 2026 Test Flows</span>
            </div>
            <div className="space-y-1 pt-1">
              {demoWorkflows.map((wf) => (
                <button
                  key={wf.id}
                  onClick={() => {
                    if (onSelectWorkflow) onSelectWorkflow(wf.id);
                    onNavigate('dashboard');
                  }}
                  className="w-full text-left text-[11px] px-2 py-1 rounded bg-white hover:bg-[#E5EDE5] text-[#123C32] font-medium border border-[#E5EDE5] flex items-center justify-between transition group"
                >
                  <span className="truncate">{wf.label}</span>
                  <ChevronRight className="w-3 h-3 text-[#197B5A] opacity-60 group-hover:opacity-100 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      {!isCollapsed ? (
        <div className="p-2.5 bg-[#E5EDE5]/40 border-t border-[#E5EDE5] text-[10px] text-gray-500 flex flex-col space-y-0.5">
          <div className="flex items-center justify-between">
            <span className="font-medium text-[#123C32]">Statutory Engine:</span>
            <span className="text-emerald-700 font-semibold">Active & Grounded</span>
          </div>
          <div className="text-[9px] text-gray-400">
            Laptop Optimized Dimension
          </div>
        </div>
      ) : (
        <div className="p-2 text-center border-t border-[#E5EDE5] text-[10px] text-emerald-800 font-bold">
          AYUSH
        </div>
      )}
    </aside>
  );
};
