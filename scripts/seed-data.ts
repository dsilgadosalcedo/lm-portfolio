import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const portfolioData = [
  {
    name: "Tu aliada legal estratégica para el mundo Tech",
    category: "description",
    content: "Tu aliada legal estratégica para el mundo Tech",
    order: 1,
  },
  {
    name: "lindamarcela1408@gmail.com",
    category: "email",
    content: "lindamarcela1408@gmail.com",
    order: 1,
  },
  {
    name: "lindamarcela",
    category: "linkedin",
    content: "lindamarcela",
    order: 1,
  },
  {
    name: "573136037029",
    category: "whatsapp",
    content: "573136037029",
    order: 1,
  },
  {
    name: "Para profesionales Tech y creadores digitales",
    category: "service-dev-title",
    content: "Para profesionales Tech y creadores digitales",
    order: 1,
  },
  {
    name: "Para startups y empresas",
    category: "service-business-title",
    content: "Para startups y empresas",
    order: 1,
  },
  // Tech professionals services
  {
    name: "Asesoría legal estratégica",
    category: "service-dev-item",
    content: "Asesoría legal estratégica",
    order: 1,
  },
  {
    name: "Consultoría legal",
    category: "service-dev-item",
    content: "Consultoría legal",
    order: 2,
  },
  {
    name: "Resolución jurídica de conflictos",
    category: "service-dev-item",
    content: "Resolución jurídica de conflictos",
    order: 3,
  },
  {
    name: "Representación legal y judicial",
    category: "service-dev-item",
    content: "Representación legal y judicial",
    order: 4,
  },
  // Business services
  {
    name: "Gestión contractual",
    category: "service-business-item",
    content: "Gestión contractual",
    order: 1,
  },
  {
    name: "Delegada de Protección de Datos (DPO) externo",
    category: "service-business-item",
    content: "Delegada de Protección de Datos (DPO) externo",
    order: 2,
  },
  {
    name: "Constitución de empresas",
    category: "service-business-item",
    content: "Constitución de empresas",
    order: 3,
  },
  {
    name: "Registro de marcas",
    category: "service-business-item",
    content: "Registro de marcas",
    order: 4,
  },
  {
    name: "Representación legal y judicial",
    category: "service-business-item",
    content: "Representación legal y judicial",
    order: 5,
  },
  // Experience metrics
  {
    name: "6 Años de experiencia",
    category: "experience",
    content: "6 Años de experiencia",
    order: 1,
  },
  {
    name: "+5 Casos de éxito",
    category: "experience",
    content: "+5 Casos de éxito",
    order: 2,
  },
  {
    name: "20 Conocimientos certificados",
    category: "experience",
    content: "20 Conocimientos certificados",
    order: 3,
  },
];

async function seedPortfolioData() {
  console.log("Seeding portfolio data...");
  
  for (const item of portfolioData) {
    try {
      await client.mutation(api.mutations.createPortfolioItem, item);
      console.log(`Created item: ${item.name} (${item.category})`);
    } catch (error) {
      console.error(`Error creating item ${item.name}:`, error);
    }
  }
  
  console.log("Seeding complete!");
}

// Run the seeding function
seedPortfolioData().catch(console.error); 