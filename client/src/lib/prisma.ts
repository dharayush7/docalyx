import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { CLIENT_DATABASE_SSL_CA, CLIENT_DATABASE_URL } from "./constants";

const isProduction = process.env.NODE_ENV === "production";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const adapter = isProduction ?  new PrismaPg({
  connectionString: CLIENT_DATABASE_URL,
  ssl: {
    ca: CLIENT_DATABASE_SSL_CA,
    rejectUnauthorized: true,
  },
}) : new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (!isProduction) globalForPrisma.prisma = prisma;

export default prisma;
