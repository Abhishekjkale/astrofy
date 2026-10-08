import React from 'react';
import { Gem, ArrowRight, ShieldAlert, Compass, Flame, Droplets, Sparkles, Scale } from 'lucide-react';

export const CriticalMinerals: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-800/40 rounded-xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Defense Intelligence Section 5
              </span>
              <span className="text-xs font-mono text-slate-400">Deep Space Resource Hegemony</span>
            </div>
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <Gem className="w-6 h-6 text-amber-400" />
              <span>The Geopolitical Chessboard & Off-Planet Critical Minerals</span>
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
              Control of Low Earth Orbit is directly linked to the future extraction of off-planet resource bases. Deep-space mining operations—targeting Lunar Regolith Helium-3 for clean fusion power and Platinum-Group Metals (PGMs) from Near-Earth Asteroids—cannot function autonomously without a high-bandwidth, ultra-low latency orbital relay backbone.
            </p>
          </div>

          <div className="bg-slate-950/90 border border-amber-800/60 rounded-xl p-4 text-center shrink-0 min-w-[240px]">
            <span className="text-xs font-mono uppercase text-amber-400 font-bold block">
              16 Psyche Asteroid Body
            </span>
            <div className="text-4xl font-black text-amber-400 font-mono mt-1">
              $100T+
            </div>
            <div className="text-xs text-slate-400 mt-1">
              PGM Market Valuation vs. Terrestrial Scarcity
            </div>
          </div>
        </div>
      </div>

      {/* Architectural Linkage Pipeline */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Compass className="w-4 h-4 text-blue-400" />
            <span>Architectural Linkage: LEO to Deep Space Extraction Pipeline</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">Command, Control & Telemetry Grid</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
          <div className="bg-slate-950 p-4 rounded-lg border border-blue-900/40 relative">
            <div className="text-[10px] font-mono text-blue-400 font-bold uppercase mb-1">Layer 1</div>
            <div className="text-sm font-bold text-white">LEO C4ISR / PNT Grid</div>
            <p className="text-xs text-slate-400 mt-1">
              Positioning, Navigation, and Timing baseline + high-frequency combat cloud (Starshield/Jio).
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-purple-900/40 relative">
            <div className="text-[10px] font-mono text-purple-400 font-bold uppercase mb-1">Layer 2</div>
            <div className="text-sm font-bold text-white">Translunar Edge Relays</div>
            <p className="text-xs text-slate-400 mt-1">
              Optical inter-satellite links extending continuous low-latency telemetry to cislunar orbit.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-amber-900/40 relative">
            <div className="text-[10px] font-mono text-amber-400 font-bold uppercase mb-1">Layer 3</div>
            <div className="text-sm font-bold text-white">Lunar South Pole Mining</div>
            <p className="text-xs text-slate-400 mt-1">
              Autonomous prospecting, regolith processing, and Shackleton Crater ice harvesting.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-emerald-900/40 relative">
            <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase mb-1">Layer 4</div>
            <div className="text-sm font-bold text-white">NEA In-Situ Processing</div>
            <p className="text-xs text-slate-400 mt-1">
              Trajectory tracking, robotic tug interception, and automated re-entry logistics to Earth.
            </p>
          </div>
        </div>
      </div>

      {/* The 3 Core Off-Planet Resources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Resource 1: 16 Psyche PGMs */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block mb-1">
            Asteroid Belt Asset
          </span>
          <h3 className="text-base font-bold text-white mb-2">1. Near-Earth Asteroid PGMs</h3>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            A single 500-meter metallic asteroid (e.g., <strong>16 Psyche-type body</strong>) contains Platinum-Group Metals (Platinum, Osmium, Iridium) exceeding <strong>$10 Trillion</strong> in market value.
          </p>
          <div className="p-3 bg-slate-950 rounded border border-slate-800 text-xs text-slate-400 space-y-1">
            <div className="text-slate-300 font-semibold">Strategic Imperative:</div>
            <div>Total relief from terrestrial supply chain vulnerabilities dominated by China and South Africa.</div>
          </div>
        </div>

        {/* Resource 2: Lunar South Pole Water Ice */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3">
            <Droplets className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-mono uppercase text-blue-400 font-bold block mb-1">
            Off-Planet Fuel Depot
          </span>
          <h3 className="text-base font-bold text-white mb-2">2. Lunar South Pole Water Ice</h3>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            Located inside permanently shadowed craters (e.g. <strong>Shackleton Crater</strong>). Serves as the primary <strong>"off-planet propellant depot"</strong>.
          </p>
          <div className="p-3 bg-slate-950 rounded border border-slate-800 text-xs text-slate-400 space-y-1">
            <div className="text-slate-300 font-semibold">Economic Lever:</div>
            <div>
              Electrolyzed into Liquid Hydrogen (LH2) and Liquid Oxygen (LOX), lowering deep-space launch mass penalty and transport costs by <strong>over 90%</strong>.
            </div>
          </div>
        </div>

        {/* Resource 3: Lunar Helium-3 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3">
            <Flame className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-mono uppercase text-purple-400 font-bold block mb-1">
            Next-Gen Clean Fusion
          </span>
          <h3 className="text-base font-bold text-white mb-2">3. Lunar Regolith Helium-3</h3>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            Trapped in lunar regolith through billions of years of solar wind bombardment. The ideal fuel for aneutronic clean fusion power generation.
          </p>
          <div className="p-3 bg-slate-950 rounded border border-slate-800 text-xs text-slate-400 space-y-1">
            <div className="text-slate-300 font-semibold">Energy Density:</div>
            <div>
              Approximately <strong>25 metric tons</strong> of Helium-3 can fulfill the total annual electrical energy consumption of the entire United States.
            </div>
          </div>
        </div>
      </div>

      {/* The Strategic Clash: Artemis Accords vs. Sino-Russian ILRS */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <Scale className="w-5 h-5 text-red-400" />
          <h3 className="text-base font-bold text-white">
            The Strategic Governance Clash: Artemis Accords vs. Sino-Russian ILRS
          </h3>
        </div>
        <p className="text-xs text-slate-400 mb-6 max-w-3xl">
          The regulatory and legal framework for off-planet resource allocation has bifurcated into two competing ideological blocs, creating a race for physical and jurisdictional enclosure over high-value lunar craters.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Artemis Block */}
          <div className="bg-blue-950/20 border border-blue-800/40 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-blue-300">US-Led Artemis Accords</span>
              <span className="text-xs font-mono font-bold bg-blue-900/60 text-blue-200 px-2 py-0.5 rounded">
                40+ Signatories
              </span>
            </div>
            <ul className="text-xs text-slate-300 space-y-2.5">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1 shrink-0" />
                <span>
                  <strong>Commercial Extraction Rights:</strong> Anchored in Outer Space Treaty Article 11; extraction does not constitute national appropriation.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1 shrink-0" />
                <span>
                  <strong>"Safety Zones":</strong> Establishes temporary exclusion zones around operational commercial facilities. Critics argue this creates functional de facto property rights.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1 shrink-0" />
                <span>
                  <strong>Allied Network:</strong> Integrates NASA, ESA, JAXA, ISRO (signatory), and commercial contractors.
                </span>
              </li>
            </ul>
          </div>

          {/* ILRS Block */}
          <div className="bg-red-950/20 border border-red-800/40 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-red-300">Sino-Russian ILRS Consortium</span>
              <span className="text-xs font-mono font-bold bg-red-900/60 text-red-200 px-2 py-0.5 rounded">
                Permanent Base by 2035
              </span>
            </div>
            <ul className="text-xs text-slate-300 space-y-2.5">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1 shrink-0" />
                <span>
                  <strong>State-Centric Hegemony:</strong> Reject US-led Safety Zones as illegal imperialist enclosure and Western unilateral land grabs.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1 shrink-0" />
                <span>
                  <strong>Centralized Governance:</strong> Advocates state-controlled multilateral resource distribution governed by bilateral state treaties.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1 shrink-0" />
                <span>
                  <strong>BRICS+ Space Sphere:</strong> Backed by China CNSA, Roscosmos, and Belt & Road aerospace partners.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
