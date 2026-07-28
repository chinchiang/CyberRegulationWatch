# Weekly report archive

The scheduled `Cyber Regulation Watch` automation appends one Markdown report per run:

```text
reports/YYYY/YYYY-MM-DD.md
```

It must also append one matching object to `data/reports.json`.

## Report manifest contract

```json
{
  "id": "2026-08-03",
  "title": "Cyber Regulation Watch｜2026-08-03",
  "publishedAt": "2026-08-03T08:00:00+08:00",
  "coverageStart": "2026-07-27",
  "coverageEnd": "2026-08-02",
  "status": "material-change",
  "executiveSummary": "300 字內管理摘要。",
  "scopes": ["EU CRA", "NIS2"],
  "tags": ["Article 14", "SRP"],
  "priorityCounts": {"P0": 1, "P1": 2, "P2": 3, "P3": 0},
  "decisions": ["管理階層決策摘要"],
  "deadlines": ["2026-09-11 — CRA Article 14"],
  "reportPath": "reports/2026/2026-08-03.md",
  "sourceCount": 12
}
```

Rules:

- `id` must be unique and use the report date.
- `status` must be `material-change` or `no-material-change`.
- `reportPath` must exist and stay relative to the repository root.
- Never delete or rewrite older weekly entries unless correcting a documented error.
- Keep reports sorted newest-first in the manifest.
- Important conclusions in Markdown must include a direct source URL and publication date.
- Draft standards must never be described as harmonised or as providing presumption of conformity unless cited in the EU Official Journal.

