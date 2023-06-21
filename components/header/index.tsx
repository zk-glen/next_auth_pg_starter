import { Session } from "next-auth";
import AccountDropdown from "./accountDropdown";

type HeaderProps = {
	session: Session | null;
};

const Header = ({ session }: HeaderProps) => {
	return (
		<header className="flex h-14 bg-blue-400  items-center justify-end">
			<AccountDropdown
				name={session?.user.name}
				role={session?.user.role}
			/>
		</header>
	);
};
export default Header;
