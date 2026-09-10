# Vercel production visibility evidence — 2026-09-10

Evidence class: HUMAN_OBSERVED_DEPLOYMENT_VISIBILITY

A founder-provided Vercel dashboard screenshot shows the COUNTERMAND project with a Production Deployment in `Ready` state.

Observed public domain:

- https://countermand-mu.vercel.app

Observed deployment source:

- branch: `main`
- commit: `231578c22a21b877b426532e33b128204c748952`
- commit message: `Record public-runtime blockers without contaminating product CI`

The Vercel dashboard preview visibly renders the COUNTERMAND evaluator surface, including the core hero/decision-receipt composition.

## What this proves

- a public Vercel production deployment exists;
- Vercel reports it `Ready`;
- the deployment is connected to GitHub `main`;
- the rendered page is COUNTERMAND, not the predecessor Valid Until site.

## What this does not prove

This screenshot alone does **not** prove that every interactive path works in production, that `/api/base-state` succeeds from the public runtime, that browser fallback RPC works, or that a Base Sepolia COUNTERMAND write has occurred.

Those claims remain behind the separate runtime-smoke and Base-write gates.
