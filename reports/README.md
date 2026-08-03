# Weekly report archive

The scheduled `Cyber Regulation Watch` automation appends one Markdown report per run:

```text
reports/YYYY/YYYY-MM-DD.md
reports/YYYY/YYYY-MM-DD.en.md
```

It must also append one matching object to `data/reports.json`.

## Mandatory integrated report structure

Every new weekly report must use this order and remain one integrated artifact:

1. Executive Regulatory Overview
2. EU CRA 專版模組
3. EU AI Act 專版模組
4. NIS2／Czech Cybersecurity
5. ISO 27001／IEC 62443／RED DA
6. China CSL／DSL／PIPL
7. Cross-Regulation Dependency
8. Consolidated Action Dashboard

The EU CRA and EU AI Act modules must cross-reference AI-enabled products, Article 15 cybersecurity versus CRA essential cybersecurity requirements, incident reporting, lifecycle and post-market monitoring, conformity assessment, technical documentation, SBOM / AI BOM / model-dataset-software traceability, and whether Product Manufacturer and AI Provider roles sit with the same legal entity.

Industry or trade-association statements belong under `INDUSTRY POSITION`. They are never legal exceptions, regulator conclusions, or evidence that a draft requirement is in force.

## Report manifest contract

```json
{
  "id": "2026-08-03",
  "title": "Cyber Regulation Watch｜2026-08-03",
  "titleEn": "Cyber Regulation Watch | 2026-08-03",
  "author": "Jungle",
  "publishedAt": "2026-08-03T08:00:00+08:00",
  "coverageStart": "2026-07-27",
  "coverageEnd": "2026-08-02",
  "status": "material-change",
  "executiveSummary": "300 字內管理摘要。",
  "executiveSummaryEn": "English management summary.",
  "scopes": ["EU CRA", "EU AI Act", "NIS2"],
  "tags": ["Article 14", "SRP"],
  "priorityCounts": {"P0": 1, "P1": 2, "P2": 3, "P3": 0},
  "decisions": ["管理階層決策摘要"],
  "deadlines": ["2026-09-11 — CRA Article 14"],
  "reportPath": "reports/2026/2026-08-03.md",
  "reportPathEn": "reports/2026/2026-08-03.en.md",
  "sourceCount": 12
}
```

Rules:

- `id` must be unique and use the report date.
- `status` must be `material-change` or `no-material-change`.
- `reportPath` and `reportPathEn` must both exist and stay relative to the repository root.
- Each report ID is one logical integrated report with paired Traditional Chinese and English Markdown editions. Do not create duplicate manifest entries or separate schedules.
- The English edition must preserve the same eight-section order, legal-status labels, dates, priorities, material conclusions, direct sources, affected roles, deadlines and actions as the Traditional Chinese edition.
- The website author credit and every report entry use `Jungle`; render it as 「作者：Jungle」 in Traditional Chinese and “By Jungle” in English.
- Never delete or rewrite older weekly entries unless correcting a documented error.
- Keep reports sorted newest-first in the manifest.
- Important conclusions in Markdown must include a direct source URL and publication date.
- Re-verify the AI Act legal baseline on every run using EUR-Lex, the Official Journal, European Commission / AI Office, AI Board, or the AI Act Single Information Platform. Mark any change as `BASELINE CHANGED`.
- Use explicit AI Act legal-status labels: `IN FORCE`, `APPLICABLE`, `ADOPTED – NOT YET APPLICABLE`, `PROPOSAL`, `DRAFT`, `CONSULTATION`, `NON-BINDING GUIDANCE`, `VOLUNTARY CODE`, `INDUSTRY POSITION`, `MEDIA REPORT`, or `UNVERIFIED`.
- Draft standards must never be described as harmonised or as providing presumption of conformity unless cited in the EU Official Journal.
- Treat business groups and product lines as separate classification axes. Do not infer a business-group owner from a product name without confirmed internal ownership.
- `PSG` means Personal Solution Group／Personal Systems（個人電腦事業群）. Confirmed products include Notebook, Desktop / AIO, Thin Client and AI PC.
- `EBG` means Enterprise Business Group（企業電腦事業群）. Confirmed products include general and AI / HPC servers, storage, network switches, racks, server-management software and enterprise / cloud data-center solutions.
- `NBG` means New Business Group（新事業群）. Its confirmed scope includes Automotive Electronics, 5G, intelligent mobility / industrial and edge computing, and smart healthcare. Automotive is one NBG domain, not a synonym for NBG.
- Do not list Metaverse / Spatial Computing, AI IP / silicon-IP licensing, startup incubation or technology showcases as confirmed NBG core businesses without new authoritative evidence.
- Do not automatically assign Router / Firewall / IDS / IPS to NBG. Network Switch is a confirmed EBG product category; other ownership must be marked pending internal confirmation unless verified.
- Edge AI, automotive, industrial and healthcare vertical solutions align with NBG, but their underlying server platform may be shared with or supplied by EBG. Confirm the actual BU, PLM, contract entity, CE manufacturer, SKU, firmware / app / cloud-service owner and market placement before assigning CRA / PSIRT responsibility.
- Organizational baseline sources: Inventec 2023 Annual Report p.11, 2024 Sustainability Report, current Personal Systems, Enterprise & Cloud Data Center, EBG and IMIS product pages, and dated official Inventec news.
- Keep the parent-company product map separate from affiliates and investments such as IAC / Inventec Appliances and AIMobile. Do not assign affiliate smart terminals, communications, wearables or industrial mobile devices to PSG or NBG without entity- and SKU-level confirmation.
- Use eight product-line views for management reporting: Personal Computers; AI PC / Gaming; General Servers; AI / HPC & Data Center; Storage & Networking; Automotive; 5G & Industrial / Edge Computing; Smart Healthcare.
- Use at least nine first-level CRA Product Families: PC, Server, AI Server, Storage, Networking, Automotive, 5G, Edge AI / Industrial IoT, Smart Healthcare.
- Data-center AI Servers belong to EBG by default; vertical Edge AI solutions for factory, healthcare or automotive contexts align more closely with NBG / IMIS. Track underlying platform supplier and final product owner separately.
- Cross-product capabilities include ODM / JDM / CM / BTO / CTO, product design through after-sales service, Server Management, O-RAN SMO, AI Computer Vision, AR / HMI, 5G Private Network, Smart Factory, Digital Twin, Smart Inspection, and automotive functional-safety / cybersecurity / OTA integration.

## EU CRA module source

- Authoritative module: `modules/eu-cra-v3.1.md`
- Persistent cross-week state: `data/cra-watchlist.json`
- The scheduled integrated report must read the authoritative module on every run. Its eleven CRA subsections remain nested under section 2 of the eight-section report.
- The standalone `EU CRA 專版模組` automation is a disabled backup; it must not run alongside `Cyber Regulation Watch`.
- CRA Flash Alert triggers in v3.1 must be surfaced immediately when detected and must preserve the module's source-tier, confidence, legal-status, and no-legal-conclusion rules.

## EU AI Act module source

- Authoritative module: `modules/eu-ai-act-v4.md`
- The scheduled integrated report must read the authoritative module on every run and keep its outputs nested under section 3 of the eight-section report.
- Re-verify the legal baseline and distinguish formal legal status from guidance, consultation, industry positions, and media reporting on every run.

## NIS2 / Czech Cybersecurity module source

- Authoritative module: `modules/nis2-czech-v4.md`
- The scheduled integrated report must read the authoritative module on every run and keep its outputs nested under section 4 of the eight-section report.
- Confirm the ICZ entity, ARES / CZ-NACE data, regulated service, provider scope, notification / registration decision, regime, and decision-delivery date before assigning applicability, deadlines, or owners.
- When the NÚKIB decision-delivery date is missing, display `MASTER CLOCK NOT CONFIRMED — INTERNAL REGISTRATION DECISION REQUIRED` and do not fabricate compliance dates.
- Preserve the module's first-source, Tier 1 / Tier 2, legal-status, confidence, anti-hallucination, and cross-border legal-opinion rules.
- Surface its eight out-of-cycle Flash Alert triggers only when the v4.0 conditions and no-duplicate rules are met.

## ISO/IEC 27001 / IEC 62443 module source

- Authoritative module: `modules/iso27001-iec62443-v1.1.md`
- The scheduled integrated report must read the authoritative module on every run and keep its outputs nested under section 5 of the eight-section report alongside RED DA coverage.
- This module does not create a separate weekly report. Its first execution uses Baseline Snapshot mode; subsequent executions use Delta mode and the module's persistent State File fields.
- Preserve role separation across Enterprise ISMS, Asset Owner, Service Provider / Integrator / Maintenance Provider, Product Developer, Component Supplier, and System Product / Automation Solution Supplier. Never extend a component certificate into system or factory conformity.
- Use original ISO / IEC editions as the lifecycle baseline. A national or regional adoption with different dates, identifiers, or page counts is not a Delta unless normative content, status, or applicability materially changes.
- Preserve document type, lifecycle status, source tier, Admiralty code, `source_url`, `source_edition`, `verified_by`, and `last_verified_at` for every current-status statement.
- Surface the ten v1.1 Out-of-Cycle Flash Alert conditions immediately, including certificate validity failures, material transition changes, blocking customer flow-downs, and product-release or factory-acceptance blockers.
- For Shanghai or Chongqing logs, vulnerabilities, source code, design files, supplier data, or incident evidence, display `CHINA LEGAL REVIEW REQUIRED` and do not request cross-border transfer without Legal approval.
