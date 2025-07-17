import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

async function checkData() {
  console.log("Checking current data in portfolio_lm table...");
  
  try {
    // Get all items (including inactive)
    const allItems = await client.query(api.queries.getAllPortfolioItems);
    
    console.log(`Total items: ${allItems?.length || 0}`);
    
    if (allItems && allItems.length > 0) {
      console.log("\nSample items:");
      allItems.slice(0, 3).forEach((item, index) => {
        console.log(`${index + 1}. ${item.content} (${item.category}) - isActive: ${item.isActive}`);
      });
      
      // Count active vs inactive
      const activeItems = allItems.filter(item => item.isActive);
      const inactiveItems = allItems.filter(item => !item.isActive);
      
      console.log(`\nActive items: ${activeItems.length}`);
      console.log(`Inactive items: ${inactiveItems.length}`);
      
      if (inactiveItems.length > 0) {
        console.log("\nInactive items:");
        inactiveItems.forEach(item => {
          console.log(`- ${item.content} (${item.category})`);
        });
      }
    } else {
      console.log("No items found in the database.");
    }
    
  } catch (error) {
    console.error("Error checking data:", error);
  }
}

// Run the check
checkData().catch(console.error); 