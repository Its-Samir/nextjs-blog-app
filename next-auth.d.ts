import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
	username: string;
	emailVerified: Date;
	bio: string | null;
	type: string | null;
};

declare module "next-auth" {
	interface Session {
		user: ExtendedUser;
	}
}

declare module "@auth/core/jwt" {
	interface JWT {
		username: string;
		image: string | null;
		emailVerified: Date;
		bio: string | null;
		type: string | null;
	}
}
