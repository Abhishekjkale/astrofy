import React from 'react';
import { Shield, Radio, Globe2, Sparkles, Orbit, Gem, FileCode, AlertTriangle } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  satelliteCount: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, satelliteCount }) => {
  const tabs = [
    { id: 'explorer', label: 'LEO Constellation Explorer', icon: Orbit },
    { id: 'risk-parser', label: 'AI Geopolitical Risk Parser', icon: Sparkles },
    { id: 'jio-dossier', label: 'Reliance Jio & Global South', icon: Globe2 },
    { id: 'critical-minerals', label: 'Off-Planet Critical Minerals', icon: Gem },
    { id: 'counterspace', label: 'Threats & Kessler Cascade', icon: AlertTriangle },
    { id: 'code-hub', label: 'Python Blueprint & Scripts', icon: FileCode },
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-950/95 sticky top-0 z-40 backdrop-blur">
      {/* Classification Banner */}
      <div className="bg-red-950/40 border-b border-red-900/40 px-4 py-1.5 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2 text-red-400">
          <Shield className="w-3.5 h-3.5 animate-pulse text-red-500" />
          <span className="font-bold tracking-wider uppercase">Defense & Strategic Intelligence Assessment</span>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden sm:inline">Special Distribution: Orbital Economics & Astropolitics</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span className="hidden md:inline text-slate-400 font-mono">DATE: October 2026</span>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>ITU ORBITAL GRID: LIVE</span>
          </div>
        </div>
      </div>

      {/* Main Branding & Valuation Tickers */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30">
                Astropolitics Strategic Brief
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Global South Triangulation
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>The LEO Satellite Ecosystem & The New Space Race</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Mahan Maritime Command & Mackinder Heartland paradigms applied to orbital shells 300–1,200 km,
              Reliance Jio hybrid disruption, and off-planet critical minerals (Lunar Helium-3 & 16 Psyche PGMs).
            </p>
          </div>

          {/* Strategic Valuation Horizon Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center shrink-0">
            <div className="bg-slate-900/80 border border-slate-800 rounded-lg px-3 py-2">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Filed by 2030</div>
              <div className="text-base sm:text-lg font-black text-blue-400">60,000+</div>
              <div className="text-[10px] text-slate-500">Satellites (ITU)</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-lg px-3 py-2">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Space Economy 2040</div>
              <div className="text-base sm:text-lg font-black text-emerald-400">$1.4T</div>
              <div className="text-[10px] text-slate-500">Global Market</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-lg px-3 py-2">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Asteroid PGMs</div>
              <div className="text-base sm:text-lg font-black text-amber-400">$100T+</div>
              <div className="text-[10px] text-slate-500">16 Psyche Valuation</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-lg px-3 py-2">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Jio Disruption</div>
              <div className="text-base sm:text-lg font-black text-purple-400">$2–$5</div>
              <div className="text-[10px] text-slate-500">/GB Operational Target</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 mt-5 overflow-x-auto pb-1 scrollbar-none border-t border-slate-800/80 pt-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 border border-blue-400'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.id === 'explorer' && satelliteCount > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-blue-800 text-blue-100' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {satelliteCount.toLocaleString()}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
