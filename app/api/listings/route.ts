import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const petType = searchParams.get("petType");
  const search = searchParams.get("search");
  const status = searchParams.get("status") ?? "ACTIVE";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};
  if (status !== "ALL") where.status = status;
  if (type && type !== "ALL") where.type = type;
  if (petType && petType !== "ALL") where.petType = petType;
  if (search && search.trim()) {
    where.location = { contains: search.trim() };
  }

  const listings = await prisma.listing.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(listings);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      type,
      petType,
      name,
      breed,
      description,
      location,
      dateSeen,
      contactEmail,
      photoPath,
    } = body;

    if (
      !type ||
      !petType ||
      !name ||
      !description ||
      !location ||
      !dateSeen ||
      !contactEmail
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate dateSeen is a real date before passing to Prisma
    const parsedDate = new Date(dateSeen);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid date for dateSeen" },
        { status: 400 }
      );
    }

    const listing = await prisma.listing.create({
      data: {
        type,
        petType,
        name,
        breed: breed || null,
        description,
        location,
        dateSeen: parsedDate,
        contactEmail,
        photoPath: photoPath || null,
      },
    });

    return NextResponse.json(listing, { status: 201 });
  } catch (e) {
    console.error("POST /api/listings error:", e);
    return NextResponse.json(
      { error: "Failed to create listing" },
      { status: 500 }
    );
  }
}
