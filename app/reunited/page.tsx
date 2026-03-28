import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import prisma from "@/lib/prisma";

const PET_EMOJI: Record<string, string> = {
  DOG: "🐶",
  CAT: "🐱",
  OTHER: "🐰",
};

export default async function ReunitedPage() {
  const listings = await prisma.listing.findMany({
    where: { status: "REUNITED" },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-page">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            💛 Happy Reunions
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            These pets made it back home. Every one of them. 🏠
          </p>
        </div>

        {listings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-card border border-gray-200 shadow-sm">
            <span className="text-6xl block mb-4">🐾</span>
            <p className="text-gray-600 font-medium text-lg">
              No reunions yet — but there will be soon!
            </p>
            <p className="text-gray-400 text-sm mt-2 mb-6">
              Help a pet find their way home.
            </p>
            <Link
              href="/"
              className="inline-block bg-pawblue text-white font-semibold px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
            >
              View Active Listings →
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-400 mb-6 text-center">
              {listings.length} happy reunion
              {listings.length !== 1 ? "s" : ""} and counting 🎉
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => {
                const emoji = PET_EMOJI[listing.petType] ?? "🐾";
                const date = listing.updatedAt.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });

                return (
                  <div
                    key={listing.id}
                    className="bg-white rounded-card border-2 border-amber overflow-hidden shadow-sm"
                  >
                    <div className="relative h-52 bg-amber-50 flex items-center justify-center">
                      {listing.photoPath ? (
                        <Image
                          src={listing.photoPath}
                          alt={listing.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 33vw"
                        />
                      ) : (
                        <span className="text-7xl select-none">{emoji}</span>
                      )}
                      <span className="absolute top-3 right-3 bg-amber text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                        💛 REUNITED
                      </span>
                    </div>

                    <div className="p-5">
                      <h3 className="font-bold text-gray-800 text-lg">
                        {listing.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {listing.breed ?? listing.petType}
                      </p>
                      <p className="text-xs text-gray-400 mt-3 flex items-center gap-1">
                        <span>📍</span>
                        <span>{listing.location}</span>
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Reunited on {date}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/"
                className="text-pawblue hover:underline text-sm font-medium"
              >
                ← View active listings
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
