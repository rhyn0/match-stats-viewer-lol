import "server-only";
import env from "@/config/env";
import db from "@/lib/drizzle-db";
import NextAuth, {
    type Session,
    type AuthOptions,
    getServerSession as getServerSessionNA,
} from "next-auth";
import GithubProvider from "next-auth/providers/github";

async function isAdminUser(email: string): Promise<boolean> {
    const queryRes = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, email),
    });
    return queryRes?.role === "admin";
}

const options: AuthOptions = {
    debug: !!process.env.AUTH_DEBUG,
    providers: [
        GithubProvider({
            clientId: env.GITHUB_OAUTH_ID,
            clientSecret: env.GITHUB_OAUTH_SECRET,
        }),
    ],
    session: { strategy: "jwt" },
    callbacks: {
        signIn: async ({ user, ...rest }) => {
            console.log("🚀 ~ signIn: ~ user, ...rest:", user, rest);

            const isAdmin = user.email ? await isAdminUser(user.email) : false;
            console.log("🚀 ~ signIn: ~ isAdmin:", isAdmin);
            if (isAdmin) return true;
            return "/unauthorized";
        },
        jwt({ token, trigger, session }) {
            if (trigger === "update") token.name = session.user.name;
            return token;
        },
        async session({ session }) {
            return session;
        },
    },
};
const mainAuth = NextAuth(options);
export default mainAuth;
export const { handlers, auth, signIn, signOut } = mainAuth;

export async function getServerSession(): Promise<Session | null> {
    return await getServerSessionNA(options);
}
