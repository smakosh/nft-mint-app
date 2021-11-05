import toast from "react-hot-toast";
import { Dispatch } from "redux";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { UserState } from "features/user/redux/userSlice";
import {
	ContractState,
	saveDeployedContract,
} from "features/unsplash/redux/contractSlice";
import NFTFactory from "../../../artifacts/contracts/NFTFactory.sol/NFTFactory.json";

export type ContractValues = {
	name: string;
	symbol: string;
};

export const deployContract = async (
	user: UserState,
	values: ContractValues,
	dispatch: Dispatch<any>
) => {
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
		const deployedContract = await factory.deploy(values.name, values.symbol);

		await deployedContract.deployed();

		dispatch(saveDeployedContract(deployedContract));
	}
};

export type MetadataNFT = {
	description: string;
	external_url: string;
	image: string;
	name: string;
};

export const createNFT = async (
	user: UserState,
	savedContract: ContractState,
	values: MetadataNFT
) => {
	if (!savedContract.address && !savedContract.contract) {
		toast.error("No contract is attached");
		return null;
	}

	if (typeof (window as any).ethereum !== "undefined" && user.data?.address) {
		let signer;

		// Get the user signature if it's not saved on memory
		if (!user.data.signature) {
			const provider = new ethers.providers.Web3Provider(
				(window as any).ethereum
			);
			signer = provider.getSigner();
		}

		// Prepare IPFS client instance
		const client = ipfsHttpClient({
			url: "https://ipfs.infura.io:5001/api/v0",
		});

		// @TOOD: Pass the metadata dynamically
		const data = JSON.stringify({
			attributes: [],
			...values,
		});

		// Upload to IPFS (Look up for alternatives as data is not stored forever)
		const added = await client.add(data);
		const url = `https://ipfs.infura.io/ipfs/${added.path}`;

		let contract: ethers.Contract;

		// Mint the NFT using the deployed smart contract
		if (savedContract.address) {
			contract = new ethers.Contract(
				savedContract.address,
				NFTFactory.abi,
				user.data.signature || signer
			);
		} else {
			contract = new ethers.Contract(
				savedContract.contract.address,
				NFTFactory.abi,
				user.data.signature || signer
			);
		}

		// Token gets created
		const transaction = await contract.createToken(url);
		await transaction.wait();

		toast.success("NFT created successfully");
	}
};
