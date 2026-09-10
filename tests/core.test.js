const assert = require("node:assert/strict");
const { evaluateDecision, RECEIPT } = require("../countermand-core.js");

const clean = evaluateDecision({ elapsedMinutes: 0.2, t1DatasetAgeMinutes: 2.2 });
assert.equal(clean.valid, true);
assert.equal(clean.verdict, "ALLOW");

const stalePremise = evaluateDecision({ elapsedMinutes: 11, t1DatasetAgeMinutes: 13 });
assert.equal(stalePremise.valid, false);
assert.equal(stalePremise.verdict, "REPLAN_REQUIRED");
assert.equal(stalePremise.checks.permission, true);
assert.equal(stalePremise.checks.cap, true);
assert.equal(stalePremise.checks.action, true);
assert.equal(stalePremise.checks.integrity, true);
assert.equal(stalePremise.checks.premise, false);

const mutatedAction = evaluateDecision({ action: "PAY:19.00:USDC:x402/research-data.request" });
assert.equal(mutatedAction.valid, false);
assert.equal(mutatedAction.checks.action, false);

const overCap = evaluateDecision({ amountUsdc: RECEIPT.walletCapUsdc + 1 });
assert.equal(overCap.valid, false);
assert.equal(overCap.checks.cap, false);

const tampered = evaluateDecision({ receiptIntegrity: false });
assert.equal(tampered.valid, false);
assert.equal(tampered.checks.integrity, false);

const expired = evaluateDecision({ elapsedMinutes: RECEIPT.validityMinutes + 1 });
assert.equal(expired.valid, false);
assert.equal(expired.checks.unexpired, false);

console.log("COUNTERMAND core: 6/6 PASS");
