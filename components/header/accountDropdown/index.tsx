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
import Link from "next/link";

type AccountDropdownProps = {
	name: string | null | undefined;
	role: UserRole | null | undefined;
};

const AccountDropdown = ({ name, role }: AccountDropdownProps) => {
	https: return (
		<div className="flex items-center mr-8 hover:cursor-pointer">
			<DropdownMenu>
				<DropdownMenuTrigger className="flex gap-2">
					<PersonIcon className="w-6 h-6" />
					<div className="h-full sm:flex hidden ">
						{name ? <div>{name}</div> : <div>Your Account</div>}
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="flex flex-col items-center">
					{name ? (
						<>
							<DropdownMenuLabel>Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								{role === "ADMIN" && (
									<Link href="/dashboard/admin">
										Dashboard
									</Link>
								)}
								{role === "STAFF" && (
									<Link href="/dashboard/staff">
										Dashboard
									</Link>
								)}
								{role === "CUSTOMER" && (
									<Link href="/dashboard/customer">
										Dashboard
									</Link>
								)}
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link href="/settings">Settings</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<LogoutButton />
							</DropdownMenuItem>
						</>
					) : (
						<>
							<DropdownMenuItem>
								<LoginButton />
							</DropdownMenuItem>
						</>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
export default AccountDropdown;
