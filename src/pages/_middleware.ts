import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const setUserCookie = async (request: NextRequest, response: NextResponse) => {
	const cookie = request.cookies["access_token"];

	if (!cookie) {
		return NextResponse.redirect("/signin");
	}

	return response;
};

export function middleware(req: NextRequest, _ev: NextFetchEvent) {
	return setUserCookie(req, NextResponse.next());
}
