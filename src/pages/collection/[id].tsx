import { GetServerSideProps } from "next";
import cookie from "cookie";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "utils/store";
import Navbar from "ui/components/Navbar";
import { requestAccount } from "features/user/actions";
import Collection, {
	CollectionProps,
} from "features/unsplash/modules/Collection";
import GoBack from "ui/components/GoBack";

const CollectionPage = ({ photos, collection }: CollectionProps) => {
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.user);

	return (
		<div className="container mx-auto text-right">
			<Navbar
				address={user.data?.address}
				balance={user.data?.balance}
				shortAddress={user.data?.shortAddress}
				network={user.data?.network}
				signIn={() => requestAccount(dispatch)}
			/>
			<GoBack link="/" />
			<Collection photos={photos} collection={collection} />
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (
	ctx
): Promise<any> => {
	const cookies = cookie.parse(ctx.req.headers.cookie || "");

	if (cookies.access_token) {
		const accessToken = cookies.access_token;

		if (accessToken && ctx.params?.id) {
			const headers = {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			};

			const response = await fetch(
				`https://api.unsplash.com/collections/${ctx.params.id}/photos?page=1`,
				headers
			);
			const photos = await response.json();

			const res = await fetch(
				`https://api.unsplash.com/collections/${ctx.params.id}`,
				headers
			);
			const collection = await res.json();

			return {
				props: {
					photos,
					collection,
				},
			};
		} else {
			return {
				redirect: {
					destination: "/signin",
				},
			};
		}
	}

	return {
		redirect: {
			destination: "/signin",
		},
	};
};

export default CollectionPage;
