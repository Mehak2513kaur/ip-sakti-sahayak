import React, { useState, useEffect } from 'react';
import {
  FileText,
  Download,
  Calendar,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Clock,
  Printer,
  ShieldAlert
} from 'lucide-react';
import { api } from '../services/api';
import { ReportItem } from '../types';

export const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedType, setSelectedType] = useState('patentability');

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const reps = await api.getReports();
      setReports(reps);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateNewReport = async () => {
    setIsGenerating(true);
    try {
      let sampleData: Record<string, any> = {};
      let title = '';

      if (selectedType === 'patentability') {
        title = 'Preliminary Patentability Research: Ashwagandha SCFE Process';
        sampleData = {
          summary: 'Assessment of process novelty under Section 2(1)(j) and Section 3(p) traditional knowledge bar for Withania somnifera extraction.',
          statute: 'The Patents Act, 1970 (Section 2(1)(j), 3(p), 3(e))',
          patentability_feasibility: 'High (Process Claims Approved)',
          mandatory_requirement: 'NBA Form III filing under Section 6 of Biological Diversity Act',
          next_steps: 'File Form 2 Provisional Specification and submit NBA Form III before patent grant.'
        };
      } else if (selectedType === 'product_classification') {
        title = 'Ayurvedic Product Classification: Kesh-Tejas Herbal Vitalizer';
        sampleData = {
          summary: 'Regulatory determination under Drugs and Cosmetics Act 1940 Section 3(h) as Patent or Proprietary Ayurvedic Medicine.',
          category: 'Patent or Proprietary Ayurvedic Medicine',
          license_form: 'Form 25-D from State AYUSH Licensing Authority',
          gmp_standard: 'Schedule T GMP compliance'
        };
      } else {
        title = 'Global Export Compliance Dossier: US FDA MoCRA 2022';
        sampleData = {
          summary: 'Export compliance evaluation for Ayurvedic cosmetic hair oil exported to the United States market.',
          regulatory_body: 'US FDA CFSAN & Office of Cosmetics and Colors',
          statutory_mandates: 'Cosmetic Facility Registration, Cosmetic Product Listing, Adverse Event Reporting',
          heavy_metal_limits: 'Lead < 10 ppm, Arsenic < 3 ppm, Mercury < 1 ppm'
        };
      }

      const rep = await api.generateReport(selectedType, title, sampleData);
      loadReports();
      window.open(rep.download_url_pdf, '_blank');
    } catch (err) {
      alert('Error generating report.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto p-3 sm:p-5 space-y-4 sm:space-y-5">
      {/* Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E5EDE5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-lg bg-[#123C32] text-[#C6A45B]">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <h1 className="font-serif text-xl font-bold text-[#123C32]">
                Regulatory Intelligence & Generated Reports
              </h1>
              <p className="text-xs text-gray-500">
                Official downloadable PDF dossiers with verified statutory citations and compliance roadmaps
              </p>
            </div>
          </div>
        </div>

        {/* Generate Report Quick Bar */}
        <div className="flex items-center space-x-2 text-xs">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-[#F7F5EF] border border-[#E5EDE5] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#197B5A]"
          >
            <option value="patentability">Patentability Research Report</option>
            <option value="product_classification">Product Classification Dossier</option>
            <option value="export_compliance">International Export Roadmap</option>
            <option value="abs_assessment">ABS Compliance Dossier</option>
          </select>

          <button
            onClick={handleCreateNewReport}
            disabled={isGenerating}
            className="px-4 py-2 bg-[#123C32] hover:bg-[#0D2B24] text-white rounded-xl font-semibold transition flex items-center space-x-1.5 shadow-xs shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C6A45B]" />
            <span>{isGenerating ? 'Generating PDF...' : 'Generate New Dossier'}</span>
          </button>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-gray-500 px-1">
          <span>{reports.length} Downloadable Official Dossiers</span>
          <span className="flex items-center space-x-1 text-emerald-700 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>PDF Ready with Government Template</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((rep) => (
            <div
              key={rep.report_id}
              className="bg-white rounded-2xl p-5 border border-[#E5EDE5] hover:border-[#197B5A] shadow-xs space-y-4 flex flex-col justify-between transition"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] bg-[#E5EDE5] text-[#123C32] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      {rep.report_type.replace('_', ' ')}
                    </span>
                    <h3 className="font-serif font-bold text-sm text-[#123C32] leading-snug">
                      {rep.title}
                    </h3>
                  </div>
                  <span className="text-[11px] text-gray-400 font-mono shrink-0">
                    {rep.report_id}
                  </span>
                </div>

                <div className="bg-[#F7F5EF] p-3 rounded-xl border border-[#E5EDE5] text-xs space-y-1 text-gray-700">
                  {Object.entries(rep.data_summary || {}).slice(0, 3).map(([k, v], i) => (
                    <div key={i} className="flex justify-between text-[11px]">
                      <span className="font-medium text-[#123C32] capitalize">{k.replace('_', ' ')}:</span>
                      <span className="text-gray-600 text-right truncate max-w-[200px]">{String(v)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center space-x-2 text-[10px] text-gray-400">
                  <Calendar className="w-3 h-3" />
                  <span>Generated on {new Date(rep.created_at).toLocaleDateString()}</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-semibold">Official AYUSH Template</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E5EDE5] flex items-center justify-between">
                <span className="text-[11px] text-gray-500 font-medium">Format: PDF</span>
                <a
                  href={rep.download_url_pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#C6A45B] hover:bg-[#B3934B] text-[#123C32] px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF Dossier</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
