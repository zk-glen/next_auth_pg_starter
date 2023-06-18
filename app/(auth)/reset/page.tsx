// "use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import React from "react";
import formData from "form-data";
import Mailgun from "mailgun.js";
import { randomUUID } from "crypto";

const MAILGUN_API_KEY = process.env.MAILGUN_PRIVATE_API_KEY || "";
const DOMAIN = process.env.MAILGUN_DOMAIN || "";

type Props = {};

export default function SendReset({}: Props) {
	async function resetUser(data: FormData) {
		"use server";

		const user = await prisma.user.findFirst({
			where: {
				email: data.get("email") as string,
			},
		});

		if (!user) return;
		console.log(user.email);
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
	return (
		<div className="h-screen w-screen flex justify-center items-center bg-slate100">
			<div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12 w-[500px]">
				<h1 className="font-semibold text-2xl">Reset your Password</h1>
				<form action={resetUser}>
					<Label htmlFor="name">Email</Label>
					<Input
						className="w-full"
						required
						name="email"
						type="email"
						placeholder="Email"
					/>

					<Button className="w-full" size="lg" type="submit">
						Reset
					</Button>
				</form>
			</div>

			<p>Login</p>
			<Link
				className="text-indigo-500 hover:underline"
				href="/api/auth/signin"
			>
				Sign In
			</Link>
		</div>
	);
}
