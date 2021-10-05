import { GetServerSideProps } from "next";
import cookie from "cookie";

type IndexProps = {
	collections: any;
};

const Index = ({ collections }: IndexProps) => {
	return (
		<div>
			<pre>{JSON.stringify(collections, undefined, 2)}</pre>
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
			const response = await fetch(
				"https://api.unsplash.com/collections?page=1",
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			const collections = await response.json();

			console.log(collections);

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
