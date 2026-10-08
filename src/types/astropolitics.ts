export interface SatelliteRecord {
  Satellite_ID: string;
  Operator: string;
  Country_Origin: string;
  Launch_Date: string;
  Orbit_Altitude: number;
  Spectrum_Band: string;
  Primary_Function: string;
  Geopolitical_Block_Alignment: 'Western' | 'BRICS+' | 'Neutral';
  Inclination_Deg: number;
  Operational_Status: 'Active' | 'Testing / Commissioning' | 'Decommissioned';
  Cost_Per_GB_USD: number;
}

export interface RiskParserResult {
  company_or_country: string[];
  threat_opportunity_level: number;
  strategic_impact_summary: string;
  affected_resource_infrastructure: string;
  geopolitical_block_implication: string;
  recommended_countermeasure: string;
  engine?: string;
  _api_note?: string;
}

export interface ConstellationMatrixItem {
  operator: string;
  constellationSize: string;
  targetAltitude: string;
  frequencies: string;
  militaryAlignment: string;
  regionalStrongholds: string;
  costPerGb: string;
  tag: string;
}
