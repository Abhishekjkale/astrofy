import React, { useState } from 'react';
import { RiskParserResult } from '../types/astropolitics';
import { PRESET_DISPATCHES } from '../data/fallbackSatellites';
import { Sparkles, Send, Copy, Check, AlertOctagon, ShieldCheck, Zap, Terminal, Building2, Radio } from 'lucide-react';

export const RiskParserSandbox: React.FC = () => {
  const [inputText, setInputText] = useState<string>(PRESET_DISPATCHES[0].text);
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [result, setResult] = useState<RiskParserResult | null>({
    company_or_country: ['Reliance Jio Space Tech', 'India (IN-SPACe / ISRO)', 'SES O3b mPOWER'],
    threat_opportunity_level: 7,
    strategic_impact_summary:
      'Disrupts Western and Chinese duopoly by providing Global South non-aligned, ultra-low cost ($2-$5/GB) satellite broadband using SES MEO assets and domestic ISRO launch vehicles.',
    affected_resource_infrastructure: 'ITU RF Spectrum Allocations (Ku/Ka/Q/V bands)',
    geopolitical_block_implication: 'Global South Non-Aligned (India Lead)',
    recommended_countermeasure:
      'Western operators must lower terminal CapEx and explore regional ground station joint ventures.',
    engine: 'Pre-computed Intelligence Assessment'
  });

  const handleParse = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    try {
      const resp = await fetch('/api/parse-risk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      });
      if (!resp.ok) {
        throw new Error(`Server returned ${resp.status}`);
      }
      const data: RiskParserResult = await resp.json();
      setResult(data);
    } catch (err: any) {
      console.error('Failed to parse risk via API:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyJson = () => {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getThreatColor = (level: number) => {
    if (level >= 8) return { text: 'text-red-400', bg: 'bg-red-500', border: 'border-red-500/40', badge: 'bg-red-950/60' };
    if (level >= 6) return { text: 'text-amber-400', bg: 'bg-amber-500', border: 'border-amber-500/40', badge: 'bg-amber-950/60' };
    return { text: 'text-emerald-400', bg: 'bg-emerald-500', border: 'border-emerald-500/40', badge: 'bg-emerald-950/60' };
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Google GenAI SDK (Gemini API)
              </span>
              <span className="text-xs text-slate-400 font-mono">Model: gemini-3.8-flash</span>
            </div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span>AI-Powered Geopolitical Risk Parser</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Ingests raw text strings of space policy news, regulatory filings, or defense announcements,
              extracting structured intelligence: Entities, Threat/Opportunity Score (1–10), Strategic Impact Summary, and Affected Infrastructure.
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[11px] font-mono text-slate-400 block">Schema Format</span>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/50 px-2 py-1 rounded border border-emerald-800/40">
              Strict JSON Output
            </span>
          </div>
        </div>

        {/* Preset Dispatch Chips */}
        <div className="mt-5 pt-4 border-t border-slate-800">
          <div className="text-xs font-mono text-slate-400 mb-2 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            <span>Select Strategic Defense News Dispatch:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {PRESET_DISPATCHES.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setInputText(preset.text)}
                className={`text-left p-2.5 rounded-lg border text-xs transition cursor-pointer ${
                  inputText === preset.text
                    ? 'bg-blue-950/60 border-blue-500 text-white shadow-sm shadow-blue-500/20'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/70 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-semibold truncate">{preset.title}</span>
                  <span className="text-[10px] font-mono px-1 rounded bg-slate-800 text-slate-300 shrink-0">
                    {preset.tag}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 line-clamp-1 italic font-serif">
                  "{preset.text}"
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Input Box & Execute Button */}
        <div className="mt-5 space-y-3">
          <label className="text-xs font-mono text-slate-400 block font-semibold">
            Raw Space Policy News String:
          </label>
          <div className="relative">
            <textarea
              rows={3}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e.g. India's Space Policy updates spectrum allocations for Jio Space Technology..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-purple-500 font-mono leading-relaxed"
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400 font-mono">
              Characters: {inputText.length} | Tokens estimated: ~{Math.ceil(inputText.length / 4)}
            </span>
            <button
              onClick={handleParse}
              disabled={loading || !inputText.trim()}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 text-white rounded-lg font-semibold text-xs sm:text-sm shadow-lg shadow-purple-600/20 transition cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Extracting Intelligence...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Parse Geopolitical Risk (Gemini)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Parser Results Grid */}
      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Intelligence Synthesis Cards (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Top Threat Gauge Card */}
            {(() => {
              const theme = getThreatColor(result.threat_opportunity_level);
              return (
                <div className={`bg-slate-900 border ${theme.border} rounded-xl p-5 shadow-lg relative overflow-hidden`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider">
                        Threat / Opportunity Index
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className={`text-4xl font-black font-mono ${theme.text}`}>
                          {result.threat_opportunity_level}
                        </span>
                        <span className="text-sm font-mono text-slate-400">/ 10 Scale</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        {result.threat_opportunity_level >= 8
                          ? 'High Geopolitical Fracture / Hegemonic Friction'
                          : result.threat_opportunity_level >= 6
                          ? 'Strategic Market Realignment / Chokepoint Pressure'
                          : 'Operational / Regulatory Incremental Shift'}
                      </div>
                    </div>

                    {/* Visual Meter Bar */}
                    <div className="w-full sm:w-48 bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-center">
                      <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                        <span>Low (1)</span>
                        <span>Med (5)</span>
                        <span>High (10)</span>
                      </div>
                      <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
                        <div
                          className={`h-full ${theme.bg} transition-all duration-500`}
                          style={{ width: `${(result.threat_opportunity_level / 10) * 100}%` }}
                        />
                      </div>
                      <div className="mt-1 text-[11px] font-mono font-bold text-slate-300">
                        {result.geopolitical_block_implication}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Extracted Dimensions Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
              {/* Entities Mentioned */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-400 uppercase mb-2">
                  <Building2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Company / Country Mentioned:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {result.company_or_country.map((ent, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-950/60 text-blue-300 border border-blue-800/50 font-mono"
                    >
                      {ent}
                    </span>
                  ))}
                </div>
              </div>

              {/* Affected Infrastructure */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-400 uppercase mb-2">
                  <Radio className="w-3.5 h-3.5 text-purple-400" />
                  <span>Affected Resource / Infrastructure:</span>
                </div>
                <div className="p-3 bg-purple-950/20 border border-purple-900/40 rounded-lg">
                  <span className="text-sm font-bold text-purple-300 font-mono">
                    {result.affected_resource_infrastructure}
                  </span>
                </div>
              </div>

              {/* Strategic Impact Summary */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-400 uppercase mb-2">
                  <AlertOctagon className="w-3.5 h-3.5 text-amber-400" />
                  <span>Strategic Impact Summary:</span>
                </div>
                <p className="text-sm text-slate-200 bg-slate-950/70 p-3.5 rounded-lg border border-slate-800/80 leading-relaxed font-sans">
                  {result.strategic_impact_summary}
                </p>
              </div>

              {/* Countermeasure Recommendation */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-400 uppercase mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Recommended Strategic Action:</span>
                </div>
                <div className="p-3 bg-emerald-950/20 border border-emerald-900/40 rounded-lg text-xs sm:text-sm text-emerald-300 font-medium">
                  {result.recommended_countermeasure}
                </div>
              </div>

              {result.engine && (
                <div className="text-[10px] text-slate-400 font-mono text-right pt-2 border-t border-slate-800">
                  Engine: <span className="text-slate-300">{result.engine}</span>
                </div>
              )}
            </div>
          </div>

          {/* Structured JSON Output (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg h-full flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono font-bold uppercase text-slate-300">
                    Structured JSON Schema Output
                  </span>
                </div>
                <button
                  onClick={copyJson}
                  className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-mono transition cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy JSON</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex-1 bg-slate-950 rounded-lg p-3.5 border border-slate-800/90 overflow-x-auto text-xs font-mono text-emerald-300/90 leading-relaxed max-h-[500px]">
                <pre>{JSON.stringify(result, null, 2)}</pre>
              </div>

              <div className="mt-3 text-[11px] font-mono text-slate-400">
                ✅ Adheres to production-grade Gemini API schema specification for programmatic downstream defense ingestion.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
