"use server";

import { prisma } from "@/lib/prisma";
import formData from "form-data";
import Mailgun from "mailgun.js";
import { randomUUID } from "crypto";

export async function resetUser(data: FormData) {
	const MAILGUN_API_KEY = process.env.MAILGUN_PRIVATE_API_KEY || "";
	const DOMAIN = process.env.MAILGUN_DOMAIN || "";

	const user = await prisma.user.findFirst({
		where: {
			email: data.get("email") as string,
		},
	});

	if (!user) return;

	//  Add a token to prisma that is unique using the crypto library to generate
	const token = await prisma.resetToken.create({
		data: {
			token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
			userId: user.id,
		},
	});
	const mailgun = new Mailgun(formData);
	const client = mailgun.client({
		username: "api",
		key: MAILGUN_API_KEY,
	});
	//  What will be emailed
	const messageData = {
		from: `Example Email <hello@${DOMAIN}>`,
		to: user.email,
		subject: "Please Activate Your Account",
		//  This is currently hardcoded to localhost and should be an env variable
		text: `Hello ${user.name}, please reset your password your account by clicking this link: http://localhost:3000/reset/${token.token}`,
	};

	await client.messages.create(DOMAIN, messageData);
}
