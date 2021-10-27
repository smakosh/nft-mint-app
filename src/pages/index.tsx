import { useEffect } from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import cookie from "cookie";
import { Toaster } from "react-hot-toast";
import { Flex, Item } from "react-flex-ready";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "utils/store";
import { Collection } from "types";
import { requestAccount } from "features/user/actions";
import { createNFT } from "features/unsplash/actions";
import Card from "ui/components/Card";

type IndexProps = {
	collections: Collection[];
};

const Index = ({ collections }: IndexProps) => {
	const user = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!user.data?.address) {
			requestAccount(dispatch);
		}
	}, [user.data?.address, dispatch]);

	return (
		<div>
			<div className="py-4 container">
				{user.data?.address ? (
					<div className="flex items-center justify-end">
						<h1>
							Your address:{" "}
							<span className="font-bold">{user.data.shortAddress}</span>
						</h1>
						<button
							type="button"
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-5"
							onClick={() => createNFT(user)}
						>
							Mint NFT
						</button>
					</div>
				) : (
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						type="button"
						onClick={() => requestAccount(dispatch)}
					>
						Sign in with Metamask
					</button>
				)}
			</div>
			<section className="pt-8 px-4">
				<Flex col={3} colTablet={6} colMobile={12} gap={2} align="flex-start">
					{collections.map(({ id, title, cover_photo }) => (
						<Item
							col={3}
							colTablet={6}
							colMobile={12}
							gap={2}
							marginBottom={20}
							stretch
							key={id}
						>
							<Link href={`/collection/${id}`}>
								<a className="w-full h-full">
									<Card
										photo={cover_photo.urls.regular}
										title={title}
										alt={title}
									/>
								</a>
							</Link>
						</Item>
					))}
				</Flex>
			</section>
			<Toaster position="top-center" reverseOrder={false} />
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (
	ctx
): Promise<any> => {
	const cookies = cookie.parse(ctx.req.headers.cookie || "");

	if (cookies.access_token) {
		const accessToken = cookies.access_token;

		if (accessToken) {
			const headers = {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			};

			const meResponse = await fetch("https://api.unsplash.com/me", headers);
			const me = await meResponse.json();

			const response = await fetch(
				`https://api.unsplash.com/users/${me.username}/collections?page=1`,
				headers
			);
			const collections = await response.json();

			return {
				props: {
					collections,
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

export default Index;
