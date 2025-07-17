import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

async function migrateRemoveName() {
  console.log("Starting migration to remove redundant 'name' field from portfolio_lm table...");
  
  try {
    // Get all portfolio items
    const items = await client.query(api.queries.getAllPortfolioItems);
    
    if (!items || items.length === 0) {
      console.log("No items found to migrate.");
      return;
    }
    
    console.log(`Found ${items.length} items to migrate.`);
    
    // Update each item to remove the name field
    for (const item of items) {
      try {
        await client.mutation(api.mutations.updatePortfolioItem, {
          id: item._id,
          content: item.content, // Keep the content as is
          order: item.order,
          isActive: item.isActive,
        });
        console.log(`Migrated item: ${item.content} (${item.category})`);
      } catch (error) {
        console.error(`Error migrating item ${item._id}:`, error);
      }
    }
    
    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

// Run the migration
migrateRemoveName().catch(console.error); 