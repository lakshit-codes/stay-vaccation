"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface Destination {
  _id?: string;
  name?: string;
  title?: string;
  slug: string;
  image?: string;
  price?: string | number;
  category?: string;
  isTrending?: boolean;
  description?: string;
  packageCount?: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function normalize(item: any): Destination {
  return {
    ...item,
    title:        item.name || item.title || "Unknown Destination",
    slug:         item.slug,
    image:        item.image || null,           // null → no image, no hardcoded URL
    category:     item.category || "International",
    packageCount: item.packageCount ?? 0,
    price:        item.price ?? null,
  };
}


// ─── Image card ───────────────────────────────────────────────────────────────
function DestinationCardImage({ src, alt }: { src?: string | null; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    // Elegant placeholder gradient when no image in DB
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a3f4e] via-[#2a5f74] to-[#1a7abf]" />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="240px"
      className="object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700 ease-out"
      onError={() => setFailed(true)}
    />
  );
}

// ─── Skeleton loader ──────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="snap-start shrink-0 w-[240px] h-[360px] rounded-[100px] bg-gradient-to-b from-gray-200 to-gray-100 animate-pulse" />
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState({ tab }: { tab: string }) {
  return (
    <div className="flex-1 flex flex-col justify-center items-center py-20 min-h-[360px] w-full">
      <div className="w-20 h-20 rounded-full bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center mb-6">
        <svg className="w-9 h-9 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <h4 className="text-[#1a3f4e] font-bold text-xl mb-2">No Destinations Available</h4>
      <p className="text-gray-400 text-sm max-w-xs text-center leading-relaxed">
        No <span className="font-semibold text-gray-500">{tab}</span> destinations are
        marked as trending yet. Check the admin panel to add some.
      </p>
      <Link
        href="/destinations"
        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#2fa3f2] border border-[#2fa3f2]/40 rounded-full hover:bg-[#2fa3f2] hover:text-white transition-all duration-200"
      >
        Browse all destinations
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </div>
  );
}

// ─── Destination card ─────────────────────────────────────────────────────────
function DestinationCard({ dest, index }: { dest: Destination; index: number }) {
  const hasPrice = dest.price && dest.price !== "TBA" && Number(dest.price) > 0;

  return (
    <Link
      href={`/destinations/${dest.slug}`}
      className="snap-start shrink-0 w-[240px] h-[360px] group block bg-[#1a3f4e] rounded-[100px] overflow-hidden shadow-md hover:shadow-2xl hover:shadow-[#2fa3f2]/20 transition-all duration-500 hover:-translate-y-2 relative"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Background image (or gradient if none) */}
      <div className="absolute inset-0">
        <DestinationCardImage src={dest.image} alt={dest.title || "Destination"} />
      </div>

      {/* Always-visible name + package count */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 flex flex-col items-center justify-center p-6 text-center z-10">
        <h3 className="text-white font-display font-bold text-3xl leading-tight mb-3 group-hover:-translate-y-8 transition-transform duration-500 ease-out">
          {dest.title}
        </h3>
        <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white/90 text-xs font-semibold px-3 py-1 rounded-full group-hover:-translate-y-8 transition-transform duration-500 ease-out">
          {dest.packageCount} {dest.packageCount === 1 ? "Package" : "Packages"}
        </span>
      </div>

      {/* Hover overlay — price (if available from DB) or package count */}
      <div className="absolute bottom-0 left-0 right-0 p-8 pt-12 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col items-center text-center opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-20">
        {hasPrice ? (
          <>
            <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">Starting at</p>
            <p className="text-white font-bold text-2xl mb-4">
              ₹ {Number(dest.price).toLocaleString("en-IN")}
            </p>
          </>
        ) : (
          <p className="text-white/70 text-sm font-semibold mb-6">
            {dest.packageCount} {dest.packageCount === 1 ? "package" : "packages"} available
          </p>
        )}

        <div className="w-12 h-12 bg-[#2fa3f2] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-white hover:text-[#2fa3f2] transition-colors duration-300">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

import { useAppSelector } from "@/app/store/hooks";

// ─── Main component ───────────────────────────────────────────────────────────
export default function TrendingDestinations() {
  const [activeTab, setActiveTab] = useState<"India" | "International">("India");
  const { trendingIndia, trendingInternational, loading: reduxLoading, error: reduxError } = useAppSelector(state => state.destinations);
  
  const loading = reduxLoading && trendingIndia.length === 0 && trendingInternational.length === 0;
  const error = !!reduxError;
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (tab: "India" | "International") => {
    setActiveTab(tab);
    scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  const displayedItems = activeTab === "India" ? trendingIndia : trendingInternational;

  return (
    <section className="section-pad bg-white border-b border-gray-50">
      <div className="container-sv">

        {/* ── Header & Toggle ──────────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <div>
            <p className="text-[#2fa3f2] font-semibold text-sm uppercase tracking-widest mb-2 md:text-left text-center">
              Top Picks
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1a3f4e] text-center md:text-left">
              Trending Holiday Destinations
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* India / International toggle */}
            <div className="flex bg-gray-100 p-1 rounded-full shrink-0">
              {(["India", "International"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-white text-[#1a3f4e] shadow-sm"
                      : "text-gray-500 hover:text-[#1a3f4e]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Navigation arrows — only shown when there are cards */}
            {!loading && displayedItems.length > 0 && (
              <div className="hidden md:flex gap-2">
                <button
                  onClick={() => scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" })}
                  className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-[#2fa3f2] hover:text-white hover:border-[#2fa3f2] transition-colors focus:outline-none"
                  aria-label="Scroll left"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" })}
                  className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-[#2fa3f2] hover:text-white hover:border-[#2fa3f2] transition-colors focus:outline-none"
                  aria-label="Scroll right"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Card area ─────────────────────────────────────────── */}
        {error ? (
          /* Network / server error */
          <div className="flex flex-col items-center justify-center py-16 min-h-[360px]">
            <div className="w-16 h-16 rounded-full bg-red-50 border-2 border-dashed border-red-200 flex items-center justify-center mb-5">
              <svg className="w-7 h-7 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-gray-700 font-bold text-lg mb-1">Could not load destinations</h4>
            <p className="text-gray-400 text-sm">Please check your connection or try again later.</p>
          </div>
        ) : (
          <div className="relative group/scroll">
            {/* Fade edge */}
            {!loading && displayedItems.length > 0 && (
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none hidden md:block" />
            )}

            <div
              ref={scrollRef}
              className="flex overflow-x-auto gap-6 pb-6 pt-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
              style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
            >
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
              ) : displayedItems.length > 0 ? (
                displayedItems.map((dest, i) => (
                  <DestinationCard key={dest._id || dest.slug || i} dest={dest} index={i} />
                ))
              ) : (
                <EmptyState tab={activeTab} />
              )}
            </div>
          </div>
        )}

        {/* ── CTA ───────────────────────────────────────────────── */}
        <div className="text-center mt-12 mb-4">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-[#1a3f4e] text-[#1a3f4e] font-bold rounded-full hover:bg-[#1a3f4e] hover:text-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            Explore Now
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
