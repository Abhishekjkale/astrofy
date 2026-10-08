import React, { useState, useMemo } from 'react';
import { SatelliteRecord } from '../types/astropolitics';
import { CONSTELLATION_COMPARISON_MATRIX } from '../data/fallbackSatellites';
import { Filter, Download, Search, Info, Layers, RefreshCw, BarChart3, Database } from 'lucide-react';

interface ConstellationExplorerProps {
  satellites: SatelliteRecord[];
  onReload?: () => void;
  loading?: boolean;
}

export const ConstellationExplorer: React.FC<ConstellationExplorerProps> = ({
  satellites,
  onReload,
  loading = false,
}) => {
  // Filters State
  const [selectedOperators, setSelectedOperators] = useState<string[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<string>('All');
  const [minAltitude, setMinAltitude] = useState<number>(300);
  const [maxAltitude, setMaxAltitude] = useState<number>(8500);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBand, setSelectedBand] = useState<string>('All');
  const [hoveredSat, setHoveredSat] = useState<SatelliteRecord | null>(null);
  const [viewMode, setViewMode] = useState<'scatter' | 'matrix' | 'table'>('scatter');

  // Available operators list
  const allOperators = useMemo(() => {
    const ops = new Set<string>();
    satellites.forEach((s) => ops.add(s.Operator));
    return Array.from(ops).sort();
  }, [satellites]);

  // Spectrum bands list
  const allBands = useMemo(() => {
    const bands = new Set<string>();
    satellites.forEach((s) => bands.add(s.Spectrum_Band));
    return ['All', ...Array.from(bands).sort()];
  }, [satellites]);

  // Toggle operator selection
  const toggleOperator = (op: string) => {
    setSelectedOperators((prev) =>
      prev.includes(op) ? prev.filter((item) => item !== op) : [...prev, op]
    );
  };

  const selectAllOperators = () => setSelectedOperators([]);
  const selectOnlyJio = () => {
    const jioOp = allOperators.find((o) => o.toLowerCase().includes('jio'));
    if (jioOp) setSelectedOperators([jioOp]);
  };

  // Filtered dataset
  const filteredSatellites = useMemo(() => {
    return satellites.filter((s) => {
      if (selectedOperators.length > 0 && !selectedOperators.includes(s.Operator)) {
        return false;
      }
      if (selectedBlock !== 'All' && s.Geopolitical_Block_Alignment !== selectedBlock) {
        return false;
      }
      if (s.Orbit_Altitude < minAltitude || s.Orbit_Altitude > maxAltitude) {
        return false;
      }
      if (selectedBand !== 'All' && s.Spectrum_Band !== selectedBand) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          s.Satellite_ID.toLowerCase().includes(q) ||
          s.Operator.toLowerCase().includes(q) ||
          s.Primary_Function.toLowerCase().includes(q) ||
          s.Country_Origin.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [satellites, selectedOperators, selectedBlock, minAltitude, maxAltitude, selectedBand, searchQuery]);

  // Summary Metrics
  const metrics = useMemo(() => {
    const total = filteredSatellites.length;
    if (total === 0) {
      return {
        total: 0,
        topOperator: 'None',
        topOperatorShare: 0,
        topOperatorCount: 0,
        topBlock: 'None',
        topBlockShare: 0,
        topBlockCount: 0,
        avgCost: 0,
        jioCount: 0,
      };
    }

    const opCounts: Record<string, number> = {};
    const blockCounts: Record<string, number> = {};
    let costSum = 0;
    let jioUnits = 0;

    filteredSatellites.forEach((s) => {
      opCounts[s.Operator] = (opCounts[s.Operator] || 0) + 1;
      blockCounts[s.Geopolitical_Block_Alignment] =
        (blockCounts[s.Geopolitical_Block_Alignment] || 0) + 1;
      costSum += s.Cost_Per_GB_USD;
      if (s.Operator.toLowerCase().includes('jio')) jioUnits++;
    });

    const sortedOps = Object.entries(opCounts).sort((a, b) => b[1] - a[1]);
    const topOp = sortedOps[0];

    const sortedBlocks = Object.entries(blockCounts).sort((a, b) => b[1] - a[1]);
    const topBlk = sortedBlocks[0];

    return {
      total,
      topOperator: topOp ? topOp[0] : 'None',
      topOperatorCount: topOp ? topOp[1] : 0,
      topOperatorShare: topOp ? (topOp[1] / total) * 100 : 0,
      topBlock: topBlk ? topBlk[0] : 'None',
      topBlockCount: topBlk ? topBlk[1] : 0,
      topBlockShare: topBlk ? (topBlk[1] / total) * 100 : 0,
      avgCost: costSum / total,
      jioCount: jioUnits,
    };
  }, [filteredSatellites]);

  // Color helper
  const getBlockColor = (alignment: string) => {
    switch (alignment) {
      case 'Western':
        return '#3b82f6'; // Blue
      case 'BRICS+':
        return '#ef4444'; // Red
      case 'Neutral':
        return '#10b981'; // Emerald
      default:
        return '#94a3b8';
    }
  };

  // CSV Export helper
  const exportFilteredCSV = () => {
    if (filteredSatellites.length === 0) return;
    const headers = Object.keys(filteredSatellites[0]);
    const rows = filteredSatellites.map((s) =>
      headers.map((h) => `"${(s as any)[h]}"`).join(',')
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `astropolitics_leo_satellites_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Coordinate scales for custom interactive Scatter Plot
  // Date range: 2019-01-01 to 2026-12-31
  const minDateTs = new Date('2019-01-01').getTime();
  const maxDateTs = new Date('2026-12-31').getTime();

  // Non-linear altitude mapping to allow LEO (300-1200km) and MEO (8000km) visualization
  // 300 to 1400 km gets 70% of plot height, 1400 to 8500 km gets top 30%
  const altitudeToY = (alt: number, height: number) => {
    const paddingBottom = 40;
    const paddingTop = 30;
    const usableHeight = height - paddingBottom - paddingTop;

    if (alt <= 1400) {
      // Linear mapping within 300 - 1400 km into lower 70%
      const fraction = (alt - 300) / (1400 - 300);
      const yNorm = fraction * 0.7;
      return height - paddingBottom - yNorm * usableHeight;
    } else {
      // Linear mapping within 1400 - 8500 km into upper 30%
      const fraction = (alt - 1400) / (8500 - 1400);
      const yNorm = 0.7 + fraction * 0.3;
      return height - paddingBottom - yNorm * usableHeight;
    }
  };

  const dateToX = (dateStr: string, width: number) => {
    const paddingLeft = 60;
    const paddingRight = 40;
    const usableWidth = width - paddingLeft - paddingRight;
    const ts = new Date(dateStr).getTime();
    const clampedTs = Math.max(minDateTs, Math.min(maxDateTs, ts));
    const fraction = (clampedTs - minDateTs) / (maxDateTs - minDateTs);
    return paddingLeft + fraction * usableWidth;
  };

  // Sample a max of 750 points for rendering performance if filtered count is large
  const displaySatellites = useMemo(() => {
    if (filteredSatellites.length <= 800) return filteredSatellites;
    const step = Math.ceil(filteredSatellites.length / 800);
    return filteredSatellites.filter((_, idx) => idx % step === 0);
  }, [filteredSatellites]);

  return (
    <div className="space-y-6">
      {/* 1. Metric Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Satellites */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold uppercase text-slate-400">
              Total Profiled Assets
            </span>
            <Database className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-black text-blue-400 mt-2 font-mono tracking-tight">
            {metrics.total.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400 mt-1 flex items-center justify-between">
            <span>Filtered from {satellites.length.toLocaleString()} total</span>
            <span className="text-blue-400/80 font-mono font-bold">LEO Littoral Grid</span>
          </div>
        </div>

        {/* Metric 2: Top Operator */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold uppercase text-slate-400">
              Top Operator Hegemony
            </span>
            <Layers className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-amber-400 mt-2 truncate" title={metrics.topOperator}>
            {metrics.topOperator.split('(')[0].trim() || 'None'}
          </div>
          <div className="text-xs text-slate-400 mt-1 flex items-center justify-between">
            <span>{metrics.topOperatorCount.toLocaleString()} satellites</span>
            <span className="text-amber-400 font-mono font-bold">
              {metrics.topOperatorShare.toFixed(1)}% fleet dominance
            </span>
          </div>
        </div>

        {/* Metric 3: Highest Geopolitical Block Concentration */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden">
          <div className={`absolute top-0 left-0 w-1.5 h-full ${
            metrics.topBlock === 'Western'
              ? 'bg-blue-500'
              : metrics.topBlock === 'BRICS+'
              ? 'bg-red-500'
              : 'bg-emerald-500'
          }`} />
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold uppercase text-slate-400">
              Bloc Concentration
            </span>
            <BarChart3 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className={`text-2xl font-black mt-2 font-mono ${
            metrics.topBlock === 'Western'
              ? 'text-blue-400'
              : metrics.topBlock === 'BRICS+'
              ? 'text-red-400'
              : 'text-emerald-400'
          }`}>
            {metrics.topBlock}
          </div>
          <div className="text-xs text-slate-400 mt-1 flex items-center justify-between">
            <span>{metrics.topBlockCount.toLocaleString()} deployed assets</span>
            <span className="font-mono font-bold text-slate-300">
              {metrics.topBlockShare.toFixed(1)}% concentration
            </span>
          </div>
        </div>

        {/* Metric 4: Average Bandwidth Cost Threshold */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-purple-500" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold uppercase text-slate-400">
              Bandwidth Cost Threshold
            </span>
            <span className="text-xs font-mono text-purple-400 bg-purple-950/60 px-1.5 py-0.5 rounded border border-purple-800/40">
              Jio: $2–$5/GB
            </span>
          </div>
          <div className="text-3xl font-black text-purple-400 mt-2 font-mono tracking-tight">
            ${metrics.avgCost.toFixed(2)}{' '}
            <span className="text-sm font-normal text-slate-400">/ GB</span>
          </div>
          <div className="text-xs text-slate-400 mt-1 flex items-center justify-between">
            <span>Jio units: {metrics.jioCount}</span>
            <span className="text-emerald-400 font-mono font-semibold">
              Disrupts $15–$30 Western Mean
            </span>
          </div>
        </div>
      </div>

      {/* 2. Control Toolbar & Filters */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5 mr-1">
              <Filter className="w-3.5 h-3.5 text-blue-400" />
              Operators:
            </span>
            <button
              onClick={selectAllOperators}
              className={`px-2.5 py-1 rounded text-xs font-medium transition cursor-pointer ${
                selectedOperators.length === 0
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              All Operators ({allOperators.length})
            </button>
            <button
              onClick={selectOnlyJio}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                selectedOperators.some((o) => o.includes('Jio')) && selectedOperators.length === 1
                  ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                  : 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 hover:bg-emerald-900/60'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Isolate Reliance Jio (SES JV)
            </button>

            {/* Individual Operator Pills */}
            {allOperators.map((op) => {
              const isSelected = selectedOperators.includes(op);
              const isJio = op.toLowerCase().includes('jio');
              const shortName = op.split('(')[0].trim();
              return (
                <button
                  key={op}
                  onClick={() => toggleOperator(op)}
                  className={`px-2.5 py-1 rounded text-xs transition cursor-pointer ${
                    isSelected
                      ? isJio
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'bg-blue-600 text-white font-semibold'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {shortName}
                </button>
              );
            })}
          </div>

          {/* View Toggles & Export */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-800 text-xs">
              <button
                onClick={() => setViewMode('scatter')}
                className={`px-3 py-1 rounded transition cursor-pointer ${
                  viewMode === 'scatter' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Scatter Plot
              </button>
              <button
                onClick={() => setViewMode('matrix')}
                className={`px-3 py-1 rounded transition cursor-pointer ${
                  viewMode === 'matrix' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Comparison Matrix
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 rounded transition cursor-pointer ${
                  viewMode === 'table' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Telemetry Table
              </button>
            </div>

            <button
              onClick={exportFilteredCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-mono font-medium border border-slate-700 transition cursor-pointer"
              title="Export filtered records to CSV"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Detailed Secondary Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-3 border-t border-slate-800/80 text-xs">
          {/* Bloc Filter */}
          <div>
            <label className="text-slate-400 font-mono block mb-1">Geopolitical Bloc</label>
            <select
              value={selectedBlock}
              onChange={(e) => setSelectedBlock(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Blocs (Western / BRICS+ / Neutral)</option>
              <option value="Western">Western (US / Five Eyes / NATO)</option>
              <option value="BRICS+">BRICS+ (China / PLA / Belt & Road)</option>
              <option value="Neutral">Neutral (India / Global South)</option>
            </select>
          </div>

          {/* Spectrum Band */}
          <div>
            <label className="text-slate-400 font-mono block mb-1">Spectrum Band</label>
            <select
              value={selectedBand}
              onChange={(e) => setSelectedBand(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-blue-500"
            >
              {allBands.map((b) => (
                <option key={b} value={b}>
                  {b === 'All' ? 'All Frequencies (Ku/Ka/Q/V/Laser)' : b}
                </option>
              ))}
            </select>
          </div>

          {/* Max Altitude Slider */}
          <div>
            <div className="flex justify-between text-slate-400 font-mono mb-1">
              <span>Altitude Ceiling</span>
              <span className="text-blue-400">{maxAltitude.toLocaleString()} km</span>
            </div>
            <input
              type="range"
              min={600}
              max={8500}
              step={100}
              value={maxAltitude}
              onChange={(e) => setMaxAltitude(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>

          {/* Search Box */}
          <div>
            <label className="text-slate-400 font-mono block mb-1">Search ID / Mission</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search STARLINK-5120, Jio, C4ISR..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded pl-8 pr-2.5 py-1.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Primary Visualizer: Orbit Altitude vs Launch Date Scatter Plot */}
      {viewMode === 'scatter' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>LEO Saturation & Orbital Littoral Mapping (Altitude vs. Launch Date)</span>
                <span className="text-xs font-mono font-normal text-slate-400 px-2 py-0.5 rounded bg-slate-800">
                  Showing {displaySatellites.length.toLocaleString()} plotted units
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Horizontal markers indicate key orbital shells: Starlink (~550 km), OneWeb (~1,200 km), and Reliance Jio / SES MEO (~8,000 km).
              </p>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-xs font-mono shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50" />
                <span className="text-slate-300">Western Bloc</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />
                <span className="text-slate-300">BRICS+ Alliance</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                <span className="text-slate-300">Neutral / Global South (Jio)</span>
              </div>
            </div>
          </div>

          {/* Interactive SVG Chart Container */}
          <div className="relative w-full h-[520px] bg-slate-950/80 rounded-lg border border-slate-800/80 overflow-hidden">
            <svg
              className="w-full h-full"
              viewBox="0 0 1000 500"
              preserveAspectRatio="none"
            >
              {/* Grid Lines */}
              <defs>
                <pattern id="grid" width="100" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 100 0 L 0 0 0 50" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="1000" height="500" fill="url(#grid)" />

              {/* Orbital Shell Reference Guidelines */}
              {/* 550 km Shell: Starlink */}
              <line
                x1="60"
                y1={altitudeToY(550, 500)}
                x2="960"
                y2={altitudeToY(550, 500)}
                stroke="#3b82f6"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                opacity="0.6"
              />
              <text
                x="950"
                y={altitudeToY(550, 500) - 6}
                fill="#60a5fa"
                fontSize="10"
                fontFamily="monospace"
                textAnchor="end"
              >
                SpaceX Starlink / Starshield Shell (~550 km)
              </text>

              {/* 1,200 km Shell: OneWeb */}
              <line
                x1="60"
                y1={altitudeToY(1200, 500)}
                x2="960"
                y2={altitudeToY(1200, 500)}
                stroke="#a855f7"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                opacity="0.6"
              />
              <text
                x="950"
                y={altitudeToY(1200, 500) - 6}
                fill="#c084fc"
                fontSize="10"
                fontFamily="monospace"
                textAnchor="end"
              >
                Eutelsat OneWeb Polar Shell (~1,200 km)
              </text>

              {/* 8,000 km Shell: Reliance Jio / SES O3b mPOWER MEO */}
              {maxAltitude >= 7000 && (
                <>
                  <line
                    x1="60"
                    y1={altitudeToY(8000, 500)}
                    x2="960"
                    y2={altitudeToY(8000, 500)}
                    stroke="#10b981"
                    strokeWidth="1.5"
                    strokeDasharray="6 3"
                    opacity="0.75"
                  />
                  <text
                    x="950"
                    y={altitudeToY(8000, 500) - 6}
                    fill="#34d399"
                    fontSize="10"
                    fontFamily="monospace"
                    textAnchor="end"
                    fontWeight="bold"
                  >
                    Reliance Jio / SES O3b mPOWER MEO Backbone (~8,000 km)
                  </text>
                </>
              )}

              {/* X Axis Years */}
              {['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'].map((year) => {
                const xPos = dateToX(`${year}-06-15`, 1000);
                return (
                  <g key={year}>
                    <line x1={xPos} y1="30" x2={xPos} y2="460" stroke="#1e293b" strokeWidth="0.8" />
                    <text x={xPos} y="480" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">
                      {year}
                    </text>
                  </g>
                );
              })}

              {/* Y Axis Altitude Labels */}
              {[
                { alt: 400, label: '400 km' },
                { alt: 550, label: '550 km' },
                { alt: 800, label: '800 km' },
                { alt: 1200, label: '1,200 km' },
                { alt: 8000, label: '8,000 km (MEO)' },
              ].map(({ alt, label }) => {
                if (alt > maxAltitude) return null;
                const yPos = altitudeToY(alt, 500);
                return (
                  <g key={alt}>
                    <line x1="55" y1={yPos} x2="60" stroke="#475569" strokeWidth="1" />
                    <text x="50" y={yPos + 3} fill="#64748b" fontSize="9" textAnchor="end" fontFamily="monospace">
                      {label}
                    </text>
                  </g>
                );
              })}

              {/* Plotted Satellite Nodes */}
              {displaySatellites.map((sat) => {
                const cx = dateToX(sat.Launch_Date, 1000);
                const cy = altitudeToY(sat.Orbit_Altitude, 500);
                const color = getBlockColor(sat.Geopolitical_Block_Alignment);
                const isJio = sat.Operator.toLowerCase().includes('jio');
                const isHovered = hoveredSat?.Satellite_ID === sat.Satellite_ID;

                return (
                  <circle
                    key={sat.Satellite_ID}
                    cx={cx}
                    cy={cy}
                    r={isHovered ? 7 : isJio ? 5 : 3.5}
                    fill={color}
                    opacity={isHovered ? 1 : isJio ? 0.95 : 0.75}
                    stroke={isHovered ? '#ffffff' : isJio ? '#a7f3d0' : '#0f172a'}
                    strokeWidth={isHovered ? 2 : isJio ? 1.5 : 0.5}
                    className="cursor-pointer transition-all hover:scale-150"
                    onMouseEnter={() => setHoveredSat(sat)}
                    onClick={() => setHoveredSat(sat)}
                  />
                );
              })}
            </svg>

            {/* Hover Tooltip Card */}
            {hoveredSat && (
              <div className="absolute top-4 left-16 bg-slate-900/95 border border-slate-700/90 rounded-lg p-3 text-xs shadow-2xl backdrop-blur max-w-sm z-30 pointer-events-none">
                <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-1.5 mb-2">
                  <span className="font-mono font-bold text-white text-sm">{hoveredSat.Satellite_ID}</span>
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono"
                    style={{
                      backgroundColor: `${getBlockColor(hoveredSat.Geopolitical_Block_Alignment)}20`,
                      color: getBlockColor(hoveredSat.Geopolitical_Block_Alignment),
                      border: `1px solid ${getBlockColor(hoveredSat.Geopolitical_Block_Alignment)}40`,
                    }}
                  >
                    {hoveredSat.Geopolitical_Block_Alignment}
                  </span>
                </div>
                <div className="space-y-1 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Operator:</span>
                    <span className="font-semibold text-white">{hoveredSat.Operator}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Altitude & Shell:</span>
                    <span className="font-mono text-blue-400 font-bold">{hoveredSat.Orbit_Altitude.toLocaleString()} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Spectrum:</span>
                    <span className="font-mono text-purple-400">{hoveredSat.Spectrum_Band}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Primary Function:</span>
                    <span className="text-slate-200 truncate max-w-[180px]">{hoveredSat.Primary_Function}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cost Threshold:</span>
                    <span className="font-mono text-emerald-400 font-bold">${hoveredSat.Cost_Per_GB_USD.toFixed(2)} / GB</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                    <span>Launched: {hoveredSat.Launch_Date}</span>
                    <span>Status: {hoveredSat.Operational_Status}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. Comparison Matrix View (Section 4 from Defense Intelligence Assessment) */}
      {viewMode === 'matrix' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Direct Megaconstellation Comparison Matrix</span>
              <span className="text-xs font-mono font-normal text-blue-400 px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800/40">
                Defense Intelligence Section 4
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Cross-examination of orbital architectures, frequency prioritization, defense integration, and Global South disruption.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 font-mono text-slate-400 uppercase text-[11px]">
                  <th className="p-3">Operator / System</th>
                  <th className="p-3">Constellation Size</th>
                  <th className="p-3">Target Altitude</th>
                  <th className="p-3">Primary Frequencies</th>
                  <th className="p-3">Military / Geopolitical Alignment</th>
                  <th className="p-3">Regional Strongholds</th>
                  <th className="p-3 text-right">Cost Threshold</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {CONSTELLATION_COMPARISON_MATRIX.map((item, idx) => {
                  const isJio = item.operator.includes('Jio');
                  return (
                    <tr
                      key={idx}
                      className={`hover:bg-slate-800/50 transition ${
                        isJio ? 'bg-emerald-950/20 border-l-4 border-l-emerald-500' : ''
                      }`}
                    >
                      <td className="p-3 font-semibold text-white">
                        <div className="flex items-center gap-2">
                          <span>{item.operator}</span>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                              isJio
                                ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {item.tag}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 font-mono text-slate-300">{item.constellationSize}</td>
                      <td className="p-3 font-mono text-blue-400 font-medium">{item.targetAltitude}</td>
                      <td className="p-3 text-purple-300 font-mono">{item.frequencies}</td>
                      <td className="p-3 text-slate-300">{item.militaryAlignment}</td>
                      <td className="p-3 text-slate-400">{item.regionalStrongholds}</td>
                      <td className="p-3 font-mono text-right font-bold text-emerald-400">
                        {item.costPerGb}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. Telemetry Data Table View */}
      {viewMode === 'table' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Profiled Fleet Telemetry Feed</h3>
              <p className="text-xs text-slate-400">
                Showing {filteredSatellites.length.toLocaleString()} matching orbital assets
              </p>
            </div>
            <button
              onClick={exportFilteredCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-mono font-medium transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto max-h-[500px] overflow-y-auto border border-slate-800 rounded-lg">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="sticky top-0 bg-slate-950 font-mono text-slate-400 uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-2.5">Satellite ID</th>
                  <th className="p-2.5">Operator</th>
                  <th className="p-2.5">Country</th>
                  <th className="p-2.5">Altitude</th>
                  <th className="p-2.5">Band</th>
                  <th className="p-2.5">Bloc</th>
                  <th className="p-2.5">Primary Function</th>
                  <th className="p-2.5">Launch Date</th>
                  <th className="p-2.5 text-right">Cost / GB</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredSatellites.slice(0, 150).map((sat) => (
                  <tr key={sat.Satellite_ID} className="hover:bg-slate-800/40">
                    <td className="p-2.5 font-mono font-bold text-white">{sat.Satellite_ID}</td>
                    <td className="p-2.5 text-slate-300 truncate max-w-[160px]">{sat.Operator}</td>
                    <td className="p-2.5 text-slate-400">{sat.Country_Origin}</td>
                    <td className="p-2.5 font-mono text-blue-400 font-bold">{sat.Orbit_Altitude} km</td>
                    <td className="p-2.5 font-mono text-purple-400">{sat.Spectrum_Band}</td>
                    <td className="p-2.5">
                      <span
                        className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold"
                        style={{
                          backgroundColor: `${getBlockColor(sat.Geopolitical_Block_Alignment)}20`,
                          color: getBlockColor(sat.Geopolitical_Block_Alignment),
                        }}
                      >
                        {sat.Geopolitical_Block_Alignment}
                      </span>
                    </td>
                    <td className="p-2.5 text-slate-300 truncate max-w-[200px]">{sat.Primary_Function}</td>
                    <td className="p-2.5 font-mono text-slate-400">{sat.Launch_Date}</td>
                    <td className="p-2.5 font-mono text-emerald-400 font-bold text-right">
                      ${sat.Cost_Per_GB_USD.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredSatellites.length > 150 && (
            <div className="text-center text-xs text-slate-500 mt-2 font-mono">
              Displaying first 150 rows. Click "Download CSV" to retrieve all {filteredSatellites.length} records.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
