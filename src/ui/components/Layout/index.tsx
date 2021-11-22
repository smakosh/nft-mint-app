import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "utils/store";
import Navbar from "ui/components/Navbar";
import useLogin from "features/user/hooks/useLogin";
import { requestAccount } from "features/user/actions";
import { clear } from "features/user/redux/userSlice";
import axios from "axios";

const Layout: FC = ({ children }) => {
	const router = useRouter();
	const [hasMounted, setHasMounted] = useState(false);
	const user = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch<AppDispatch>();
	useLogin({
		user,
		dispatch,
	});

	useEffect(() => {
		setHasMounted(true);
	}, []);

	const handleLogout = async () => {
		const { data } = await axios.get<{ message: string }>(
			"/api/unsplash/logout"
		);

		if ((data.message = "Logout successful")) {
			dispatch(clear());
			router.push("/signin");
		}
	};

	return (
		<div className="container mx-auto">
			{process.browser && hasMounted && !user.isLoading ? (
				<Navbar
					address={user.data?.address}
					balance={user.data?.balance}
					shortAddress={user.data?.shortAddress}
					network={user.data?.network}
					symbol={user.data?.symbol}
					ethENS={user.data?.ethENS}
					signIn={() => requestAccount(dispatch)}
					handleLogout={handleLogout}
				/>
			) : (
				<div className="flex items-center justify-end py-4 text-right">
					<div className="animate-pulse">
						<div className="inline-flex justify-end w-full px-4 py-2">
							<div className="w-36 bg-gray-300 h-9 rounded-md" />
						</div>
					</div>
					<div className="animate-pulse">
						<div className="inline-flex justify-end w-full px-4 py-2">
							<div className="w-28 bg-gray-300 h-9 rounded-md" />
						</div>
					</div>
				</div>
			)}
			{children}
		</div>
	);
};

export default Layout;
