"use client";
import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import LayoutV2 from "../layouts-v2/LayoutV2";
import PackagesHero from "../sections-v2/packagespage/packagesHero/PackagesHero";
import TourCardV2 from "../components-v2/TourCardV2";
import ButtonV2 from "../components-v2/ButtonV2";
import { useAppSelector } from "@/app/store/hooks";


const SORT_OPTIONS = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "duration-asc", label: "Duration: Shortest" },
  { value: "duration-desc", label: "Duration: Longest" },
];

const TOUR_TYPES = ["Relaxation", "Heritage", "Adventure Sports", "Wildlife", "Religious", "Culinary", "Beach", "Honeymoon", "Family"];
const TRAVEL_STYLES = ["Luxury", "Premium", "Budget", "Adventure", "Cultural Immersion", "Family", "Group Tour"];
const DURATIONS = ["1-3 Days", "4-5 Days", "6-7 Days", "8-10 Days", "10+ Days"];

function parseDays(dur: string): number {
  const m = dur?.match(/^(\d+)/);
  return m ? parseInt(m[1]) : 0;
}
function durationBucket(days: number): string {
  if (days <= 3) return "1-3 Days";
  if (days <= 5) return "4-5 Days";
  if (days <= 7) return "6-7 Days";
  if (days <= 10) return "8-10 Days";
  return "10+ Days";
}

function PackagesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { packages, loading: reduxLoading } = useAppSelector(state => state.packages);
  const loading = reduxLoading && packages.length === 0;

  // Filters from URL
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [destParam, setDestParam] = useState(searchParams.get("destination") || "");
  const [type, setType] = useState(decodeURIComponent(searchParams.get("type") || ""));
  const [style, setStyle] = useState(searchParams.get("style") || "");
  const [duration, setDuration] = useState(searchParams.get("duration") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "default");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...packages];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.title?.toLowerCase().includes(q) ||
        p.destination?.toLowerCase().includes(q) ||
        p.shortDescription?.toLowerCase().includes(q)
      );
    }

    if (destParam.trim()) {
      const d = destParam.toLowerCase();
      list = list.filter(p => 
        p.destinationSlug === d || 
        p.destination?.toLowerCase().includes(d)
      );
    }

    if (type) list = list.filter(p => p.tourType === type);
    if (style) list = list.filter(p => p.travelStyle === style);
    if (duration) list = list.filter(p => durationBucket(parseDays(p.tripDuration)) === duration);

    // Sort
    if (sort === "price-asc") list.sort((a, b) => Number(a.price?.amount) - Number(b.price?.amount));
    if (sort === "price-desc") list.sort((a, b) => Number(b.price?.amount) - Number(a.price?.amount));
    if (sort === "duration-asc") list.sort((a, b) => parseDays(a.tripDuration) - parseDays(b.tripDuration));
    if (sort === "duration-desc") list.sort((a, b) => parseDays(b.tripDuration) - parseDays(a.tripDuration));

    return list;
  }, [packages, search, destParam, type, style, duration, sort]);

  const activeFilters = [type, style, duration, destParam].filter(Boolean).length;

  const clearFilters = () => { setType(""); setStyle(""); setDuration(""); setSearch(""); setDestParam(""); setSort("default"); };

  return (
    <LayoutV2>
      <PackagesHero
        searchValue={search}
        onSearchChange={setSearch}
      />

      <section className="py-24 bg-[#f8f9fa]">
        <div className="container-v2">

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Filters */}
            <aside className="hidden lg:block w-[300px] shrink-0">
              <div className="sticky top-28 bg-white p-7 rounded-[2rem] border border-gray-100 shadow-[0_4px_20px_rgba(15,23,42,0.02)]">
                <div className="flex items-center justify-between mb-8 border-b border-gray-50 pb-4">
                  <h3 className="font-['Poppins'] font-extrabold text-[#1a3f4e] text-[1.05rem]">Filters</h3>
                  {activeFilters > 0 && (
                    <button 
                      onClick={clearFilters} 
                      className="text-[10px] text-[#ff6b00] font-black uppercase tracking-wider border-none bg-transparent cursor-pointer hover:text-[#ff9500] transition-colors duration-300"
                    >
                      Clear ({activeFilters})
                    </button>
                  )}
                </div>

                {/* Filter Groups */}
                {[
                  { label: 'Tour Type', options: TOUR_TYPES, state: type, setter: setType },
                  { label: 'Travel Style', options: TRAVEL_STYLES, state: style, setter: setStyle },
                  { label: 'Duration', options: DURATIONS, state: duration, setter: setDuration }
                ].map((group) => (
                  <div key={group.label} className="mb-8 last:mb-0">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3.5">{group.label}</h4>
                    <div className="flex flex-col gap-1.5 max-h-[220px] overflow-y-auto scrollbar-hide pr-1">
                      {group.options.map(opt => {
                        const isActive = group.state === opt;
                        return (
                          <button
                            key={opt}
                            onClick={() => group.setter(isActive ? "" : opt)}
                            className={`text-left text-xs px-4 py-3 rounded-xl border transition-all duration-300 font-bold ${
                              isActive 
                                ? 'border-[#4a90e2]/30 bg-[#e8f4fd]/50 text-[#4a90e2] shadow-sm' 
                                : 'border-transparent text-gray-500 bg-transparent hover:bg-gray-50 hover:text-[#1a3f4e]'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-8 flex-wrap gap-4 pb-4 border-b border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {loading ? "Loading packages..." : (
                    <>Found <span className="text-[#1a3f4e] font-black text-sm normal-case">{filtered.length}</span> adventures for you</>
                  )}
                </p>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sort by:</span>
                  <div className="relative group shrink-0">
                    <select
                      value={sort}
                      onChange={e => setSort(e.target.value)}
                      className="appearance-none bg-white border border-gray-200 px-6 py-3 rounded-2xl text-xs font-bold text-[#1a3f4e] shadow-sm hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4a90e2]/15 cursor-pointer pr-10 transition-all duration-300"
                    >
                      {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 transition-transform duration-300 group-hover:translate-y-[-30%]">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active filter pills */}
              {(type || style || duration || destParam) && (
                <div className="flex flex-wrap gap-2.5 mb-8">
                  {destParam && (
                    <span className="inline-flex items-center gap-2 bg-[#e8f4fd] text-[#4a90e2] text-[10px] font-bold px-4 py-2 rounded-full border border-sky-100">
                      Location: {destParam} 
                      <button onClick={() => setDestParam("")} className="hover:text-red-500 transition-colors font-bold ml-1">✕</button>
                    </span>
                  )}
                  {type && (
                    <span className="inline-flex items-center gap-2 bg-[#e8f4fd] text-[#4a90e2] text-[10px] font-bold px-4 py-2 rounded-full border border-sky-100">
                      {type} 
                      <button onClick={() => setType("")} className="hover:text-red-500 transition-colors font-bold ml-1">✕</button>
                    </span>
                  )}
                  {style && (
                    <span className="inline-flex items-center gap-2 bg-orange-50 text-[#ff6b00] text-[10px] font-bold px-4 py-2 rounded-full border border-orange-100">
                      {style} 
                      <button onClick={() => setStyle("")} className="hover:text-red-500 transition-colors font-bold ml-1">✕</button>
                    </span>
                  )}
                  {duration && (
                    <span className="inline-flex items-center gap-2 bg-slate-50 text-slate-550 text-[10px] font-bold px-4 py-2 rounded-full border border-slate-100">
                      {duration} 
                      <button onClick={() => setDuration("")} className="hover:text-red-500 transition-colors font-bold ml-1">✕</button>
                    </span>
                  )}
                </div>
              )}

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-[440px] bg-white border border-gray-100 rounded-[1.8rem] shadow-sm animate-pulse" />
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm max-w-3xl mx-auto px-6">
                  <div className="w-20 h-20 bg-[#e8f4fd] rounded-full flex items-center justify-center mx-auto mb-6 text-[#4a90e2]">
                    <span className="text-3xl">🏜️</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#1a3f4e] mb-3 font-['Poppins']">No Packages Found</h3>
                  <p className="text-gray-400 max-w-md mx-auto mb-8 text-sm leading-relaxed">
                    We don't have any travel listings matching your selected filters. Try widening your criteria or clearing some filters!
                  </p>
                  <button 
                    onClick={clearFilters}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#ff9500] to-[#ff6b00] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-300 shadow-[0_4px_12px_rgba(255,149,0,0.15)] hover:shadow-[0_6px_20px_rgba(255,149,0,0.3)] hover:-translate-y-0.5"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
                  {filtered.map((pkg, i) => (
                    <TourCardV2 key={pkg.id} pkg={pkg} index={i} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </LayoutV2>
  );
}

export default function PackagesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen hero-bg flex items-center justify-center"><div className="text-white text-xl">Loading packages…</div></div>}>
      <PackagesContent />
    </Suspense>
  );
}
