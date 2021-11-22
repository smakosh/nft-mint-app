import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

type Data = {
	message?: string;
	error?: string;
};

export default async function handler(
	_req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	try {
		res.setHeader(
			"Set-Cookie",
			serialize("access_token", "deleted", {
				path: "/",
				httpOnly: true,
				sameSite: "lax",
				secure: process.env.NODE_ENV === "production",
				maxAge: 0, // expires,
				expires: new Date(0),
			})
		);

		res.status(200).json({ message: "Logout successful" });
	} catch (error) {
		res.status(500).json({ error: "Something went wrong" });
	}
}
