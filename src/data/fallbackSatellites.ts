import { SatelliteRecord } from '../types/astropolitics';

export const INITIAL_SATELLITES: SatelliteRecord[] = [
  {
    Satellite_ID: 'STARLINK-5120',
    Operator: 'SpaceX (Starlink / Starshield)',
    Country_Origin: 'United States',
    Launch_Date: '2024-03-15',
    Orbit_Altitude: 550,
    Spectrum_Band: 'Ku/Ka/Laser',
    Primary_Function: 'Tactical C4ISR & Broadband',
    Geopolitical_Block_Alignment: 'Western',
    Inclination_Deg: 53.0,
    Operational_Status: 'Active',
    Cost_Per_GB_USD: 18.5
  },
  {
    Satellite_ID: 'STARSHIELD-042',
    Operator: 'SpaceX (Starlink / Starshield)',
    Country_Origin: 'United States',
    Launch_Date: '2024-06-22',
    Orbit_Altitude: 560,
    Spectrum_Band: 'Ku/E-band/Laser',
    Primary_Function: 'Starshield Defense Combat Cloud',
    Geopolitical_Block_Alignment: 'Western',
    Inclination_Deg: 70.0,
    Operational_Status: 'Active',
    Cost_Per_GB_USD: 19.2
  },
  {
    Satellite_ID: 'JIO-SPACE-014',
    Operator: 'Reliance Jio Space Tech (SES JV)',
    Country_Origin: 'India',
    Launch_Date: '2024-05-10',
    Orbit_Altitude: 8000,
    Spectrum_Band: 'Ka/C-band',
    Primary_Function: 'Global South Low-Cost Gigabit Broadband',
    Geopolitical_Block_Alignment: 'Neutral',
    Inclination_Deg: 0.0,
    Operational_Status: 'Active',
    Cost_Per_GB_USD: 3.4
  },
  {
    Satellite_ID: 'JIO-SPACE-029',
    Operator: 'Reliance Jio Space Tech (SES JV)',
    Country_Origin: 'India',
    Launch_Date: '2025-02-18',
    Orbit_Altitude: 620,
    Spectrum_Band: 'Ka-band High Throughput',
    Primary_Function: 'Indian Armed Forces Multi-Orbit Tactical Link',
    Geopolitical_Block_Alignment: 'Neutral',
    Inclination_Deg: 45.0,
    Operational_Status: 'Active',
    Cost_Per_GB_USD: 3.8
  },
  {
    Satellite_ID: 'ONEWEB-0412',
    Operator: 'Eutelsat OneWeb',
    Country_Origin: 'United Kingdom / France',
    Launch_Date: '2023-01-20',
    Orbit_Altitude: 1200,
    Spectrum_Band: 'Ku/Ka-band',
    Primary_Function: 'Enterprise Backhaul & EU GovSatCom',
    Geopolitical_Block_Alignment: 'Western',
    Inclination_Deg: 87.9,
    Operational_Status: 'Active',
    Cost_Per_GB_USD: 24.1
  },
  {
    Satellite_ID: 'QIANFAN-018',
    Operator: 'China State / Qianfan (G60 & GuoWang)',
    Country_Origin: 'China',
    Launch_Date: '2024-08-05',
    Orbit_Altitude: 580,
    Spectrum_Band: 'Ku/Q/V-band',
    Primary_Function: 'Belt & Road Digital Infrastructure',
    Geopolitical_Block_Alignment: 'BRICS+',
    Inclination_Deg: 50.0,
    Operational_Status: 'Active',
    Cost_Per_GB_USD: 11.5
  },
  {
    Satellite_ID: 'QIANFAN-044',
    Operator: 'China State / Qianfan (G60 & GuoWang)',
    Country_Origin: 'China',
    Launch_Date: '2025-01-12',
    Orbit_Altitude: 1050,
    Spectrum_Band: 'Q/V-band High-Throughput',
    Primary_Function: 'PLA Strategic Support Force C4ISR',
    Geopolitical_Block_Alignment: 'BRICS+',
    Inclination_Deg: 65.0,
    Operational_Status: 'Active',
    Cost_Per_GB_USD: 12.0
  },
  {
    Satellite_ID: 'KUIPER-PROTO-01',
    Operator: 'Amazon Project Kuiper',
    Country_Origin: 'United States',
    Launch_Date: '2023-10-06',
    Orbit_Altitude: 590,
    Spectrum_Band: 'Ka-band',
    Primary_Function: 'Consumer Broadband & AWS Defense Cloud',
    Geopolitical_Block_Alignment: 'Western',
    Inclination_Deg: 33.0,
    Operational_Status: 'Testing / Commissioning',
    Cost_Per_GB_USD: 22.5
  }
];

export const CONSTELLATION_COMPARISON_MATRIX = [
  {
    operator: 'SpaceX (Starlink / Starshield)',
    constellationSize: '~6,300 Active / 42,000 Planned',
    targetAltitude: 'LEO (520–570 km)',
    frequencies: 'Ku, Ka, E-band, Laser Inter-satellite',
    militaryAlignment: 'US DoD, NATO, Five Eyes (Starshield integration)',
    regionalStrongholds: 'North America, Europe, Australia, Ukraine, Japan',
    costPerGb: '$15 – $22',
    tag: 'Western Hegemon'
  },
  {
    operator: 'Eutelsat OneWeb',
    constellationSize: '~634 Active / 648 Gen-1 (Gen-2 Planned)',
    targetAltitude: 'LEO (1,200 km)',
    frequencies: 'Ku, Ka-band',
    militaryAlignment: 'UK MoD, European Defense Agency, EU GovSatCom',
    regionalStrongholds: 'United Kingdom, Europe, Arctic Region, India (Enterprise)',
    costPerGb: '$20 – $28',
    tag: 'European Counter-Entity'
  },
  {
    operator: 'Amazon Project Kuiper',
    constellationSize: 'Prototype Phase / 3,236 Planned',
    targetAltitude: 'LEO (590–630 km)',
    frequencies: 'Ka-band',
    militaryAlignment: 'US Commercial / AWS Defense Cloud Integration',
    regionalStrongholds: 'United States, Latin America, Europe (Pending deployment)',
    costPerGb: '$18 – $25',
    tag: 'Western Commercial Challenger'
  },
  {
    operator: 'China State / Qianfan (G60 & GuoWang)',
    constellationSize: '~108 Active / 14,000+ Planned',
    targetAltitude: 'LEO (500–1,100 km)',
    frequencies: 'Ku, Q/V-band',
    militaryAlignment: 'PLA Strategic Support Force, Belt & Road Initiative',
    regionalStrongholds: 'Mainland China, Southeast Asia, Central Asia, Africa',
    costPerGb: '$10 – $14',
    tag: 'BRICS+ State Megaconstellation'
  },
  {
    operator: 'Reliance Jio Space Tech (SES JV)',
    constellationSize: 'Hybrid (MEO Active / LEO Planned)',
    targetAltitude: 'MEO (8,000 km) + LEO Integration',
    frequencies: 'Ka, C-band',
    militaryAlignment: 'Indian Armed Forces, Global South Strategic Partner',
    regionalStrongholds: 'India, South Asia, Indo-Pacific Littorals, East Africa',
    costPerGb: '$2 – $5 (Extreme Disruption)',
    tag: 'Global South Disruptor'
  }
];

export const PRESET_DISPATCHES = [
  {
    id: 'jio-spectrum',
    title: 'India Space Policy & Jio Spectrum Allocation',
    entity: 'Reliance Jio / India',
    tag: 'Spectrum Disruption',
    text: "India's Space Policy updates spectrum allocations for Jio Space Technology to pair SES O3b mPOWER MEO capacity with domestic ISRO launch vehicles for Global South deployment."
  },
  {
    id: 'china-g60',
    title: 'China Qianfan (G60) 18-Satellite Orbit Insertion',
    entity: 'China / PLA',
    tag: 'Orbital Squatting',
    text: "China launches 18 G60 Qianfan megaconstellation satellites from Taiyuan, commencing orbital shell saturation along the Belt and Road corridor."
  },
  {
    id: 'starshield-nro',
    title: 'Starshield $1.8B NRO Classified C4ISR Contract',
    entity: 'SpaceX / US DoD',
    tag: 'Combat Cloud Hegemony',
    text: "SpaceX signs $1.8B classified contract to integrate Starshield with National Reconnaissance Office (NRO) for real-time tactical C4ISR missile tracking."
  },
  {
    id: 'shackleton-ice',
    title: 'Shackleton Crater Lunar Water Ice Territory Clash',
    entity: 'Artemis vs. ILRS',
    tag: 'Off-Planet Mineral Conflict',
    text: "Dispute escalates over Shackleton Crater at Lunar South Pole: US cites Artemis Accords Article 11 Safety Zones, while Sino-Russian ILRS consortium alleges illegal resource enclosure."
  },
  {
    id: 'psyche-pgm',
    title: '16 Psyche Asteroid Platinum Metals Valuation',
    entity: 'Deep Space Prospecting',
    tag: '$10T Critical Metals',
    text: "Deep space mining consortium files orbital trajectory relay claim for 16 Psyche metallic asteroid body, estimating Platinum-Group Metal (PGM) reserves exceeding $10 Trillion."
  },
  {
    id: 'kessler-debris',
    title: 'Kinetic ASAT Debris Cascade at 650km',
    entity: 'Space Domain Security',
    tag: 'Kessler Syndrome Threat',
    text: "Debris cascade alert in 650km orbital shell following kinetic anti-satellite interceptor test, forcing emergency autonomous evasive maneuvers across 140 commercial satellites."
  }
];
