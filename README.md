# COUNTERMAND

> **Permission can persist after the reason is gone.**

**COUNTERMAND** is execution-assurance infrastructure for autonomous agents that move money.

Wallet permissions answer whether an agent **may** act. COUNTERMAND answers a different question:

> **Is the exact action the agent decided earlier still justified at the moment of execution?**

An agent can make a valid decision at **T0**, continue through a multi-step workflow, and reach **T1** with the same wallet permissions and the same action still technically executable — even though the premise that justified the action has changed.

COUNTERMAND binds the original policy, T0 context, exact normalized action, and validity window into a signed decision receipt. Immediately before execution, it revalidates that same decision against fresh state.

```text
Agent proposes action at T0
        ↓
COUNTERMAND seals decision receipt
  policy + context + exact action + expiry
        ↓
Fresh state at T1
        ↓
Revalidate the original decision
        ↓
ALLOW ───────────────→ bounded execution
BLOCK ───────────────→ REPLAN_REQUIRED
```

The model can propose an action. It cannot silently turn stale reasoning into permanent authorization.

## Why Base

Base is the intended launch environment for COUNTERMAND because autonomous agents increasingly combine smart accounts, stablecoin payments, onchain markets, and machine-payable services.

The first Base-native implementation will focus on an agent preparing an economic action in USDC and/or x402, then revalidating the decision immediately before the Base execution boundary.

The point is not another spend limit. An action can remain inside its spending policy and still no longer be justified by the decision that produced it.

## What already exists

COUNTERMAND is a new Base-first company direction built from a working execution-assurance primitive previously developed under the project name **Valid Until**.

That prototype demonstrates:

- signed decision receipts;
- exact-action binding;
- T0 → T1 revalidation;
- explicit expiry and drift failure modes;
- deterministic `ALLOW` / `REPLAN_REQUIRED` behavior;
- an agent-native MCP contract;
- a preserved authenticated non-production testnet execution under `ALLOW`.

Technical proof from the predecessor prototype:

- Demo: https://valid-until-agent-os.pages.dev
- Evaluation suite: https://valid-until-agent-os.pages.dev/evaluations
- Verified non-production execution: https://valid-until-agent-os.pages.dev/live-proof
- Source: https://github.com/Faadil1/valid-until-agent-os

The predecessor proof is **not** presented as Base deployment, production evidence, real-money performance, or user traction.

## Base-first build target

The initial Base prototype will prove one narrow scenario:

1. an agent forms an economic decision at T0;
2. the exact action is sealed into a short-lived decision receipt;
3. wallet/account permissions remain valid;
4. a material premise changes before execution;
5. COUNTERMAND revalidates against fresh Base/service state;
6. execution is blocked with `REPLAN_REQUIRED` despite the action still being permitted.

This makes the distinction visible:

```text
PERMISSION: YES
DECISION STILL VALID: NO
EXECUTION: BLOCK
```

## Category

AI Agents · Payments · Financial Infrastructure · Execution Assurance

## Status

Early-stage / pre-seed. Base-first prototype in progress.

---

**COUNTERMAND**  
*Execution assurance for autonomous agents.*
