# Cyber Regulation Watch

Decision-ready weekly monitoring for cybersecurity regulation and standards relevant to global electronics manufacturing.

## Operating model

- Schedule: every Monday at 08:00 (`Asia/Taipei`)
- Primary language: Traditional Chinese using Taiwan terminology, with English legal and technical terms retained
- Core modules: EU Cyber Resilience Act (CRA), EU Artificial Intelligence Act (AI Act), and NIS2 / Czech Cybersecurity
- Additional coverage: ISO/IEC 27001:2022, IEC 62443, RED Delegated Act, China CSL / DSL / PIPL, and cross-regulation dependencies
- Output rule: one integrated brief per week; the EU CRA, EU AI Act, and NIS2 / Czech Cybersecurity modules are dedicated sections inside the same report, never duplicate reports

Each scheduled run appends:

1. `reports/YYYY/YYYY-MM-DD.md` — the complete, source-linked weekly brief
2. One record in `data/reports.json` — metadata used by the dashboard and archive

The website reads those files directly, so no application server, database, framework, or third-party CDN is required.

## Website

Open `index.html` through a local HTTP server:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

The site includes:

- executive landing dashboard
- dynamic CRA Article 14 countdown
- dedicated EU CRA, EU AI Act, and NIS2 / Czech Cybersecurity monitoring cards
- latest-report and historical archive views
- full-text search and scope / priority / status filters
- bilingual Traditional Chinese / English interface
- responsive, keyboard-accessible layout
- local Markdown rendering with no third-party runtime dependency

## Validate

```bash
node scripts/validate-site.mjs
```

The GitHub Actions validation workflow runs the same check for every push and pull request.

## Publishing caution

This repository is private because future reports may contain company-specific readiness gaps, owners, deadlines, and management decisions. GitHub documents that a GitHub Pages site can be publicly available even when its source repository is private. Do not enable public Pages until the report content has been approved for public disclosure or a private-access hosting control has been selected.

