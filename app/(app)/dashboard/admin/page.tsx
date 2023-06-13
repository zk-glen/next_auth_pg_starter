import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AdminDashboard() {
	const session = await getServerSession(authOptions);
	if (session?.user.role !== "ADMIN") {
		return <div>NOT AN ADMIN</div>;
	}
	return <>Admin Dashboard</>;
}