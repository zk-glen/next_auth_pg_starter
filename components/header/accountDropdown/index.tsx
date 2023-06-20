import React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdownMenu";
import { PersonIcon } from "@radix-ui/react-icons";
import { UserRole } from "@prisma/client";
import { LoginButton, LogoutButton } from "../loginout";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession, Session } from "next-auth";
import { Providers } from "@/app/providers";

type UserData = {
	name: string | null | undefined;
	role: UserRole;
	email: string | null | undefined;
	image?: any;
	id: string | number;
};

const AccountDropdown = () => {
	const session = async () => await getServerSession(authOptions);
	console.log(session);
	// const name = session?.user.name;
	let name = true;
	//stackoverflow.com/questions/70429561/how-do-i-use-next-auth-within-a-nextjs-component
	https: return (
		<div className="flex items-center mr-4 hover:cursor-pointer">
			<Providers>
				<DropdownMenu>
					<DropdownMenuTrigger className="flex gap-2">
						<PersonIcon className="w-6 h-6" />
						<div className="h-full sm:flex hidden ">
							{name ? <div>{name}</div> : <div>Your Account</div>}
						</div>
					</DropdownMenuTrigger>
					{name && (
						<DropdownMenuContent>
							<DropdownMenuLabel>Account</DropdownMenuLabel>

							<DropdownMenuSeparator />
							<DropdownMenuItem>Profile</DropdownMenuItem>
							<DropdownMenuItem>Billing</DropdownMenuItem>
							<DropdownMenuItem>Team</DropdownMenuItem>
							<DropdownMenuItem>Subscription</DropdownMenuItem>
							<LogoutButton />
						</DropdownMenuContent>
					)}
					{!name && (
						<DropdownMenuLabel>
							<LoginButton />
						</DropdownMenuLabel>
					)}
				</DropdownMenu>
			</Providers>
		</div>
	);
};
export default AccountDropdown;
