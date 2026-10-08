import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, Zap, Radio, Crosshair, Bomb, Cpu } from 'lucide-react';

export const CounterspaceRisks: React.FC = () => {
  // Interactive Kessler Syndrome simulation parameters
  const [debrisAltitude, setDebrisAltitude] = useState<number>(650);
  const [simulatedCollisions, setSimulatedCollisions] = useState<number>(2);

  // Approximate cascading fragments calculation
  const generatedFragments = simulatedCollisions * 8400;
  const shellDensityWarning = debrisAltitude >= 500 && debrisAltitude <= 800;

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-red-950/30 border border-red-900/40 rounded-xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-red-500/20 text-red-300 border border-red-500/30">
            Defense Intelligence Section 6
          </span>
          <span className="text-xs font-mono text-slate-400">Critical Threat Assessment</span>
        </div>
        <h2 className="text-2xl font-black text-white flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-red-500" />
          <span>Strategic Outlook & Counterspace Threat Vectors</span>
        </h2>
        <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          As LEO satellite density increases exponentially toward 60,000+ filed units, three operational bottlenecks threaten orbital sustainability and national security: Kessler debris cascades, ITU spectrum warehousing warfare, and anti-satellite (ASAT) counterspace weapons.
        </p>
      </div>

      {/* Threat Vectors Matrix Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
          <Crosshair className="w-4 h-4 text-red-400" />
          <span>Counterspace Threat Matrix & Mitigation Strategies</span>
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Tactical mechanics deployed across soft-kill and hard-kill domains.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 font-mono text-slate-400 uppercase text-[11px]">
                <th className="p-3">Threat Vector</th>
                <th className="p-3">Operational Mechanism</th>
                <th className="p-3">Strategic Impact</th>
                <th className="p-3">Mitigation Strategy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-red-400 flex items-center gap-2">
                  <Bomb className="w-4 h-4 shrink-0" />
                  <span>Kinetic ASAT / Debris</span>
                </td>
                <td className="p-3 text-slate-300 font-mono">
                  Direct-Ascent Missiles / Co-orbital Interceptors
                </td>
                <td className="p-3 text-slate-200">
                  Catastrophic orbital shell destruction (Kessler risk, 10,000+ untrackable fragments)
                </td>
                <td className="p-3 font-mono text-emerald-400">
                  Autonomous collision avoidance & rapid launch replenishment
                </td>
              </tr>

              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-amber-400 flex items-center gap-2">
                  <Zap className="w-4 h-4 shrink-0" />
                  <span>Non-Kinetic Directed Energy</span>
                </td>
                <td className="p-3 text-slate-300 font-mono">
                  High-Power Microwave (HPM) & Ground-Based Lasers
                </td>
                <td className="p-3 text-slate-200">
                  Sensor blinding, optical payload degradation, fried sub-millimeter electronics
                </td>
                <td className="p-3 font-mono text-emerald-400">
                  Optical hardening & laser-proof fast sensor shutters
                </td>
              </tr>

              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-blue-400 flex items-center gap-2">
                  <Radio className="w-4 h-4 shrink-0" />
                  <span>EW & Cyber Interference</span>
                </td>
                <td className="p-3 text-slate-300 font-mono">
                  Uplink/Downlink Jamming & Telemetry Spoofing
                </td>
                <td className="p-3 text-slate-200">
                  Loss of tactical C4ISR connectivity in active conflict theaters
                </td>
                <td className="p-3 font-mono text-emerald-400">
                  Optical Inter-Satellite Links (OISL) & Quantum Encryption
                </td>
              </tr>

              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-purple-400 flex items-center gap-2">
                  <Cpu className="w-4 h-4 shrink-0" />
                  <span>ITU Spectrum Warehousing</span>
                </td>
                <td className="p-3 text-slate-300 font-mono">
                  Overlapping priority filings under first-come ITU rules
                </td>
                <td className="p-3 text-slate-200">
                  Administrative denial of service blocking competitor orbital constellations
                </td>
                <td className="p-3 font-mono text-emerald-400">
                  Global South coalition filings & non-aligned spectrum allocation
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Kessler Syndrome Risk Simulator */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Interactive Kessler Syndrome Cascade Simulation</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Simulate cascading collision dynamics between 500 km and 800 km altitude shells.
            </p>
          </div>
          <div className="px-3 py-1 bg-slate-950 border border-slate-800 rounded text-xs font-mono">
            Critical Chokepoint: <span className="text-red-400 font-bold">500–800 km Shells</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                <span>Collision Altitude Shell:</span>
                <span className="text-blue-400 font-bold">{debrisAltitude} km</span>
              </div>
              <input
                type="range"
                min={300}
                max={1200}
                step={25}
                value={debrisAltitude}
                onChange={(e) => setDebrisAltitude(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-0.5">
                <span>300 km (High drag)</span>
                <span className="text-red-400">550 km (Starlink)</span>
                <span>1,200 km (OneWeb)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                <span>Primary Kinetic Collisions:</span>
                <span className="text-red-400 font-bold">{simulatedCollisions} events</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={simulatedCollisions}
                onChange={(e) => setSimulatedCollisions(Number(e.target.value))}
                className="w-full accent-red-500"
              />
            </div>
          </div>

          {/* Simulation Output Dashboard */}
          <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-slate-400 uppercase">Estimated Untrackable Debris (&gt;1cm):</span>
              <span className="text-2xl font-black font-mono text-red-400">
                ~{generatedFragments.toLocaleString()} fragments
              </span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Orbital Residence Lifetime:</span>
              <span className="font-mono font-bold text-amber-400">
                {debrisAltitude < 450 ? '3 – 8 Months (Atmospheric burn)' : debrisAltitude < 650 ? '15 – 35 Years' : '100+ Years (Generational Lockout)'}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Shell Status:</span>
              <span className={`font-mono font-bold ${shellDensityWarning ? 'text-red-400' : 'text-emerald-400'}`}>
                {shellDensityWarning ? 'CRITICAL SATURATION RISK' : 'MODERATE HAZARD'}
              </span>
            </div>

            <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800 leading-relaxed italic">
              "A single catastrophic collision at 550 km would generate enough high-velocity debris to force thousands of emergency evasive maneuvers per week, triggering cascading chain reactions."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
