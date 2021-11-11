import { useEffect } from "react";
import { Dispatch } from "redux";
import { ethers } from "ethers";
import { requestAccount } from "features/user/actions";
import { UserState } from "features/user/redux/userSlice";

type UseLogin = {
	user: UserState;
	dispatch: Dispatch<any>;
};

const useLogin = ({ user, dispatch }: UseLogin) => {
	useEffect(() => {
		if (!user.data?.address) {
			requestAccount(dispatch);
		}
	}, [user.data?.address, dispatch]);

	useEffect(() => {
		if (window.ethereum) {
			const provider = new ethers.providers.Web3Provider(
				window.ethereum,
				"any"
			);

			provider.on("network", (_newNetwork, oldNetwork) => {
				if (oldNetwork) {
					window.location.reload();
				}
			});
		}
	}, []);
};

export default useLogin;
