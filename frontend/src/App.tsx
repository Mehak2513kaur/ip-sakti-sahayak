import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ChatAssistantPage } from './pages/ChatAssistantPage';
import { ProductClassifierPage } from './pages/ProductClassifierPage';
import { IPExplorerPage } from './pages/IPExplorerPage';
import { TraditionalKnowledgePage } from './pages/TraditionalKnowledgePage';
import { GlobalCompliancePage } from './pages/GlobalCompliancePage';
import { ABSAssistantPage } from './pages/ABSAssistantPage';
import { KnowledgeLibraryPage } from './pages/KnowledgeLibraryPage';
import { ReportsPage } from './pages/ReportsPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

export function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string | undefined>('wf_1_hair_oil');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectWorkflow = (workflowId: string) => {
    setSelectedWorkflowId(workflowId);
    setCurrentView('dashboard');
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#202923] flex flex-col font-sans selection:bg-[#C6A45B]/30">
      {/* Top Government Navbar */}
      <Navbar
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        activeView={currentView}
        onNavigate={handleNavigate}
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={toggleSidebar}
      />

      {/* Main Content Area - Laptop Optimized Layout */}
      {currentView === 'landing' ? (
        <main className="flex-1 w-full">
          <LandingPage
            onNavigate={handleNavigate}
            onLanguageChange={setCurrentLanguage}
          />
        </main>
      ) : (
        <div className="flex-1 flex w-full max-w-[1720px] mx-auto">
          {/* Persistent Collapsible Sidebar */}
          <Sidebar
            currentView={currentView}
            onNavigate={handleNavigate}
            onSelectWorkflow={handleSelectWorkflow}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={toggleSidebar}
          />

          {/* Dynamic Page Content */}
          <main className="flex-1 min-w-0 overflow-y-auto h-[calc(100vh-4.5rem)]">
            {currentView === 'dashboard' && (
              <DashboardPage
                onNavigate={handleNavigate}
                selectedWorkflowId={selectedWorkflowId}
              />
            )}
            {currentView === 'chat' && (
              <ChatAssistantPage
                currentLanguage={currentLanguage}
                onLanguageChange={setCurrentLanguage}
              />
            )}
            {currentView === 'classifier' && <ProductClassifierPage />}
            {currentView === 'ip_explorer' && <IPExplorerPage />}
            {currentView === 'traditional_knowledge' && <TraditionalKnowledgePage />}
            {currentView === 'compliance' && <GlobalCompliancePage />}
            {currentView === 'abs_assistant' && <ABSAssistantPage />}
            {currentView === 'library' && <KnowledgeLibraryPage />}
            {currentView === 'reports' && <ReportsPage />}
            {currentView === 'admin' && <AdminDashboardPage />}
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
