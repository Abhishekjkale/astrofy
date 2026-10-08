#!/usr/bin/env python3
"""
Astropolitics Intelligence Platform - Synthetic LEO Satellite Data Generator
Author: Astropolitics & Defense Intelligence Group
Date: October 2026
Description:
    Generates a realistic synthetic dataset modeling the Low Earth Orbit (LEO)
    and Medium Earth Orbit (MEO) megaconstellation ecosystem, featuring incumbents
    (Starlink, OneWeb), new entrants (Reliance Jio Space Tech / SES JV), and rival
    state-backed programs (China Qianfan / G60 & GuoWang, Amazon Project Kuiper).

Attributes Generated:
    - Satellite_ID: Unique identifier (e.g., STARLINK-6142, JIO-089)
    - Operator: Satellite operating entity
    - Country_Origin: Jurisdiction / National flag
    - Launch_Date: Deployment timestamp (ISO format)
    - Orbit_Altitude: Altitude in kilometers (LEO: 300-1200 km, MEO: 8000 km)
    - Spectrum_Band: Frequency allocation (Ku, Ka, Q/V, Laser Inter-Satellite Link)
    - Primary_Function: Tactical C4ISR, Enterprise GovSatCom, Broadband, etc.
    - Geopolitical_Block_Alignment: Western / BRICS+ / Neutral
    - Inclination_Deg: Orbital inclination angle
    - Operational_Status: Active, Testing, Decommissioned
    - Cost_Per_GB_USD: Projected operational bandwidth cost threshold
"""

import argparse
import datetime
import json
import os
import random
from typing import Dict, List, Any, Optional

try:
    import numpy as np
    import pandas as pd
    HAS_PANDAS = True
except ImportError:
    HAS_PANDAS = False


OPERATOR_PROFILES: Dict[str, Dict[str, Any]] = {
    "SpaceX (Starlink / Starshield)": {
        "prefix": "STARLINK",
        "country": "United States",
        "alignment": "Western",
        "altitude_range": (520, 570),
        "inclinations": [53.0, 53.2, 70.0, 97.6],
        "spectrum_bands": ["Ku/Ka/Laser", "Ku/Ka", "Ku/E-band/Laser", "Laser Inter-satellite"],
        "spectrum_weights": [0.45, 0.25, 0.20, 0.10],
        "primary_functions": [
            "Commercial Broadband & Tactical C4ISR",
            "Starshield Defense Combat Cloud",
            "Direct-to-Cellular Relay",
            "Maritime & Aviation Mobility"
        ],
        "function_weights": [0.55, 0.25, 0.15, 0.05],
        "active_ratio": 0.94,
        "base_cost_gb": 18.5,
        "launch_start": datetime.date(2019, 5, 24),
        "launch_end": datetime.date(2026, 10, 1),
        "population_share": 0.58
    },
    "Eutelsat OneWeb": {
        "prefix": "ONEWEB",
        "country": "United Kingdom / France",
        "alignment": "Western",
        "altitude_range": (1190, 1210),
        "inclinations": [87.9],
        "spectrum_bands": ["Ku/Ka-band", "Ku-band"],
        "spectrum_weights": [0.80, 0.20],
        "primary_functions": [
            "Enterprise Backhaul & EU GovSatCom",
            "Arctic Maritime Connectivity",
            "UK MoD Tactical Communications"
        ],
        "function_weights": [0.65, 0.20, 0.15],
        "active_ratio": 0.92,
        "base_cost_gb": 24.0,
        "launch_start": datetime.date(2020, 2, 6),
        "launch_end": datetime.date(2026, 9, 1),
        "population_share": 0.12
    },
    "Amazon Project Kuiper": {
        "prefix": "KUIPER",
        "country": "United States",
        "alignment": "Western",
        "altitude_range": (590, 630),
        "inclinations": [33.0, 42.0, 51.9],
        "spectrum_bands": ["Ka-band", "Ka/Laser Inter-satellite"],
        "spectrum_weights": [0.70, 0.30],
        "primary_functions": [
            "Consumer Broadband & AWS Defense Cloud",
            "Enterprise Ground Station Relay",
            "Rural Last-Mile Bridging"
        ],
        "function_weights": [0.60, 0.25, 0.15],
        "active_ratio": 0.75,
        "base_cost_gb": 22.0,
        "launch_start": datetime.date(2023, 10, 6),
        "launch_end": datetime.date(2026, 10, 1),
        "population_share": 0.08
    },
    "China State / Qianfan (G60 & GuoWang)": {
        "prefix": "QIANFAN",
        "country": "China",
        "alignment": "BRICS+",
        "altitude_range": (500, 1100),
        "inclinations": [50.0, 65.0, 89.0],
        "spectrum_bands": ["Ku/Q/V-band", "Ku/Ka-band", "Q/V-band High-Throughput"],
        "spectrum_weights": [0.50, 0.35, 0.15],
        "primary_functions": [
            "Belt & Road Digital Infrastructure",
            "PLA Strategic Support Force C4ISR",
            "Sino-Russian Space Domain Awareness",
            "Global South Sovereign Cloud Alternative"
        ],
        "function_weights": [0.45, 0.35, 0.10, 0.10],
        "active_ratio": 0.91,
        "base_cost_gb": 12.0,
        "launch_start": datetime.date(2024, 8, 5),
        "launch_end": datetime.date(2026, 10, 1),
        "population_share": 0.14
    },
    "Reliance Jio Space Tech (SES JV)": {
        "prefix": "JIO-SPACE",
        "country": "India",
        "alignment": "Neutral",
        "altitude_range": (580, 8000),  # Hybrid MEO (8,000 km) and target LEO integration
        "inclinations": [0.0, 28.5, 45.0],
        "spectrum_bands": ["Ka/C-band", "Ka-band High Throughput", "Laser Inter-satellite (Planned)"],
        "spectrum_weights": [0.55, 0.35, 0.10],
        "primary_functions": [
            "Global South Low-Cost Gigabit Broadband",
            "Indian Armed Forces Multi-Orbit Tactical Link",
            "ISRO NavIC Translunar Augmentation",
            "Indo-Pacific Littoral Maritime Grid"
        ],
        "function_weights": [0.50, 0.25, 0.15, 0.10],
        "active_ratio": 0.95,
        "base_cost_gb": 3.50,  # $2-$5/GB disruptive threshold
        "launch_start": datetime.date(2023, 10, 27),
        "launch_end": datetime.date(2026, 10, 1),
        "population_share": 0.08
    }
}


def random_date(start: datetime.date, end: datetime.date) -> str:
    """Generate a random ISO date between start and end."""
    delta_days = (end - start).days
    if delta_days <= 0:
        return start.isoformat()
    random_days = random.randint(0, delta_days)
    res_date = start + datetime.timedelta(days=random_days)
    return res_date.isoformat()


def generate_leo_dataset_raw(n_samples: int = 2500, random_seed: int = 42) -> List[Dict[str, Any]]:
    """
    Generate synthetic LEO megaconstellation dataset without requiring third-party libraries.
    Ensures reproducibility and strict adherence to astropolitical domain parameters.
    """
    random.seed(random_seed)
    operators = list(OPERATOR_PROFILES.keys())
    shares = [OPERATOR_PROFILES[op]["population_share"] for op in operators]
    total_share = sum(shares)
    norm_shares = [s / total_share for s in shares]

    records: List[Dict[str, Any]] = []

    # Calculate count per operator
    operator_counts = {}
    remaining = n_samples
    for i, op in enumerate(operators):
        if i == len(operators) - 1:
            cnt = remaining
        else:
            cnt = int(n_samples * norm_shares[i])
            remaining -= cnt
        operator_counts[op] = cnt

    sat_counter = 1000

    for operator, count in operator_counts.items():
        profile = OPERATOR_PROFILES[operator]
        prefix = profile["prefix"]
        country = profile["country"]
        alignment = profile["alignment"]
        min_alt, max_alt = profile["altitude_range"]

        for i in range(count):
            sat_counter += 1
            sat_id = f"{prefix}-{sat_counter:05d}"
            
            # Orbit altitude distribution
            if operator == "Reliance Jio Space Tech (SES JV)":
                # 65% in SES O3b mPOWER MEO shell (8,000 km), 35% in early LEO evaluation shell (580-680 km)
                if random.random() < 0.65:
                    altitude = int(random.gauss(8000, 30))
                else:
                    altitude = random.randint(580, 680)
            elif operator == "China State / Qianfan (G60 & GuoWang)":
                # Multi-shell deployment: Shell 1 ~500-600km, Shell 2 ~1000-1100km
                if random.random() < 0.70:
                    altitude = random.randint(510, 620)
                else:
                    altitude = random.randint(980, 1100)
            else:
                altitude = random.randint(min_alt, max_alt)

            # Spectrum Band weighted selection
            spectrum = random.choices(
                profile["spectrum_bands"],
                weights=profile["spectrum_weights"],
                k=1
            )[0]

            # Primary Function weighted selection
            function = random.choices(
                profile["primary_functions"],
                weights=profile["function_weights"],
                k=1
            )[0]

            # Inclination
            inclination = random.choice(profile["inclinations"]) + round(random.uniform(-0.1, 0.1), 2)

            # Launch Date
            launch_date = random_date(profile["launch_start"], profile["launch_end"])

            # Operational Status
            is_active = random.random() < profile["active_ratio"]
            status = "Active" if is_active else ("Testing / Commissioning" if random.random() < 0.6 else "Decommissioned")

            # Operational cost per GB ($2-$5 for Jio, $15-$30 for Western, $10-$15 for Chinese)
            cost_gb = round(random.gauss(profile["base_cost_gb"], 0.8), 2)
            cost_gb = max(1.80, cost_gb)

            record = {
                "Satellite_ID": sat_id,
                "Operator": operator,
                "Country_Origin": country,
                "Launch_Date": launch_date,
                "Orbit_Altitude": altitude,
                "Spectrum_Band": spectrum,
                "Primary_Function": function,
                "Geopolitical_Block_Alignment": alignment,
                "Inclination_Deg": round(inclination, 2),
                "Operational_Status": status,
                "Cost_Per_GB_USD": cost_gb
            }
            records.append(record)

    # Shuffle to simulate mixed telemetry feed
    random.shuffle(records)
    return records


def generate_leo_dataset_pandas(n_samples: int = 2500, random_seed: int = 42):
    """
    Generate dataset and return as a Pandas DataFrame if pandas is installed.
    """
    records = generate_leo_dataset_raw(n_samples=n_samples, random_seed=random_seed)
    if HAS_PANDAS:
        df = pd.DataFrame(records)
        df["Launch_Date"] = pd.to_datetime(df["Launch_Date"])
        df = df.sort_values(by="Launch_Date").reset_index(drop=True)
        return df
    return records


def save_dataset(data: Any, output_path: str, fmt: str = "csv") -> str:
    """Save the dataset to the specified file format."""
    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    if fmt == "csv":
        if HAS_PANDAS and hasattr(data, "to_csv"):
            data.to_csv(output_path, index=False)
        else:
            # Native CSV writer fallback
            records = data if isinstance(data, list) else data.to_dict(orient="records")
            if not records:
                return output_path
            headers = list(records[0].keys())
            with open(output_path, "w", encoding="utf-8") as f:
                f.write(",".join(headers) + "\n")
                for r in records:
                    row_vals = [f'"{str(r[h])}"' if "," in str(r[h]) else str(r[h]) for h in headers]
                    f.write(",".join(row_vals) + "\n")
    elif fmt == "json":
        records = data if isinstance(data, list) else data.to_dict(orient="records")
        # Ensure datetimes are serialized as ISO strings
        clean_records = []
        for r in records:
            clean_r = dict(r)
            if hasattr(clean_r.get("Launch_Date"), "isoformat"):
                clean_r["Launch_Date"] = clean_r["Launch_Date"].isoformat()
            clean_records.append(clean_r)
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(clean_records, f, indent=2)
    return output_path


def main():
    parser = argparse.ArgumentParser(
        description="Generate synthetic LEO ecosystem dataset for Astropolitics Intelligence Platform."
    )
    parser.add_argument("--samples", type=int, default=2500, help="Number of satellite records to generate")
    parser.add_argument("--output", type=str, default="data/leo_satellites.csv", help="Output file path")
    parser.add_argument("--format", choices=["csv", "json"], default="csv", help="Output format")
    parser.add_argument("--seed", type=int, default=42, help="Random seed for reproducibility")
    args = parser.parse_args()

    print(f"[ASTROPOLITICS INTEL] Generating {args.samples} synthetic LEO satellite records...")
    data = generate_leo_dataset_pandas(n_samples=args.samples, random_seed=args.seed)
    saved_path = save_dataset(data, args.output, fmt=args.format)
    print(f"[ASTROPOLITICS INTEL] Successfully generated and exported dataset to: {saved_path}")


if __name__ == "__main__":
    main()
