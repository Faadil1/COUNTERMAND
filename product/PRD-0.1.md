# COUNTERMAND — PRD 0.1 / Evaluator Experience

Status: BUILD IN PROGRESS  
Date: 2026-09-10  
Target: Base Batches 004 application

## Product thesis

**Permission can persist after the reason is gone.**

COUNTERMAND is execution-assurance infrastructure for autonomous agents that move money. It preserves the causal relationship between an economic decision made at T0 and execution attempted at T1.

## Evaluator-memory target

After 30 seconds, a reviewer should be able to say:

> "It is the one where every wallet check was green, but the transaction was still stopped because the original reason had expired."

If that sentence is not recoverable from the first interaction, the evaluator experience fails.

## V0.1 deterministic scenario

At T0 an agent decides to pay **18 USDC** for an x402 research dataset.

Standing controls:
- wallet permission: active;
- per-call spend cap: 25 USDC;
- exact action: PAY 18 USDC;
- receipt integrity: valid;
- decision validity window: 15 minutes;
- decision premise: dataset age must be <= 5 minutes;
- T0 observation: dataset age = 2 minutes.

At T1:
- wallet permission remains active;
- 18 USDC remains under the 25 USDC cap;
- exact action is unchanged;
- receipt integrity still passes;
- dataset age has become 13 minutes.

Expected result:

```text
PERMISSION            PASS
SPEND CAP             PASS
EXACT ACTION          PASS
RECEIPT INTEGRITY     PASS
ORIGINAL PREMISE      FAIL

COUNTERMAND
REPLAN_REQUIRED
```

## Design direction

The product surface is an **editorial execution instrument**, not a generic SaaS dashboard.

Required qualities:
- paper / ink / receipt / annotation grammar;
- typography-led identity;
- visible T0 -> T1 temporal displacement;
- revocation/countermand as a physical visual event;
- product interaction above the fold;
- no dark-blue AI shell;
- no neon, glassmorphism, orb, robot mascot, generic shield or chain imagery;
- reduced-motion support.

## Base-native proof classification

V0.1 includes a live, read-only Base Sepolia pulse:
- official/public Base Sepolia RPC;
- expected chain ID 84532;
- latest block read;
- `eth_getCode` check for Base Sepolia USDC;
- `eth_getCode` check for Coinbase Spend Permission Manager.

This is **LIVE_READ_ONLY** evidence. It is not an onchain COUNTERMAND deployment and not a transaction execution.

Canonical testnet addresses:
- USDC: `0x036CbD53842c5426634e7929541eC2318f3dCF7e`
- Spend Permission Manager: `0xf85210B21cC50302F477BA56686d2019dC9b67Ad`

## Claim boundaries

Demonstrated in COUNTERMAND V0.1:
- deterministic cross-time decision evaluator;
- Base Sepolia live network read;
- deployed-code presence checks for relevant Base/Coinbase primitives;
- public read-only evaluator.

Inherited predecessor evidence:
- signed decision receipts;
- exact-action binding;
- six adversarial scenarios;
- MCP contract;
- one authenticated non-production external execution boundary.

Not claimed:
- Base smart contract deployment;
- x402 payment execution by COUNTERMAND;
- Base mainnet usage;
- production users;
- revenue;
- real-money safety;
- audited security;
- measured loss reduction.

## Next proof gate

`BASE_SEPOLIA_WRITE_PROOF`

A human-authorized testnet wallet may later execute a bounded Base Sepolia action only after:
1. a dedicated wallet is created;
2. testnet-only funds are confirmed;
3. no private key is committed or shared in chat;
4. exact transaction semantics are reviewed;
5. the write is explicitly human-authorized.

Until then, V0.1 remains read-only and fail-closed.
