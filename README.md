# DeTleng Business Flow

A static browser application that creates new Excel reports without uploading source workbooks. Production domain: `businessflow.detleng.com` (confirmed production domain).

## Local review

Open PowerShell in `D:\DETLENG2\businessflow-detleng`:

```powershell
npm ci
npm run dev -- --port 5173
```

Visit http://127.0.0.1:5173. The development server is restricted to loopback. No GitHub push or deployment has been performed.

```powershell
npm test
npm run test:browser
node tests/extra-browser.mjs
npm run build
npm audit
```

Browser tests use the installed Chrome executable on this computer. Tests reference the supplied workbook at its original path; this file is not bundled into the public application. `dist/` contains the static build with relative asset URLs. Serve it over HTTP; opening index.html using file:// does not support module workers.

## Architecture

- `index.html`: landing page, navigation, ecosystem links, footer, metadata, accessible dialog.
- `src/style.css`: design tokens, components, responsive layouts, focus and reduced motion.
- `src/app.js`: wizard state, configuration, validation, previews and local download.
- `src/engine.js`: worksheet inspection, unique column positions, explicit number/date parsing, period boundaries, sorting, filtering and summaries.
- `src/worker.js`: workbook loading and export off the main browser thread.
- `src/export.js`: separate workbook generation, sheet styles, freeze panes, filters and dynamic SUM formulas with cached results.
- `src/auth.js`: login/create-account UI and launch message; no provider, persistence, sessions or network requests.
- `public/mark.svg`: original product identity and favicon.
- `tests/`: engine, supplied workbook, export and browser checks.
- `work/`: local test workbooks and screenshots, excluded from version control.

ExcelJS 4.4.0 reads and writes XLSX, including cell styling and formulas. Vite 6.4.4 bundles the static application and worker. The uuid dependency is overridden to 11.1.1; ExcelJS uses only its compatible v4 export. Package versions are pinned in package-lock.json. No runtime CDN, externally hosted fonts, analytics, API or backend is required.

## Data rules and boundaries

The user confirms the header row, selected columns, semantic roles, numeric text format and regional date order. No business logic depends on a source heading or fixed column letter. ISO dates and native Excel dates are supported. Blank records are removed; any populated row beneath the confirmed header is treated as a record, so source footer/summary rows should be removed before upload when present.

Blank or invalid amounts remain in Report Data and are excluded from inflow/outflow calculations, with counts shown. Zero amounts remain in Report Data only. Period boundaries are inclusive; invalid dates are counted and excluded only when filtering by date. Original numeric values are not silently rounded; formatting affects presentation only. Amount text recognized under the selected format becomes numeric in output for working SUM formulas.

Mixed currency summary totals are suppressed and a warning is shown. Flow sheets still sum original units without conversion. Verify currencies before using their totals. Formulas in source workbooks use their saved cached results; this application does not evaluate arbitrary Excel formulas. Source styles, macros and linked objects are not copied.

## Current limitations

- XLSX only, up to 20 MB; encrypted workbooks and legacy XLS are unsupported.
- Analysis is deliberately a labeled extension placeholder pending the final KPI/chart specification.
- No real authentication or saved preferences/history. Temporary fields are cleared on close, mode switch and launch-message transition.
- Text dates use ISO or explicitly chosen day/month/year or month/day/year formats. Ambiguous formats require user confirmation through that choice.
- No currency conversion, accounting reconciliation, or arbitrary formula calculation. Financial arithmetic uses JavaScript numbers with compensated summation, subject to normal floating-point limits.
- Header detection is a heuristic over the first 50 rows; manual override is available.
- Browser preview shows up to 20 records; downloaded workbook contains all matching records.
- Large or heavily formatted workbooks can consume substantial browser memory despite worker processing.
- Browser verification is on local Chrome. Native Excel and other browsers require subsequent review.

## Privacy and authentication

Workbook contents and auth fields are never sent to a service or written to browser storage. Files remain in memory until refresh/start-new. Sign In/Create Account lead to a launch-period information screen; no authentication occurs. Native dialog provides background blocking, focus containment, Escape and close actions; focus returns to Login. No accounts, keys, databases or session tokens exist.

## Verification note

Eight engine/export tests pass. Browser checks cover desktop, laptop, tablet, mobile, upload and validation, multiple sheets, role conflicts, period filtering, previews, login states, focus containment, Escape, reduced motion, unchanged workflow state, no storage and no credential network requests. Axe accessibility checks report zero violations on landing/results/login. Generated browser bytes were independently reopened with openpyxl, including cached totals and formulas.

This execution sandbox cancels browser file saving for both generated XLSX and an independent plain-text download. The Download Excel link supplies verified XLSX bytes, but a normal-browser save needs manual confirmation outside this sandbox. The test harness reports this limitation explicitly and validates the linked bytes directly; it does not claim successful automated saving.

Built-site verification: `npm run preview -- --port 5174`, then `node tests/production-smoke.mjs`. See `TEST_REPORT.md` for results.

## GitHub Pages

In GitHub Settings > Pages, change Source to GitHub Actions. Retain the custom domain businessflow.detleng.com. The workflow builds the app and uploads only dist, then deploys through the github-pages environment on a main-branch push or manual workflow dispatch. Enable Enforce HTTPS once GitHub makes it available.

CI runs portable reporting-engine tests. The private workbook integration test is explicitly skipped when the original local sample is unavailable; the source workbook is never committed. Browser tests remain local because they depend on the local sample and browser executable.

## Upload recovery

Worker lifecycle is managed in `src/workbook-client.js`. Worker startup/runtime/message failures reach an actionable error instead of leaving the upload spinner running. Reading and worksheet inspection have a 60-second timeout; generation has a 120-second timeout. Cancel terminates the worker and ignores stale file reads. Retry reuses the selected in-memory File without uploading it. Loading shows an indeterminate progress indicator, elapsed seconds, and a reduced-motion-aware activity icon. Run `node tests/upload-recovery.mjs` to verify browser worker failure/retry/cancel behavior.

If the live page loads `/src/worker.js` or shows a 404 for `/mark.svg`, raw source is being served instead of `dist`. Confirm Settings > Pages > Source is GitHub Actions, then run the Build and deploy Business Flow workflow. The Pages workflow must publish the built `dist` artifact.
