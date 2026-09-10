# COUNTERMAND

> **Permission can persist after the reason is gone.**

**COUNTERMAND** is execution-assurance infrastructure for autonomous agents that move money.

Wallet permissions answer whether an agent **may** act. COUNTERMAND answers a different question:

> **Is the exact action the agent decided earlier still justified at the moment of execution?**

## The 30-second proof

The evaluator is designed around one counterexample:

```text
PAYMENT                 18.00 USDC
WALLET CAP              25.00 USDC
WALLET PERMISSION       PASS
EXACT ACTION HASH       PASS
RECEIPT INTEGRITY       PASS
ORIGINAL PREMISE        FAIL

→ COUNTERMAND
→ REPLAN_REQUIRED
```

Every ordinary permission check can remain green while the original decision has already expired.

The browser evaluator is implemented in this repository. Its Base pulse performs **read-only** Base Sepolia RPC checks; it does not send a transaction.

## Base-first path

COUNTERMAND is being productized for Base because autonomous agents increasingly combine:

- smart accounts and spend permissions;
- USDC;
- x402 machine-payable services;
- onchain markets;
- long, multi-tool workflows before value moves.

V0.1 reads live Base Sepolia state and verifies deployed bytecode at the canonical testnet USDC and Coinbase Spend Permission Manager addresses.

```text
Base Sepolia chain ID        84532
USDC                         0x036CbD53842c5426634e7929541eC2318f3dCF7e
Spend Permission Manager     0xf85210B21cC50302F477BA56686d2019dC9b67Ad
```

This is not presented as a COUNTERMAND contract deployment or x402 execution.

## Architecture

```text
Agent forms decision at T0
        ↓
COUNTERMAND seals decision scope
policy + T0 premise + exact action + lifetime
        ↓
fresh state at T1
        ↓
revalidate the old decision
        ↓
ALLOW ───────────────→ bounded execution
BLOCK ───────────────→ REPLAN_REQUIRED
```

The model can propose. It cannot silently turn stale reasoning into permanent authorization.

## Predecessor proof

COUNTERMAND is a new Base-first company direction built from a working primitive previously developed as **Valid Until**.

That predecessor demonstrates signed receipts, exact-action binding, T0→T1 revalidation, six deterministic adversarial cases, an MCP contract, and one preserved authenticated non-production external execution.

- Demo: https://valid-until-agent-os.pages.dev
- Evaluation suite: https://valid-until-agent-os.pages.dev/evaluations
- Verified non-production execution: https://valid-until-agent-os.pages.dev/live-proof
- Source: https://github.com/Faadil1/valid-until-agent-os

Predecessor evidence is deliberately separated from Base evidence.

## Run locally

No build step is required for the static evaluator.

```bash
npm run check
npm test
```

Serve the repository root with any static server. The `/api/base-state` route is a Vercel-style Node function and requires a compatible serverless runtime to provide the live Base pulse.

## Evidence boundaries

**Demonstrated now:** deterministic decision-expiry evaluator; read-only Base Sepolia network/contract checks; predecessor technical proof.

**Not claimed:** Base mainnet, a deployed COUNTERMAND smart contract, x402 execution by COUNTERMAND, production users, revenue, audited security, real-money safety, measured loss reduction, or production reliability.

## Base Batches 004

- Application draft: [`BASE-BATCHES-004-APPLICATION-DRAFT.md`](BASE-BATCHES-004-APPLICATION-DRAFT.md)
- Founder pitch: [`FOUNDER-VIDEO-PITCH.md`](FOUNDER-VIDEO-PITCH.md)
- Evaluator PRD: [`product/PRD-0.1.md`](product/PRD-0.1.md)
- Current state: [`state/CURRENT.yaml`](state/CURRENT.yaml)

---

**COUNTERMAND**  
*Execution assurance for autonomous agents.*
