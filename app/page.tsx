"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/app/components/Navbar";
import ListingCard from "@/app/components/ListingCard";
import FilterBar, { type Filters } from "@/app/components/FilterBar";
import Link from "next/link";

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

export default function HomePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    type: "ALL",
    petType: "ALL",
    search: "",
  });

  const fetchListings = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.type !== "ALL") params.set("type", filters.type);
    if (filters.petType !== "ALL") params.set("petType", filters.petType);
    if (filters.search.trim()) params.set("search", filters.search.trim());

    const res = await fetch(`/api/listings?${params.toString()}`);
    const data = await res.json();
    setListings(Array.isArray(data) ? data : []);
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  return (
    <div className="min-h-screen bg-page">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-br from-amber-light via-amber to-amber-dark py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow mb-3">
            🐾 Help Reunite Lost Pets
          </h1>
          <p className="text-white/90 text-lg mb-8">
            Post a listing to help bring pets and families back together.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/listings/new?type=LOST"
              className="bg-lost-btn text-white font-bold px-7 py-3.5 rounded-xl text-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              😢 I Lost My Pet
            </Link>
            <Link
              href="/listings/new?type=FOUND"
              className="bg-found-btn text-white font-bold px-7 py-3.5 rounded-xl text-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              🎉 I Found a Pet
            </Link>
          </div>
        </div>
      </div>

      {/* Listings section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <FilterBar filters={filters} onChange={setFilters} />

        {loading ? (
          <div className="text-center py-20 text-gray-400">
            <span className="text-4xl block mb-3 animate-pulse">🐾</span>
            Loading listings...
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-5xl block mb-4">🔍</span>
            <p className="text-gray-500 text-lg">No listings found.</p>
            <p className="text-gray-400 text-sm mt-1">
              Try adjusting your filters or be the first to post one!
            </p>
            <Link
              href="/listings/new?type=LOST"
              className="mt-4 inline-block text-pawblue hover:underline text-sm"
            >
              Post a listing →
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-400 mt-4 mb-4">
              {listings.length} listing{listings.length !== 1 ? "s" : ""} found
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {listings.map((listing: Listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-xs text-gray-400 border-t border-gray-200 mt-8">
        Made with 🐾 — PawFound helps reunite lost pets with their families.
      </footer>
    </div>
  );
}
