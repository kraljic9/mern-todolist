import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github"

export const authOptions = {
    providers: [
        GitHubProvider({
        userId: process.env.GITHUB_ID,
        userSecret: process.env.GITHUB.SECRET,
})],
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}