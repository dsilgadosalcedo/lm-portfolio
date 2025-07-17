import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const portfolioData = [
  {
    category: "description",
    content: "Tu aliada legal estratégica para el mundo Tech",
    order: 1,
  },
  {
    category: "email",
    content: "lindamarcela1408@gmail.com",
    order: 1,
  },
  {
    category: "linkedin",
    content: "lindamarcela",
    order: 1,
  },
  {
    category: "whatsapp",
    content: "573136037029",
    order: 1,
  },
  {
    category: "service-dev-title",
    content: "Para profesionales Tech y creadores digitales",
    order: 1,
  },
  {
    category: "service-business-title",
    content: "Para startups y empresas",
    order: 1,
  },
  // Tech professionals services
  {
    category: "service-dev-item",
    content: "Asesoría legal estratégica",
    order: 1,
  },
  {
    category: "service-dev-item",
    content: "Consultoría legal",
    order: 2,
  },
  {
    category: "service-dev-item",
    content: "Resolución jurídica de conflictos",
    order: 3,
  },
  {
    category: "service-dev-item",
    content: "Representación legal y judicial",
    order: 4,
  },
  // Business services
  {
    category: "service-business-item",
    content: "Gestión contractual",
    order: 1,
  },
  {
    category: "service-business-item",
    content: "Delegada de Protección de Datos (DPO) externo",
    order: 2,
  },
  {
    category: "service-business-item",
    content: "Constitución de empresas",
    order: 3,
  },
  {
    category: "service-business-item",
    content: "Registro de marcas",
    order: 4,
  },
  {
    category: "service-business-item",
    content: "Representación legal y judicial",
    order: 5,
  },
  // Experience metrics
  {
    category: "experience",
    content: "6 Años de experiencia",
    order: 1,
  },
  {
    category: "experience",
    content: "+5 Casos de éxito",
    order: 2,
  },
  {
    category: "experience",
    content: "20 Conocimientos certificados",
    order: 3,
  },
];

async function seedPortfolioData() {
  console.log("Seeding portfolio data to portfolio_lm table...");
  
  for (const item of portfolioData) {
    try {
      await client.mutation(api.mutations.createPortfolioItem, item);
      console.log(`Created item: ${item.content} (${item.category})`);
    } catch (error) {
      console.error(`Error creating item ${item.content}:`, error);
    }
  }
  
  console.log("Seeding complete!");
}

// Run the seeding function
seedPortfolioData().catch(console.error); 