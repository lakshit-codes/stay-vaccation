"use client";
import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import LayoutV2 from "../layouts-v2/LayoutV2";
import PageHeroV2 from "../components-v2/PageHeroV2";
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
      <PageHeroV2 
        title="All Packages" 
        subtitle="Browse our complete collection of handcrafted travel experiences across the globe."
        badge="Curated for you"
        image="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1800&auto=format&fit=crop&q=80"
      />

      <section style={{ padding: '4rem 0', background: 'var(--white)' }}>
        <div className="container-v2">
          {/* Search bar inside the page */}
          <div style={{ maxWidth: '600px', margin: '-6rem auto 4rem', position: 'relative', zIndex: 10 }}>
            <div className="hero-search-v2" style={{ position: 'relative', width: '100%', bottom: 'auto', left: 'auto', transform: 'none', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(15px)', padding: '1rem', borderRadius: '1.5rem', boxShadow: 'var(--shadow2)', display: 'flex', gap: '0.5rem' }}>
              <div className="hs-field" style={{ flex: 1 }}>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search destinations, packages…"
                  className="hs-input"
                  style={{ width: '100%', border: 'none', background: 'transparent' }}
                />
              </div>
              <button className="hs-btn" style={{ borderRadius: '1rem', padding: '0 1.5rem' }}>Search</button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '3rem', flexDirection: 'row', flexWrap: 'wrap' }}>
            {/* Sidebar Filters */}
            <aside style={{ flex: '0 0 280px' }} className="hidden lg:block">
              <div style={{ position: 'sticky', top: '100px', background: 'var(--cream)', padding: '2rem', borderRadius: '1.5rem', border: '1.5px solid #e5e7eb' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                  <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1rem' }}>Filters</h3>
                  {activeFilters > 0 && (
                    <button onClick={clearFilters} style={{ fontSize: '0.75rem', color: 'var(--orange)', fontWeight: 700, border: 'none', background: 'transparent', cursor: 'pointer' }}>
                      Clear All ({activeFilters})
                    </button>
                  )}
                </div>

                {/* Filter Groups */}
                {[
                  { label: 'Tour Type', options: TOUR_TYPES, state: type, setter: setType },
                  { label: 'Travel Style', options: TRAVEL_STYLES, state: style, setter: setStyle },
                  { label: 'Duration', options: DURATIONS, state: duration, setter: setDuration }
                ].map((group) => (
                  <div key={group.label} style={{ marginBottom: '2rem' }}>
                    <h4 style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>{group.label}</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {group.options.map(opt => (
                        <button
                          key={opt}
                          onClick={() => group.setter(group.state === opt ? "" : opt)}
                          style={{
                            textAlign: 'left',
                            fontSize: '0.85rem',
                            padding: '0.6rem 1rem',
                            borderRadius: '0.75rem',
                            border: '1px solid',
                            borderColor: group.state === opt ? 'var(--sky)' : 'transparent',
                            background: group.state === opt ? 'var(--white)' : 'transparent',
                            color: group.state === opt ? 'var(--sky)' : 'var(--text)',
                            fontWeight: group.state === opt ? 700 : 500,
                            transition: 'all 0.3s',
                            cursor: 'pointer'
                          }}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            {/* Main Content Area */}
            <div style={{ flex: 1, minWidth: '300px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
                  {loading ? "Loading packages..." : (
                    <>Found <span style={{ color: 'var(--text)', fontWeight: 800 }}>{filtered.length}</span> adventures for you</>
                  )}
                </p>

                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--muted)' }}>Sort by:</span>
                  <select
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                    style={{ padding: '0.6rem 1.2rem', borderRadius: '1rem', border: '1.5px solid #e5e7eb', background: 'var(--white)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)', cursor: 'pointer' }}
                  >
                    {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              </div>

              {/* Active filter pills */}
              {(type || style || duration || destParam) && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2rem' }}>
                  {destParam && <span className="dest-tag" style={{ background: 'var(--sky)', color: '#fff' }}>Location: {destParam} <button onClick={() => setDestParam("")} style={{ background: 'transparent', border: 'none', color: '#fff', marginLeft: '0.4rem', cursor: 'pointer' }}>✕</button></span>}
                  {type && <span className="dest-tag" style={{ background: 'var(--sky)', color: '#fff' }}>{type} <button onClick={() => setType("")} style={{ background: 'transparent', border: 'none', color: '#fff', marginLeft: '0.4rem', cursor: 'pointer' }}>✕</button></span>}
                  {style && <span className="dest-tag" style={{ background: 'var(--orange)', color: '#fff' }}>{style} <button onClick={() => setStyle("")} style={{ background: 'transparent', border: 'none', color: '#fff', marginLeft: '0.4rem', cursor: 'pointer' }}>✕</button></span>}
                  {duration && <span className="dest-tag" style={{ background: 'var(--sky-dk)', color: '#fff' }}>{duration} <button onClick={() => setDuration("")} style={{ background: 'transparent', border: 'none', color: '#fff', marginLeft: '0.4rem', cursor: 'pointer' }}>✕</button></span>}
                </div>
              )}

              {loading ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} style={{ height: '380px', background: 'var(--cream)', borderRadius: '1.5rem', animation: 'pulse 2s infinite' }} />
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '5rem 0', background: 'var(--cream)', borderRadius: '2rem', border: '2px dashed #e5e7eb' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏜️</div>
                  <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.4rem', marginBottom: '1rem' }}>No packages found</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Try adjusting your filters to find your perfect trip.</p>
                  <ButtonV2 onClick={clearFilters} variant="orange">Clear All Filters</ButtonV2>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
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
