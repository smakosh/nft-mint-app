require("@nomiclabs/hardhat-waffle");
// Load env variables
require("dotenv").config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
	const accounts = await hre.ethers.getSigners();

	for (const account of accounts) {
		console.log(account.address);
	}
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	solidity: "0.8.4",
	defaultNetwork: "hardhat",
	networks: {
		hardhat: {
			chainId: 1337,
		},
		mumbai: {
			url: "https://rpc-mumbai.maticvigil.com",
			accounts: [`0x${process.env.MUMBAI_PRIVATE_KEY}`],
		},
		mainnet: {
			url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
			accounts: [`0x${process.env.MAINNET_PRIVATE_KEY}`],
		},
	},
	solidity: {
		version: "0.8.4",
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
};
