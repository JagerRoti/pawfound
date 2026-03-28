"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReunitedButton({ listingId }: { listingId: number }) {
  const [step, setStep] = useState<"idle" | "confirm" | "loading" | "error" | "unauthorized">("idle");
  const [ownerEmail, setOwnerEmail] = useState("");
  const router = useRouter();

  const handleConfirm = async () => {
    if (!ownerEmail.trim()) return;
    setStep("loading");
    try {
      const res = await fetch(`/api/listings/${listingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "REUNITED", ownerEmail: ownerEmail.trim() }),
      });
      if (res.status === 403) { setStep("unauthorized"); return; }
      if (!res.ok) throw new Error("Request failed");
      router.push("/reunited");
    } catch {
      setStep("error");
    }
  };

  if (step === "idle") {
    return (
      <button
        onClick={() => setStep("confirm")}
        className="w-full bg-amber text-white font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity text-sm"
      >
        💛 Mark as Reunited
      </button>
    );
  }

  if (step === "confirm") {
    return (
      <div className="rounded-lg border border-amber bg-amber-50 p-4 text-sm space-y-3">
        <p className="text-gray-700 font-medium">
          🎉 Great news! Enter the email you used to post this listing to confirm.
        </p>
        <input
          type="email"
          placeholder="your@email.com"
          value={ownerEmail}
          onChange={(e) => setOwnerEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber"
          autoFocus
        />
        <div className="flex gap-2">
          <button
            onClick={handleConfirm}
            disabled={!ownerEmail.trim()}
            className="flex-1 bg-amber text-white font-semibold py-2 rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            ✅ Confirm Reunion
          </button>
          <button
            onClick={() => { setStep("idle"); setOwnerEmail(""); }}
            className="flex-1 bg-white text-gray-600 border border-gray-200 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  if (step === "unauthorized") {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm space-y-3">
        <p className="text-red-700 font-medium">
          ❌ That email doesn&apos;t match this listing. Please try again.
        </p>
        <button
          onClick={() => { setStep("confirm"); setOwnerEmail(""); }}
          className="w-full bg-white text-gray-600 border border-gray-200 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          ← Try again
        </button>
      </div>
    );
  }

  if (step === "error") {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm space-y-3">
        <p className="text-red-700 font-medium">
          ⚠️ Something went wrong. Please try again.
        </p>
        <button
          onClick={() => setStep("idle")}
          className="w-full bg-white text-gray-600 border border-gray-200 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          ← Go back
        </button>
      </div>
    );
  }

  return (
    <div className="text-center py-2 text-amber font-medium text-sm">
      Updating... 🐾
    </div>
  );
}
