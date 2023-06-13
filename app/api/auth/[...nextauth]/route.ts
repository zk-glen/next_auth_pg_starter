import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";
import NextAuth, { Session, type NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

if (!process.env.NEXTAUTH_SECRET) {
	throw new Error(
		"please provide process.env.NEXTAUTH_SECRET environment variable"
	);
}

export const authOptions: NextAuthOptions = {
	pages: {
		signIn: "/login",
	},
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			name: "Sign in",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "hello@example.com",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) return null;

				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				});

				if (!user) return null;

				const isPasswordValid = await compare(
					credentials.password,
					user.password
				);

				if (!isPasswordValid) return null;

				let DBUSer = {
					id: user.id + "",
					email: user.email,
					name: user.name,
					role: user.role,
				};

				return DBUSer;
			},
		}),
	],
	callbacks: {
		session: ({ token, session }) => {
			console.log(session, "SESSION TOKEN CALL");
			return {
				...session,
				user: {
					...session.user,
					id: token.id,
					role: token.role,
				},
			};
		},
		jwt: ({ token, user }) => {
			if (user) {
				const u = user as unknown as any;
				return {
					...token,
					id: u.id,
					role: u.role,
				};
			}

			return token;
		},
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
