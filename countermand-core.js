(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.CountermandCore = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const RECEIPT = Object.freeze({
    id: "CM-7A31",
    amountUsdc: 18,
    walletCapUsdc: 25,
    exactAction: "PAY:18.00:USDC:x402/research-data.request",
    maxDatasetAgeMinutes: 5,
    t0DatasetAgeMinutes: 2,
    validityMinutes: 15
  });

  function evaluateDecision(input) {
    const state = {
      elapsedMinutes: Number(input && input.elapsedMinutes || 0),
      t1DatasetAgeMinutes: Number(input && input.t1DatasetAgeMinutes || RECEIPT.t0DatasetAgeMinutes),
      action: input && input.action ? String(input.action) : RECEIPT.exactAction,
      amountUsdc: Number(input && input.amountUsdc != null ? input.amountUsdc : RECEIPT.amountUsdc),
      receiptIntegrity: input && input.receiptIntegrity !== false,
      walletPermission: input && input.walletPermission !== false
    };

    const checks = {
      permission: state.walletPermission,
      cap: state.amountUsdc <= RECEIPT.walletCapUsdc,
      action: state.action === RECEIPT.exactAction,
      integrity: state.receiptIntegrity,
      unexpired: state.elapsedMinutes <= RECEIPT.validityMinutes,
      premise: state.t1DatasetAgeMinutes <= RECEIPT.maxDatasetAgeMinutes
    };

    const valid = Object.values(checks).every(Boolean);
    const failed = Object.entries(checks).filter(([, value]) => !value).map(([key]) => key);

    return {
      valid,
      verdict: valid ? "ALLOW" : "REPLAN_REQUIRED",
      checks,
      failed,
      state,
      reason: valid
        ? "The decision and its premise still agree with fresh state."
        : failureReason(failed)
    };
  }

  function failureReason(failed) {
    if (failed.includes("premise")) return "Wallet permission still passes, but the premise that justified this exact action has expired.";
    if (failed.includes("unexpired")) return "The decision receipt itself has expired.";
    if (failed.includes("action")) return "The proposed action is not the exact action sealed at T0.";
    if (failed.includes("integrity")) return "Receipt integrity failed.";
    if (failed.includes("cap")) return "The action exceeds the wallet spending cap.";
    if (failed.includes("permission")) return "The wallet no longer permits this action.";
    return "The old decision cannot be reused.";
  }

  return { RECEIPT, evaluateDecision };
});
