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

type Props = {
	isLoggedIn: boolean;
	name: string | undefined;
};

const AuthDropdown = ({ isLoggedIn, name }: Props) => {
	return <div></div>;
};

export default AuthDropdown;
