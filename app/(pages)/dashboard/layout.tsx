import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="bg-blue-300 h-screen w-screen flex justify-center items-center">
			<Link href="/">
				<Button>Home</Button>
			</Link>
			{children}
		</div>
	);
}
