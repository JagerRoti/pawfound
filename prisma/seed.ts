import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "dev.db");
const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  await prisma.listing.deleteMany();

  await prisma.listing.createMany({
    data: [
      {
        type: "LOST",
        petType: "DOG",
        name: "Buddy",
        breed: "Golden Retriever",
        description:
          "Friendly golden retriever with a red collar. Very gentle, responds to his name. Last seen chasing a squirrel into the trees.",
        location: "Riverside Park, North Side",
        dateSeen: new Date("2026-03-25"),
        contactEmail: "sarah@example.com",
        photoPath: null,
        status: "ACTIVE",
      },
      {
        type: "FOUND",
        petType: "CAT",
        name: "Unknown",
        breed: "Tabby",
        description:
          "Found a friendly orange tabby sitting outside our door in the rain. Has no collar but seems well-fed and very tame. Very vocal!",
        location: "Oak Street, Downtown",
        dateSeen: new Date("2026-03-26"),
        contactEmail: "john@example.com",
        photoPath: null,
        status: "ACTIVE",
      },
      {
        type: "LOST",
        petType: "CAT",
        name: "Whiskers",
        breed: "Siamese",
        description:
          "Blue-eyed Siamese, very shy around strangers. Went missing through an open window. Wearing a pink collar with a silver bell.",
        location: "Maple Avenue, East Side",
        dateSeen: new Date("2026-03-24"),
        contactEmail: "emma@example.com",
        photoPath: null,
        status: "ACTIVE",
      },
      {
        type: "FOUND",
        petType: "DOG",
        name: "Unknown",
        breed: "Beagle mix",
        description:
          "Found a small beagle-mix wandering near the school playground. Has a blue tag but the number is worn off. Very sweet and friendly.",
        location: "Elm Street School, West Side",
        dateSeen: new Date("2026-03-27"),
        contactEmail: "mike@example.com",
        photoPath: null,
        status: "ACTIVE",
      },
      {
        type: "LOST",
        petType: "OTHER",
        name: "Thumper",
        breed: "Holland Lop Rabbit",
        description:
          "Small grey and white rabbit, escaped from the garden. Very gentle, loves carrots and being petted. Answers to Thumper.",
        location: "Cedar Gardens Estate",
        dateSeen: new Date("2026-03-26"),
        contactEmail: "lisa@example.com",
        photoPath: null,
        status: "ACTIVE",
      },
      {
        type: "FOUND",
        petType: "DOG",
        name: "Unknown",
        breed: "Labrador",
        description:
          "Large black labrador found in the car park. Very well-trained — responds to 'sit' and 'stay'. Appears well cared for.",
        location: "Westfield Shopping Centre",
        dateSeen: new Date("2026-03-28"),
        contactEmail: "david@example.com",
        photoPath: null,
        status: "ACTIVE",
      },
      {
        type: "LOST",
        petType: "DOG",
        name: "Rex",
        breed: "German Shepherd",
        description:
          "Large German Shepherd, black and tan. Wearing a black collar with ID tag. He is microchipped. Very well trained.",
        location: "Victoria Park, South Gate",
        dateSeen: new Date("2026-03-20"),
        contactEmail: "carol@example.com",
        photoPath: null,
        status: "REUNITED",
      },
    ],
  });

  console.log("✅ Seeded 7 listings (6 active, 1 reunited)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
