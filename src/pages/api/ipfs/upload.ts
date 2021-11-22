import type { NextApiRequest, NextApiResponse } from "next";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { INFURA_IPFS_PROJECT_ID, INFURA_IPFS_PROJECT_SECRET } from "config";

type Data = {
	url?: string;
	error?: string;
};

type Args = {
	description: string;
	external_url: string;
	image: string;
	name: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	try {
		const body: Args = req.body;

		const auth =
			"Basic " +
			Buffer.from(
				`${INFURA_IPFS_PROJECT_ID}:${INFURA_IPFS_PROJECT_SECRET}`
			).toString("base64");

		const client = ipfsHttpClient({
			host: "ipfs.infura.io",
			port: 5001,
			protocol: "https",
			headers: {
				authorization: auth,
			},
		});

		if (!body.image || !body.name || !body.external_url || !body.description) {
			return res.status(400).json({ error: "Something went wrong" });
		}

		// upload image to IPFS
		const blob = await fetch(body.image).then((r) => r.blob());

		const image = await client.add(blob);

		// upload the rest to IPFS
		const data = JSON.stringify({
			attributes: [],
			...body,
			image: `https://ipfs.infura.io/ipfs/${image.path}`,
		});

		// Upload to IPFS (Look up for alternatives as data is not stored forever)
		const added = await client.add(data);
		const url = `https://ipfs.infura.io/ipfs/${added.path}`;

		return res.status(200).json({ url });
	} catch (error) {
		res.status(500).json({ error: "Something went wrong" });
	}
}
