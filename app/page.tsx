import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { User } from "./user";

export default async function Home() {
	const session = await getServerSession(authOptions);
	return (
		<main className="">
			<div>HEllo, World</div>
			<h2>Server Session</h2>
			<pre>{JSON.stringify(session)}</pre>
			<h2>CLient Call</h2>
			<User />
		</main>
	);
}
