import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

async function testQuery() {
  console.log("Testing getPortfolioItems query...");
  
  try {
    // Test the query that the main page uses
    const grouped = await client.query(api.queries.getPortfolioItems);
    
    console.log("Query result:", JSON.stringify(grouped, null, 2));
    
    if (grouped && Object.keys(grouped).length > 0) {
      console.log("\nCategories found:");
      Object.keys(grouped).forEach(category => {
        console.log(`- ${category}: ${grouped[category].length} items`);
      });
    } else {
      console.log("No data returned from getPortfolioItems query");
    }
    
  } catch (error) {
    console.error("Error testing query:", error);
  }
}

// Run the test
testQuery().catch(console.error); 