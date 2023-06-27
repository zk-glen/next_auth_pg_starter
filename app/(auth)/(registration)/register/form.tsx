import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { registerUser } from "@/app/(actions)/_registerUser";

export const RegisterForm = () => {
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
