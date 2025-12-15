import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { CLIENT_DATABASE_SSL_CA, CLIENT_DATABASE_URL } from "./constants";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const adapter = new PrismaPg({
  connectionString: CLIENT_DATABASE_URL,
  ssl: {
    ca: CLIENT_DATABASE_SSL_CA,
    rejectUnauthorized: true,
  },
});

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
