# Base Sepolia Read Proof — COUNTERMAND V0.1

Date: 2026-09-10  
Proof class: `LIVE_READ_ONLY`

## Purpose

Give the evaluator a Base-native live signal without pretending COUNTERMAND has already executed an onchain transaction.

## Runtime path

`GET /api/base-state`

The endpoint performs four read-only JSON-RPC calls against Base Sepolia:

1. `eth_chainId`
2. `eth_getBlockByNumber("latest", false)`
3. `eth_getCode(USDC, "latest")`
4. `eth_getCode(SPEND_PERMISSION_MANAGER, "latest")`

It rejects any chain ID other than `84532` and returns `503 / UNAVAILABLE_FAIL_CLOSED` if the upstream read fails.

## Canonical constants

```text
Network                    Base Sepolia
Chain ID                   84532 / 0x14a34
Public RPC                 https://sepolia.base.org
USDC                       0x036CbD53842c5426634e7929541eC2318f3dCF7e
Spend Permission Manager   0xf85210B21cC50302F477BA56686d2019dC9b67Ad
```

Sources used during implementation:

- Base RPC overview: https://docs.base.org/base-chain/api-reference/rpc-overview
- Base `eth_chainId`: https://docs.base.org/base-chain/api-reference/ethereum-json-rpc-api/eth_chainId
- Coinbase Spend Permissions: https://docs.cdp.coinbase.com/wallets/using-wallets/spend-permissions
- Coinbase Stableswapper key addresses / Base Sepolia USDC: https://docs.cdp.coinbase.com/custom-stablecoins/conversions/stableswapper-contract/key-addresses
- Coinbase x402: https://docs.cdp.coinbase.com/x402/welcome

## What this proves

- the public evaluator is reading the intended Base Sepolia network at runtime;
- the displayed block is fresh chain state when the read succeeds;
- bytecode exists at the canonical Base Sepolia USDC address;
- bytecode exists at the Coinbase Spend Permission Manager address.

## What this does not prove

- a COUNTERMAND smart contract has been deployed;
- a COUNTERMAND transaction was submitted;
- x402 was executed by COUNTERMAND;
- production or mainnet safety;
- real-money usage or outcomes.

No private key is required for this proof. No write route is exposed.
