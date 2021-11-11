import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "utils/store";
import Navbar from "ui/components/Navbar";
import useLogin from "features/user/hooks/useLogin";
import { requestAccount } from "features/user/actions";

const Layout: FC = ({ children }) => {
	const [hasMounted, setHasMounted] = useState(false);
	const user = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();
	useLogin({
		user,
		dispatch,
	});

	useEffect(() => {
		setHasMounted(true);
	}, []);

	return (
		<div className="container mx-auto">
			{process.browser && hasMounted && !user.isLoading && (
				<Navbar
					address={user.data?.address}
					balance={user.data?.balance}
					shortAddress={user.data?.shortAddress}
					network={user.data?.network}
					symbol={user.data?.symbol}
					ethENS={user.data?.ethENS}
					signIn={() => requestAccount(dispatch)}
				/>
			)}
			{children}
		</div>
	);
};

export default Layout;
