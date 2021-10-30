import { GetServerSideProps } from "next";
import Link from "next/link";
import cookie from "cookie";
import { useDispatch, useSelector } from "react-redux";
import { Collection, CollectionPhoto } from "types";
import { RootState } from "utils/store";
import Navbar from "ui/components/Navbar";
import Card from "ui/components/Card";
import StyledModal from "ui/components/StyledModal";
import { requestAccount } from "features/user/actions";
import { setModal } from "ui/components/StyledModal/redux/modalSlice";
import { ChevronLeftIcon } from "@heroicons/react/solid";

type CollectionProps = {
	collection: Collection;
	photos: CollectionPhoto[];
};

const CollectionPage = ({ photos, collection }: CollectionProps) => {
	const user = useSelector((state: RootState) => state.user);
	const modal = useSelector((state: RootState) => state.modal);
	const dispatch = useDispatch();

	const handleModal = (isOpen: boolean) => {
		dispatch(setModal(isOpen));
	};

	return (
		<div className="container mx-auto text-right">
			<Navbar
				address={user.data?.address}
				balance={user.data?.balance}
				shortAddress={user.data?.shortAddress}
				network={user.data?.network}
				signIn={() => requestAccount(dispatch)}
			/>
			<div className="py-2 px-2 text-left">
				<Link href="/">
					<a className="inline-flex justify-center items-center">
						<ChevronLeftIcon
							className="w-5 h-5 mr-1 text-purple-200 hover:text-purple-100"
							aria-hidden="true"
						/>
						Go Back
					</a>
				</Link>
			</div>
			<div className="py-4">
				<h1 className="text-4xl text-center">{collection.title}</h1>
			</div>
			<StyledModal isOpen={modal.isOpen} setModal={handleModal}>
				<div>
					<h1>Hello world</h1>
				</div>
			</StyledModal>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-10">
				{photos.map(({ id, urls, description }) => (
					<div key={id}>
						<Card
							photo={urls.regular}
							alt={description}
							onClick={() => handleModal(true)}
						/>
					</div>
				))}
			</div>
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
