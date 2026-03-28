import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { parseId } from "@/lib/parseId";

export async function POST(req: NextRequest) {
  try {
    const { listingId, senderName, senderEmail, message } = await req.json();

    if (!listingId || !senderName || !senderEmail || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const id = parseId(listingId);
    if (!id) {
      return NextResponse.json({ error: "Invalid listing ID" }, { status: 400 });
    }

    const listing = await prisma.listing.findUnique({ where: { id } });
    if (!listing) {
      return NextResponse.json(
        { error: "Listing not found" },
        { status: 404 }
      );
    }

    // Contact details logged here — swap for Resend/email service in production
    console.log(`\n📧 PawFound Contact Form — Listing #${id}`);
    console.log(`   From : ${senderName} <${senderEmail}>`);
    console.log(`   To   : ${listing.contactEmail}`);
    console.log(`   Pet  : ${listing.name} (${listing.type})`);
    console.log(`   Msg  : ${message}\n`);

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("POST /api/contact error:", e);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
