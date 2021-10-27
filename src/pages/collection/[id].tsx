import { GetServerSideProps } from "next";
import Link from "next/link";
import cookie from "cookie";
import { Flex, Item } from "react-flex-ready";
import { Collection, CollectionPhoto } from "types";
import Card from "ui/components/Card";

type CollectionProps = {
	collection: Collection;
	photos: CollectionPhoto[];
};

const CollectionPage = ({ photos, collection }: CollectionProps) => {
	return (
		<div className="container mx-auto text-right">
			<div className="py-2 px-2">
				<Link href="/">
					<a className="text-left block">Go back</a>
				</Link>
			</div>
			<div className="py-4">
				<h1 className="text-4xl text-center">{collection.title}</h1>
			</div>
			<Flex align="flex-start" col={4} colTablet={6} colMobile={12} gap={2}>
				{photos.map(({ id, urls, description }) => (
					<Item
						col={4}
						colTablet={6}
						colMobile={12}
						gap={2}
						marginBottom={20}
						stretch
						key={id}
					>
						<Card photo={urls.regular} alt={description} />
					</Item>
				))}
			</Flex>
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
