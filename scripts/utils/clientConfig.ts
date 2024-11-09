import { createPublicClient, http, createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";

export function setupClients() {
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey || !privateKey.startsWith("0x")) {
    throw new Error("Private key must be a hex string starting with 0x");
  }
  const account = privateKeyToAccount(privateKey as `0x${string}`);

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(),
  });

  const walletClient = createWalletClient({
    chain: sepolia,
    transport: http(),
    account,
  });

  return { publicClient, walletClient, account };
}
