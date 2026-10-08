#!/usr/bin/env python3
"""
Astropolitics Intelligence Platform - Interactive Dashboard
Author: Astropolitics & Defense Intelligence Group
Date: October 2026
Framework: Streamlit & Plotly
Description:
    Profiles the Low Earth Orbit (LEO) satellite ecosystem, tracks disruption
    from emerging players like Reliance Jio (SES JV), and analyzes the geopolitical
    race for outer space critical minerals and lunar-adjacent infrastructures.
"""

import os
import sys
import json
from datetime import datetime
from typing import Optional

import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go

# Local imports
try:
    from synthetic_data_generator import generate_leo_dataset_pandas, save_dataset
except ImportError:
    generate_leo_dataset_pandas = None

try:
    from risk_parser import parse_geopolitical_risk
except ImportError:
    parse_geopolitical_risk = None


# -----------------------------------------------------------------------------
# 1. Page Configuration & Theme
# -----------------------------------------------------------------------------
st.set_page_config(
    page_title="Astropolitics Intelligence Platform | LEO & Lunar Race",
    page_icon="🛰️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom High-Tech Tactical Dark CSS
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
    
    html, body, [class*="css"] {
        font-family: 'Inter', sans-serif;
    }
    code, pre, .mono-font {
        font-family: 'JetBrains Mono', monospace;
    }
    
    /* Top Banner Badge */
    .intel-header-badge {
        display: inline-block;
        padding: 4px 12px;
        background: rgba(239, 68, 68, 0.15);
        border: 1px solid rgba(239, 68, 68, 0.4);
        color: #f87171;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        margin-bottom: 0.5rem;
    }

    /* Custom Cards / Containers */
    .intel-card {
        background-color: #0f172a;
        border: 1px solid #1e293b;
        border-radius: 8px;
        padding: 1.25rem;
        margin-bottom: 1rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
    }

    .intel-card-accent {
        border-left: 4px solid #3b82f6;
    }

    .intel-card-gold {
        border-left: 4px solid #f59e0b;
    }

    .intel-card-emerald {
        border-left: 4px solid #10b981;
    }

    .stat-number {
        font-size: 1.85rem;
        font-weight: 700;
        letter-spacing: -0.02em;
        line-height: 1.2;
    }

    .stat-label {
        font-size: 0.78rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #94a3b8;
        margin-top: 0.2rem;
    }
</style>
""", unsafe_allow_html=True)


# -----------------------------------------------------------------------------
# 2. Data Loading & Ingestion Pipeline
# -----------------------------------------------------------------------------
DATA_PATH = "data/leo_satellites.csv"

@st.cache_data(show_spinner=False)
def load_satellite_data() -> pd.DataFrame:
    """Load LEO dataset with caching and fallback generation."""
    if os.path.exists(DATA_PATH):
        try:
            df = pd.read_csv(DATA_PATH)
            df["Launch_Date"] = pd.to_datetime(df["Launch_Date"])
            return df
        except Exception as e:
            st.error(f"Error loading existing dataset: {e}")

    # Fallback to generator
    if generate_leo_dataset_pandas is not None:
        df = generate_leo_dataset_pandas(n_samples=2500, random_seed=42)
        save_dataset(df, DATA_PATH, fmt="csv")
        return df

    # Minimal in-memory fallback
    st.warning("Using synthesized in-memory fallback dataset.")
    dummy_data = {
        "Satellite_ID": ["STARLINK-101", "ONEWEB-201", "JIO-SPACE-001", "QIANFAN-301", "KUIPER-401"],
        "Operator": [
            "SpaceX (Starlink / Starshield)",
            "Eutelsat OneWeb",
            "Reliance Jio Space Tech (SES JV)",
            "China State / Qianfan (G60 & GuoWang)",
            "Amazon Project Kuiper"
        ],
        "Country_Origin": ["United States", "United Kingdom / France", "India", "China", "United States"],
        "Launch_Date": pd.to_datetime(["2023-01-15", "2022-08-20", "2024-03-10", "2024-09-01", "2023-11-05"]),
        "Orbit_Altitude": [550, 1200, 8000, 600, 610],
        "Spectrum_Band": ["Ku/Ka/Laser", "Ku/Ka-band", "Ka/C-band", "Ku/Q/V-band", "Ka-band"],
        "Primary_Function": [
            "Tactical C4ISR & Broadband",
            "Enterprise Backhaul",
            "Global South Low-Cost Gigabit Broadband",
            "Belt & Road Digital Infrastructure",
            "Consumer Broadband & AWS Cloud"
        ],
        "Geopolitical_Block_Alignment": ["Western", "Western", "Neutral", "BRICS+", "Western"],
        "Operational_Status": ["Active", "Active", "Active", "Active", "Testing / Commissioning"],
        "Cost_Per_GB_USD": [18.5, 24.0, 3.5, 12.0, 22.0]
    }
    return pd.DataFrame(dummy_data)


df_raw = load_satellite_data()


# -----------------------------------------------------------------------------
# 3. Sidebar Controls & Filtering
# -----------------------------------------------------------------------------
st.sidebar.markdown("""
<div style="padding: 0.5rem 0 1rem 0;">
    <span class="intel-header-badge">ASTROPOLITICS DEFENSE BRIEF</span>
    <h3 style="margin: 0; font-weight: 700;">Orbital Intelligence</h3>
    <p style="color: #94a3b8; font-size: 0.85rem; margin-top: 0.2rem;">
        LEO Hegemony, Reliance Jio Disruption & Mineral Extraction
    </p>
</div>
""", unsafe_allow_html=True)

st.sidebar.subheader("Constellation Filters")

# Operator Filter (Explicitly ensuring Reliance Jio is included and prominent)
all_operators = sorted(df_raw["Operator"].unique().tolist())
default_operators = all_operators  # select all by default

selected_operators = st.sidebar.multiselect(
    "Operators / Systems",
    options=all_operators,
    default=default_operators,
    help="Filter by megaconstellation operator. Note Reliance Jio Space Tech (SES JV) provides Global South triangulation."
)

# Geopolitical Alignment
alignments = ["All"] + sorted(df_raw["Geopolitical_Block_Alignment"].unique().tolist())
selected_alignment = st.sidebar.selectbox("Geopolitical Block Alignment", options=alignments, index=0)

# Altitude Range Slider
min_alt = int(df_raw["Orbit_Altitude"].min())
max_alt = int(df_raw["Orbit_Altitude"].max())
selected_altitude_range = st.sidebar.slider(
    "Orbit Altitude Range (km)",
    min_value=min_alt,
    max_value=max_alt,
    value=(min_alt, max_alt),
    step=50,
    help="Altitude spans LEO littoral shells (300-1200 km) and Jio/SES MEO shell (~8000 km)."
)

# Operational Status Filter
all_statuses = ["All"] + sorted(df_raw["Operational_Status"].unique().tolist())
selected_status = st.sidebar.selectbox("Operational Status", options=all_statuses, index=0)

# Apply Filters
df_filtered = df_raw.copy()

if selected_operators:
    df_filtered = df_filtered[df_filtered["Operator"].isin(selected_operators)]

if selected_alignment != "All":
    df_filtered = df_filtered[df_filtered["Geopolitical_Block_Alignment"] == selected_alignment]

df_filtered = df_filtered[
    (df_filtered["Orbit_Altitude"] >= selected_altitude_range[0]) &
    (df_filtered["Orbit_Altitude"] <= selected_altitude_range[1])
]

if selected_status != "All":
    df_filtered = df_filtered[df_filtered["Operational_Status"] == selected_status]

st.sidebar.markdown("---")
st.sidebar.markdown("""
<div style="font-size: 0.75rem; color: #64748b; line-height: 1.4;">
    <strong>Strategic Context:</strong><br>
    Mahan Maritime Command & Mackinder Heartland paradigms applied to orbital shells 300–1200 km.
    <br><br>
    <em>Source: Astropolitics & Defense Intelligence Group (Oct 2026)</em>
</div>
""", unsafe_allow_html=True)


# -----------------------------------------------------------------------------
# 4. Header & Executive Summary Row
# -----------------------------------------------------------------------------
col_header_1, col_header_2 = st.columns([3, 1])

with col_header_1:
    st.markdown("""
    <div style="margin-bottom: 0.5rem;">
        <span class="intel-header-badge">DEFENSE & STRATEGIC ASSESSMENT | SPECIAL DISTRIBUTION</span>
    </div>
    <h1 style="margin: 0; font-size: 2.2rem; font-weight: 800; letter-spacing: -0.02em;">
        The LEO Satellite Ecosystem & The New Space Race
    </h1>
    <p style="color: #94a3b8; font-size: 1.05rem; margin-top: 0.4rem; max-width: 900px;">
        Orbital economics, spectrum bottlenecks, Reliance Jio Global South disruption, and the geopolitical race for off-planet critical minerals (Lunar Helium-3 & Asteroid PGMs).
    </p>
    """, unsafe_allow_html=True)

with col_header_2:
    st.markdown("""
    <div style="background: #0f172a; border: 1px solid #1e293b; border-radius: 8px; padding: 0.85rem; text-align: center;">
        <div style="font-size: 0.75rem; color: #64748b; text-transform: uppercase; font-weight: 600;">Valuation Horizons</div>
        <div style="font-size: 1.4rem; font-weight: 800; color: #38bdf8;">$100T+</div>
        <div style="font-size: 0.75rem; color: #94a3b8;">Asteroid Minerals (16 Psyche)</div>
        <div style="font-size: 0.95rem; font-weight: 700; color: #10b981; margin-top: 0.3rem;">$1.4 Trillion</div>
        <div style="font-size: 0.7rem; color: #64748b;">Global Space Economy by 2040</div>
    </div>
    """, unsafe_allow_html=True)

st.markdown("<div style='height: 10px;'></div>", unsafe_allow_html=True)


# -----------------------------------------------------------------------------
# 5. Metric Row (Explicitly Requested: Total Satellites, Top Operator, Highest Concentration)
# -----------------------------------------------------------------------------
total_satellites = len(df_filtered)

if total_satellites > 0:
    top_operator = df_filtered["Operator"].value_counts().index[0]
    top_operator_count = df_filtered["Operator"].value_counts().iloc[0]
    top_operator_share = (top_operator_count / total_satellites) * 100

    top_block = df_filtered["Geopolitical_Block_Alignment"].value_counts().index[0]
    top_block_count = df_filtered["Geopolitical_Block_Alignment"].value_counts().iloc[0]
    top_block_share = (top_block_count / total_satellites) * 100

    avg_cost = df_filtered["Cost_Per_GB_USD"].mean()
    jio_count = len(df_filtered[df_filtered["Operator"].str.contains("Jio", case=False, na=False)])
else:
    top_operator = "None"
    top_operator_count = 0
    top_operator_share = 0
    top_block = "None"
    top_block_count = 0
    top_block_share = 0
    avg_cost = 0
    jio_count = 0

m1, m2, m3, m4 = st.columns(4)

with m1:
    st.markdown(f"""
    <div class="intel-card intel-card-accent">
        <div class="stat-number" style="color: #60a5fa;">{total_satellites:,}</div>
        <div class="stat-label">Total Profiled Satellites</div>
        <div style="font-size: 0.75rem; color: #64748b; margin-top: 4px;">
            Targeting 60,000+ filed by 2030
        </div>
    </div>
    """, unsafe_allow_html=True)

with m2:
    st.markdown(f"""
    <div class="intel-card intel-card-gold">
        <div class="stat-number" style="color: #fbbf24; font-size: 1.35rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="{top_operator}">
            {top_operator.split('(')[0].strip()}
        </div>
        <div class="stat-label">Top Operator Hegemony</div>
        <div style="font-size: 0.75rem; color: #64748b; margin-top: 4px;">
            {top_operator_count:,} assets ({top_operator_share:.1f}% share)
        </div>
    </div>
    """, unsafe_allow_html=True)

with m3:
    block_color = "#3b82f6" if top_block == "Western" else ("#ef4444" if top_block == "BRICS+" else "#10b981")
    st.markdown(f"""
    <div class="intel-card intel-card-emerald">
        <div class="stat-number" style="color: {block_color};">
            {top_block}
        </div>
        <div class="stat-label">Highest Geopolitical Concentration</div>
        <div style="font-size: 0.75rem; color: #64748b; margin-top: 4px;">
            {top_block_count:,} units ({top_block_share:.1f}% bloc dominance)
        </div>
    </div>
    """, unsafe_allow_html=True)

with m4:
    st.markdown(f"""
    <div class="intel-card" style="border-left: 4px solid #a855f7;">
        <div class="stat-number" style="color: #c084fc;">
            ${avg_cost:.2f} <span style="font-size: 0.9rem; color: #94a3b8;">/ GB</span>
        </div>
        <div class="stat-label">Average Bandwidth Threshold</div>
        <div style="font-size: 0.75rem; color: #64748b; margin-top: 4px;">
            Jio disrupts at $2–$5/GB vs $15–$30 Western
        </div>
    </div>
    """, unsafe_allow_html=True)


# -----------------------------------------------------------------------------
# 6. Primary Plotly Express Scatter Plot (Orbit Altitude vs. Launch Date)
# -----------------------------------------------------------------------------
st.markdown("### Orbital Littoral Mapping: Altitude vs. Launch Timeline")

if df_filtered.empty:
    st.warning("No satellites match the selected filter criteria. Please broaden your selection.")
else:
    # Color palette matching geopolitical alignments
    color_map = {
        "Western": "#3b82f6",    # Blue
        "BRICS+": "#ef4444",      # Red
        "Neutral": "#10b981"      # Emerald / Global South
    }

    fig_scatter = px.scatter(
        df_filtered,
        x="Launch_Date",
        y="Orbit_Altitude",
        color="Geopolitical_Block_Alignment",
        color_discrete_map=color_map,
        hover_name="Satellite_ID",
        hover_data={
            "Operator": True,
            "Country_Origin": True,
            "Spectrum_Band": True,
            "Primary_Function": True,
            "Operational_Status": True,
            "Cost_Per_GB_USD": ":$.2f",
            "Launch_Date": "|%Y-%m-%d",
            "Orbit_Altitude": ":,d km"
        },
        labels={
            "Launch_Date": "Deployment Date",
            "Orbit_Altitude": "Orbital Altitude (km)",
            "Geopolitical_Block_Alignment": "Geopolitical Alignment"
        },
        title="LEO Saturation & Disruption Horizon (Orbital Altitude vs. Launch Date)",
        template="plotly_dark",
        height=550
    )

    # Reference Shell Annotations
    fig_scatter.add_hline(
        y=550, line_dash="dash", line_color="rgba(59, 130, 246, 0.4)",
        annotation_text="Starlink Primary Shell (~550 km)",
        annotation_position="bottom right"
    )
    fig_scatter.add_hline(
        y=1200, line_dash="dash", line_color="rgba(147, 51, 234, 0.4)",
        annotation_text="OneWeb Polar Shell (~1,200 km)",
        annotation_position="top right"
    )

    # If MEO shell included, annotate Jio/SES
    if df_filtered["Orbit_Altitude"].max() >= 7500:
        fig_scatter.add_hline(
            y=8000, line_dash="dot", line_color="rgba(16, 185, 129, 0.6)",
            annotation_text="Jio / SES O3b mPOWER MEO Shell (~8,000 km)",
            annotation_position="bottom right"
        )

    fig_scatter.update_traces(marker=dict(size=7, opacity=0.8, line=dict(width=0.5, color='#0f172a')))
    fig_scatter.update_layout(
        plot_bgcolor="#090d16",
        paper_bgcolor="#0f172a",
        margin=dict(l=40, r=40, t=50, b=40),
        legend=dict(
            orientation="h",
            yanchor="bottom",
            y=1.02,
            xanchor="right",
            x=1,
            title_text=""
        ),
        xaxis=dict(gridcolor="#1e293b", zerolinecolor="#1e293b"),
        yaxis=dict(gridcolor="#1e293b", zerolinecolor="#1e293b")
    )

    st.plotly_chart(fig_scatter, use_container_width=True)


# -----------------------------------------------------------------------------
# 7. Strategic Tabs: Deep Dives & Analytics
# -----------------------------------------------------------------------------
tab_matrix, tab_jio, tab_minerals, tab_risk_parser, tab_threats = st.tabs([
    "📊 Megaconstellation Matrix",
    "🇮🇳 Reliance Jio & Global South",
    "🌕 Lunar & Asteroid Critical Minerals",
    "🤖 AI Geopolitical Risk Parser",
    "🛡️ Counterspace Threat Vectors"
])

# ----------------- TAB 1: Constellation Comparison Matrix -----------------
with tab_matrix:
    st.markdown("""
    <div class="intel-card">
        <h4 style="margin: 0 0 0.5rem 0;">Direct Megaconstellation Comparison Matrix</h4>
        <p style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 1rem;">
            Comparative benchmarking of commercial hegemony, target orbital altitude, spectrum bands, and military alignment.
        </p>
    </div>
    """, unsafe_allow_html=True)

    matrix_data = [
        {
            "Operator / System": "SpaceX (Starlink / Starshield)",
            "Constellation Size": "~6,300 Active / 42,000 Planned",
            "Target Altitude": "LEO (520–570 km)",
            "Primary Frequencies": "Ku, Ka, E-band, Laser Inter-satellite",
            "Military / Geopolitical Alignment": "US DoD, NATO, Five Eyes (Starshield)",
            "Regional Strongholds": "North America, Europe, Australia, Ukraine, Japan"
        },
        {
            "Operator / System": "Eutelsat OneWeb",
            "Constellation Size": "~634 Active / 648 Gen-1 (Gen-2 Planned)",
            "Target Altitude": "LEO (1,200 km)",
            "Primary Frequencies": "Ku, Ka-band",
            "Military / Geopolitical Alignment": "UK MoD, European Defense Agency, EU GovSatCom",
            "Regional Strongholds": "United Kingdom, Europe, Arctic Region, India (Enterprise)"
        },
        {
            "Operator / System": "Amazon Project Kuiper",
            "Constellation Size": "Prototype Phase / 3,236 Planned",
            "Target Altitude": "LEO (590–630 km)",
            "Primary Frequencies": "Ka-band",
            "Military / Geopolitical Alignment": "US Commercial / AWS Defense Cloud Integration",
            "Regional Strongholds": "United States, Latin America, Europe (Pending deployment)"
        },
        {
            "Operator / System": "China State / Qianfan (G60)",
            "Constellation Size": "~108 Active / 14,000+ Planned",
            "Target Altitude": "LEO (500–1,100 km)",
            "Primary Frequencies": "Ku, Q/V-band",
            "Military / Geopolitical Alignment": "PLA Strategic Support Force, Belt & Road Initiative",
            "Regional Strongholds": "Mainland China, Southeast Asia, Central Asia, Africa"
        },
        {
            "Operator / System": "Reliance Jio Space Tech (SES JV)",
            "Constellation Size": "Hybrid (MEO Active / LEO Planned)",
            "Target Altitude": "MEO (8,000 km) + LEO Integration",
            "Primary Frequencies": "Ka, C-band",
            "Military / Geopolitical Alignment": "Indian Armed Forces, Global South Strategic Partner",
            "Regional Strongholds": "India, South Asia, Indo-Pacific Littorals, East Africa"
        }
    ]
    df_matrix = pd.DataFrame(matrix_data)
    st.dataframe(df_matrix, use_container_width=True, hide_index=True)

    # Cost Breakdown Visualization
    col_c1, col_c2 = st.columns(2)
    with col_c1:
        fig_cost = px.bar(
            df_filtered.groupby("Operator")["Cost_Per_GB_USD"].mean().reset_index(),
            x="Cost_Per_GB_USD",
            y="Operator",
            orientation="h",
            color="Cost_Per_GB_USD",
            color_continuous_scale="Viridis_r",
            labels={"Cost_Per_GB_USD": "Estimated Operational Cost ($ / GB)"},
            title="Bandwidth Operational Threshold by Operator ($/GB)",
            template="plotly_dark"
        )
        fig_cost.update_layout(paper_bgcolor="#0f172a", plot_bgcolor="#090d16")
        st.plotly_chart(fig_cost, use_container_width=True)

    with col_c2:
        fig_spec = px.pie(
            df_filtered,
            names="Spectrum_Band",
            title="Frequency Spectrum Distribution in Profiled Fleet",
            template="plotly_dark",
            hole=0.4
        )
        fig_spec.update_layout(paper_bgcolor="#0f172a", plot_bgcolor="#090d16")
        st.plotly_chart(fig_spec, use_container_width=True)


# ----------------- TAB 2: Reliance Jio Strategic Dossier -----------------
with tab_jio:
    st.markdown("""
    <div class="intel-card intel-card-emerald">
        <h3 style="margin: 0; color: #10b981;">The Disruptor: Reliance Jio & Global South Non-Alignment</h3>
        <p style="color: #94a3b8; font-size: 0.95rem; margin-top: 0.3rem;">
            Structural shift in space technonationalism: multi-orbit hybrid architecture and cost disruption.
        </p>
    </div>
    """, unsafe_allow_html=True)

    jio_col1, jio_col2 = st.columns([3, 2])

    with jio_col1:
        st.markdown("""
        #### 1. Strategic Triangulation & Strategic Autonomy
        - **Non-Aligned Counterweight:** Prevents developing nations across South Asia, Africa, and Latin America from facing a binary choice between Western corporate monopolies (*SpaceX / Starlink, Amazon Kuiper*) and Chinese state-led surveillance constellations (*Qianfan G60, GuoWang*).
        - **Sovereign Infrastructure:** Aligns with India's strategic autonomy doctrine, offering an open-standard, democratized alternative.
        
        #### 2. Hybrid Multi-Orbit Architecture (MEO + LEO)
        - **SES JV Synergy:** Rather than solely expending massive capital on thousands of short-lifespan LEO satellites, Jio utilizes **SES O3b mPOWER MEO constellation** at 8,000 km for high-throughput backbone transit, paired with targeted LEO allocations for low-latency nodes.
        - **Launch Autonomy:** Backed by ISRO's **LVM3** (heavy lift) and **SSLV** (Small Satellite Launch Vehicle) rapid-responsive orbital injection.

        #### 3. Extreme Cost Disruption
        - Western average satellite broadband pricing: **$15 – $30 per GB**.
        - Reliance Jio Space threshold target: **$2 – $5 per GB**.
        - Driven by low-cost terrestrial user terminal mass-manufacturing in India, replicating the telecom revolution that built Jio's 450M+ subscriber base.
        """)

    with jio_col2:
        st.markdown("""
        <div style="background: #111827; border: 1px solid #1f2937; border-radius: 8px; padding: 1.25rem;">
            <div style="font-size: 0.75rem; color: #10b981; font-weight: 700; text-transform: uppercase;">Disruption Snapshot</div>
            <h4 style="margin: 0.4rem 0 1rem 0;">JioSpaceFiber Parameters</h4>
            
            <table style="width: 100%; font-size: 0.85rem; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #1e293b;">
                    <td style="padding: 6px 0; color: #94a3b8;">Constellation Partner</td>
                    <td style="padding: 6px 0; text-align: right; font-weight: 600;">SES (Luxembourg)</td>
                </tr>
                <tr style="border-bottom: 1px solid #1e293b;">
                    <td style="padding: 6px 0; color: #94a3b8;">Primary MEO Orbit</td>
                    <td style="padding: 6px 0; text-align: right; font-weight: 600;">8,000 km (O3b mPOWER)</td>
                </tr>
                <tr style="border-bottom: 1px solid #1e293b;">
                    <td style="padding: 6px 0; color: #94a3b8;">Launch Vehicles</td>
                    <td style="padding: 6px 0; text-align: right; font-weight: 600;">ISRO LVM3 / SSLV</td>
                </tr>
                <tr style="border-bottom: 1px solid #1e293b;">
                    <td style="padding: 6px 0; color: #94a3b8;">Price Threshold</td>
                    <td style="padding: 6px 0; text-align: right; font-weight: 600; color: #10b981;">$2 - $5 / GB</td>
                </tr>
                <tr style="border-bottom: 1px solid #1e293b;">
                    <td style="padding: 6px 0; color: #94a3b8;">Defense Integration</td>
                    <td style="padding: 6px 0; text-align: right; font-weight: 600;">Indian Armed Forces</td>
                </tr>
                <tr>
                    <td style="padding: 6px 0; color: #94a3b8;">Target Spheres</td>
                    <td style="padding: 6px 0; text-align: right; font-weight: 600;">Indo-Pacific & Global South</td>
                </tr>
            </table>
        </div>
        """, unsafe_allow_html=True)


# ----------------- TAB 3: Critical Minerals & Off-Planet Race -----------------
with tab_minerals:
    st.markdown("""
    <div class="intel-card intel-card-gold">
        <h3 style="margin: 0; color: #f59e0b;">The Geopolitical Chessboard & Off-Planet Critical Minerals</h3>
        <p style="color: #94a3b8; font-size: 0.95rem; margin-top: 0.3rem;">
            Low Earth Orbit as the foundational C4ISR staging ground for deep-space resource extraction.
        </p>
    </div>
    """, unsafe_allow_html=True)

    st.markdown("""
    #### Architectural Linkage: LEO to Deep Space Extraction
    ```
    [LEO C4ISR / PNT Grid] ──> [Translunar Edge Compute Relays] ──> [Lunar South Pole Autonomous Mining] ──> [NEA Trajectory Tracking & In-Situ Processing]
    ```
    *LEO networks provide the timing, position, and telemetry baseline required to coordinate autonomous prospecting fleets, heavy transport tugs, and automated re-entry logistics modules back to Earth.*
    """)

    min_c1, min_c2 = st.columns(2)

    with min_c1:
        st.markdown("""
        <div class="intel-card">
            <h4 style="color: #38bdf8; margin-top: 0;">1. Near-Earth Asteroid PGMs</h4>
            <p style="font-size: 0.88rem; color: #cbd5e1;">
                A single 500-meter metallic asteroid (e.g. <strong>16 Psyche-type body</strong>) contains Platinum-Group Metals (PGMs: Platinum, Osmium, Iridium) exceeding <strong>$10 Trillion</strong> in market value.
            </p>
            <p style="font-size: 0.82rem; color: #94a3b8;">
                Strategic Imperative: Total relief from terrestrial supply chain vulnerabilities currently monopolized by China and South Africa.
            </p>
        </div>
        """, unsafe_allow_html=True)

        st.markdown("""
        <div class="intel-card">
            <h4 style="color: #a855f7; margin-top: 0;">2. Lunar Regolith Helium-3</h4>
            <p style="font-size: 0.88rem; color: #cbd5e1;">
                Non-radioactive aneutronic fusion fuel deposited by solar wind into lunar regolith. Just <strong>25 metric tons</strong> could power the United States for an entire year.
            </p>
        </div>
        """, unsafe_allow_html=True)

    with min_c2:
        st.markdown("""
        <div class="intel-card">
            <h4 style="color: #f59e0b; margin-top: 0;">3. Lunar South Pole Water Ice</h4>
            <p style="font-size: 0.88rem; color: #cbd5e1;">
                Primary <strong>"off-planet propellant depot"</strong> located in permanently shadowed craters (e.g. Shackleton Crater).
            </p>
            <p style="font-size: 0.82rem; color: #94a3b8;">
                Splitting H2O into Liquid Hydrogen (LH2) and Liquid Oxygen (LOX) lowers the launch mass penalty and costs for deep-space missions by <strong>over 90%</strong>.
            </p>
        </div>
        """, unsafe_allow_html=True)

        st.markdown("""
        <div class="intel-card">
            <h4 style="color: #ef4444; margin-top: 0;">The Ideological Clash: Artemis vs. ILRS</h4>
            <ul style="font-size: 0.85rem; color: #cbd5e1; margin-bottom: 0; padding-left: 1.2rem;">
                <li><strong>US-Led Artemis Accords (40+ Signatories):</strong> Promotes commercial extraction rights under Outer Space Treaty Art. 11 with de facto "Safety Zones".</li>
                <li><strong>Sino-Russian ILRS (Base by 2035):</strong> State-centric framework rejecting Safety Zones as imperialist enclosure, triggering high-stakes space-grab dynamics.</li>
            </ul>
        </div>
        """, unsafe_allow_html=True)


# ----------------- TAB 4: AI Geopolitical Risk Parser -----------------
with tab_risk_parser:
    st.markdown("""
    <div class="intel-card intel-card-accent">
        <h3 style="margin: 0; color: #60a5fa;">AI-Powered Geopolitical Risk Parser</h3>
        <p style="color: #94a3b8; font-size: 0.95rem; margin-top: 0.3rem;">
            Ingest space policy dispatches, regulatory filings, or defense announcements to generate structured JSON intelligence.
        </p>
    </div>
    """, unsafe_allow_html=True)

    sample_prompts = [
        "India's Space Policy updates spectrum allocations for Jio Space Technology to pair SES O3b mPOWER MEO capacity with domestic ISRO launch vehicles for Global South deployment.",
        "China launches 18 G60 Qianfan megaconstellation satellites from Taiyuan, commencing orbital shell saturation along the Belt and Road corridor.",
        "SpaceX signs $1.8B classified contract to integrate Starshield with National Reconnaissance Office (NRO) for real-time tactical C4ISR missile tracking.",
        "Dispute escalates over Shackleton Crater at Lunar South Pole: US cites Artemis Accords Article 11 Safety Zones, while Sino-Russian ILRS consortium alleges illegal resource enclosure."
    ]

    selected_sample = st.selectbox(
        "Load Pre-Configured Strategic Dispatch:",
        options=["Custom Dispatch..."] + sample_prompts
    )

    default_text = "" if selected_sample == "Custom Dispatch..." else selected_sample
    user_dispatch = st.text_area(
        "Space Policy News Text / Dispatch:",
        value=default_text,
        height=100,
        placeholder="Enter space policy news or regulatory text..."
    )

    if st.button("Execute Geopolitical Risk Analysis", type="primary"):
        if not user_dispatch.strip():
            st.error("Please enter a dispatch string to parse.")
        else:
            with st.spinner("Analyzing astropolitical threat vectors and strategic impact..."):
                if parse_geopolitical_risk:
                    result = parse_geopolitical_risk(user_dispatch)
                else:
                    st.error("Risk parser module not found.")
                    result = None

            if result:
                res_col1, res_col2 = st.columns([1, 1])
                with res_col1:
                    score = result.get("threat_opportunity_level", 5)
                    score_color = "#ef4444" if score >= 8 else ("#f59e0b" if score >= 6 else "#10b981")
                    
                    st.markdown(f"""
                    <div class="intel-card">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <span class="stat-label">Threat / Opportunity Index</span>
                                <div class="stat-number" style="color: {score_color};">{score} / 10</div>
                            </div>
                            <div style="text-align: right;">
                                <span class="stat-label">Geopolitical Implication</span>
                                <div style="font-weight: 700; color: #cbd5e1;">{result.get('geopolitical_block_implication', 'N/A')}</div>
                            </div>
                        </div>
                        <hr style="border-color: #1e293b; margin: 1rem 0;" />
                        <div style="margin-bottom: 0.75rem;">
                            <strong style="color: #94a3b8; font-size: 0.8rem; text-transform: uppercase;">Entities Mentioned:</strong>
                            <div style="margin-top: 4px; font-weight: 600;">{", ".join(result.get('company_or_country', []))}</div>
                        </div>
                        <div style="margin-bottom: 0.75rem;">
                            <strong style="color: #94a3b8; font-size: 0.8rem; text-transform: uppercase;">Affected Infrastructure:</strong>
                            <div style="margin-top: 4px; font-weight: 600; color: #38bdf8;">{result.get('affected_resource_infrastructure', 'N/A')}</div>
                        </div>
                        <div>
                            <strong style="color: #94a3b8; font-size: 0.8rem; text-transform: uppercase;">Strategic Countermeasure:</strong>
                            <div style="margin-top: 4px; font-size: 0.85rem; color: #cbd5e1;">{result.get('recommended_countermeasure', 'N/A')}</div>
                        </div>
                    </div>
                    """, unsafe_allow_html=True)

                with res_col2:
                    st.markdown("**Structured Intelligence JSON Output:**")
                    st.json(result)


# ----------------- TAB 5: Strategic Outlook & Counterspace Threats -----------------
with tab_threats:
    st.markdown("""
    <div class="intel-card">
        <h4 style="margin: 0 0 0.5rem 0;">Strategic Outlook & Counterspace Threat Vectors</h4>
        <p style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 1rem;">
            Assessment of cascading debris, ITU frequency warfare, and soft/hard kill operational mechanisms.
        </p>
    </div>
    """, unsafe_allow_html=True)

    threat_rows = [
        {
            "Threat Vector": "Kinetic ASAT / Debris",
            "Operational Mechanism": "Direct-Ascent Missiles / Co-orbital Interceptors",
            "Strategic Impact": "Catastrophic orbital shell destruction (Kessler cascade risk)",
            "Mitigation Strategy": "Autonomous collision avoidance & rapid launch replenishment"
        },
        {
            "Threat Vector": "Non-Kinetic Counterspace",
            "Operational Mechanism": "High-Power Microwave (HPM) & Ground Lasers",
            "Strategic Impact": "Sensor blinding & payload electronics fried",
            "Mitigation Strategy": "Optical hardening & laser-proof sensor shutters"
        },
        {
            "Threat Vector": "EW & Cyber Interference",
            "Operational Mechanism": "Uplink/Downlink Jamming & Telemetry Spoofing",
            "Strategic Impact": "Loss of C4ISR connectivity in combat zones",
            "Mitigation Strategy": "Optical Inter-Satellite Links (OISL) & Quantum Encryption"
        },
        {
            "Threat Vector": "ITU Spectrum Warehousing",
            "Operational Mechanism": "Preemptive overlapping filings under ITU first-come priority",
            "Strategic Impact": "Administrative denial of service for competing constellations",
            "Mitigation Strategy": "Multilateral ITU reform & Global South coalition filings"
        }
    ]
    st.table(pd.DataFrame(threat_rows))


# -----------------------------------------------------------------------------
# 8. Raw Data Table with Search
# -----------------------------------------------------------------------------
with st.expander("🔍 View & Search Profiled Fleet Telemetry Data"):
    st.dataframe(
        df_filtered[[
            "Satellite_ID", "Operator", "Country_Origin", "Orbit_Altitude",
            "Launch_Date", "Spectrum_Band", "Primary_Function",
            "Geopolitical_Block_Alignment", "Operational_Status", "Cost_Per_GB_USD"
        ]],
        use_container_width=True
    )
