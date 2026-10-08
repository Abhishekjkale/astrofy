# Astropolitics Intelligence Platform
### Defense & Strategic Assessment: LEO Satellite Megaconstellations, Reliance Jio Disruption & Off-Planet Critical Minerals

---

## 1. System Blueprint & Data Architecture

This platform applies classical maritime command (**Alfred Thayer Mahan**) and Heartland theory (**Halford Mackinder**) to orbital shells between **300 km and 1,200 km** altitude—the critical orbital littoral controlling access to high-value orbits and deep-space extraction zones.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                          ARCHITECTURAL ASTROPOLITICAL PIPELINE                          │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ [1. LEO C4ISR / PNT Grid]                                                             │
│     ├── SpaceX Starlink / Starshield (~550 km, Ku/Ka/Laser, US DoD / Five Eyes)       │
│     ├── China Qianfan (G60) & GuoWang (500-1100 km, Ku/Q/V, Belt & Road / PLA)        │
│     └── Eutelsat OneWeb (~1,200 km, Polar shell, UK MoD / EU GovSatCom)               │
│                                                                                        │
│ [2. Disruptive Multi-Orbit Hybrid Layer]                                              │
│     └── Reliance Jio Space Tech + SES JV                                              │
│           ├── SES O3b mPOWER MEO Backbone (8,000 km) for gigabit transit              │
│           ├── LEO Insertion Nodes (ISRO LVM3 & SSLV)                                  │
│           └── $2–$5 / GB operational threshold vs. $15–$30 / GB Western mean           │
│                                                                                        │
│ [3. Translunar Edge Relays & Deep Space Extraction]                                   │
│     ├── Lunar South Pole (Shackleton Crater Water Ice Propellant Depot: -90% CapEx)    │
│     ├── Lunar Regolith Helium-3 (Aneutronic Clean Fusion Fuel: 25 tons / yr US power)  │
│     └── Near-Earth Asteroid (NEA) PGMs (16 Psyche: >$10 Trillion Platinum/Osmium)      │
│                                                                                        │
│ [4. Competing Governance Regimes]                                                     │
│     ├── US-Led Artemis Accords (40+ Signatories, Art. 11 Commercial Safety Zones)      │
│     └── Sino-Russian ILRS Consortium (2035 Permanent Base, State-Centric Treaties)    │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. File Directory & Artifacts

| Component | File Path | Description |
| :--- | :--- | :--- |
| **Synthetic Generator** | `synthetic_data_generator.py` | Generates 2,500+ realistic LEO/MEO satellite records using Pandas & NumPy |
| **AI Risk Parser** | `risk_parser.py` | Python function using Google GenAI SDK (Gemini API) extracting structured JSON |
| **Streamlit Dashboard** | `app.py` | Standalone Python Streamlit application with Plotly Express interactive scatter plot |
| **Dataset (CSV)** | `data/leo_satellites.csv` | Full pre-generated synthetic dataset |
| **Dataset (JSON)** | `data/leo_satellites.json` | JSON format of the synthetic fleet |
| **Web Platform** | `server.ts` + `src/` | Full-stack interactive mission control platform (React, Vite, Express, Tailwind) |

---

## 3. Quickstart & Execution Guide

### Running with Python (Standalone)

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Generate or re-generate synthetic dataset
python synthetic_data_generator.py --samples 2500 --output data/leo_satellites.csv --format csv

# 3. Test the AI-Powered Geopolitical Risk Parser
python risk_parser.py

# 4. Launch the Streamlit & Plotly Dashboard
streamlit run app.py
```

### Running with Node / Web Platform

```bash
# The application is pre-configured and live on port 3000
npm run dev
```

---

## 4. Key Strategic Insights & Parameters

1. **Reliance Jio Space Tech (SES JV):**
   - Hybrid MEO (8,000 km) + LEO integration.
   - Disruptive pricing threshold of **$2–$5 per GB** (compared to Western averages of **$15–$30 per GB**).
   - Serves as the crucial non-aligned counterweight for the Global South (India, South Asia, Africa, Latin America).
2. **Kessler Syndrome Hazard:**
   - Critical bottleneck at **500–800 km** altitude.
   - A single kinetic ASAT event can trigger tens of thousands of untrackable debris fragments, locking out orbital shells for generations.
3. **Off-Planet Critical Minerals:**
   - **16 Psyche-type metallic asteroids:** Valued in excess of **$10 Trillion** in Platinum-Group Metals (PGMs).
   - **Shackleton Crater Water Ice:** Liquid Hydrogen/Oxygen off-planet propellant depot lowers launch mass penalty by **90%**.
