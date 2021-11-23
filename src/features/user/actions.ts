import toast from "react-hot-toast";
import { ethers } from "ethers";
import { Dispatch } from "redux";
import { save, setLoading } from "features/user/redux/userSlice";
import getShortAddress from "helpers/getShortAddress";

export const requestAccount = async (dispatch: Dispatch<any>) => {
	if (window.ethereum) {
		dispatch(setLoading(true));
		const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

		await provider.send("eth_requestAccounts", []);

		const { name } = await provider.getNetwork();

		const signer = provider.getSigner();
		const address = await signer.getAddress();
		const balance = await provider.getBalance(address);

		let ethENS = undefined;

		try {
			ethENS = await provider?.lookupAddress(address);
		} catch (error) {
			ethENS = undefined;
		}

		dispatch(
			save({
				address,
				shortAddress: getShortAddress(address),
				ethENS,
				network: name,
				signature: signer,
				balance: Number(ethers.utils.formatEther(balance)).toFixed(4),
				symbol: name === "matic" ? "MATIC" : ethers.constants.EtherSymbol,
			})
		);

		dispatch(setLoading(false));
	} else {
		toast.error("Please Install MetaMask");
		dispatch(setLoading(false));
	}
};
