import { hash } from "bcrypt";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import formData from "form-data";
import Mailgun from "mailgun.js";

export async function registerUser(data: FormData) {
	const MAILGUN_API_KEY = process.env.MAILGUN_PRIVATE_API_KEY || "";
	const DOMAIN = process.env.MAILGUN_DOMAIN || "";

	const password = await hash(data.get("password") as string, 12);

	const user = await prisma.user.create({
		data: {
			name: data.get("name") as string,
			email: data.get("email") as string,
			password,
		},
	});

	//  Add a token to prisma that is unique using the crypto library to generate
	const token = await prisma.activationToken.create({
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
		text: `Hello ${user.name}, please activate your account by clicking this link: http://localhost:3000/activate/${token.token}`,
	};

	await client.messages.create(DOMAIN, messageData);
}
