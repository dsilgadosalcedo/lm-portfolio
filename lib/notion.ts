import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function getPortfolioItems() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    // Optional: filters or sorting can go here
  });
  return response.results;
}
