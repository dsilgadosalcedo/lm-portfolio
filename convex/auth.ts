import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";

// Use Convex Auth's Password provider
// Customize to use username as account identifier instead of email
export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({
      // Customize profile to use username as the account identifier
      // The Password provider uses profile.email as account.id, so we set email to username
      profile: (params) => {
        const username = params.username as string | undefined;
        if (!username) {
          throw new Error("Username is required");
        }
        return {
          email: username, // Password provider uses email as account.id, so we use username here
          username: username,
        };
      },
    }),
  ],
  // Custom callback to link auth accounts to existing user records by username
  callbacks: {
    createOrUpdateUser: async (ctx, args) => {
      const username = args.profile.username as string | undefined;

      if (!username) {
        throw new Error("Username is required in profile");
      }

      // Find existing user by username
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const existingUser = await (ctx.db as any)
        .query("users")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .withIndex("by_username", (q: any) => q.eq("username", username))
        .first();

      if (existingUser) {
        // User exists, update it and return the existing ID
        await ctx.db.patch(existingUser._id, {
          email: args.profile.email,
          firstName: args.profile.firstName,
          lastName: args.profile.lastName,
        });
        return existingUser._id;
      }

      // User doesn't exist - create one (shouldn't happen but handle it)
      const newUserId = await ctx.db.insert("users", {
        username,
        email: args.profile.email,
        firstName: args.profile.firstName,
        lastName: args.profile.lastName,
      });
      return newUserId;
    },
  },
});
