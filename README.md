# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

## Mumbai

- Add Mumbai network to your metamask wallet

> Network Name: Mumbai TestNet
> New RPC URL: <https://rpc-mumbai.matic.today>
> Chain ID: 80001
> Currency Symbol: Matic

- Add some MATIC: <https://faucet.matic.network/>
- Deploy: `yarn deploy:mumbai`
- Take the contract address and hard code it
