# Encode Solidity Bootcamp 
#### Group #9, HW #2

## Local network testing

We first test the contract locally using the Hardhat network. The script `TestVotesLocalNetwork.ts` deploys the contract, votes, and checks the results. It checks for the following actions:

* Deploy the token, mints tokens and self-delegated voting rights to the first account.
* First account makes transfer to second account.
* TokenizedBallot gets deployed using the token address.
* Account 1 and 2 do first round of voting.
* Account 1 attempts to vote again but exceeds their voting power.
* We do a second round of voting which changes the winner.
* Display results.

Output saved [here](test-ouput.txt).

### Addresses
[contract.config.json](config/contract.config.json) contains the addresses of the deployed contracts on Sepolia testnet. Use this file to test the contract on Sepolia as you wish.

Run the test script using: \
`npx hardhat compile` and \
`npx hardhat run ./scripts/TestVotesLocalNetwork.ts` for local test.

## Sepolia testnet
### ERC20Vote Token
* Deploying ERC20Vote token
  * `npx hardhat run scripts/DeployVoteToken.ts --network sepolia`
* Minting tokens
  * `npx hardhat mint-tokens [amount] --network sepolia`
* Transferring tokens 
  * `npx hardhat transfer-tokens [address] [amount] --network sepolia`
* Self-delegating voting power
  * `npx hardhat self-delegate --network sepolia`
* View voting power for address
  * `npx hardhat voting-power [address] --network sepolia`

### TokenizedBallot
* Deploying TokenizedBallot contract
  * `npx hardhat run scripts/deploy-tokenized-ballot.ts [proposals] [erc20Address] [targetBlock] --network sepolia`
* View voting results
  * `npx hardhat view-results --network sepolia`
* Vote for proposal
  * `npx hardhat vote [proposalNum] [amount] --network sepolia`

### Notes

* We have used the 1-to-1 ratio of the ERC20Vote token to ETH. This means that 1 ERC20Vote token is equal to 1 ETH in voting power.
* In case of a tie, there will be no winner declared and winningProposalName() will return "No Winner - TIE".

### Sample use to vote on ice cream flavors

The addresses in tests below can be viewed here:
ERC20Vote Token contract address: https://sepolia.etherscan.io/address/0xcc73011fd7e2073a4aabdb95f9f19a2df4bd6cd6

TokenizedBallot contract address: https://sepolia.etherscan.io/address/0x6e8a64d918caf006c2230d00de2e02441d00a4a6

### Commands run

* `npx hardhat run scripts/DeployVoteToken.ts --network sepolia`
  * Deploying MyERC20Vote contract...
  Token contract deployed to: 0xcc73011fd7e2073a4aabdb95f9f19a2df4bd6cd6
* `npx hardhat mint-tokens 77 --network sepolia`
  * Minting tokens...
  Tokens minted in transaction: 0xa0e14f27d2f900c9b66b6749142a59238ed0b161925f1b7d6df4edb2d9ac6c23
* `npx hardhat self-delegate 0xe6DdDcbb2848983D9cAaB715611849E579759CB0 --network sepolia`
  * Delegation tx hash: 0x7598f364c38f6a094260e8bb278c0652c6bf926837763c4f7669ae650feb24de
* `npx hardhat voting-power 0xe6DdDcbb2848983D9cAaB715611849E579759CB0 --network sepolia`
  * Voting power for address 0xe6DdDcbb2848983D9cAaB715611849E579759CB0: 77,000,000,000,000,000,000 votes (wei)
* `npx hardhat transfer-tokens 0xd682915e56E8817685d9085c8adCA3dc140aCC4D 10`
  * Transferring 10 ETH to 0xd682915e56E8817685d9085c8adCA3dc140aCC4D
    Tokens transfered in transaction to 0xd682915e56E8817685d9085c8adCA3dc140aCC4D, tx hash: 0x7c5e8b2406079482eef78760fe1f84e0cfc530dfbd7eec520c05dc6c3960ca99
* `npx hardhat voting-power 0xe6DdDcbb2848983D9cAaB715611849E579759CB0 --network sepolia`
  * Voting power for address 0xe6DdDcbb2848983D9cAaB715611849E579759CB0: 67,000,000,000,000,000,000 votes (wei)
* `npx hardhat transfer-tokens 0xd219C8b54832d6ca7d933a42d51F8bDC3Ee4370B 10`
  * Transferring 10 ETH to 0xd219C8b54832d6ca7d933a42d51F8bDC3Ee4370B
    Tokens transfered in transaction to 0xd219C8b54832d6ca7d933a42d51F8bDC3Ee4370B, tx hash: 0xbdb553045d09afa7d3e92c2081f52df30e17efb9efdec10630cc5e568093e262
* `npx hardhat deploy-tokenized-ballot "Vanilla,Chococlate,Salted Caramel,Strawberry,Mint" "0xcc73011fd7e2073a4aabdb95f9f19a2df4bd6cd6" "7043767" --network sepolia`
  * Deploying Tokenized Ballot contract...
    Contract deployed to: 0x6e8a64d918caf006c2230d00de2e02441d00a4a6
* `npx hardhat view-results --network sepolia`

 
Proposal Votes Summary @ 0x6e8a64d918caf006c2230d00de2e02441d00a4a6

| ID | Name           | Votes |
|----|----------------|-------|
| 0  | Vanilla        | 0 wei |
| 1  | Chococlate     | 0 wei |
| 2  | Salted Caramel | 0 wei |
| 3  | Strawberry     | 0 wei |
| 4  | Mint           | 0 wei |

--------------------------------------------

Winning proposal is #0, true with name: No Winner - TIE

* `npx hardhat vote 2 4 --network sepolia`
  * Voting 4,000,000,000,000,000,000 wei for proposal 2
    Vote tx hash: 0xe9f3507fbb3ab97d115e7601abbf67eb3f35bf9d093e4aa9b0d53785d60965ab

* `npx hardhat vote 0 0.5 --network sepolia`
  * Voting 500,000,000,000,000,000 wei for proposal 0
    Vote tx hash: 0xf2b9ca80fbfb20817188b287323124ba27f7501fb15314cc084b4b0087ddb532

* `npx hardhat vote 0 100 --network sepolia`
  * Voting 100,000,000,000,000,000,000 wei for proposal 0
  Error: The contract function "vote" reverted with the following reason:
  Error: trying to vote with more votes than available
  Contract Call:
  address:   0x6e8a64d918caf006c2230d00de2e02441d00a4a6
  function:  vote(uint256 proposal, uint256 amount)
  args:          (0, 100000000000000000000)
  sender:    0xe6DdDcbb2848983D9cAaB715611849E579759CB0
  
  Docs: https://viem.sh/docs/contract/writeContract
  Version: viem@2.21.43

* `npx hardhat view-results --network sepolia`
Proposal Votes Summary @ 0x6e8a64d918caf006c2230d00de2e02441d00a4a6

| ID | Name           | Votes                       |
|----|----------------|-----------------------------|
| 0  | Vanilla        | 500,000,000,000,000,000 wei|
| 1  | Chococlate     | 0 wei                       |
| 2  | Salted Caramel | 4,000,000,000,000,000,000 wei|
| 3  | Strawberry     | 0 wei                       |
| 4  | Mint           | 0 wei                       |

--------------------------------------------

Winning proposal is #2,false with name: Salted Caramel