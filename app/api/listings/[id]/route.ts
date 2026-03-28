import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { parseId } from "@/lib/parseId";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseId(params.id);
  if (!id) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const listing = await prisma.listing.findUnique({ where: { id } });
  if (!listing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(listing);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseId(params.id);
  if (!id) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const body = await req.json();

    // Whitelist: only allow updating the status field
    const ALLOWED_STATUSES = ["ACTIVE", "REUNITED"];
    if (!body.status || !ALLOWED_STATUSES.includes(body.status)) {
      return NextResponse.json(
        { error: "Invalid or missing status value" },
        { status: 400 }
      );
    }

    // Ownership check: caller must provide the contact email used when posting
    const listing = await prisma.listing.findUnique({ where: { id } });
    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }
    if (
      !body.ownerEmail ||
      listing.contactEmail.toLowerCase() !== body.ownerEmail.trim().toLowerCase()
    ) {
      return NextResponse.json(
        { error: "Email does not match this listing" },
        { status: 403 }
      );
    }

    const updated = await prisma.listing.update({
      where: { id },
      data: { status: body.status },
    });
    return NextResponse.json(updated);
  } catch (e) {
    console.error("PATCH /api/listings/[id] error:", e);
    return NextResponse.json(
      { error: "Failed to update listing" },
      { status: 500 }
    );
  }
}

