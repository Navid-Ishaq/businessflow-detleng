# DeTleng Business Flow local review

Built locally in `D:\DETLENG2\businessflow-detleng`. Review at http://127.0.0.1:5173/ (running development server). Static production preview is running at http://127.0.0.1:5174/.

## Implemented

- Original Business Flow identity, responsive landing page, floating navigation, mobile menu, privacy/about/how-it-works sections and complete footer.
- LFDS and DeTleng Network links in both header and footer with safe external navigation.
- Seven-step reporting wizard: upload, worksheet/header confirmation, column selection, semantic roles, sorting, date periods, report selection and review.
- Local XLSX processing in a Web Worker; selected columns, stable sorting, inclusive period filters and user-confirmed regional number/date parsing.
- New Report Data, Inflows and Outflows workbooks with numeric amounts, dynamic SUM totals, cached formula results, filters, frozen headers and readable wrapped rows. Zero values remain only in Report Data; blank/invalid amounts are counted and excluded from flow calculations.
- Results summary, limited table previews, new-report/reset, editable settings and Download Excel link.
- Analysis extension placeholder, labeled accurately while the final analytics specification remains pending.
- Login/Create Account dialog, password visibility controls and launch-period message. No real auth, account creation, credential persistence, provider, backend or API.
- Keyboard focus, explicit dialog focus containment, Escape/close/return focus, reduced motion, semantic markup and visible labels.

## Files created

`index.html`, `src/app.js`, `src/engine.js`, `src/export.js`, `src/worker.js`, `src/auth.js`, `src/style.css`, `public/mark.svg`, `public/CNAME`, `CNAME`, `vite.config.js`, `package.json`, `package-lock.json`, `.gitignore`, `README.md`, `THIRD_PARTY_NOTICES.md`, `TEST_REPORT.md`, `tests/engine.test.js`, `tests/browser.mjs`, `tests/extra-browser.mjs`, `tests/production-smoke.mjs`.

`dist/` contains the verified static build. `work/` contains private test fixtures, generated workbooks, screenshots and a test browser; it is ignored by Git. The original project folder was empty. Provided reference files and workbook were not changed.

## Verification and results

- `npm test`: 8 passing engine/export tests; no failures.
- `npm run test:browser`: workflow, validation, desktop/mobile auth, privacy/storage, focus, date filtering, previews, source selection and error checks pass. Download-save automation reports the sandbox limitation below explicitly.
- Responsive checks at 1440, 1024, 768 and 390 pixels: no document horizontal overflow. Table and stepper scrolling remain available. Screenshots retained locally.
- Axe: zero reported violations on landing, results and login dialog. This is an automated check, not a claim of exhaustive accessibility certification.
- `npm run build`: passed; relative static assets and bundled worker generated.
- `node tests/production-smoke.mjs`: built site reads sample and generates reloadable XLSX, with zero external requests and zero page errors.
- Independent openpyxl reload of the browser-generated workbook verifies sheet dimensions, SUM formulas, cached totals, filters and freeze panes.
- `npm audit`: zero known vulnerabilities across production and development dependencies at verification time. Vite updated to 6.4.4 and ExcelJS uuid dependency overridden to compatible 11.1.1.
- Original sample remains unchanged, confirmed by comparing its bytes before and after processing.

Sample: header row 5, 9 detected source columns, 94 records; 52 inflows totaling 12,643.28; 42 outflows totaling -10,367.01; net 2,276.27. June 2026 custom filtering returns 38 records. Amount role was manually mapped to Importe for these checks; the production engine does not depend on that heading.

## Remaining limitations

- The sandbox cancels both XLSX and independent plain-text browser downloads. Exact XLSX bytes from the Download Excel link were retrieved locally and verified, but saving with the button needs confirmation in a normal browser outside this sandbox.
- Analysis awaits the final KPI/chart specification. Login is intentionally a future-authentication shell.
- XLSX only, maximum 20 MB; no encrypted or legacy XLS files. Header detection is editable and heuristic.
- Text date order and decimal separators require user confirmation. Source formulas use saved cached results; arbitrary formula evaluation is unsupported.
- No currency conversion. Mixed-currency summary totals are hidden; generated flow totals sum original units and must be interpreted accordingly.
- Native Excel recalculation and Firefox/Safari/Edge behavior have not been verified. Financial calculations retain JavaScript floating-point limits.

No GitHub push, deployment, external workbook upload, authentication integration, database or account service was performed.


## Comprehensive Analysis / AutoFilter extension — 7 October 2026

Implemented deterministic local analysis: 12 core KPIs, date KPIs, day/week/month/quarter/year summaries, native bar/line/doughnut charts, top-five group rankings, largest transactions and period highlights. Universal grouping supports any source column, all/one/selected values, searchable paginated selection, multiple sheets, date and Amount grouping, sorting, blank groups and optional top-ten charts. Monetary summaries partition mapped currencies.

Sample reconciliation: 94 records, 52 inflows, 42 outflows; inflows 12,643.28, outflows -10,367.01, net 2,276.27. All-value group and time totals reconcile. Browser previews stop at 20 rows; full workbook retains all matching records.

Validation: unit/OOXML tests; original browser regression suite; Analysis browser workflow including mobile overflow and accessibility; independent openpyxl chart/XML reopen. Native Microsoft Excel opened the final workbook without a repair prompt. Visually verified bar, line and two-colour doughnut charts, KPI cards, bounded row/column fills and styled group tables. Report Data filter dropdowns were visible; Inflows, Outflows, Analysis and grouped headers had none.

Native Excel testing found and fixed an incorrect drawing-part content type, then improved explicit axis visibility and chart colours. Regression assertions protect the drawing content type.

Local samples: work/analysis-sample-final.xlsx and work/analysis-browser.xlsx (ignored, contain test data). No push or deployment. Automated download saving is canceled by this environment; blob bytes were independently saved/reopened, and prior user testing confirmed normal-browser download. No currency conversion; unavailable financial/date metrics are omitted or N/A.
