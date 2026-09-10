const RPC_URL = "https://sepolia.base.org";
const USDC = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
const SPEND_PERMISSION_MANAGER = "0xf85210B21cC50302F477BA56686d2019dC9b67Ad";

async function rpc(method, params = []) {
  const response = await fetch(RPC_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params })
  });
  if (!response.ok) throw new Error(`RPC HTTP ${response.status}`);
  const data = await response.json();
  if (data.error) throw new Error(data.error.message || "RPC error");
  return data.result;
}

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  try {
    const [chainIdHex, latestBlock, usdcCode, permissionCode] = await Promise.all([
      rpc("eth_chainId"),
      rpc("eth_getBlockByNumber", ["latest", false]),
      rpc("eth_getCode", [USDC, "latest"]),
      rpc("eth_getCode", [SPEND_PERMISSION_MANAGER, "latest"])
    ]);

    const chainId = parseInt(chainIdHex, 16);
    if (chainId !== 84532) throw new Error(`unexpected_chain_${chainId}`);

    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({
      network: "Base Sepolia",
      chainId,
      rpc: RPC_URL,
      blockNumber: parseInt(latestBlock.number, 16),
      blockHash: latestBlock.hash,
      blockTimestamp: parseInt(latestBlock.timestamp, 16),
      contracts: {
        usdc: { address: USDC, codePresent: Boolean(usdcCode && usdcCode !== "0x") },
        spendPermissionManager: {
          address: SPEND_PERMISSION_MANAGER,
          codePresent: Boolean(permissionCode && permissionCode !== "0x")
        }
      },
      proofClass: "LIVE_READ_ONLY",
      writePerformed: false
    });
  } catch (error) {
    res.setHeader("Cache-Control", "no-store");
    return res.status(503).json({
      error: "base_sepolia_read_failed",
      message: error instanceof Error ? error.message : "unknown_error",
      proofClass: "UNAVAILABLE_FAIL_CLOSED",
      writePerformed: false
    });
  }
};
