import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const requiredFiles = [
  "index.html",
  "report.html",
  "assets/styles.css",
  "assets/app.js",
  "assets/report.js",
  "assets/sentinel.svg",
  "data/reports.json",
  "reports/README.md"
];

const failures = [];

for (const file of requiredFiles) {
  try {
    await access(resolve(root, file));
  } catch {
    failures.push(`Missing required file: ${file}`);
  }
}

let manifest;
try {
  manifest = JSON.parse(await readFile(resolve(root, "data/reports.json"), "utf8"));
} catch (error) {
  failures.push(`Invalid data/reports.json: ${error.message}`);
}

if (manifest) {
  if (manifest.schemaVersion !== 1) failures.push("schemaVersion must be 1");
  if (manifest.timezone !== "Asia/Taipei") failures.push("timezone must be Asia/Taipei");
  if (!Array.isArray(manifest.reports)) failures.push("reports must be an array");
  if (Number.isNaN(Date.parse(manifest.nextScheduledRun))) failures.push("nextScheduledRun must be ISO-8601");
  if (Number.isNaN(Date.parse(manifest.milestones?.craArticle14))) failures.push("CRA Article 14 milestone is invalid");

  const ids = new Set();
  for (const [index, report] of (manifest.reports || []).entries()) {
    const prefix = `reports[${index}]`;
    if (!report.id) failures.push(`${prefix}.id is required`);
    if (ids.has(report.id)) failures.push(`${prefix}.id duplicates ${report.id}`);
    ids.add(report.id);
    if (!["material-change", "no-material-change"].includes(report.status)) {
      failures.push(`${prefix}.status is invalid`);
    }
    if (!/^reports\/\d{4}\/\d{4}-\d{2}-\d{2}\.md$/.test(report.reportPath || "")) {
      failures.push(`${prefix}.reportPath is invalid`);
    } else {
      try {
        await access(resolve(root, report.reportPath));
      } catch {
        failures.push(`${prefix}.reportPath does not exist: ${report.reportPath}`);
      }
    }
    for (const priority of ["P0", "P1", "P2", "P3"]) {
      const count = report.priorityCounts?.[priority];
      if (!Number.isInteger(count) || count < 0) failures.push(`${prefix}.priorityCounts.${priority} must be a non-negative integer`);
    }
  }
}

const htmlFiles = ["index.html", "report.html"];
for (const file of htmlFiles) {
  try {
    const html = await readFile(resolve(root, file), "utf8");
    if (!html.includes('Content-Security-Policy')) failures.push(`${file} lacks a CSP`);
    if (!html.includes('name="viewport"')) failures.push(`${file} lacks a viewport meta tag`);
    if (/https?:\/\/(?:cdn|unpkg|jsdelivr)\./i.test(html)) failures.push(`${file} contains an external CDN dependency`);
  } catch {
    // Missing file already reported.
  }
}

if (failures.length) {
  console.error("Site validation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Site validation passed (${requiredFiles.length} required files, ${manifest.reports.length} archived reports).`);

