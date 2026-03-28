"use client";

export type Filters = {
  type: string;    // "ALL" | "LOST" | "FOUND"
  petType: string; // "ALL" | "DOG" | "CAT" | "OTHER"
  search: string;
};

type FilterBarProps = {
  filters: Filters;
  onChange: (filters: Filters) => void;
};

const PET_OPTIONS = [
  { value: "ALL", label: "All Pets" },
  { value: "DOG", label: "🐶 Dogs" },
  { value: "CAT", label: "🐱 Cats" },
  { value: "OTHER", label: "🐰 Other" },
];

export default function FilterBar({ filters, onChange }: FilterBarProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-card p-4 flex flex-col sm:flex-row gap-3 items-center flex-wrap">
      {/* Lost / Found / All toggle */}
      <div className="flex rounded-lg border border-gray-200 overflow-hidden shrink-0">
        {(["ALL", "LOST", "FOUND"] as const).map((t) => (
          <button
            key={t}
            onClick={() => onChange({ ...filters, type: t })}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              filters.type === t
                ? t === "LOST"
                  ? "bg-lost-btn text-white"
                  : t === "FOUND"
                  ? "bg-found-btn text-white"
                  : "bg-amber text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {t === "ALL" ? "All" : t === "LOST" ? "😢 Lost" : "🎉 Found"}
          </button>
        ))}
      </div>

      {/* Pet type pills */}
      <div className="flex gap-2 flex-wrap">
        {PET_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onChange({ ...filters, petType: value })}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              filters.petType === value
                ? "bg-amber text-white font-semibold"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Location search */}
      <div className="flex-1 min-w-48 w-full sm:w-auto">
        <input
          type="text"
          placeholder="🔍 Search by location..."
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-pawblue transition-colors"
        />
      </div>
    </div>
  );
}
