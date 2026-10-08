import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ConstellationExplorer } from './components/ConstellationExplorer';
import { RiskParserSandbox } from './components/RiskParserSandbox';
import { JioDeepDive } from './components/JioDeepDive';
import { CriticalMinerals } from './components/CriticalMinerals';
import { CounterspaceRisks } from './components/CounterspaceRisks';
import { PythonBlueprintHub } from './components/PythonBlueprintHub';
import { INITIAL_SATELLITES } from './data/fallbackSatellites';
import { SatelliteRecord } from './types/astropolitics';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('explorer');
  const [satellites, setSatellites] = useState<SatelliteRecord[]>(INITIAL_SATELLITES);
  const [loading, setLoading] = useState<boolean>(true);

  // Load complete 2,500 record dataset from server
  const fetchSatellites = async () => {
    setLoading(true);
    try {
      const resp = await fetch('/api/satellites');
      if (resp.ok) {
        const data = await resp.json();
        if (data.satellites && data.satellites.length > 0) {
          setSatellites(data.satellites);
        }
      }
    } catch (err) {
      console.warn('Using initial satellite dataset fallback:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSatellites();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Intelligence Mission Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        satelliteCount={satellites.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'explorer' && (
          <ConstellationExplorer
            satellites={satellites}
            loading={loading}
            onReload={fetchSatellites}
          />
        )}

        {activeTab === 'risk-parser' && <RiskParserSandbox />}

        {activeTab === 'jio-dossier' && <JioDeepDive />}

        {activeTab === 'critical-minerals' && <CriticalMinerals />}

        {activeTab === 'counterspace' && <CounterspaceRisks />}

        {activeTab === 'code-hub' && <PythonBlueprintHub />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-5 text-center text-xs text-slate-400 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-slate-400">
              Astropolitics Intelligence Platform • Defense & Strategic Space Economy
            </span>
          </div>
          <div className="text-slate-400">
            Mahan & Mackinder Orbital Paradigms • Artemis vs. ILRS • Jio Space Tech (SES JV)
          </div>
        </div>
      </footer>
    </div>
  );
}
