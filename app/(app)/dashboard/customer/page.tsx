import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function CustomerDashboard() {
	const session = await getServerSession(authOptions);
	if (session?.user.role === "STAFF") {
		return <div>NOT AN ADMIN or CUSTOMER</div>;
	}

	return (
		<ul className="flex flex-col">
			<li>Upcoming appointments</li>
			<li>Past appointments</li>
			<li>Leave feedback</li>
			<li>Settings</li>
		</ul>
	);
}
