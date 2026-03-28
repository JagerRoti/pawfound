import Link from "next/link";
import Image from "next/image";

type Listing = {
  id: number;
  type: string;
  petType: string;
  name: string;
  breed: string | null;
  description: string;
  location: string;
  dateSeen: string;
  photoPath: string | null;
  status: string;
};

const PET_EMOJI: Record<string, string> = {
  DOG: "🐶",
  CAT: "🐱",
  OTHER: "🐰",
};

export default function ListingCard({ listing }: { listing: Listing }) {
  const isLost = listing.type === "LOST";
  const emoji = PET_EMOJI[listing.petType] ?? "🐾";
  const date = new Date(listing.dateSeen).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link href={`/listings/${listing.id}`} className="block group">
      <div className="bg-white rounded-card border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
        {/* Photo / emoji placeholder */}
        <div className="relative h-44 bg-gray-50 flex items-center justify-center">
          {listing.photoPath ? (
            <Image
              src={listing.photoPath}
              alt={listing.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <span className="text-6xl select-none">{emoji}</span>
          )}
          {/* Badge */}
          <span
            className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${
              isLost
                ? "bg-lost-bg text-lost-text"
                : "bg-found-bg text-found-text"
            }`}
          >
            {listing.type}
          </span>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-gray-800 group-hover:text-pawblue transition-colors truncate">
              {listing.name}
            </h3>
            <span className="text-xs text-gray-400 shrink-0">{date}</span>
          </div>

          {listing.breed && (
            <p className="text-xs text-gray-500 mt-0.5">{listing.breed}</p>
          )}

          <p className="text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
            {listing.description}
          </p>

          <div className="mt-3 flex items-center gap-1 text-xs text-gray-400">
            <span>📍</span>
            <span className="truncate">{listing.location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
