import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(
	request: NextRequest,
	{
		params,
	}: {
		params: { token: string };
	}
) {
	const { token } = params;

	//  Find use in db that is not active yet, and is created less than 24 hours ago
	const user = await prisma.user.findFirst({
		where: {
			resetTokens: {
				some: {
					AND: [
						{
							activatedAt: null, // Check not already active
						},
						{
							createdAt: {
								gt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago - Maybe make this a variable
							},
						},
						{
							token, // Check it matches
						},
					],
				},
			},
		},
	});

	if (!user) {
		throw new Error("Invalid Token"); //Here can output different reasons for why it may be invali - expired, incorrect etc
	}

	//  Now need to mark USer as active
	await prisma.user.update({
		where: {
			id: user.id,
		},
		data: {
			active: true,
		},
	});

	//  Next mark the token as used so they can't use it again
	await prisma.activationToken.updateMany({
		where: {
			token,
		},
		data: {
			activatedAt: new Date(),
		},
	});

	//  Now redect them to login page
	redirect("/api/auth/signin");
}
