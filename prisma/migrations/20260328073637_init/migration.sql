-- CreateTable
CREATE TABLE "Listing" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "petType" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "breed" TEXT,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "dateSeen" DATETIME NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "photoPath" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
