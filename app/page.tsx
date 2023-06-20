import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
// import { LoginButton, LogoutButton } from "@/app/(auth)/login/auth";
import Link from "next/link";

export default async function Home() {
	return (
		<main className="w-screen h-screen flex flex-col items-center justify-center"></main>
	);
}
