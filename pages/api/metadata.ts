import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	attributes: [];
	description: string;
	external_url: string;
	image: string;
	name: string;
};

export default async function handler(
	_req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	res.status(200).json({
		attributes: [],
		description: "Marrakech, Morocco",
		external_url: "https://example.com/?token_id=1",
		image:
			"https://images.unsplash.com/photo-1563976983419-ab0c5789460b?ixlib=rb-1.2.1",
		name: "Marrakech",
	});
}
