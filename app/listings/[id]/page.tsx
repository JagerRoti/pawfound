import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import ContactForm from "@/app/components/ContactForm";
import ReunitedButton from "@/app/components/ReunitedButton";
import prisma from "@/lib/prisma";

const PET_EMOJI: Record<string, string> = {
  DOG: "🐶",
  CAT: "🐱",
  OTHER: "🐰",
};

export default async function ListingDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);
  if (isNaN(id)) notFound();

  const listing = await prisma.listing.findUnique({ where: { id } });
  if (!listing) notFound();

  const isLost = listing.type === "LOST";
  const isActive = listing.status === "ACTIVE";
  const emoji = PET_EMOJI[listing.petType] ?? "🐾";

  const date = listing.dateSeen.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const posted = listing.createdAt.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-page">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          href="/"
          className="text-sm text-pawblue hover:underline mb-6 block"
        >
          ← Back to listings
        </Link>

        {/* Main card */}
        <div className="bg-white rounded-card border border-gray-200 overflow-hidden shadow-sm">
          {/* Status banner */}
          <div
            className={`px-5 py-3 flex items-center gap-3 ${
              isLost ? "bg-lost-bg" : "bg-found-bg"
            }`}
          >
            <span
              className={`text-sm font-bold px-3 py-1 rounded-full ${
                isLost
                  ? "bg-red-200 text-lost-text"
                  : "bg-green-200 text-found-text"
              }`}
            >
              {listing.type}
            </span>
            <h1 className="text-xl font-bold text-gray-800 flex-1">
              {listing.name}
            </h1>
            {!isActive && (
              <span className="text-sm font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-700">
                💛 REUNITED
              </span>
            )}
            <span className="text-xs text-gray-400 hidden sm:block">
              Posted {posted}
            </span>
          </div>

          <div className="grid md:grid-cols-2">
            {/* Photo */}
            <div className="relative min-h-72 bg-gray-50 flex items-center justify-center">
              {listing.photoPath ? (
                <Image
                  src={listing.photoPath}
                  alt={listing.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <span className="text-9xl select-none">{emoji}</span>
              )}
            </div>

            {/* Details */}
            <div className="p-6 flex flex-col">
              <dl className="space-y-4 flex-1">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                    Pet Type
                  </dt>
                  <dd className="text-gray-800 mt-0.5">
                    {emoji} {listing.petType}
                    {listing.breed && ` — ${listing.breed}`}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                    {isLost ? "Last Seen" : "Found On"}
                  </dt>
                  <dd className="text-gray-800 mt-0.5">{date}</dd>
                </div>

                <div>
                  <dt className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                    Location
                  </dt>
                  <dd className="text-gray-800 mt-0.5">📍 {listing.location}</dd>
                </div>

                <div>
                  <dt className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                    Description
                  </dt>
                  <dd className="text-gray-700 mt-0.5 text-sm leading-relaxed">
                    {listing.description}
                  </dd>
                </div>
              </dl>

              {isActive && (
                <div className="mt-6">
                  <ReunitedButton listingId={listing.id} />
                </div>
              )}

              {!isActive && (
                <div className="mt-6 text-center py-4 bg-amber-50 rounded-lg border border-amber">
                  <p className="text-amber-700 font-semibold">
                    🎉 This pet has been reunited with their family!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact form — only for active listings */}
        {isActive && (
          <div className="mt-6 bg-white rounded-card border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-1">
              📬 Do You Have Information?
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              Fill out the form below and the poster will be notified.
            </p>
            <ContactForm listingId={listing.id} />
          </div>
        )}
      </div>
    </div>
  );
}
