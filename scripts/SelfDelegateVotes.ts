import { task } from "hardhat/config";
import * as dotenv from "dotenv";
dotenv.config();
import {
  abi,
} from "../artifacts/contracts/MyERC20Vote.sol/MyToken.json";
import contractConfig from "./contract.config.json";
import { setupClients } from "./utils/clientConfig";

export default task("self-delegate", "Self delegate votes").setAction(
  async (taskArgs) => {
    try {
      const { publicClient, walletClient, account } = setupClients();

      const contractAddress = contractConfig.MyERC20Vote_address;
      if (!contractAddress) {
        throw new Error("Token contract address not found in config");
      }

      // Send the self-delegation transaction
      const hash = await walletClient.writeContract({
        address: contractAddress as `0x${string}`,
        abi,
        functionName: "delegate",
        args: [account.address],
      });

      console.log(`Self deleate tx hash: ${hash}`);

      // Get the updated voting power
      const votingPower = (await publicClient.readContract({
        address: contractAddress as `0x${string}`,
        abi,
        functionName: "getVotes",
        args: [account.address],
      })) as bigint;

      console.log(
        `Voting power for address ${
          taskArgs.address
        }: ${votingPower.toLocaleString()} votes (wei)`
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(`\nError: ${error.message}`);
      } else {
        console.error("\nAn unexpected error occurred");
      }
      process.exit(1);
    }
  }
);

/*
npx hardhat self-delegate --network sepolia
*/
