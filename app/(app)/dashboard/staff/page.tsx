import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function StaffDashboard() {
	const session = await getServerSession(authOptions);

	if (session?.user.role === "CUSTOMER") {
		return <div>NOT AN ADMIN or STAFF</div>;
	}

	return (
		<ul className="flex flex-col">
			<li>View Appointments</li>
			<li>Set Days off</li>
			<li>View Past Appointments</li>
			<li>Settings</li>
		</ul>
	);
}
