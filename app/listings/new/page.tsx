"use client";

import { useState, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Image from "next/image";
import Link from "next/link";

function NewListingForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const defaultType =
    searchParams.get("type") === "FOUND" ? "FOUND" : "LOST";

  const [type, setType] = useState<"LOST" | "FOUND">(defaultType);
  const [petType, setPetType] = useState("DOG");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: "",
    breed: "",
    description: "",
    location: "",
    dateSeen: new Date().toISOString().split("T")[0],
    contactEmail: "",
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Revoke previous object URL to avoid memory leak
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      let photoPath: string | null = null;

      if (photoFile) {
        const fd = new FormData();
        fd.append("photo", photoFile);
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: fd,
        });
        if (!uploadRes.ok) {
          const { error: uploadErr } = await uploadRes.json();
          throw new Error(uploadErr || "Photo upload failed");
        }
        const { photoPath: p } = await uploadRes.json();
        photoPath = p;
      }

      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, petType, photoPath, ...form }),
      });

      if (!res.ok) {
        const { error: apiErr } = await res.json();
        throw new Error(apiErr || "Failed to create listing");
      }

      const listing = await res.json();
      router.push(`/listings/${listing.id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  const inputClass =
    "mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-pawblue transition-colors bg-white";
  const labelClass = "block text-sm font-medium text-gray-700";

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="text-sm text-pawblue hover:underline mb-4 block"
      >
        ← Back to listings
      </Link>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">Post a Listing</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-card border border-gray-200 p-6 space-y-5 shadow-sm"
      >
        {/* Lost / Found */}
        <div>
          <label className={labelClass}>What happened?</label>
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={() => setType("LOST")}
              className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-colors ${
                type === "LOST"
                  ? "bg-lost-btn text-white shadow"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              😢 I Lost My Pet
            </button>
            <button
              type="button"
              onClick={() => setType("FOUND")}
              className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-colors ${
                type === "FOUND"
                  ? "bg-found-btn text-white shadow"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              🎉 I Found a Pet
            </button>
          </div>
        </div>

        {/* Pet type */}
        <div>
          <label className={labelClass}>Pet Type</label>
          <div className="flex gap-3 mt-2">
            {[
              { v: "DOG", l: "🐶 Dog" },
              { v: "CAT", l: "🐱 Cat" },
              { v: "OTHER", l: "🐰 Other" },
            ].map(({ v, l }) => (
              <button
                key={v}
                type="button"
                onClick={() => setPetType(v)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  petType === v
                    ? "bg-amber text-white shadow"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Photo upload */}
        <div>
          <label className={labelClass}>
            Photo{" "}
            <span className="text-gray-400 font-normal">(optional, max 5MB)</span>
          </label>
          <div
            className="mt-2 border-2 border-dashed border-gray-200 rounded-card p-4 cursor-pointer hover:border-amber transition-colors text-center"
            onClick={() => fileRef.current?.click()}
          >
            {photoPreview ? (
              <div className="relative h-48 w-full">
                <Image
                  src={photoPreview}
                  alt="Preview"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            ) : (
              <div className="py-6 text-gray-400">
                <span className="text-3xl block mb-2">📷</span>
                <span className="text-sm">Click to upload a photo</span>
                <p className="text-xs mt-1">JPG, PNG, GIF or WEBP</p>
              </div>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
        </div>

        {/* Pet name */}
        <div>
          <label className={labelClass}>
            Pet&apos;s Name{" "}
            {type === "FOUND" && (
              <span className="text-gray-400 font-normal">
                (write &ldquo;Unknown&rdquo; if unsure)
              </span>
            )}
          </label>
          <input
            type="text"
            required
            className={inputClass}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder={type === "FOUND" ? "Unknown" : "e.g. Buddy"}
          />
        </div>

        {/* Breed */}
        <div>
          <label className={labelClass}>
            Breed{" "}
            <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            className={inputClass}
            value={form.breed}
            onChange={(e) => setForm({ ...form, breed: e.target.value })}
            placeholder="e.g. Golden Retriever, Tabby, Mixed"
          />
        </div>

        {/* Description */}
        <div>
          <label className={labelClass}>Description</label>
          <textarea
            required
            rows={4}
            className={`${inputClass} resize-none`}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            placeholder="Colour, markings, personality, collar details, anything that helps identify them..."
          />
        </div>

        {/* Location */}
        <div>
          <label className={labelClass}>
            {type === "LOST" ? "Last Seen" : "Found At"} Location
          </label>
          <input
            type="text"
            required
            className={inputClass}
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="e.g. Central Park, New York"
          />
        </div>

        {/* Date */}
        <div>
          <label className={labelClass}>
            Date {type === "LOST" ? "Lost" : "Found"}
          </label>
          <input
            type="date"
            required
            className={inputClass}
            value={form.dateSeen}
            onChange={(e) =>
              setForm({ ...form, dateSeen: e.target.value })
            }
          />
        </div>

        {/* Contact email */}
        <div>
          <label className={labelClass}>Your Contact Email</label>
          <input
            type="email"
            required
            className={inputClass}
            value={form.contactEmail}
            onChange={(e) =>
              setForm({ ...form, contactEmail: e.target.value })
            }
            placeholder="you@example.com"
          />
          <p className="text-xs text-gray-400 mt-1">
            People will contact you through the site form — your email stays private.
          </p>
        </div>

        {error && (
          <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
            ⚠️ {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-pawblue text-white font-bold py-3.5 rounded-xl hover:opacity-90 disabled:opacity-60 transition-opacity text-base"
        >
          {submitting ? "Posting..." : "🐾 Post Listing"}
        </button>
      </form>
    </div>
  );
}

export default function NewListingPage() {
  return (
    <div className="min-h-screen bg-page">
      <Navbar />
      <Suspense
        fallback={
          <div className="text-center py-16 text-gray-400">Loading form...</div>
        }
      >
        <NewListingForm />
      </Suspense>
    </div>
  );
}
