const content = document.getElementById("report-content");
const hero = document.getElementById("report-hero");
const meta = document.getElementById("report-meta");
const toc = document.getElementById("report-toc");
const tocToggle = document.getElementById("toc-toggle");
const tocBackdrop = document.getElementById("toc-backdrop");
const readingProgress = document.getElementById("reading-progress");

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

  if (inCode) {
    html.push(`<pre><code class="language-${escapeHtml(codeLanguage)}">${escapeHtml(codeLines.join("\n"))}</code></pre>`);
  }

  return { html: html.join("\n"), headings };
}

function formatDate(value) {
  return new Intl.DateTimeFormat("zh-TW", {
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
  const status = report.status === "material-change" ? "有實質變更" : "本週無重大變更";
  const priorities = ["P0", "P1", "P2", "P3"]
    .map((priority) => `${priority}: ${Number(report.priorityCounts?.[priority] || 0)}`)
    .join(" · ");
  meta.innerHTML = `
    <div class="meta-row"><span>PUBLISHED</span><strong>${escapeHtml(formatDate(report.publishedAt))}</strong></div>
    <div class="meta-row"><span>STATUS</span><strong>${escapeHtml(status)}</strong></div>
    <div class="meta-row"><span>PRIORITIES</span><strong>${escapeHtml(priorities)}</strong></div>
    <div class="meta-row"><span>COVERAGE</span><strong>${escapeHtml((report.scopes || []).join(" · "))}</strong></div>
    <div class="meta-row"><span>WINDOW</span><strong>${escapeHtml(report.coverageStart || "—")} → ${escapeHtml(report.coverageEnd || "—")}</strong></div>`;
}

function showError(message) {
  hero.innerHTML = `<p class="eyebrow">CYBER REGULATION WATCH</p><h1>無法載入週報</h1>`;
  content.innerHTML = `<div class="error-box"><strong>Report unavailable</strong>${escapeHtml(message)}</div>`;
}

async function loadReport() {
  try {
    const id = new URLSearchParams(window.location.search).get("id");
    if (!id) throw new Error("網址缺少週報識別碼。");

    const manifestResponse = await fetch("data/reports.json", { cache: "no-store" });
    if (!manifestResponse.ok) throw new Error(`Manifest HTTP ${manifestResponse.status}`);
    const manifest = await manifestResponse.json();
    const report = manifest.reports.find((item) => item.id === id);
    if (!report) throw new Error(`找不到週報：${id}`);

    const reportResponse = await fetch(report.reportPath, { cache: "no-store" });
    if (!reportResponse.ok) throw new Error(`Report HTTP ${reportResponse.status}`);
    const markdown = await reportResponse.text();
    const rendered = renderMarkdown(markdown);

    document.title = `${report.title} · Cyber Regulation Watch`;
    hero.innerHTML = `
      <p class="eyebrow">WEEKLY EXECUTIVE &amp; ACTION BRIEF</p>
      <h1>${escapeHtml(report.title)}</h1>
      <p>${escapeHtml(report.executiveSummary)}</p>`;
    renderMeta(report);
    content.innerHTML = rendered.html;

    const visibleHeadings = rendered.headings.filter((item) => item.level >= 2 && item.level <= 3);
    toc.innerHTML = visibleHeadings.map((item) =>
      `<a class="level-${item.level}" href="#${item.id}">${escapeHtml(item.label)}</a>`).join("");
  } catch (error) {
    showError(error.message);
  }
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
updateReadingProgress();

loadReport();


