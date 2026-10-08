import React, { useState, useEffect } from 'react';
import { FileCode, Copy, Check, Download, Terminal, CheckCircle2 } from 'lucide-react';

export const PythonBlueprintHub: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string>('synthetic_data_generator.py');
  const [codeContent, setCodeContent] = useState<string>('Loading script content...');
  const [copied, setCopied] = useState<boolean>(false);

  const fileTabs = [
    {
      id: 'synthetic_data_generator.py',
      label: '1. synthetic_data_generator.py',
      badge: 'Pandas & NumPy Generator',
      desc: 'Generates 2,500+ realistic LEO/MEO satellite records (Starlink, Kuiper, OneWeb, Jio, Qianfan).'
    },
    {
      id: 'risk_parser.py',
      label: '2. risk_parser.py',
      badge: 'Google GenAI SDK (Gemini API)',
      desc: 'Parses unstructured space policy news into structured JSON with Threat/Opportunity levels.'
    },
    {
      id: 'app.py',
      label: '3. app.py (Streamlit Dashboard)',
      badge: 'Streamlit & Plotly',
      desc: 'Complete Streamlit application featuring metric cards, scatter plot, sidebar filters, and markdown containers.'
    },
    {
      id: 'requirements.txt',
      label: '4. requirements.txt',
      badge: 'Python Dependencies',
      desc: 'Pinned dependencies for modern execution (pandas, numpy, streamlit, plotly, google-generativeai).'
    }
  ];

  useEffect(() => {
    fetch(`/api/code/${selectedFile}`)
      .then((res) => (res.ok ? res.text() : 'Failed to load file.'))
      .then((txt) => setCodeContent(txt))
      .catch((err) => setCodeContent(`Error loading code: ${err.message}`));
  }, [selectedFile]);

  const copyCode = () => {
    navigator.clipboard.writeText(codeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = () => {
    const blob = new Blob([codeContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = selectedFile;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Production-Grade Python Architecture
              </span>
              <span className="text-xs font-mono text-slate-400">Streamlit • Pandas • NumPy • Google GenAI</span>
            </div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileCode className="w-5 h-5 text-blue-400" />
              <span>Astropolitics Platform Python Blueprint & Source Hub</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Inspect, copy, and export the complete standalone Python implementations for the Synthetic Data Generator, AI Geopolitical Risk Parser, and Streamlit Dashboard.
            </p>
          </div>

          {/* Quick Download Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={downloadFile}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-md transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download {selectedFile}</span>
            </button>
          </div>
        </div>

        {/* Local Run Guide */}
        <div className="mt-5 p-3.5 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-bold text-emerald-400">Quick Local Run Instructions (Terminal):</span>
          </div>
          <div className="space-y-1 text-slate-400">
            <div><span className="text-blue-400"># 1. Install dependencies</span></div>
            <div className="text-slate-200 bg-slate-900/80 px-2 py-1 rounded">pip install -r requirements.txt</div>
            <div className="pt-1"><span className="text-blue-400"># 2. Generate synthetic LEO dataset</span></div>
            <div className="text-slate-200 bg-slate-900/80 px-2 py-1 rounded">python synthetic_data_generator.py --samples 2500 --output data/leo_satellites.csv</div>
            <div className="pt-1"><span className="text-blue-400"># 3. Launch interactive Streamlit dashboard</span></div>
            <div className="text-slate-200 bg-slate-900/80 px-2 py-1 rounded">streamlit run app.py</div>
          </div>
        </div>
      </div>

      {/* Code Viewer Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        {/* File Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/80 overflow-x-auto scrollbar-none">
          {fileTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFile(tab.id)}
              className={`px-4 py-3 text-xs font-mono font-medium border-r border-slate-800 whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
                selectedFile === tab.id
                  ? 'bg-slate-900 text-blue-400 border-b-2 border-b-blue-500 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Description & Action Bar */}
        <div className="px-4 py-2.5 bg-slate-950/60 border-b border-slate-800/80 flex items-center justify-between text-xs font-mono">
          <div className="text-slate-400 truncate max-w-xl">
            {fileTabs.find((t) => t.id === selectedFile)?.desc}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={copyCode}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-slate-400" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Code Pre Block */}
        <div className="bg-[#0b0f19] p-4 overflow-x-auto max-h-[600px] overflow-y-auto text-xs font-mono text-slate-300 leading-relaxed">
          <pre>{codeContent}</pre>
        </div>
      </div>
    </div>
  );
};
