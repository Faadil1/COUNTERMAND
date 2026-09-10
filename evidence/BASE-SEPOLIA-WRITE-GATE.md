# Base Sepolia Write Proof Gate

Status: `PREPARED_NOT_AUTHORIZED`  
Date: 2026-09-10

This gate exists to convert COUNTERMAND from Base-native live-read evidence to a bounded Base Sepolia economic-execution proof **without ever exposing a private key or using real funds**.

## Why a separate gate

The public V0.1 evaluator currently proves the decision-validity mechanism and reads live Base Sepolia state. A write proof would add a stronger evidence class: an actual testnet x402/USDC economic action released only when COUNTERMAND returns `ALLOW`.

A write must not be triggered merely to improve presentation. It requires an explicitly authenticated testnet wallet and human approval.

## Preferred wallet route

Use Coinbase Agentic Wallet (`awal`) locally. Authentication is email + OTP and the signing keys remain wallet-managed; no private key should be copied into the repository, terminal transcript, screenshot, or chat.

Prerequisite commands:

```bash
npx awal@latest status
npx awal@latest auth login <YOUR_EMAIL>
# Read the flowId in your own terminal. Read the OTP from your own email.
npx awal@latest auth verify <FLOW_ID> <OTP>
npx awal@latest address
npx awal@latest balance --chain base-sepolia
```

**Do not paste the OTP, private credentials, session material, or wallet secrets into ChatGPT or GitHub.**

## Payment target

Use an x402 endpoint whose payment requirement explicitly specifies **Base Sepolia**. The endpoint itself determines the x402 payment network; do not pay a Base-mainnet endpoint for this proof.

Before paying, inspect the quoted challenge and confirm:

```text
network       Base Sepolia / eip155:84532
asset         testnet USDC
amount        intentionally tiny
max amount    explicitly capped in the command
```

The canonical Coinbase CLI form is:

```bash
npx awal@latest x402 pay "<BASE_SEPOLIA_X402_URL>" --max-amount <ATOMIC_USDC_CAP> --json
```

USDC has six decimals, so `10000` atomic units = 0.01 USDC and `100000` = 0.10 USDC.

## COUNTERMAND proof sequence

### Case A — stale decision / must not pay

1. Create the T0 decision receipt.
2. Keep wallet permission, cap, exact action and receipt integrity valid.
3. Change only the material T0 premise before execution.
4. Run `revalidate`.
5. Expected result: `REPLAN_REQUIRED`.
6. **Do not invoke `awal x402 pay`.**
7. Preserve the receipt/evaluation as negative evidence.

### Case B — fresh decision / bounded pay

1. Create a fresh T0 decision receipt for the exact endpoint and maximum amount.
2. Revalidate immediately before the payment boundary.
3. Confirm `ALLOW`.
4. Human confirms the endpoint/network/amount one final time.
5. Run exactly one bounded `awal x402 pay` call.
6. Preserve the returned JSON, transaction hash if supplied, endpoint response, timestamp and Base Sepolia explorer reference.
7. Do not retry blindly if the client reports an ambiguous failure; reconcile first.

## Required evidence bundle

If Case B is completed, create `evidence/base-sepolia-write-proof.json` containing only non-secret evidence:

```json
{
  "network": "Base Sepolia",
  "chainId": 84532,
  "asset": "USDC",
  "amountAtomic": "<amount>",
  "endpoint": "<url>",
  "countermandVerdict": "ALLOW",
  "transactionHash": "<tx hash if returned>",
  "timestamp": "<ISO-8601>",
  "realFunds": false,
  "production": false
}
```

Never include OTPs, auth tokens, cookies, seed phrases, private keys or session state.

## Promotion rule

`BASE_SEPOLIA_WRITE_PROOF` may become `PASS` only when all of the following are true:

- explicit human authorization was given for the testnet write;
- the wallet/endpoint/network/amount were confirmed before execution;
- COUNTERMAND returned `ALLOW` for the exact action;
- one external Base Sepolia economic execution can be independently identified from preserved non-secret evidence;
- the stale-decision path is separately demonstrated to block before the wallet/payment call;
- no mainnet or real-money claim is introduced.

Until then, status remains `PREPARED_NOT_AUTHORIZED`.

## Sources

- Coinbase Agentic Wallet quickstart: https://docs.cdp.coinbase.com/agentic-wallet/cli/quickstart
- Coinbase Agentic Wallet pay-for-service skill: https://docs.cdp.coinbase.com/agentic-wallet/cli/skills/pay-for-service
- Coinbase x402 documentation: https://docs.cdp.coinbase.com/x402/welcome
