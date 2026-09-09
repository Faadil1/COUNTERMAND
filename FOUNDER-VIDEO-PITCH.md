# COUNTERMAND — Founder Video Pitch

Target length: 90–120 seconds  
Format: founder speaking directly to camera  
Style: plain, specific, no deck required

---

Hi, I'm Faadil, founder of COUNTERMAND.

Autonomous agents are getting wallets, stablecoins, smart accounts, and access to machine-payable services. But there is a control problem I think is still missing.

Wallet permissions can tell an agent whether it is allowed to spend. They do not tell us whether the decision that caused that spend is still valid.

Imagine an agent decides at T0 to make a payment, buy a service, execute a swap, or rebalance a position. It continues through a multi-step workflow, and by T1 the action is still inside its spending limit and technically executable — but the premise that justified the action has changed.

COUNTERMAND makes the decision itself a short-lived object.

We bind the policy, the original context, the exact action, and a validity window into a signed decision receipt. Immediately before money moves, COUNTERMAND revalidates that same decision against fresh state.

If it is still justified, execution can continue. If the reason is gone, COUNTERMAND returns `REPLAN_REQUIRED` — even when the wallet would still permit the action.

I already built and publicly tested the core primitive under an earlier project called Valid Until: signed receipts, exact-action binding, T0-to-T1 revalidation, deterministic failure cases, an MCP interface, and a preserved authenticated non-production execution.

COUNTERMAND is the Base-first productization of that primitive.

Base is especially compelling because agent-native accounts, USDC, x402, and onchain markets are bringing autonomous agents closer to real economic execution. I want COUNTERMAND to become the decision-integrity layer between an agent's reasoning and the moment value actually moves.

That's what I want to build through Base Batches.
