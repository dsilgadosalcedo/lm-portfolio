import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

export async function getHeroPhotoUrl(): Promise<string | undefined> {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!convexUrl) {
    return undefined;
  }

  try {
    const client = new ConvexHttpClient(convexUrl);

    // Fetch only the profile photo items
    const items = (await client.query(api.queries.getItemsByCategory, {
      category: "profile-photo",
    })) as Array<{ imageUrl?: string } & Record<string, unknown>>;

    const storageId = items?.[0]?.imageUrl as string | undefined;
    if (!storageId) return undefined;

    const fileUrl = (await client.query(api.queries.getFileUrl, {
      storageId,
    })) as string | null;

    return fileUrl ?? undefined;
  } catch (error) {
    console.error("Error fetching hero photo URL for metadata:", error);
    return undefined;
  }
}
