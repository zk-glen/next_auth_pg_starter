import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export default async function middleware(
	req: NextRequest,
	event: NextFetchEvent
) {
	const token = await getToken({ req });
	const isAuthenticated = !!token;

	// Check if the user is authenticated
	if (!isAuthenticated) {
		return NextResponse.redirect(new URL("/login", req.url));
	}

	// Check user roles and restrict access based on role
	const { role } = token;
	let allowedRoutes: string[] = [];

	switch (role) {
		case "ADMIN":
			allowedRoutes = ["/dashboard/admin"];
			break;
		case "STAFF":
			allowedRoutes = ["/dashboard/staff"];
			break;
		case "CUSTOMER":
			allowedRoutes = ["/dashboard/customer"];
			break;
		default:
			break;
	}

	const isAuthorized = allowedRoutes.some((route: string) =>
		req.nextUrl.pathname.startsWith(route)
	);

	if (!isAuthorized) {
		return NextResponse.redirect(new URL("/unauthorized", req.url));
	}

	const authMiddleware = await withAuth({
		pages: {
			signIn: `/login`,
		},
	});

	// @ts-expect-error
	return authMiddleware(req, event);
}

export const config = {
	matcher: [
		"/dashboard",
		"/dashboard/admin",
		"/dashboard/customer",
		"/dashboard/staff",
	],
};
