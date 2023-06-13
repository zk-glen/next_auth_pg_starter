export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="bg-blue-300 h-screen w-screen flex justify-center items-center">
			{children}
		</div>
	);
}
