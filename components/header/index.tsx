import AccountDropdown from "./accountDropdown";

const Header = () => {
	return (
		<header className="flex h-14 bg-blue-400  items-center justify-end">
			<AccountDropdown />
		</header>
	);
};
export default Header;
