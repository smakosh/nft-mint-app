import toast from "react-hot-toast";
import { ethers } from "ethers";
import { Dispatch } from "redux";
import { save } from "features/user/redux/userSlice";
import getShortAddress from "helpers/getShortAddress";
import getNetwork from "helpers/getNetwork";

export const requestAccount = async (dispatch: Dispatch<any>) => {
	if ((window as any).ethereum) {
		const provider = new ethers.providers.Web3Provider(
			(window as any).ethereum,
			"any"
		);
		await provider.send("eth_requestAccounts", []);
		const { chainId } = await provider.getNetwork();
		const signer = provider.getSigner();
		const address = await signer.getAddress();
		dispatch(
			save({
				address,
				shortAddress: getShortAddress(address),
				network: getNetwork(chainId),
				signature: signer,
			})
		);
	} else {
		toast.error("Please Install MetaMask");
	}
};
