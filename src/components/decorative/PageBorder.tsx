/**
 * PageBorder — FEAzTO Organic Page Frame
 * Fixed overlay (pointer-events:none, z-index:40)
 * Layered asymmetric Bézier curves in Warm White + FEAzTO Yellow + Dark Ink
 * Reference: layered paper-cut organic wave effect
 */
import React from 'react';
import './PageBorder.css';

const PageBorder: React.FC = () => (
  <div
    className="feazto-page-border"
    aria-hidden="true"
    role="presentation"
  >
    {/* ── TOP BORDER ── 5 organic overlapping layers ── */}
    <svg
      className="fpb-top"
      viewBox="0 0 1440 130"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Layer 1 — Dark ink depth (behind everything) */}
      <path
        d="M-20,0 L1460,0 L1460,55 C1200,95 980,105 720,75 C460,45 200,60 -20,90 Z"
        fill="#121212"
      />

      {/* Layer 2 — Yellow brand accent */}
      <path
        d="M-20,0 L1460,0 L1460,45 C1280,82 1050,92 780,65 C510,38 240,52 -20,78 Z"
        fill="#FFD233"
      />

      {/* Layer 3 — Warm white main surface (widest) */}
      <path
        d="M-20,0 L1460,0 L1460,36 C1340,68 1100,80 820,55 C540,30 260,44 -20,68 Z"
        fill="#FFFDF7"
        style={{ filter: 'drop-shadow(0 3px 5px rgba(18,18,18,0.07))' }}
      />

      {/* Layer 4 — Thin yellow curve (on top of white) */}
      <path
        d="M-20,0 L1460,0 L1460,22 C1380,48 1160,58 900,38 C640,18 300,28 -20,50 Z"
        fill="#FFD233"
        opacity="0.6"
      />

      {/* Layer 5 — Pure white topmost trim */}
      <path
        d="M-20,0 L1460,0 L1460,12 C1400,28 1200,36 920,22 C640,8 320,16 -20,30 Z"
        fill="#FFFFFF"
      />
    </svg>

    {/* ── BOTTOM-RIGHT CORNER ── layered organic corner decoration ── */}
    <svg
      className="fpb-corner-br"
      viewBox="0 0 420 380"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Dark depth */}
      <path
        d="M420,380 L420,200 C370,280 300,330 180,360 C90,380 20,380 0,380 Z"
        fill="#121212"
      />
      {/* Yellow accent */}
      <path
        d="M420,380 L420,220 C380,295 310,340 200,368 C110,388 30,380 0,380 Z"
        fill="#FFD233"
      />
      {/* White main */}
      <path
        d="M420,380 L420,240 C390,308 325,350 220,375 C130,394 45,382 0,380 Z"
        fill="#FFFDF7"
        style={{ filter: 'drop-shadow(0 -3px 5px rgba(18,18,18,0.06))' }}
      />
      {/* Yellow thin trim */}
      <path
        d="M420,380 L420,260 C400,320 338,360 238,380 L0,380 Z"
        fill="#FFD233"
        opacity="0.55"
      />
      {/* White topmost trim */}
      <path
        d="M420,380 L420,275 C408,332 350,368 255,380 L0,380 Z"
        fill="#FFFFFF"
      />
    </svg>

    {/* ── BOTTOM-LEFT subtle corner ── smaller, complementary ── */}
    <svg
      className="fpb-corner-bl"
      viewBox="0 0 280 260"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,260 L0,140 C30,195 80,230 160,250 C210,262 260,260 280,260 Z"
        fill="#121212"
      />
      <path
        d="M0,260 L0,155 C28,205 78,238 165,256 C215,266 265,262 280,260 Z"
        fill="#FFD233"
      />
      <path
        d="M0,260 L0,170 C26,215 76,244 170,258 L280,260 Z"
        fill="#FFFDF7"
      />
    </svg>
  </div>
);

export default PageBorder;
