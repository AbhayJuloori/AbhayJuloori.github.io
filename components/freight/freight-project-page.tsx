import Link from "next/link";
import { freightEvidence } from "@/lib/freight/data";
import { FreightCaseStudy } from "./freight-case-study";
import { FreightWorkbench } from "./freight-workbench";

export function FreightProjectPage() {
  return <main id="main-content" className="freight-project-page">
    <div className="freight-transition"><Link href="/#work">← Back to selected work</Link><span>Abhay Juloori / Applied data systems</span></div>
    <FreightWorkbench bundle={freightEvidence} />
    <FreightCaseStudy bundle={freightEvidence} />
  </main>;
}
