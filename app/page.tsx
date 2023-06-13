import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { LoginButton, LogoutButton } from "./auth";

export default async function Home() {
	const session = await getServerSession(authOptions);

	return (
		<main className="w-screen h-screen flex flex-col items-center justify-center">
			<h2>Homepage</h2>
			{session ? <div>Logged In</div> : <div>Not Logged In</div>}
			<>{JSON.stringify(session)}</>
			<div>
				<LoginButton /> |
				<LogoutButton />
			</div>
		</main>
	);
}
