import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { LoginButton, LogoutButton } from "./auth";
import Link from "next/link";

export default async function Home() {
	const session = await getServerSession(authOptions);

	let role: string = "";

	if (session?.user.role === "ADMIN") {
		role = "admin";
	} else if (session?.user.role === "STAFF") {
		role = "staff";
	} else {
		role = "customer";
	}

	return (
		<main className="w-screen h-screen flex flex-col items-center justify-center">
			<h2>Homepage</h2>
			{session ? <div>Logged In</div> : <div>Not Logged In</div>}

			<Link href={`/dashboard/${role}`}>Dashboard</Link>
			<div>
				<LoginButton /> |
				<LogoutButton />
			</div>
		</main>
	);
}
