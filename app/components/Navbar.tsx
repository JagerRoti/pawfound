import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-2xl">🐾</span>
          <span className="text-xl font-bold text-gray-800">
            Paw<span className="text-amber">Found</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
          <Link
            href="/reunited"
            className="text-sm text-gray-600 hover:text-amber transition-colors font-medium"
          >
            💛 Reunited
          </Link>
          <Link
            href="/listings/new?type=LOST"
            className="bg-lost-btn text-white text-sm font-semibold px-3 sm:px-4 py-2 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Lost Pet
          </Link>
          <Link
            href="/listings/new?type=FOUND"
            className="bg-found-btn text-white text-sm font-semibold px-3 sm:px-4 py-2 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Found Pet
          </Link>
        </div>
      </div>
    </nav>
  );
}
