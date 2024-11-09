# Encode Solidity Bootcamp 
#### Group #9, HW #2

## Local network testing

We first test the contract locally using the Hardhat network. The script `TestVotesLocalNetwork.ts` deploys the contract, votes, and checks the results. It checks for the following actions:

* Deploy the token, mints tokens and self-delegated votings rights to the first account.
* First account makes transfer to second account.
* TokenizedBallot gets deployed using the token address.
* Account 1 and 2 do first round of voting.
* Account 1 attempts to vote again but exceeds their voting power.
* We do a second round of voting which changes the winner.
* Display results.

### Addresses
[contract.config.json](./scripts/contract.config.json) contains the addresses of the deployed contracts on Sepolia testnet. Use this file to test the contract on Sepolia as you wish.

Run the test script using: \
`npx hardhat compile` and \
`npx hardhat run ./scripts/TestVotesLocalNetwork.ts` for local test.

* Deployed TokenizedBallot contract
  * `npx hardhat run scripts/deploy-tokenized-ballot.ts [proposals] [erc20Address] [targetBlock] --network sepolia`
* View voting power for address 
  * `npx hardhat voting-power [address] --network sepolia`
//todo

### Known issues

* In case of a tie, the first entry in the list of candidates is declared the winner. This is a limitation of the current implementation.
* Would have been a better TokenizedBallot contract if we had made a function to query the length of the proposals. 