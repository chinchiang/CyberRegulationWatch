const content = document.getElementById("report-content");
const hero = document.getElementById("report-hero");
const meta = document.getElementById("report-meta");
const toc = document.getElementById("report-toc");
const tocToggle = document.getElementById("toc-toggle");
const tocBackdrop = document.getElementById("toc-backdrop");
const readingProgress = document.getElementById("reading-progress");

const translations = {
  "zh-Hant": {
    skip: "跳至週報內容",
    backDashboard: "← 返回儀表板",
    reportList: "← 週報列表",
    tocButton: "章節目錄",
    loadingTitle: "載入週報中…",
    loadingBody: "正在讀取已查證內容…",
    footerLine: "證據 → 影響 → 行動",
    authorCredit: "作者：Jungle",
    unavailableTitle: "無法載入週報",
    unavailableLabel: "週報目前無法使用",
    missingId: "網址缺少週報識別碼。",
    missingReport: "找不到週報",
    missingTranslation: "此週報尚無英文版本。",
    published: "發布時間",
    status: "狀態",
    priorities: "優先級",
    coverage: "監測範圍",
    window: "涵蓋期間",
    sources: "來源數",
    material: "有實質變更",
    noMaterial: "本週無重大變更"
  },
  en: {
    skip: "Skip to report content",
    backDashboard: "← Back to dashboard",
    reportList: "← Report archive",
    tocButton: "Contents",
    loadingTitle: "Loading report…",
    loadingBody: "Loading verified content…",
    footerLine: "Evidence → Impact → Action",
    authorCredit: "By Jungle",
    unavailableTitle: "Unable to load report",
    unavailableLabel: "Report unavailable",
    missingId: "The report identifier is missing from the URL.",
    missingReport: "Report not found",
    missingTranslation: "An English edition is not available for this report.",
    published: "Published",
    status: "Status",
    priorities: "Priorities",
    coverage: "Coverage",
    window: "Window",
    sources: "Sources",
    material: "Material change",
    noMaterial: "No material change"
  }
};

const state = {
  language: (() => {
    const requested = new URLSearchParams(window.location.search).get("lang");
    if (requested === "en" || requested === "zh-Hant") return requested;
    return localStorage.getItem("crw-language") === "en" ? "en" : "zh-Hant";
  })(),
  manifest: null
};

function t(key) {
  return translations[state.language][key] || translations["zh-Hant"][key] || key;
}

function localizedField(report, field) {
  const englishField = field + "En";
  return state.language === "en" && report[englishField] ? report[englishField] : report[field];
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function safeHref(url) {
  const value = String(url || "").trim();
  if (/^https?:\/\//i.test(value)) return escapeHtml(value);
  if (/^(?:\.{0,2}\/)?[a-zA-Z0-9_./-]+(?:#[a-zA-Z0-9_-]+)?$/.test(value)) return escapeHtml(value);
  return "#";
}

function inlineMarkdown(value) {
  let output = escapeHtml(value);
  output = output.replace(/`([^`]+)`/g, "<code>$1</code>");
  output = output.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  output = output.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  output = output.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) =>
    `<a href="${safeHref(href)}" target="_blank" rel="noopener noreferrer">${label}</a>`);
  return output;
}

function slugify(value, used) {
  const base = value
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 72) || "section";
  const count = used.get(base) || 0;
  used.set(base, count + 1);
  return count ? `${base}-${count + 1}` : base;
}

function isTableDivider(line) {
  return /^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
}

function tableCells(line) {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
}

function renderMarkdown(markdown) {
  const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
  const usedSlugs = new Map();
  const headings = [];
  const html = [];
  let index = 0;
  let inCode = false;
  let codeLanguage = "";
  let codeLines = [];

  while (index < lines.length) {
    const line = lines[index];
    if (line.startsWith("```")) {
      if (!inCode) {
        inCode = true;
        codeLanguage = line.slice(3).trim();
        codeLines = [];
      } else {
        html.push(`<pre><code class="language-${escapeHtml(codeLanguage)}">${escapeHtml(codeLines.join("\n"))}</code></pre>`);
        inCode = false;
      }
      index += 1;
      continue;
    }
    if (inCode) {
      codeLines.push(line);
      index += 1;
      continue;
    }
    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const label = heading[2].replace(/\*\*/g, "").trim();
      const id = slugify(label, usedSlugs);
      headings.push({ level, label, id });
      html.push(`<h${level} id="${id}">${inlineMarkdown(heading[2])}</h${level}>`);
      index += 1;
      continue;
    }
    if (line.includes("|") && index + 1 < lines.length && isTableDivider(lines[index + 1])) {
      const headers = tableCells(line);
      index += 2;
      const rows = [];
      while (index < lines.length && lines[index].includes("|") && lines[index].trim()) {
        rows.push(tableCells(lines[index]));
        index += 1;
      }
      html.push(`<div class="table-wrap"><table><thead><tr>${headers.map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${headers.map((_, cellIndex) => `<td data-label="${escapeHtml(headers[cellIndex] || "")}">${inlineMarkdown(row[cellIndex] || "")}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);
      continue;
    }
    if (/^\s*[-*]\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^\s*[-*]\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*[-*]\s+/, ""));
        index += 1;
      }
      html.push(`<ul>${items.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ul>`);
      continue;
    }
    if (/^\s*\d+\.\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^\s*\d+\.\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*\d+\.\s+/, ""));
        index += 1;
      }
      html.push(`<ol>${items.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ol>`);
      continue;
    }
    if (/^>\s?/.test(line)) {
      const quote = [];
      while (index < lines.length && /^>\s?/.test(lines[index])) {
        quote.push(lines[index].replace(/^>\s?/, ""));
        index += 1;
      }
      html.push(`<blockquote>${quote.map(inlineMarkdown).join("<br>")}</blockquote>`);
      continue;
    }
    if (!line.trim()) {
      index += 1;
      continue;
    }
    const paragraph = [line.trim()];
    index += 1;
    while (
      index < lines.length
      && lines[index].trim()
      && !/^(#{1,4})\s+/.test(lines[index])
      && !/^\s*[-*]\s+/.test(lines[index])
      && !/^\s*\d+\.\s+/.test(lines[index])
      && !/^>\s?/.test(lines[index])
      && !lines[index].startsWith("```")
      && !(lines[index].includes("|") && index + 1 < lines.length && isTableDivider(lines[index + 1]))
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
  }
  if (inCode) html.push(`<pre><code class="language-${escapeHtml(codeLanguage)}">${escapeHtml(codeLines.join("\n"))}</code></pre>`);
  return { html: html.join("\n"), headings };
}

function formatDate(value) {
  return new Intl.DateTimeFormat(state.language === "en" ? "en-GB" : "zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Taipei",
    hour12: false
  }).format(new Date(value));
}

function renderMeta(report) {
  const status = report.status === "material-change" ? t("material") : t("noMaterial");
  const priorities = ["P0", "P1", "P2", "P3"]
    .map((priority) => `${priority}: ${Number(report.priorityCounts?.[priority] || 0)}`)
    .join(" · ");
  meta.innerHTML = `
    <div class="meta-row"><span>${escapeHtml(t("published"))}</span><strong>${escapeHtml(formatDate(report.publishedAt))}</strong></div>
    <div class="meta-row"><span>${escapeHtml(t("status"))}</span><strong>${escapeHtml(status)}</strong></div>
    <div class="meta-row"><span>${escapeHtml(t("priorities"))}</span><strong>${escapeHtml(priorities)}</strong></div>
    <div class="meta-row"><span>${escapeHtml(t("coverage"))}</span><strong>${escapeHtml((report.scopes || []).join(" · "))}</strong></div>
    <div class="meta-row"><span>${escapeHtml(t("window"))}</span><strong>${escapeHtml(report.coverageStart || "—")} → ${escapeHtml(report.coverageEnd || "—")}</strong></div>
    <div class="meta-row"><span>${escapeHtml(t("sources"))}</span><strong>${escapeHtml(Number(report.sourceCount || 0))}</strong></div>`;
}

function showError(message) {
  hero.innerHTML = `<p class="eyebrow">CYBER REGULATION WATCH</p><h1>${escapeHtml(t("unavailableTitle"))}</h1>`;
  content.innerHTML = `<div class="error-box"><strong>${escapeHtml(t("unavailableLabel"))}</strong>${escapeHtml(message)}</div>`;
}

async function loadReport() {
  try {
    const id = new URLSearchParams(window.location.search).get("id");
    if (!id) throw new Error(t("missingId"));
    if (!state.manifest) {
      const manifestResponse = await fetch("data/reports.json", { cache: "no-store" });
      if (!manifestResponse.ok) throw new Error(`Manifest HTTP ${manifestResponse.status}`);
      state.manifest = await manifestResponse.json();
    }
    const report = state.manifest.reports.find((item) => item.id === id);
    if (!report) throw new Error(`${t("missingReport")}: ${id}`);
    const path = state.language === "en" ? report.reportPathEn : report.reportPath;
    if (!path) throw new Error(t("missingTranslation"));
    const reportResponse = await fetch(path, { cache: "no-store" });
    if (!reportResponse.ok) throw new Error(`Report HTTP ${reportResponse.status}`);
    const rendered = renderMarkdown(await reportResponse.text());
    const title = localizedField(report, "title");
    const summary = localizedField(report, "executiveSummary");
    document.title = `${title} · Cyber Regulation Watch`;
    hero.innerHTML = `<p class="eyebrow">WEEKLY EXECUTIVE &amp; ACTION BRIEF</p><h1>${escapeHtml(title)}</h1><p>${escapeHtml(summary)}</p>`;
    renderMeta(report);
    content.innerHTML = rendered.html;
    toc.innerHTML = rendered.headings
      .filter((item) => item.level >= 2 && item.level <= 3)
      .map((item) => `<a class="level-${item.level}" href="#${item.id}">${escapeHtml(item.label)}</a>`)
      .join("");
    updateReadingProgress();
  } catch (error) {
    showError(error.message);
  }
}

function applyLanguage(language, reload = true) {
  state.language = language === "en" ? "en" : "zh-Hant";
  localStorage.setItem("crw-language", state.language);
  document.documentElement.lang = state.language;
  const params = new URLSearchParams(window.location.search);
  params.set("lang", state.language);
  history.replaceState(null, "", `${window.location.pathname}?${params.toString()}${window.location.hash}`);
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (translations[state.language][key]) element.textContent = translations[state.language][key];
  });
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.lang === state.language));
  });
  if (reload && state.manifest) loadReport();
}

function closeToc() {
  document.body.classList.remove("toc-open");
  if (tocToggle) tocToggle.setAttribute("aria-expanded", "false");
}

if (tocToggle) {
  tocToggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("toc-open");
    tocToggle.setAttribute("aria-expanded", String(open));
  });
}
if (tocBackdrop) tocBackdrop.addEventListener("click", closeToc);
toc.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeToc();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeToc();
});

function updateReadingProgress() {
  if (!readingProgress) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
  readingProgress.style.width = `${ratio * 100}%`;
}
window.addEventListener("scroll", updateReadingProgress, { passive: true });
window.addEventListener("resize", updateReadingProgress);
document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang));
});

applyLanguage(state.language, false);
updateReadingProgress();
loadReport();
