"use client";

import React, { useState, useMemo } from "react";
import { Ic, Badge } from "@/app/components/AdminCore";

// ─── Types ────────────────────────────────────────────────────────────────────
type Category = "India" | "International";

interface RowState {
  isTrending: boolean;
  category: Category;
}

// ─── Main page ────────────────────────────────────────────────────────────────
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { updateDestination, fetchDestinations } from "@/app/store/features/destinations/destinationThunks";
import { Destination } from "@/app/components/AdminCore";

export default function TrendingDestinationsAdminPage() {
  const dispatch = useAppDispatch();
  const { destinations } = useAppSelector(state => state.destinations);

  const [search,    setSearch]    = useState("");
  const [filterTab, setFilterTab] = useState<"All" | "Trending" | "India" | "International">("All");

  const [edits,   setEdits]   = useState<Record<string, RowState>>({});
  const [saving,  setSaving]  = useState<Record<string, boolean>>({});
  const [saved,   setSaved]   = useState<Record<string, boolean>>({});
  const [errors,  setErrors]  = useState<Record<string, string>>({});

  const rows = useMemo(() =>
    destinations.map((d) => ({
      _id:          d._id ?? "",
      name:         d.name || "Unnamed",
      slug:         d.slug,
      image:        d.image,
      packageCount: d.packageCount ?? 0,
      isActive:     (d as any).isActive,
      isTrending: d.isTrending ?? false,
      category:   (d.category === "International" ? "International" : "India") as Category,
    })),
  [destinations]);

  const get = (id: string, field: keyof RowState, committed: any) =>
    edits[id]?.[field] !== undefined ? edits[id][field] : committed;

  const isDirty = (id: string) => !!edits[id];

  const setField = (id: string, field: keyof RowState, value: any) => {
    setSaved((p) => { const n = { ...p }; delete n[id]; return n; });
    setErrors((p) => { const n = { ...p }; delete n[id]; return n; });
    setEdits((p) => ({
      ...p,
      [id]: {
        isTrending: get(id, "isTrending", rows.find((r) => r._id === id)?.isTrending),
        category:   get(id, "category",   rows.find((r) => r._id === id)?.category),
        ...p[id],
        [field]: value,
      },
    }));
  };

  const handleSave = async (id: string) => {
    const row = rows.find((r) => r._id === id);
    if (!row) return;
    const patch: RowState = {
      isTrending: get(id, "isTrending", row.isTrending) as boolean,
      category:   get(id, "category",   row.category)   as Category,
    };

    setSaving((p) => ({ ...p, [id]: true }));
    setErrors((p) => { const n = { ...p }; delete n[id]; return n; });

    try {
      const dest = destinations.find(d => d._id === id);
      if (!dest) throw new Error("Destination not found");

      const resultAction = await dispatch(updateDestination({ ...dest, ...patch } as Destination));
      
      if (updateDestination.fulfilled.match(resultAction)) {
        setEdits((p) => { const n = { ...p }; delete n[id]; return n; });
        setSaved((p) => ({ ...p, [id]: true }));
        setTimeout(() => setSaved((p) => { const n = { ...p }; delete n[id]; return n; }), 2500);
      } else {
        setErrors((p) => ({ ...p, [id]: resultAction.error?.message || "Save failed" }));
      }
    } catch (err: any) {
      setErrors((p) => ({ ...p, [id]: err?.message || "Save failed" }));
    } finally {
      setSaving((p) => { const n = { ...p }; delete n[id]; return n; });
    }
  };

  // ── Discard local edits for a row ──────────────────────────────────────────
  const handleDiscard = (id: string) => {
    setEdits((p)  => { const n = { ...p }; delete n[id]; return n; });
    setErrors((p) => { const n = { ...p }; delete n[id]; return n; });
  };

  // ── Stats ──────────────────────────────────────────────────────────────────
  const totalTrending = rows.filter((r) => r.isTrending).length;
  const indiaCount    = rows.filter((r) => r.isTrending && r.category === "India").length;
  const intlCount     = rows.filter((r) => r.isTrending && r.category === "International").length;

  // ── Filtered view ─────────────────────────────────────────────────────────
  const filtered = rows.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch = r.name.toLowerCase().includes(q) || r.slug.toLowerCase().includes(q);
    const effectiveTrending = get(r._id, "isTrending", r.isTrending) as boolean;
    const effectiveCategory = get(r._id, "category",   r.category)   as Category;
    const matchTab =
      filterTab === "All"           ? true :
      filterTab === "Trending"      ? effectiveTrending :
      filterTab === "India"         ? effectiveCategory === "India" :
      filterTab === "International" ? effectiveCategory === "International" : true;
    return matchSearch && matchTab;
  });

  return (
    <div className="space-y-6">

      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">🔥</span>
            <h2 className="text-2xl font-bold text-gray-900">Trending Destinations</h2>
          </div>
          <p className="text-gray-400 text-sm">
            Toggle trending and set category per destination, then hit <strong>Save</strong>.
          </p>
        </div>
        <button
          onClick={() => dispatch(fetchDestinations())}
          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white rounded-xl border border-transparent hover:border-gray-100 transition-all shadow-sm"
          title="Refresh"
        >
          <Ic.Sync />
        </button>
      </div>

      {/* ── Stats ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "🔥 Total Trending", value: totalTrending, bg: "bg-amber-50  border-amber-100  text-amber-800"  },
          { label: "🇮🇳 India",          value: indiaCount,    bg: "bg-orange-50 border-orange-100 text-orange-800" },
          { label: "🌍 International",   value: intlCount,     bg: "bg-blue-50   border-blue-100   text-blue-800"   },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl border px-5 py-4 ${s.bg}`}>
            <p className="text-3xl font-bold">{s.value}</p>
            <p className="text-sm font-semibold mt-0.5 opacity-70">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── Filters ────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Ic.Search />
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search destinations…"
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
          />
        </div>

        <div className="flex bg-gray-100 p-1 rounded-full">
          {(["All", "Trending", "India", "International"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filterTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab === "Trending" ? "🔥 Trending" : tab}
            </button>
          ))}
        </div>

        <p className="text-xs text-gray-400 ml-auto">{filtered.length} / {rows.length}</p>
      </div>

      {/* ── Table ──────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Column headers */}
        <div className="grid items-center gap-4 px-5 py-3 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider"
          style={{ gridTemplateColumns: "44px 1fr 170px 220px 130px" }}>
          <span />
          <span>Destination</span>
          <span>Category</span>
          <span>Trending</span>
          <span className="text-right">Actions</span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🗺️</p>
            <p className="text-gray-500 font-medium">No destinations match your filter</p>
            <button onClick={() => { setSearch(""); setFilterTab("All"); }}
              className="mt-3 text-sm text-blue-500 hover:underline">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filtered.map((row) => {
              const isSaving      = !!saving[row._id];
              const isSaved       = !!saved[row._id];
              const hasError      = !!errors[row._id];
              const dirty         = isDirty(row._id);
              const effTrending   = get(row._id, "isTrending", row.isTrending) as boolean;
              const effCategory   = get(row._id, "category",   row.category)   as Category;

              return (
                <div
                  key={row._id}
                  className={`grid items-center gap-4 px-5 py-3.5 transition-colors ${
                    dirty     ? "bg-blue-50/40"  :
                    isSaved   ? "bg-emerald-50/40" :
                    hasError  ? "bg-red-50/30"   :
                    "hover:bg-gray-50/60"
                  }`}
                  style={{ gridTemplateColumns: "44px 1fr 170px 220px 130px" }}
                >
                  {/* Thumbnail */}
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    {row.image ? (
                      <img src={row.image} alt={row.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-100 to-blue-100 flex items-center justify-center text-base">
                        📍
                      </div>
                    )}
                  </div>

                  {/* Name + slug */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <p className="font-semibold text-gray-900 text-sm truncate">{row.name}</p>
                      {effTrending && <span className="text-amber-500 text-xs leading-none">🔥</span>}
                      {dirty      && <Badge className="bg-blue-100 text-blue-600 border-0 text-[10px] py-0">unsaved</Badge>}
                      {row.isActive === false && <Badge className="bg-gray-100 text-gray-400 border-0 text-[10px] py-0">inactive</Badge>}
                    </div>
                    <p className="text-xs text-gray-400 font-mono truncate mt-0.5">{row.slug}</p>
                    {hasError && (
                      <p className="text-xs text-red-500 mt-0.5">{errors[row._id]}</p>
                    )}
                  </div>

                  {/* Category dropdown */}
                  <select
                    value={effCategory}
                    disabled={isSaving}
                    onChange={(e) => setField(row._id, "category", e.target.value as Category)}
                    className={`w-full text-xs font-semibold border rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 transition-all cursor-pointer appearance-none ${
                      effCategory === "India"
                        ? "border-orange-200 bg-orange-50 text-orange-700 focus:ring-orange-200"
                        : "border-blue-200 bg-blue-50 text-blue-700 focus:ring-blue-200"
                    }`}
                  >
                    <option value="India">🇮🇳 India</option>
                    <option value="International">🌍 International</option>
                  </select>

                  {/* Trending toggle */}
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <div
                      role="switch"
                      aria-checked={effTrending}
                      onClick={() => !isSaving && setField(row._id, "isTrending", !effTrending)}
                      className={`relative w-11 h-6 rounded-full transition-colors duration-300 flex-shrink-0 ${
                        effTrending ? "bg-amber-500" : "bg-gray-200"
                      } ${isSaving ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${
                        effTrending ? "left-6" : "left-1"
                      }`} />
                    </div>
                    <span className={`text-xs font-semibold min-w-[80px] ${
                      effTrending ? "text-amber-600" : "text-gray-400"
                    }`}>
                      {effTrending ? "🔥 Trending" : "Not trending"}
                    </span>
                  </label>

                  {/* Action buttons */}
                  <div className="flex items-center justify-end gap-2">
                    {isSaving ? (
                      <div className="flex items-center gap-1.5 text-blue-500 text-xs font-semibold pr-1">
                        <div className="animate-spin"><Ic.Sync /></div>
                        Saving…
                      </div>
                    ) : isSaved ? (
                      <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-semibold pr-1">
                        <Ic.Check /> Saved!
                      </div>
                    ) : (
                      <>
                        {dirty && (
                          <button
                            onClick={() => handleDiscard(row._id)}
                            className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-all"
                            title="Discard changes"
                          >
                            Cancel
                          </button>
                        )}
                        <button
                          onClick={() => handleSave(row._id)}
                          disabled={!dirty}
                          className={`text-xs font-bold px-4 py-1.5 rounded-xl transition-all ${
                            dirty
                              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md"
                              : "bg-gray-100 text-gray-300 cursor-not-allowed"
                          }`}
                        >
                          Save
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <p className="text-xs text-gray-400 text-center pb-2">
        Changes apply to the homepage trending section immediately after saving.
      </p>
    </div>
  );
}
