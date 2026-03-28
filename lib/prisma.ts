// lib/prisma.ts
// This file creates ONE shared Prisma database connection for the whole app.
// Without this, Next.js would create hundreds of connections during development.

import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "dev.db");

function createPrismaClient() {
  const adapter = new PrismaBetterSqlite3({ url: dbPath });
  // Prisma v7 adapter typing requires a cast — the adapter is valid at runtime
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new PrismaClient({ adapter } as any);
}

// In development, reuse the same client across hot-reloads
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
