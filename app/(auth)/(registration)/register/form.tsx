import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { hash } from "bcrypt";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import formData from "form-data";
import Mailgun from "mailgun.js";

const MAILGUN_API_KEY = process.env.MAILGUN_PRIVATE_API_KEY || "";
const DOMAIN = process.env.MAILGUN_DOMAIN || "";

export const RegisterForm = () => {
	//  Server acton register
	async function registerUser(data: FormData) {
		"use server";

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

	return (
		<div className="h-screen w-screen flex justify-center items-center bg-slate100">
			<div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12 w-[500px]">
				<h1 className="font-semibold text-2xl">Create you account</h1>
				<form action={registerUser}>
					<Label htmlFor="name">Name</Label>
					<Input
						className="w-full"
						required
						name="name"
						placeholder="Name"
					/>
					<Label htmlFor="name">Email</Label>
					<Input
						className="w-full"
						required
						name="email"
						type="email"
						placeholder="Email"
					/>
					<Label htmlFor="password">Password</Label>
					<Input
						className="w-full"
						type="password"
						name="password"
						placeholder="Password"
					/>

					<Button className="w-full" size="lg" type="submit">
						Register
					</Button>
				</form>
			</div>

			<p>Have an Account?</p>
			<Link
				className="text-indigo-500 hover:underline"
				href="/api/auth/signin"
			>
				Sign In
			</Link>
		</div>
	);
};

// Todo
// <Layout>
// 	<Template>
// 		<ErrorBoundary fallback={<Error/>}>
// 			<Suspense fallback={<Loading/>}>
// 				<ErrorBoundary fallback={<NotFound/>}>
// 					<Page/>
// 				</ErrorBoundary>
// 			</Suspense>
// 		</ErrorBoundary>
// 	</Template>
// </Layout>

// fully understand api directory

// Move activate to auth folder and share layout
//  Add advanced Typescript

//  use layout unless specific reason for template
