# COUNTERMAND — Base Batches 004 Application Draft

Status: PRE-SUBMISSION DRAFT  
Date: 2026-09-09  
Submission remains a human-protected action.

This document mirrors the fields visible in the Base Batches 004 application form. Replace bracketed personal-contact/runway placeholders with truthful values before submission.

---

## COMPANY

### Company Name

**COUNTERMAND**

### What are you building?

COUNTERMAND is execution-assurance infrastructure for autonomous agents that move money. It revalidates the exact economic action an agent decided earlier against fresh context at execution time, blocking stale decisions even when wallet permissions still allow them.

### Website / Product URL

https://github.com/Faadil1/COUNTERMAND

### X URL

Use the founder's active X profile until/unless a COUNTERMAND company account exists. Do not create an empty company account only for the application.

`[FOUNDER X URL]`

### Which category best describes your company?

**AI / Agents**

Secondary economic category: Payments / Financial Infrastructure.

---

## TEAM

### Founder 1 — Name

**Faadil Boussari**

### Role

**Founder & CEO**

### Brief description of previous professional experiences

Business analyst, analytics practitioner, and product builder with experience turning ambiguous operating problems into measurable workflows and shipped systems. My professional work spans business analysis, customer and operational analytics, BI/dashboarding, and cross-functional delivery; independently, I build agent systems, orchestration workflows, and evidence-heavy products where the boundary between model output and real-world action matters.

### Hardest problem / most significant adversity

While shipping the predecessor to COUNTERMAND under a hard competition deadline, the primary judge-facing runtime failed after the product had already been submitted. The underlying evidence and safety model were intact, so instead of rewriting the product or weakening controls, I separated the deployment defect from the product truth, moved the judge path to a working runtime, preserved fail-closed behavior, and documented exactly what had and had not changed. I learned to treat evidence, claims, and external execution as separate systems: under pressure, the best recovery is often the one that preserves the contract rather than expanding scope.

### Email

`[FOUNDER EMAIL]`

### Telegram

`[FOUNDER TELEGRAM USERNAME]`

### X

`[FOUNDER X URL]`

### LinkedIn

`[FOUNDER LINKEDIN URL]`

### Team Size

**1–4**

If the founder is the only committed team member for this company today, represent the company as a solo-founder team rather than counting informal collaborators.

### Location

**Gatineau, Quebec, Canada**

### Founding Team Video Pitch (1–5 minutes)

Use the script in `FOUNDER-VIDEO-PITCH.md`, record the founder speaking directly to camera, and upload as an unlisted YouTube/Loom/Vimeo link.

---

## PRODUCT & TRACTION

### What is the problem you are solving?

Autonomous agents can retain permission to move money after the decision that justified an action has gone stale. Existing spend limits, wallet policies, and transaction simulations answer whether an action is allowed now; they do not prove that the exact action is still supported by the context that produced it. This affects teams deploying agents for payments, trading, procurement, rebalancing, and other multi-step financial workflows.

### Why are you working on this idea?

I hit this failure mode while building an agent that could make a correct decision at T0 and execute later after context changed. The gap was not reasoning quality or wallet permission; it was missing temporal integrity between decision and execution. As agents gain persistent wallets and machine-payable services, I think this becomes a core infrastructure problem.

### What is your unique insight or advantage in the market you are building for?

Permission and decision validity are different control planes. An action may still be inside every spend limit and pass current checks, yet be wrong because the premise that authorized that exact action expired. COUNTERMAND makes the original decision an explicit, signed, short-lived object that can be revalidated at T1 instead of treating model reasoning as permanent authorization.

### How long have you been working on this idea?

Choose the shortest truthful option in the dropdown corresponding to **less than one month / very early**. The COUNTERMAND company direction is new; do not imply years of company history because the underlying primitive had an earlier prototype.

### How far along are you?

Choose **MVP / Working prototype** (or the closest available wording).

### Demo URL

https://valid-until-agent-os.pages.dev

Label mentally/verbally as: **working proof of the core execution-assurance primitive under its predecessor project name, Valid Until**.

### What have you built to date?

The predecessor prototype, Valid Until, already implements signed decision receipts, exact-action hashing, T0→T1 revalidation, expiry/drift/tampering checks, an agent-native MCP interface, six deterministic adversarial scenarios, and one authenticated non-production testnet `ALLOW → execution → same-order verification`. COUNTERMAND is the Base-first productization of that primitive; the next milestone is a Base Sepolia USDC/x402 scenario where permissions remain valid but a changed premise forces `REPLAN_REQUIRED`.

### What is your current traction?

Pre-revenue and no production users yet. Technical traction includes a working public prototype, 6/6 deterministic red-team scenarios, an agent-native MCP interface, and one preserved authenticated non-production testnet execution proving that an `ALLOW` decision can reach an external financial execution boundary. There is no Base mainnet volume yet; prototype evidence is intentionally reported separately from user or revenue traction.

### Dune analytics dashboards and/or public smart contract addresses

**Leave blank** unless a Base deployment is completed before submission. Do not paste unrelated Binance/testnet identifiers into a Base contract field.

### Have you raised capital before? If so, what's your current runway?

**No external capital raised; bootstrapped to date.**

Then add one truthful runway sentence before submission:

`[CURRENT RUNWAY — e.g. founder-funded with approximately X months of committed runway / low-burn while pre-revenue]`

Do not invent a runway figure.

### What are your current fundraising goals? Do you plan on raising capital from VCs?

We are not running a VC round today. The immediate goal is to use Base Batches to ship the Base-native product, recruit design partners, and establish evidence of repeated usage. After that, I would consider a pre-seed round only if the product shows real pull; capital would primarily fund product/security engineering, Base integrations, and developer distribution.

---

## WHY BASE

### Why do you want to join Base Batches?

Base is where the pieces that make this problem urgent are converging: agent-native accounts, stablecoin payments, x402 services, and onchain markets. Base Batches gives us the fastest path to validate COUNTERMAND with the builders who are actually putting autonomous agents in front of economic execution.

### What part of your product is or will be onchain? What part uses Base?

COUNTERMAND will use Base as the execution and audit layer. The agent's policy and decision receipt can be produced offchain, but the final Base action — such as a USDC/x402 payment, swap, or other economic transaction — is released only after revalidation; we plan to anchor a compact receipt/hash and result onchain so execution can be traced back to the decision contract. We have not yet deployed a Base contract; the current working prototype proves the core control primitive in a separate non-production testnet.

### Do you already have a token?

**No.**

### Anything else you'd like us to know?

The working predecessor proof is public:

- COUNTERMAND: https://github.com/Faadil1/COUNTERMAND
- Core technical prototype: https://github.com/Faadil1/valid-until-agent-os
- Live proof surface: https://valid-until-agent-os.pages.dev
- Evaluation suite: https://valid-until-agent-os.pages.dev/evaluations
- Preserved non-production execution proof: https://valid-until-agent-os.pages.dev/live-proof

COUNTERMAND is not a cosmetic chain port. Base is the intended first product environment because the execution-assurance problem becomes most valuable where autonomous agents have persistent economic capabilities and machine-payable services.

### Who referred you to this program?

**@buildonbase on X**

---

## FINAL HUMAN CHECK BEFORE SUBMIT

Confirm all required personal links are correct, the video URL is accessible without requesting permission, the runway statement is truthful, and no field implies Base deployment, users, revenue, production safety, real-money performance, or security certification that does not yet exist.

Do not submit until the final page has been reviewed once end-to-end.
