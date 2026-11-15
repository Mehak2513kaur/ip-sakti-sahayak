import React, { useState } from 'react';
import {
  Boxes,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ShieldCheck,
  Download,
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { api } from '../services/api';
import { ProductClassificationResponse, ProductClassificationRequest } from '../types';
import { SourceCitationModal } from '../components/SourceCitationModal';

export const ProductClassifierPage: React.FC = () => {
  const [formData, setFormData] = useState<ProductClassificationRequest>({
    product_name: '',
    ingredients: [''],
    botanical_names: [''],
    intended_purpose: '',
    intended_use: 'oral',
    claims_type: 'therapeutic',
    classical_text_reference: '',
    product_composition: 'aqueous extract',
    target_market: 'India',
    manufacturing_location: 'India'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ProductClassificationResponse | null>(null);
  const [isCitationOpen, setIsCitationOpen] = useState(false);

  const handleIngredientChange = (idx: number, val: string) => {
    const next = [...formData.ingredients];
    next[idx] = val;
    setFormData({ ...formData, ingredients: next });
  };

  const addIngredient = () => {
    setFormData({ ...formData, ingredients: [...formData.ingredients, ''] });
  };

  const handleQuickPreset = (presetName: string) => {
    if (presetName === 'hair_oil') {
      setFormData({
        product_name: 'Kesh-Tejas Ayurvedic Hair Vitalizer Oil',
        ingredients: ['Bhringraj (Eclipta alba)', 'Amla (Phyllanthus emblica)', 'Brahmi (Bacopa monnieri)', 'Til Taila (Sesame oil)'],
        botanical_names: ['Eclipta alba', 'Phyllanthus emblica', 'Bacopa monnieri'],
        intended_purpose: 'Strengthen hair follicles, mitigate premature greying, and prevent hair fall',
        intended_use: 'topical',
        claims_type: 'therapeutic',
        classical_text_reference: 'Bhavaprakasha Nighantu & Sahasrayogam',
        product_composition: 'taila (medicated oil infusion)',
        target_market: 'India',
        manufacturing_location: 'India'
      });
    } else if (presetName === 'ayurveda_aahar') {
      setFormData({
        product_name: 'Ojas-Vita Vitality Herbal Tea Infusion',
        ingredients: ['Tulsi (Ocimum sanctum)', 'Sunthi (Zingiber officinale)', 'Dalchini (Cinnamomum verum)', 'Maricha (Piper nigrum)'],
        botanical_names: ['Ocimum sanctum', 'Zingiber officinale'],
        intended_purpose: 'Daily nutritional wellness and immune support beverage without disease treatment claims',
        intended_use: 'oral',
        claims_type: 'nutritional',
        classical_text_reference: 'Ayurveda Aahar Schedule A (Ayurvedic Kwatha recipes)',
        product_composition: 'coarse botanical tea blend',
        target_market: 'India',
        manufacturing_location: 'India'
      });
    } else if (presetName === 'phytopharmaceutical') {
      setFormData({
        product_name: 'WithaPure-98 Standardized Withanolide Extract',
        ingredients: ['Standardized Withania somnifera fraction (Withaferin A > 4.5%, Withanolide D > 3.0%)'],
        botanical_names: ['Withania somnifera Dunal'],
        intended_purpose: 'Standardized neuroprotective botanical drug fraction for cognitive support',
        intended_use: 'oral',
        claims_type: 'therapeutic',
        classical_text_reference: 'Charaka Samhita',
        product_composition: 'phytopharmaceutical purified standardized fraction with 4 marker compounds',
        target_market: 'India',
        manufacturing_location: 'India'
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.product_name) return;

    setIsLoading(true);
    try {
      const resp = await api.classifyProduct(formData);
      setResult(resp);
    } catch (err) {
      alert('Error during product classification.');
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
              <Boxes className="w-5 h-5" />
            </span>
            <div>
              <h1 className="font-serif text-xl font-bold text-[#123C32]">
                Ayurvedic Product Classifier
              </h1>
              <p className="text-xs text-gray-500">
                Statutory regulatory determination under the Drugs and Cosmetics Act, 1940 & FSSAI Regulations 2022
              </p>
            </div>
          </div>
        </div>

        {/* Preset quick buttons */}
        <div className="flex items-center space-x-1.5 overflow-x-auto text-xs">
          <span className="text-[10px] text-gray-400 font-bold uppercase">Presets:</span>
          <button
            type="button"
            onClick={() => handleQuickPreset('hair_oil')}
            className="px-2.5 py-1 bg-[#F7F5EF] hover:bg-[#E5EDE5] text-[#123C32] rounded-lg font-medium border border-[#E5EDE5] transition"
          >
            Herbal Hair Oil
          </button>
          <button
            type="button"
            onClick={() => handleQuickPreset('ayurveda_aahar')}
            className="px-2.5 py-1 bg-[#F7F5EF] hover:bg-[#E5EDE5] text-[#123C32] rounded-lg font-medium border border-[#E5EDE5] transition"
          >
            Ayurveda Aahar
          </button>
          <button
            type="button"
            onClick={() => handleQuickPreset('phytopharmaceutical')}
            className="px-2.5 py-1 bg-[#F7F5EF] hover:bg-[#E5EDE5] text-[#123C32] rounded-lg font-medium border border-[#E5EDE5] transition"
          >
            Phytopharmaceutical
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Questionnaire Form */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-[#E5EDE5] shadow-xs space-y-4">
          <h2 className="font-serif font-bold text-sm text-[#123C32] border-b border-[#E5EDE5] pb-2">
            Product Formulation Questionnaire
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Product Name *</label>
              <input
                type="text"
                required
                value={formData.product_name}
                onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
                placeholder="e.g. Kesh-Tejas Ayurvedic Hair Oil"
                className="w-full bg-[#F7F5EF] border border-[#E5EDE5] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#197B5A]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-medium text-gray-700">Ingredients (Herbs / Excipients)</label>
                <button
                  type="button"
                  onClick={addIngredient}
                  className="text-[10px] text-[#197B5A] font-bold hover:underline"
                >
                  + Add Ingredient
                </button>
              </div>
              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {formData.ingredients.map((ing, idx) => (
                  <input
                    key={idx}
                    type="text"
                    value={ing}
                    onChange={(e) => handleIngredientChange(idx, e.target.value)}
                    placeholder={`Ingredient ${idx + 1} (e.g. Bhringraj / Eclipta alba)`}
                    className="w-full bg-[#F7F5EF] border border-[#E5EDE5] rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#197B5A]"
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Route of Use</label>
                <select
                  value={formData.intended_use}
                  onChange={(e) => setFormData({ ...formData, intended_use: e.target.value })}
                  className="w-full bg-[#F7F5EF] border border-[#E5EDE5] rounded-lg px-2.5 py-1.5 text-xs"
                >
                  <option value="oral">Oral Ingestion</option>
                  <option value="topical">Topical / External</option>
                  <option value="dietary">Dietary Food</option>
                  <option value="personal_care">Personal Care</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Claims Type</label>
                <select
                  value={formData.claims_type}
                  onChange={(e) => setFormData({ ...formData, claims_type: e.target.value })}
                  className="w-full bg-[#F7F5EF] border border-[#E5EDE5] rounded-lg px-2.5 py-1.5 text-xs"
                >
                  <option value="therapeutic">Therapeutic / Medicinal</option>
                  <option value="cosmetic">Cosmetic / Beautifying</option>
                  <option value="nutritional">Ayurveda Aahar / Nutritional</option>
                  <option value="general_wellness">General Wellness</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Classical Text Reference (First Schedule)
              </label>
              <input
                type="text"
                value={formData.classical_text_reference}
                onChange={(e) => setFormData({ ...formData, classical_text_reference: e.target.value })}
                placeholder="e.g. Charaka Samhita, Bhavaprakasha Nighantu, Sahasrayogam"
                className="w-full bg-[#F7F5EF] border border-[#E5EDE5] rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#197B5A]"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Intended Purpose & Claims</label>
              <textarea
                rows={2}
                value={formData.intended_purpose}
                onChange={(e) => setFormData({ ...formData, intended_purpose: e.target.value })}
                placeholder="Describe intended therapeutic or functional claims..."
                className="w-full bg-[#F7F5EF] border border-[#E5EDE5] rounded-lg p-2 text-xs focus:outline-none focus:border-[#197B5A]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Composition Form</label>
                <select
                  value={formData.product_composition}
                  onChange={(e) => setFormData({ ...formData, product_composition: e.target.value })}
                  className="w-full bg-[#F7F5EF] border border-[#E5EDE5] rounded-lg px-2.5 py-1.5 text-xs"
                >
                  <option value="aqueous extract">Aqueous / Water Decoction</option>
                  <option value="churna (raw powder)">Churna (Raw Powder)</option>
                  <option value="taila (medicated oil infusion)">Taila (Medicated Oil)</option>
                  <option value="phytopharmaceutical standardized fraction">Phytopharmaceutical Fraction</option>
                  <option value="tablet / vati">Vati / Compressed Tablet</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Target Market</label>
                <select
                  value={formData.target_market}
                  onChange={(e) => setFormData({ ...formData, target_market: e.target.value })}
                  className="w-full bg-[#F7F5EF] border border-[#E5EDE5] rounded-lg px-2.5 py-1.5 text-xs"
                >
                  <option value="India">Domestic India</option>
                  <option value="Export">Global Export</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !formData.product_name}
              className="w-full bg-[#123C32] hover:bg-[#0D2B24] disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl shadow-xs transition flex items-center justify-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4 text-[#C6A45B]" />
              <span>{isLoading ? 'Classifying...' : 'Determine Product Category'}</span>
            </button>
          </form>
        </div>

        {/* Results Display */}
        <div className="lg:col-span-7 space-y-4">
          {result ? (
            <div className="bg-white rounded-2xl p-5 border border-[#197B5A]/40 shadow-xs space-y-4 animate-in fade-in duration-200">
              {/* Category Determination Banner */}
              <div className="bg-gradient-to-r from-[#123C32] to-[#197B5A] text-white p-4 rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] bg-[#C6A45B] text-[#123C32] px-2 py-0.5 rounded font-bold uppercase">
                    Statutory Category
                  </span>
                  <span className="text-xs text-emerald-200 font-semibold">
                    Confidence: {result.confidence_level}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#F7F5EF]">
                  {result.suggested_category}
                </h3>
                <div className="text-xs text-emerald-100 font-medium flex items-center space-x-1">
                  <span>Licensing Form:</span>
                  <span className="text-[#C6A45B] font-bold">{result.form_type || 'Form 25-D'}</span>
                </div>
              </div>

              {/* Legal Framework & Reasoning */}
              <div className="space-y-2 text-xs">
                <div className="font-bold text-[#123C32] text-xs">Reasoning & Legal Framework</div>
                <p className="text-gray-700 leading-relaxed bg-[#F7F5EF] p-3 rounded-lg border border-[#E5EDE5]">
                  {result.reasoning}
                </p>
                <div className="text-[11px] text-gray-500">
                  <span className="font-bold text-[#123C32]">Governing Statute:</span> {result.relevant_legal_framework}
                </div>
              </div>

              {/* Licensing & Checklist Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-[#E5EDE5]/40 p-3 rounded-xl border border-[#E5EDE5] space-y-1.5">
                  <div className="font-bold text-[#123C32] flex items-center space-x-1 text-[11px] uppercase">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#197B5A]" />
                    <span>Licensing Considerations</span>
                  </div>
                  <ul className="space-y-1 text-gray-700 text-[11px]">
                    {result.licensing_considerations.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#E5EDE5]/40 p-3 rounded-xl border border-[#E5EDE5] space-y-1.5">
                  <div className="font-bold text-[#123C32] flex items-center space-x-1 text-[11px] uppercase">
                    <FileText className="w-3.5 h-3.5 text-[#C6A45B]" />
                    <span>Documentation Checklist</span>
                  </div>
                  <ul className="space-y-1 text-gray-700 text-[11px]">
                    {result.required_documentation_checklist.map((item, idx) => (
                      <li key={idx}>✓ {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Potential IP Protection */}
              <div className="bg-[#F7F5EF] p-3 rounded-xl border border-[#E5EDE5] space-y-1 text-xs">
                <div className="font-bold text-[#123C32] flex items-center space-x-1 text-[11px] uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#197B5A]" />
                  <span>Potential Intellectual Property Pathways</span>
                </div>
                <ul className="space-y-0.5 text-gray-700 text-[11px]">
                  {result.potential_ip_protection.map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </div>

              {/* Uncertainties requiring expert verification */}
              {result.uncertainties_requiring_expert_verification?.length > 0 && (
                <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200 text-xs space-y-1">
                  <div className="font-bold text-amber-900 flex items-center space-x-1 text-[11px]">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Uncertainties Requiring Legal / SLA Verification</span>
                  </div>
                  <ul className="space-y-0.5 text-amber-800 text-[11px]">
                    {result.uncertainties_requiring_expert_verification.map((u, idx) => (
                      <li key={idx}>- {u}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-[#E5EDE5]">
                <button
                  type="button"
                  onClick={() => setIsCitationOpen(true)}
                  className="text-xs text-[#197B5A] font-semibold hover:underline flex items-center space-x-1"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>View Official Citations ({result.official_statutory_references.length})</span>
                </button>

                <button
                  type="button"
                  onClick={async () => {
                    const rep = await api.generateReport('product_classification', `${formData.product_name} Classification Report`, {
                      category: result.suggested_category,
                      reasoning: result.reasoning,
                      statute: result.relevant_legal_framework,
                      form_type: result.form_type,
                      licensing: result.licensing_considerations,
                      checklist: result.required_documentation_checklist,
                      ip_pathway: result.potential_ip_protection
                    });
                    window.open(rep.download_url_pdf, '_blank');
                  }}
                  className="bg-[#C6A45B] hover:bg-[#B3934B] text-[#123C32] px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Classification Dossier</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-10 border border-[#E5EDE5] text-center space-y-3">
              <Boxes className="w-12 h-12 text-[#197B5A]/40 mx-auto" />
              <h3 className="font-serif font-bold text-base text-[#123C32]">
                No Classification Generated Yet
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                Fill out the questionnaire or choose one of the top presets to evaluate the exact statutory regulatory category and licensing path.
              </p>
            </div>
          )}
        </div>
      </div>

      {result && (
        <SourceCitationModal
          citations={result.official_statutory_references}
          isOpen={isCitationOpen}
          onClose={() => setIsCitationOpen(false)}
        />
      )}
    </div>
  );
};
