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

  const BASE_RPC = "https://sepolia.base.org";
  const USDC = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
  const SPEND_PERMISSION_MANAGER = "0xf85210B21cC50302F477BA56686d2019dC9b67Ad";

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

  advanceBtn.addEventListener("click", () => { drifted = !drifted; render(); });
  resetBtn.addEventListener("click", () => { drifted = false; render(); });

  async function rpc(method, params = []) {
    const response = await fetch(BASE_RPC, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params })
    });
    if (!response.ok) throw new Error(`RPC HTTP ${response.status}`);
    const body = await response.json();
    if (body.error) throw new Error(body.error.message || "RPC error");
    return body.result;
  }

  async function browserBaseStateFallback() {
    const [chainIdHex, latestBlock, usdcCode, permissionCode] = await Promise.all([
      rpc("eth_chainId"),
      rpc("eth_getBlockByNumber", ["latest", false]),
      rpc("eth_getCode", [USDC, "latest"]),
      rpc("eth_getCode", [SPEND_PERMISSION_MANAGER, "latest"])
    ]);
    const chainId = parseInt(chainIdHex, 16);
    if (chainId !== 84532) throw new Error(`unexpected_chain_${chainId}`);
    return {
      network: "Base Sepolia",
      chainId,
      blockNumber: parseInt(latestBlock.number, 16),
      blockTimestamp: parseInt(latestBlock.timestamp, 16),
      contracts: {
        usdc: { codePresent: Boolean(usdcCode && usdcCode !== "0x") },
        spendPermissionManager: { codePresent: Boolean(permissionCode && permissionCode !== "0x") }
      },
      transport: "browser-direct-rpc"
    };
  }

  async function getBaseState() {
    try {
      const response = await fetch("/api/base-state", { cache: "no-store" });
      if (!response.ok) throw new Error("serverless Base state unavailable");
      return await response.json();
    } catch (_) {
      return browserBaseStateFallback();
    }
  }

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
      const data = await getBaseState();
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
