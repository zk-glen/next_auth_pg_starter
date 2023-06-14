import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="h-screen w-screen flex justify-center items-center bg-slate-100">
			{children}
		</div>
	);
}
