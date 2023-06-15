/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
		serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
		serverActions: true,
	},
};

module.exports = nextConfig;
