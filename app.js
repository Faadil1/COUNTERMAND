(() => {
  "use strict";

  const core = window.CountermandCore;
  const advanceBtn = document.getElementById("advanceBtn");
  const resetBtn = document.getElementById("resetBtn");
  const refreshBaseBtn = document.getElementById("refreshBaseBtn");
  const premiseRow = document.querySelector('[data-check="premise"]');
  const verdict = document.getElementById("verdict");
  const verdictLabel = document.getElementById("verdictLabel");
  const verdictText = document.getElementById("verdictText");
  const verdictReason = document.getElementById("verdictReason");
  const stamp = document.getElementById("stamp");
  const t1Time = document.getElementById("t1Time");
  const railFill = document.getElementById("railFill");

  let drifted = false;

  function render() {
    const result = core.evaluateDecision({
      elapsedMinutes: drifted ? 11 : 0.16,
      t1DatasetAgeMinutes: drifted ? 13 : 2.2
    });

    premiseRow.classList.toggle("fail", !result.checks.premise);
    premiseRow.querySelector("b").textContent = result.checks.premise ? "PASS" : "FAIL · 13 > 5 MIN";

    verdict.classList.toggle("allow", result.valid);
    verdict.classList.toggle("block", !result.valid);
    verdictLabel.textContent = result.valid ? "ACTION REMAINS VALID" : "OLD DECISION TERMINATED";
    verdictText.textContent = result.valid ? "ALLOW" : "REPLAN_REQUIRED";
    verdictReason.textContent = result.reason;

    t1Time.textContent = drifted ? "09:52:12" : "09:41:22";
    railFill.style.width = drifted ? "78%" : "4%";
    advanceBtn.textContent = drifted ? "Restore fresh premise" : "Advance context +11 min";
    stamp.classList.toggle("visible", !result.valid);
  }

  advanceBtn.addEventListener("click", () => {
    drifted = !drifted;
    render();
  });

  resetBtn.addEventListener("click", () => {
    drifted = false;
    render();
  });

  async function loadBaseState() {
    const network = document.getElementById("networkValue");
    const block = document.getElementById("blockValue");
    const usdc = document.getElementById("usdcValue");
    const mgr = document.getElementById("permissionManagerValue");

    network.textContent = "Base Sepolia / connecting…";
    block.textContent = "—";
    usdc.textContent = "checking…";
    mgr.textContent = "checking…";
    refreshBaseBtn.disabled = true;

    try {
      const response = await fetch("/api/base-state", { cache: "no-store" });
      if (!response.ok) throw new Error("Base state unavailable");
      const data = await response.json();

      network.textContent = `${data.network} / ${data.chainId}`;
      block.textContent = `#${Number(data.blockNumber).toLocaleString()}`;
      usdc.textContent = data.contracts.usdc.codePresent ? "DEPLOYED ✓" : "NOT VERIFIED";
      mgr.textContent = data.contracts.spendPermissionManager.codePresent ? "DEPLOYED ✓" : "NOT VERIFIED";

      const ts = new Date(data.blockTimestamp * 1000);
      document.getElementById("footerState").textContent =
        `Base Sepolia read ${ts.toISOString()} · public demo is read-only · no real funds`;
    } catch (error) {
      network.textContent = "Base Sepolia / read failed closed";
      block.textContent = "UNAVAILABLE";
      usdc.textContent = "UNVERIFIED";
      mgr.textContent = "UNVERIFIED";
    } finally {
      refreshBaseBtn.disabled = false;
    }
  }

  refreshBaseBtn.addEventListener("click", loadBaseState);
  render();
  loadBaseState();
})();
