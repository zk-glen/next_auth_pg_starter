import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";
import { hash } from "bcrypt";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { headers } from "next/headers";

type Props = {};

export default function ChangePassword() {
	async function changePassword(data: FormData) {
		"use server";
		const getNextURL = (await headers().get("next-url")) as string;
		const token = getNextURL.split("/")[2];

		const newPassword = await hash(data.get("password") as string, 12);

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
									gt: new Date(
										Date.now() - 24 * 60 * 60 * 1000
									), // 24 hours ago - Maybe make this a variable
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
				password: newPassword,
			},
		});

		//  Next mark the token as used so they can't use it again
		await prisma.resetToken.updateMany({
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

	return (
		<div className="h-screen w-screen flex justify-center items-center bg-slate100">
			<div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12 w-[500px]">
				<h1 className="font-semibold text-2xl">Choose new password</h1>
				<form action={changePassword}>
					<Label htmlFor="name">Password</Label>
					<Input
						className="w-full"
						required
						name="password"
						type="password"
						placeholder="Password"
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
