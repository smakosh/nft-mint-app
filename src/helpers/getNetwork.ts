const getNetwork = (chainId: number | undefined) => {
	switch (chainId) {
		case 1:
			return "Mainnet";
		case 3:
			return "Ropsten";
		case 4:
			return "Rinkeby";
		case 5:
			return "Goerli";
		case 42:
			return "Kovan";
		default:
			return `unknown network ${chainId}`;
	}
};

export default getNetwork;
