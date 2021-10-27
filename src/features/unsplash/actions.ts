import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { UserState } from "features/user/redux/userSlice";
import NFTFactory from "../../../artifacts/contracts/NFTFactory.sol/NFTFactory.json";

export const createNFT = async (user: UserState) => {
	if (typeof (window as any).ethereum !== "undefined" && user.data?.address) {
		let signer;

		// Get the user signature if it's not saved on memory
		if (!user.data.signature) {
			const provider = new ethers.providers.Web3Provider(
				(window as any).ethereum
			);
			signer = provider.getSigner();
		}

		// Prepare contract facotry
		const factory = new ethers.ContractFactory(
			NFTFactory.abi,
			NFTFactory.bytecode,
			user.data.signature || signer
		);

		// Deploy the smart contract (ERC 721)
		// @TODO: Shouldn't we keep this stored somewhere in case the user
		// Wants to mint more NFTs using the same contract?
		// @TODO: Pass the name and symbol dynamic
		const deployedContract = await factory.deploy("TESTContract", "TST");

		await deployedContract.deployed();

		// Prepare IPFS client instance
		const client = ipfsHttpClient({
			url: "https://ipfs.infura.io:5001/api/v0",
		});

		// @TOOD: Pass the metadata dynamically
		const data = JSON.stringify({
			attributes: [],
			description: "Rabat, Morocco",
			external_url: "https://example.com/?token_id=1",
			image:
				"https://images.unsplash.com/photo-1494797032936-319bfccccbe0?ixlib=rb-1.2.1",
			name: "Rabat",
		});

		// Upload to IPFS (Look up for alternatives as data is not stored forever)
		const added = await client.add(data);
		const url = `https://ipfs.infura.io/ipfs/${added.path}`;

		// Mint the NFT using the deployed smart contract
		const contract = new ethers.Contract(
			deployedContract.address,
			NFTFactory.abi,
			user.data.signature || signer
		);

		// Token gets created
		const transaction = await contract.createToken(url);
		await transaction.wait();

		// @TODO: Handle when the transaction is done
	}
};
