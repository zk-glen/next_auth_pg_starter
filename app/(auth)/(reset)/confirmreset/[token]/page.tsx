import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";
import { changePassword } from "@/app/(actions)/_changePassword";

type Props = {};

export default function ChangePassword() {
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
