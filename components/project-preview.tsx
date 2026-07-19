"use client";

import { FreightPreview } from "@/components/previews/freight-preview";
import { usePreviewVisibility } from "@/hooks/use-preview-visibility";
import type { PreviewKey } from "@/lib/types";

function RetailStill() {
  return (
    <div className="project-preview preview-still preview-still--retail" role="img" aria-label="Demand history extends into a forecast and inventory reorder decision">
      <div className="preview-topline"><span>Demand environment</span><span>Inventory response</span></div>
      <svg viewBox="0 0 720 440" aria-hidden="true">
        <path className="retail-band" d="M58 267C126 246 181 288 238 218S353 168 408 196L408 282C346 251 300 276 238 302S117 321 58 310Z" />
        <path className="retail-history" d="M58 290L95 272L132 286L169 221L206 260L243 184L280 231L317 188L354 212L408 198" />
        <path className="retail-forecast" d="M408 198C455 209 490 176 528 191S603 242 664 204" />
        <line x1="408" y1="92" x2="408" y2="340" stroke="#b7ae9b" strokeDasharray="4 6" />
        <text x="58" y="84" fill="currentColor" fontSize="11">HISTORICAL DEMAND</text>
        <text x="438" y="84" fill="currentColor" fontSize="11">FORECAST</text>
        <rect className="retail-reorder" x="470" y="300" width="150" height="58" />
        <text x="488" y="324" fill="#fff" fontSize="9">REORDER SIGNAL</text>
        <text x="488" y="344" fill="#fff" fontSize="14">+ 186 units</text>
      </svg>
    </div>
  );
}

function LoanStill() {
  return (
    <div className="project-preview preview-still preview-still--loan" role="img" aria-label="A borrower profile is represented by a survival curve that changes across a selected time horizon">
      <div className="preview-topline"><span>Borrower survival</span><span>36 month horizon</span></div>
      <svg viewBox="0 0 720 440" aria-hidden="true">
        <line x1="80" y1="82" x2="80" y2="350" stroke="#b8b8b1" />
        <line x1="80" y1="350" x2="660" y2="350" stroke="#b8b8b1" />
        <path className="loan-cohort" d="M80 105C180 112 250 140 332 182S508 256 660 288" />
        <path className="loan-curve" d="M80 105H155V120H230V146H308V180H382V226H474V270H565V310H660" />
        <circle cx="474" cy="270" r="8" fill="var(--loan-yellow)" stroke="var(--loan-ink)" strokeWidth="2" />
        <text x="80" y="72" fill="currentColor" fontSize="10">1.00 SURVIVAL</text>
        <text x="570" y="374" fill="currentColor" fontSize="10">TIME →</text>
        <text x="495" y="258" fill="currentColor" fontSize="10">SELECTED HORIZON</text>
        <rect x="480" y="96" width="164" height="74" fill="#fff" stroke="#b8b8b1" />
        <text x="497" y="120" fill="currentColor" fontSize="9">RISK PERCENTILE</text>
        <text x="497" y="151" fill="currentColor" fontSize="24">78th</text>
      </svg>
    </div>
  );
}

function CareStill() {
  return (
    <div className="project-preview preview-still preview-still--care" role="img" aria-label="Patient ordering changes when intervention benefit is ranked separately from readmission risk">
      <div className="preview-topline"><span>Risk is not benefit</span><span>Targeting view</span></div>
      <svg viewBox="0 0 720 440" aria-hidden="true">
        <text x="72" y="84" fill="currentColor" fontSize="10">BASELINE RISK</text>
        <text x="420" y="84" fill="currentColor" fontSize="10">EXPECTED BENEFIT</text>
        {[0, 1, 2, 3].map((row) => (
          <g key={row}>
            <rect x="72" y={112 + row * 62} width={220 - row * 26} height="34" rx="2" className={row === 1 ? "care-rank-shift" : "care-rank-risk"} opacity={0.92 - row * 0.12} />
            <text x="84" y={134 + row * 62} fill="#fff" fontSize="9">PATIENT 0{row + 1}</text>
          </g>
        ))}
        <path d="M304 130C360 130 350 194 408 194M304 192C360 192 350 130 408 130M304 254H408M304 316H408" fill="none" stroke="#6c858e" strokeWidth="2" />
        {[1, 0, 2, 3].map((row, index) => (
          <g key={row}>
            <rect x="420" y={112 + index * 62} width={210 - index * 22} height="34" rx="2" className={row === 1 ? "care-rank-shift" : "care-rank-benefit"} opacity={0.95 - index * 0.12} />
            <text x="432" y={134 + index * 62} fill="#fff" fontSize="9">PATIENT 0{row + 1}</text>
          </g>
        ))}
        <text x="72" y="388" fill="currentColor" fontSize="11">SAME PATIENTS · DIFFERENT DECISION ORDER</text>
      </svg>
    </div>
  );
}

export function ProjectPreview({ preview }: { preview: PreviewKey }) {
  const { ref, active } = usePreviewVisibility<HTMLDivElement>();

  return (
    <div ref={ref} className="project-preview" data-paused={!active}>
      {preview === "freight" ? <FreightPreview active={active} /> : null}
      {preview === "retail" ? <RetailStill /> : null}
      {preview === "loan" ? <LoanStill /> : null}
      {preview === "care" ? <CareStill /> : null}
    </div>
  );
}
