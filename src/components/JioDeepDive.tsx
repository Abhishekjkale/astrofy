import React from 'react';
import { Globe2, Shield, Rocket, DollarSign, Layers, CheckCircle2, TrendingUp, Cpu } from 'lucide-react';

export const JioDeepDive: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-800/40 rounded-xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Defense Intelligence Section 3
              </span>
              <span className="text-xs font-mono text-slate-400">Strategic Positioning Dossier</span>
            </div>
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <span>The Disruptor: Reliance Jio & Global South Alignment</span>
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
              The entry of Reliance Jio Space Technology (in joint venture with SES) marks a structural shift in space technonationalism. Rather than relying solely on capital-intensive mega-LEO deployments, Jio utilizes a hybrid multi-orbit architecture—combining SES’s O3b mPOWER MEO constellation (8,000 km) with target LEO allocations.
            </p>
          </div>

          <div className="bg-slate-950/90 border border-emerald-800/60 rounded-xl p-4 text-center shrink-0 min-w-[240px]">
            <span className="text-xs font-mono uppercase text-emerald-400 font-bold block">
              Disruptive Bandwidth Floor
            </span>
            <div className="text-4xl font-black text-emerald-400 font-mono mt-1">
              $2 – $5
              <span className="text-base text-slate-400 font-normal"> / GB</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              vs. <span className="text-red-400 font-bold">$15 – $30 / GB</span> Western averages
            </div>
          </div>
        </div>
      </div>

      {/* Triangulation & Strategic Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pillar 1: Geopolitical Triangulation */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg relative">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
            <Globe2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-2">1. Geopolitical Triangulation</h3>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            Reliance Jio serves as a crucial non-aligned geopolitical counterweight. It prevents developing nations in South Asia, Africa, and Latin America from facing a binary choice between:
          </p>
          <ul className="text-xs space-y-2 text-slate-400">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1 shrink-0" />
              <span><strong>Western Corporate Monopolies:</strong> SpaceX Starlink & Amazon Project Kuiper</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1 shrink-0" />
              <span><strong>Chinese State Hegemony:</strong> Qianfan (G60) & GuoWang megaconstellations</span>
            </li>
          </ul>
          <div className="mt-4 p-2.5 bg-slate-950 rounded border border-slate-800 text-[11px] text-slate-400 italic">
            Aligns directly with India's Strategic Autonomy doctrine and leadership across the Global South.
          </div>
        </div>

        {/* Pillar 2: Hybrid MEO + LEO Model */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg relative">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-2">2. Hybrid Multi-Orbit Architecture</h3>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            Bypasses the extreme CapEx and rapid satellite de-orbit decay of pure-LEO constellations:
          </p>
          <ul className="text-xs space-y-2 text-slate-400">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
              <span><strong>SES O3b mPOWER MEO:</strong> Ultra-high throughput backbone operating at 8,000 km altitude with multi-gigabit per second steerable beams.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
              <span><strong>Target LEO Allocations:</strong> Low-latency edge links dedicated to defense, tactical edge compute, and remote IoT.</span>
            </li>
          </ul>
          <div className="mt-4 p-2.5 bg-slate-950 rounded border border-slate-800 text-[11px] text-slate-400 italic">
            Significantly lower orbital replenishment costs compared to maintaining 42,000 LEO satellites.
          </div>
        </div>

        {/* Pillar 3: Terrestrial Scale & Launch Autonomy */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg relative">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
            <Rocket className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-2">3. Domestic Manufacturing & ISRO Launch</h3>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            Synergy with India's domestic industrial base and space agency:
          </p>
          <ul className="text-xs space-y-2 text-slate-400">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Mass User Terminals:</strong> Terrestrial terminal fabrication in India at a fraction of Western phased-array dish costs ($100–$150 vs $600+).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>ISRO Launch Vehicles:</strong> Sovereign orbital insertion via LVM3 (heavy lift) and SSLV (rapid responsive launch).</span>
            </li>
          </ul>
          <div className="mt-4 p-2.5 bg-slate-950 rounded border border-slate-800 text-[11px] text-slate-400 italic">
            Indian Armed Forces secure sovereign, jam-resistant tactical communications across Indo-Pacific littorals.
          </div>
        </div>
      </div>

      {/* Economic Comparison Breakdown */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>Operational Bandwidth Economics: Jio vs. Incumbents</span>
        </h3>
        <p className="text-xs text-slate-400 mb-5">
          Comparison of operational threshold per gigabyte and user terminal CapEx barrier.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
            <div className="text-xs font-mono text-slate-400">SpaceX Starlink</div>
            <div className="text-2xl font-bold text-blue-400 font-mono mt-1">$15 – $25 / GB</div>
            <div className="text-[11px] text-slate-400 mt-2">Terminal CapEx: ~$599</div>
            <div className="text-[11px] text-slate-400 mt-1">Focus: US DoD / NATO / Consumer</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
            <div className="text-xs font-mono text-slate-400">Eutelsat OneWeb</div>
            <div className="text-2xl font-bold text-purple-400 font-mono mt-1">$20 – $30 / GB</div>
            <div className="text-[11px] text-slate-400 mt-2">Terminal CapEx: $2,500+ (Enterprise)</div>
            <div className="text-[11px] text-slate-400 mt-1">Focus: Enterprise / UK MoD / GovSat</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
            <div className="text-xs font-mono text-slate-400">China Qianfan (G60)</div>
            <div className="text-2xl font-bold text-red-400 font-mono mt-1">$10 – $14 / GB</div>
            <div className="text-[11px] text-slate-400 mt-2">Terminal CapEx: Subsidized</div>
            <div className="text-[11px] text-slate-400 mt-1">Focus: Belt & Road / PLA C4ISR</div>
          </div>

          <div className="bg-emerald-950/40 p-4 rounded-lg border border-emerald-600/50 relative">
            <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-emerald-500 text-slate-950">
              Disruptor
            </div>
            <div className="text-xs font-mono text-emerald-300 font-bold">Reliance Jio (SES JV)</div>
            <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">$2 – $5 / GB</div>
            <div className="text-[11px] text-emerald-200/80 mt-2">Terminal CapEx: $120 – $180 Target</div>
            <div className="text-[11px] text-slate-300 mt-1">Focus: Global South / Indo-Pacific</div>
          </div>
        </div>
      </div>
    </div>
  );
};
