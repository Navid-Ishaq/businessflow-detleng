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

## Notes 1 and 2 verification

20 automated tests passed. All three browser regression suites and the production build passed. Independent openpyxl reopening verified five charts on Analysis - Charts, no charts on other sheets, reciprocal navigation targets, frozen top rows, and preserved AutoFilter rules. Alignment and chart drawing placement are covered by regression assertions.



## Tier 3 — Live Analytics and reopened reports — 8 October 2026

Implemented both instructions in the existing local project. No GitHub push or deployment was performed for this tier.

### Implementation and files

New source modules: `live-engine.js`, `live-worker.js`, `live-charts.js`, `live-view.js`, `live.css`, `report-import.js`, `existing-view.js`, and `workbook-guard.js`.

Updated: `index.html`, `src/app.js`, `src/engine.js`, `src/export.js`, `src/worker.js`, `package.json`, `package-lock.json`, `README.md`, `THIRD_PARTY_NOTICES.md`, and this report. Added `LIVE_ANALYTICS.md` and live unit/browser/edge/performance/production tests; updated the existing engine tests to distinguish visible sheets from the required hidden metadata sheet.

One normalized-data contract and one shared Live Analytics engine serve both current-session and existing-report entry paths. Dashboard calculations reuse the existing Analysis and universal Group By logic. Features include 12 financial/activity KPIs plus date KPIs, currency isolation, time/flow/mix/volume/cumulative charts, period highlights, all-value/single/multi-value filters, typed/date grouping, ranked groups, repeated activity, Top 5 concentration, largest transactions, group details/comparison, Explorer metrics/chart/sort/Top N, 20-row transaction pages, reset/visible filters, chart data alternatives, responsive layout and worker progress/error handling.

New exports include hidden, chunk-safe schema-v1 metadata with validated role/column positions and original report-period boundaries. Selected dates become native date cells with explicit regional display formatting; amounts retain numeric precision. Legacy Report Data files use explicit role confirmation. Invalid/future metadata and missing detail data are rejected safely. No derived Analysis cells are scraped for calculations.

### Tests and numerical parity

- `npm test`: 30 tests passed, no skipped tests on this local machine. Includes existing regression/AutoFilter/chart-style coverage and new parity, filtering, currencies, zero/invalid values, duplicate headings, reordered columns, metadata corruption/chunks, 1904 dates, formula caches, ZIP guards and 1k/10k/50k aggregation.
- Existing three browser suites passed: source workflow, header/columns/roles/periods, all report generation and previews, grouping, login/modal/focus/reduced motion, four responsive widths and prior error/recovery behavior.
- Live browser suites passed: generate workbook, obtain actual downloadable Blob bytes, save/reload/reopen, metadata recognition, legacy confirmation, filtered Bizum parity, single/multi-value changes, no-data/custom periods, Explorer, transaction pagination, missing/invalid Date, zero-only/negative-only flows, independent currencies, unsafe text and corrupt metadata. Mobile width 390px had no document overflow. Axe scans found no serious/critical violations; existing regression scans found no violations on landing/results/login.
- Actual Chart.js dataset checks reconciled inflow bars, absolute outflow bars, doughnut proportions and net-trend totals/order with expected sample numbers.
- Path A and Path B matched headline KPIs, time summaries, group totals/rankings and largest transaction amounts. Original source workbook remained unchanged.
- Sample: **94 records, 52 inflows, 42 outflows; inflows 12,643.28; outflows -10,367.01; net 2,276.27**. Comparisons use floating-point tolerances where appropriate; formatting does not round stored data.
- Independent openpyxl reopening passed signed totals, hidden metadata, native charts exclusively on Analysis - Charts, left alignment, bounded fills and AutoFilter exclusively on Report Data. Existing Summary/Charts navigation and flow totals remain covered by regression tests.
- Production build passed. Local built-version smoke passed saved-report recognition, group/reset controls, mobile, source upload, built worker/assets, no raw `/src/` requests, and no errors/external requests.
- Browser request monitoring found no external processing requests or report-upload payloads. Financial datasets/history are not persisted in browser storage. No AI/API/backend/account dependency was introduced.

### Measured performance

Local indicative timings, not cross-device guarantees. The workbook benchmark uses four columns and up to 1,000 group values; the unit benchmark also exercises 50,000 distinct values.

| Records | XLSX bytes | Node parse | Normalize | Compute | Browser open | Filter update |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1,000 | 29,049 | 72 ms | 4 ms | 35 ms | 412 ms | 34 ms |
| 10,000 | 194,684 | 493 ms | 74 ms | 152 ms | 593 ms | 41 ms |
| 50,000 | 934,543 | 1,695 ms | 277 ms | 391 ms | 1,226 ms | 46 ms |

The 50,000-distinct-group calculation benchmark took approximately 0.85–0.90 seconds. Detailed DOM rows remained bounded, value selectors rendered at most 30 entries and charts used aggregates. A main-thread timer continued to tick during workbook processing/filtering. Peak browser memory was not instrumented; memory scope is controlled through worker termination, Blob URL revocation and dropping obsolete dataset references. Performance testing uncovered and fixed repeated worksheet column-count scans by caching column width once in both readers.

### Remaining limits and review

Only exported Report Data fields/records can be recovered from disk; omitted fields and excluded periods cannot be reconstructed. Include Report Data and mapped Amount for portable monetary analytics. Unknown currency remains source units; no conversion occurs. XLSX only, 20 MB compressed, 150 MB declared expanded contents, adapter maximum 200,000 rows/256 columns; browser resources/timeouts can impose lower practical limits. Formulas are not recalculated; unresolved caches are flagged. Optional PNG chart export/history/account features are not included.

The automation sandbox cancels download-to-disk automation. Parity tests therefore saved and reopened the real generated download Blob bytes; browser download controls remain functional and available. Native Excel UI checks were not repeated for this tier; independent XLSX parsing and existing native-chart XML regressions passed. Local synthetic workbooks, screenshots and timing JSON are ignored under `work/`.

Existing Create New Report, current-session analytics, saved-report analytics and previous report presentation rules remain intact. See LIVE_ANALYTICS.md for schema, architecture, privacy and operating limits. Nothing was pushed or deployed.


## Tier 4 — Business Workbook Builder (8 October 2026)

### Implemented

Third first-class Build entry; six guided activity-ledger templates and Custom; six guided steps; recommended/optional field selection; safe heading edits; add/remove/reorder with keyboard controls; 11 native field types; unique optional core roles; required flags and editable text dropdown lists; filename, date, number-input convention, ISO currency and capacity settings; structure/review previews; twin Blank/Sample actions; local cancelable worker and bounded ten-record sample preview.

One schema engine feeds both outputs. Blank files contain only prepared empty cells with formats/validation, row-1 headers, freeze panes, bounded banding/Amount highlights and source AutoFilter. Sample files contain coherent fictional entity/product pools, stable IDs, weighted distributions, period-safe dates, signed events and reconciled precomputed numeric totals. Versioned hidden Builder metadata plus veryHidden lists support safe source recognition; matching unique headings preserves identities through reordering. Ambiguous changed fields require owner review rather than guessing.

Direct sample handoff uses the existing source/report pipeline with roles prefilled and owner choices preserved. Filled blank return restores roles and excludes untouched prepared rows. Report Analysis, multi-grouping, dedicated native chart sheets, locked report AutoFilter and both Live Analytics adapters remain unchanged.

### Files created / changed

Created `src/builder-schema.js`, `builder-data.js`, `builder-output.js`, `builder-import.js`, `builder-worker.js`, `builder-view.js`, `builder.css`; `tests/builder.test.js`, `builder-browser.mjs`, `builder-fixtures.mjs`, `sample-path.js`; and `BUILDER.md`.

Changed `index.html`, `src/app.js`, `src/worker.js`, `package.json`, `README.md`, this report; existing sample-based tests now share the same path resolver. The owner's reference workbook was renamed from `04 source-for tes.xlsx` to `9 source-for tes.xlsx` during this session; tests support the renamed file and `BF_SAMPLE_PATH` without changing business assertions. The Live browser entry-count assertion now expects three product entries. No dependency was added and no existing calculation engine was rewritten.

### Checks and results

- `npm test`: **40 passed, zero failures, zero skips** (30 existing tests + 10 Builder tests).
- Six standard templates tested in both Blank and Sample modes; all 12 actual XLSX files independently reopened using openpyxl read-only inspection. Confirmed hidden metadata/lists, capacity, typed Amount/date cells, dropdown/numeric/date validations, freeze panes, AutoFilter, no formulas/macros/external connections and empty Blank records.
- Capacity tests cover 100, 500, 1,000, 1,500, 2,000, 2,500, 5,000 and custom 137. Invalid lower/upper/non-integer capacities are rejected.
- Custom checks cover add/remove through the schema/editor, rename, reorder, changed types/roles, uniqueness errors, unsafe text as literal strings, minimal general workbook and monetary-ready workbook.
- Seeded 5,000-record datasets for every standard template verify reproducibility, inclusive leap-month dates, finite amounts, required values, customer/supplier/SKU relationships, sign semantics and sales/product/Complete quantity/price/rate reconciliation.
- Blank return test fills exactly two records (+125.55 and −40.20), restores mappings and obtains **85.35 net** in the generated report and Live Analytics. Empty capacity rows are excluded.
- Complete browser journey: Build 5,000 samples → Use in Business Flow without download/reupload → review prefilled roles → Group Analysis/native charts → report → current Live Analytics → save actual download bytes → reload → Explore → reopened Live Analytics. Counts and totals match independently summed source cents. Separate sample download/reupload also restores Amount/Date mapping.
- Desktop and 390px mobile Builder paths tested, bounded DOM sample rows, state-preserving Back, visible/keyboard focus, duplicate/capacity validation and axe serious/critical checks. No browser errors or external data requests.
- Six visible template sheets were rendered from their actual XLSX files with the bundled artifact renderer. Long references/descriptions, row heights, wrapping and integer quantity display were polished after inspection; hidden lists/metadata do not become presentation sheets.
- Existing Create/Analysis, Live parity/security/edge tests and built-production smoke were checked; original 94-record sample remains **12,643.28 inflows / −10,367.01 outflows / 2,276.27 net**.

### Reconciliation and performance

Seeded Complete test: 5,000 records, **534,528.20 inflows / −316,931.43 outflows / 217,596.77 net**. Shared current and reopened analytics summaries match exactly. Report Data sum matches independently summed sample cents within floating-point tolerance; counts match exactly.

Final built-browser sample: **567,470.50 inflows / -316,621.01 outflows / 250,849.49 net** across all 5,000 records. Generation/result readiness took **1.395 seconds** locally; a 25ms main-thread heartbeat continued during worker generation. Other local runs took approximately 0.85–1.4 seconds. These are machine-specific observations, not guarantees. Only ten sample preview rows are rendered. Peak memory was not instrumented; obsolete workers, datasets and Blob URLs are released on navigation/cancellation.

### Limitations

Microsoft Excel COM activation was attempted and returned `E_ACCESSDENIED`; native Excel repair-dialog and interactive dropdown behavior could not be certified in this environment. Actual file structure, independent parsing, native types/validation definitions and rendered layout passed. The sandbox cancels automatic downloads to disk, so tests save/reopen the exact bytes behind the real download links. Native validation may be bypassed by pasting and does not force complete rows; existing data-quality handling remains active.

Initial maximum is 5,000 rows/64 fields. Blank derived totals are owner-entered (automatic formulas are optional in the instruction and were not added); sample values are precomputed numeric values. Advanced profiles, multi-currency simulation, exchange conversion, ERP/database/accounts/cloud/AI and arbitrary formulas are excluded. Original Create/Explore operating limits still apply. Excel controls native numeric separators; the setting is explicitly labeled as a text-input convention.

No business data leaves the browser. No AI/API/backend dependency was added. No Git commit/push or deployment was performed.

## Tier 5 and Tier 6 product-polish verification

Implemented the owner-facing Interactive Quick Guide first and verified it before adding the separate Behind Business Flow story. Both use the same accessible dialog shell and visual components while retaining separate content, instructional state and purpose.

- Existing unit suite: 40 passed, 0 failed, 0 skipped.
- Existing report browser suite: all three suites passed, including generated Excel, responsive/auth/privacy, edge files and Analysis/Group By behavior.
- Existing Live Analytics browser and edge suites: passed.
- Builder end-to-end suite: passed; 5,000 records, 858 ms sample generation in this run; 538,791.90 inflows, -313,251.32 outflows, 225,540.58 net, with exact current/report/reopened parity.
- Large-data suite: 1k/10k/50k records passed, bounded tables/charts and responsive browser heartbeat. The 50k case opened in about 18.1 seconds on this run and filtered in 564 ms; timings depend on device load.
- Quick Guide: all focused journeys/full tour, blank/sample choices, Amount signs/zero, periods, report sheets, sample filters/reset/Explorer, returning report, back/restart/exit and real workflow routes verified.
- Story: opening, fictional clean/separate/reset, all seven milestones, saved-report return, three collaborator panels, care/closing, replay and guide cross-links verified.
- Create configuration, Builder configuration and filtered Live Analytics state preserved after both informational overlays. Focus returned to the initiating control. Login shell remained functional.
- All 14 scenes checked on mobile with axe: no serious/critical violations. Additional desktop/laptop/tablet/mobile checks and 320px overflow checks passed. Keyboard, native modal focus containment, Escape and reduced motion verified.
- A transient text-contrast issue during reveals was fixed by removing opacity fading and strengthening instructional text contrast.
- Built production workers/source upload/generation/saved-report reload and Live Analytics filters/mobile smoke checks passed without external data requests or page errors.
- Final Vite build passed. Guide (~4.61 KB gzip), story (~4.26 KB gzip) and common shell (~0.71 KB gzip) load on demand. No new dependency or backend was added.
- Final built-preview Quick Guide, story and all 14 mobile/axe scenes passed on port 4173 after the completed build, including all workflow CTAs and milestone cross-links.

Limitations: illustrative guide scenarios and charts explain interactions; they do not process the owner's workbook. Target reading durations have not been confirmed in an independent user study. Automated axe/browser checks and visual inspection do not constitute a dedicated screen-reader or physical-device audit. Existing sandbox restrictions cancel automated downloads to disk; existing tests inspect the actual generated workbook bytes and reopen them.

No real financial/private records appear in either new experience. Business data processing remains local. No commit, GitHub push or deployment was performed for Tier 5/6. Project HEAD remained 01e60f4.


### Smart role suggestions — 2026-10-09
- Owner workbook: 229 transactions. Date, Reference, Description, Details, Category, Amount, Currency and Notes suggested; Bank Balance additionally maps to Balance. Unsupported extra business fields remain No role and selected for reporting.
- Independently reconciled totals: inflows 42,067.96; outflows -31,548.37; net 10,519.59.
- Tests cover multilingual/case/punctuation aliases, reordered/duplicate headings, contradictory types, Amount/Date ambiguity, strong date/currency patterns, 200k-row bounded sampling, valid/stale report metadata, missing Amount metadata, manual clear/reassignment and Back/Forward persistence.
- Browser upload → automatic roles → generation → saved report re-upload passed; desktop/mobile screenshots saved under work/smart-roles-*.png. Roles axe audit and zero external request checks passed.
- Existing browser, Live Analytics, Builder, Quick Guide and Behind Business Flow regression journeys passed. Unit regression, production build and static production smoke verified.
- No backend, API, AI call or new dependency. No push or deployment performed. Suggestions are conservative; unfamiliar headings, unsupported currency codes or conflicting date/amount fields require owner mapping.
