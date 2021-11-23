require('@nomiclabs/hardhat-waffle');
// require('@nomiclabs/hardhat-etherscan');
// Load env variables
require('dotenv').config();

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.4',
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 1337,
    },
    // Leave here for local testing
    // rinkeby: {
    //   url: `https://rinkeby.infura.io/v3/${INFURA_RINKEBY_PROJECT_ID}`,
    //   accounts: [`0x${process.env.PRIVATE_KEY}`],
    // },
  },
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  // @TODO move the verification to be done remotely
  // etherscan: {
  //   apiKey: process.env.ETHERSCAN_API_KEY,
  // },
};
