import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

dotenv.config({ path: ".env.local" });

export const db = drizzle(process.env.DATABASE_URL!);