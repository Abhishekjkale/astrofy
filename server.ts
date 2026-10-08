import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Helper to load synthetic dataset
let satellitesCache: any[] = [];
const dataFilePath = path.join(__dirname, 'data', 'leo_satellites.json');

function loadSatellitesData() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const raw = fs.readFileSync(dataFilePath, 'utf-8');
      satellitesCache = JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to load satellites json:', err);
  }
}
loadSatellitesData();

// Heuristic fallback parser
function fallbackRiskParser(newsText: string) {
  const textLower = newsText.toLowerCase();

  const entityMap: Record<string, string> = {
    jio: 'Reliance Jio Space Tech',
    india: 'India (IN-SPACe / ISRO)',
    china: 'China (CNSA / PLA Strategic Support)',
    g60: 'China Qianfan (G60 Megaconstellation)',
    guowang: 'China State GuoWang',
    spacex: 'SpaceX',
    starlink: 'SpaceX Starlink',
    starshield: 'SpaceX Starshield / US DoD',
    oneweb: 'Eutelsat OneWeb',
    kuiper: 'Amazon Project Kuiper',
    amazon: 'Amazon',
    artemis: 'NASA / Artemis Accords Coalition',
    ilrs: 'Sino-Russian ILRS Alliance',
    russia: 'Russia (Roscosmos)',
    ses: 'SES O3b mPOWER',
    us: 'United States Space Force'
  };

  const entities: string[] = [];
  for (const [kw, label] of Object.entries(entityMap)) {
    if (textLower.includes(kw) && !entities.includes(label)) {
      entities.push(label);
    }
  }
  if (entities.length === 0) {
    entities.push('Unspecified Sovereign / Commercial Actor');
  }

  let infrastructure = 'Low Earth Orbit (LEO) Telecommunications Shells';
  if (textLower.includes('lunar') || textLower.includes('moon') || textLower.includes('water ice') || textLower.includes('shackleton') || textLower.includes('helium-3')) {
    infrastructure = 'Lunar South Pole Water Ice & Helium-3 Extraction Zones';
  } else if (textLower.includes('spectrum') || textLower.includes('itu') || textLower.includes('frequency') || textLower.includes('ku') || textLower.includes('ka')) {
    infrastructure = 'ITU RF Spectrum Allocations (Ku/Ka/Q/V bands)';
  } else if (textLower.includes('asteroid') || textLower.includes('psyche') || textLower.includes('mining') || textLower.includes('pgm') || textLower.includes('platinum')) {
    infrastructure = 'Near-Earth Asteroid (NEA) Platinum-Group Metal Deposits';
  } else if (textLower.includes('kessler') || textLower.includes('debris') || textLower.includes('asat') || textLower.includes('collision')) {
    infrastructure = 'LEO Orbital Shell Sustainability (Kessler Debris Littoral)';
  } else if (textLower.includes('launch') || textLower.includes('rocket') || textLower.includes('lvm3') || textLower.includes('starship')) {
    infrastructure = 'Heavy-Lift Launch Manifest & Orbital Insertion Logistics';
  }

  let threatLevel = 6;
  let summary = 'Standard orbital regulatory or deployment event detected.';
  let block = 'Neutral / Commercial';
  let countermeasure = 'Maintain space domain awareness and active ITU filing monitoring.';

  if (textLower.includes('jio') || textLower.includes('india')) {
    threatLevel = 7;
    summary = 'Disrupts Western and Chinese duopoly by providing Global South non-aligned, ultra-low cost ($2-$5/GB) satellite broadband using SES MEO assets and domestic ISRO launch vehicles.';
    block = 'Global South Non-Aligned (India Lead)';
    countermeasure = 'Western operators must lower terminal CapEx and explore regional ground station joint ventures.';
  } else if (textLower.includes('china') || textLower.includes('g60') || textLower.includes('guowang')) {
    threatLevel = 8;
    summary = "Accelerates Beijing's Digital Belt & Road infrastructure, establishing state-controlled orbital squatting over critical low-latency shells and locking out competing frequencies.";
    block = 'BRICS+ Alliance (China Lead)';
    countermeasure = 'Accelerate allied rapid-replenishment launch capabilities and coordinate ITU frequency priority defense.';
  } else if (textLower.includes('starshield') || textLower.includes('dod')) {
    threatLevel = 8;
    summary = 'Consolidates Five Eyes tactical C4ISR over LEO combat clouds, creating operational asymmetry but heightening targeted counterspace vulnerability.';
    block = 'Western Bloc (US Space Force / Five Eyes)';
    countermeasure = 'Implement optical inter-satellite link encryption and quantum-resilient telemetry hardening.';
  } else if (textLower.includes('lunar') || textLower.includes('shackleton') || textLower.includes('water ice')) {
    threatLevel = 9;
    summary = 'Direct clash between Artemis Accords commercial Safety Zones and Sino-Russian ILRS state claims over permanently shadowed lunar craters essential for in-situ deep space propellant.';
    block = 'Bipolar Geopolitical Fracture (Artemis vs. ILRS)';
    countermeasure = 'Establish multilateral surface navigation standards and deploy autonomous prospecting escorts.';
  }

  return {
    company_or_country: entities,
    threat_opportunity_level: threatLevel,
    strategic_impact_summary: summary,
    affected_resource_infrastructure: infrastructure,
    geopolitical_block_implication: block,
    recommended_countermeasure: countermeasure,
    engine: 'Astropolitics Heuristic Rule Engine (Fallback)'
  };
}

// API: Get satellites
app.get('/api/satellites', (req, res) => {
  if (satellitesCache.length === 0) {
    loadSatellitesData();
  }
  res.json({
    total: satellitesCache.length,
    satellites: satellitesCache
  });
});

// API: AI Risk Parser
app.post('/api/parse-risk', async (req, res) => {
  const { text } = req.body;
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Text string is required.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    const fallback = fallbackRiskParser(text);
    return res.json(fallback);
  }

  try {
    const ai = new GoogleGenAI();
    const systemPrompt = `You are an expert Astropolitics & Defense Strategic Intelligence Analyst specializing in Low Earth Orbit (LEO) orbital economics, megaconstellations, spectrum governance (ITU), and deep space critical minerals (Lunar Helium-3, Asteroid Platinum-Group Metals).

Analyze the provided space intelligence news dispatch and extract structured intelligence adhering STRICTLY to this JSON schema:
{
  "company_or_country": ["List of sovereign nations, military branches, or corporations mentioned"],
  "threat_opportunity_level": 7,
  "strategic_impact_summary": "Authoritative intelligence assessment explaining how this alters the balance of power, orbital congestion, or resource hegemony.",
  "affected_resource_infrastructure": "Precise orbital or off-planet asset (e.g. LEO Spectrum Ku/Ka/Q/V, Lunar Water Ice at Shackleton Crater, MEO Relays, Near-Earth Asteroid PGMs, Launch Chokepoint)",
  "geopolitical_block_implication": "Western Bloc / BRICS+ Alliance / Global South Non-Aligned / Multilateral Fracture",
  "recommended_countermeasure": "Pragmatic defense, commercial, or regulatory response to mitigate vulnerability or capture market advantage"
}

Return ONLY valid raw JSON without markdown markers.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `${systemPrompt}\n\nSPACE INTELLIGENCE DISPATCH:\n"""${text}"""`,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2
      }
    });

    const rawOutput = response.text ? response.text.trim() : '';
    const cleanOutput = rawOutput.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
    const parsed = JSON.parse(cleanOutput);
    parsed.engine = 'Gemini 3.8 Flash (Live Model)';
    return res.json(parsed);
  } catch (err: any) {
    console.warn('Gemini API call failed, using fallback:', err?.message || err);
    const fallback = fallbackRiskParser(text);
    return res.json({
      ...fallback,
      _api_note: 'Gemini API call encountered an error; fallback analyzer invoked.'
    });
  }
});

// API: Fetch code scripts for viewing & download
app.get('/api/code/:filename', (req, res) => {
  const allowed = ['synthetic_data_generator.py', 'risk_parser.py', 'app.py', 'requirements.txt'];
  const { filename } = req.params;
  if (!allowed.includes(filename)) {
    return res.status(404).json({ error: 'File not permitted' });
  }

  const filePath = path.join(__dirname, filename);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.send(content);
  }
  return res.status(404).json({ error: 'File not found' });
});

// Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Astropolitics Intelligence] Dev server live on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
