-- CreateTable
CREATE TABLE "Listing" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "petType" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "breed" TEXT,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "dateSeen" TIMESTAMP(3) NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "photoPath" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);
