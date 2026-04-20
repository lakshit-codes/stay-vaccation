"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export interface Destination {
  _id?: string;
  name: string;
  slug: string;
  icon?: string;
  image?: string;
  price?: string | number;
  label?: string;
  type?: string;
  description?: string;
}

export default function TrendingDestinations({ destinations = [] }: { destinations?: Destination[] }) {
  const [activeTab, setActiveTab] = useState<"india" | "international">("india");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter based on the selected type, case insensitive check for robustness. 
  // If no destinations are returned, maybe default type data is missing.
  const filteredDestinations = destinations.filter(dest => {
    const destType = (dest.type || "").toLowerCase().trim();
    if (activeTab === "india") {
      return destType === "india";
    } else {
      return destType === "international";
    }
  });

  const handleTabChange = (tab: "india" | "international") => {
    setActiveTab(tab);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section className="section-pad bg-white border-b border-gray-50">
      <div className="container-sv">
        {/* Header & Toggle */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <div>
            <p className="text-[#2fa3f2] font-semibold text-sm uppercase tracking-widest mb-2 md:text-left text-center">Top Picks</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1a3f4e] text-center md:text-left">Trending Holiday Destinations</h2>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Toggle Buttons */}
            <div className="flex bg-gray-100 p-1 rounded-full shrink-0">
              <button
                onClick={() => handleTabChange("india")}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === "india" 
                    ? "bg-white text-[#1a3f4e] shadow-sm" 
                    : "text-gray-500 hover:text-[#1a3f4e]"
                }`}
              >
                India & Around
              </button>
              <button
                onClick={() => handleTabChange("international")}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === "international" 
                    ? "bg-white text-[#1a3f4e] shadow-sm" 
                    : "text-gray-500 hover:text-[#1a3f4e]"
                }`}
              >
                International
              </button>
            </div>

            {/* Navigation Arrows */}
            <div className="hidden md:flex gap-2">
              <button 
                onClick={scrollLeft} 
                className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-[#2fa3f2] hover:text-white hover:border-[#2fa3f2] transition-colors focus:outline-none"
                aria-label="Scroll left"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button 
                onClick={scrollRight} 
                className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-[#2fa3f2] hover:text-white hover:border-[#2fa3f2] transition-colors focus:outline-none"
                aria-label="Scroll right"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Cards */}
        <div className="relative group/scroll">
          {/* Fading edges for scroll indication */}
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none hidden md:block" />

          {/* scrollbar-width: none is available natively in many modern browsers, masking scrollbar but allowing scroll */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-6 pt-2 snap-x snap-mandatory scrollbar-hide md:-mx-4 md:px-4 [&::-webkit-scrollbar]:hidden" 
            style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
          >
            {filteredDestinations.length > 0 ? (
              filteredDestinations.map((dest, i) => (
                <Link
                  href={`/destinations/${dest.slug}`}
                  key={dest.slug || i}
                  className="snap-start shrink-0 w-[240px] h-[360px] group block bg-[#1a3f4e] rounded-[100px] overflow-hidden shadow-md hover:shadow-2xl hover:shadow-[#2fa3f2]/20 transition-all duration-500 hover:-translate-y-2 relative"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  {/* Image Area Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1a3f4e] via-[#2a5f74] to-[#1a7abf]">
                    {dest.image ? (
                      <Image 
                        src={dest.image} 
                        alt={dest.name || "Destination"}
                        fill
                        className="object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700 ease-out"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 opacity-20">
                          <svg className="w-full h-full" viewBox="0 0 400 200" fill="none">
                            <path d="M0 100 Q 100 0, 200 100 T 400 100" stroke="white" fill="none" strokeWidth="0.5" />
                            <circle cx="300" cy="50" r="120" stroke="white" strokeWidth="0.5" />
                            <circle cx="100" cy="180" r="80" stroke="white" strokeWidth="0.5" />
                          </svg>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center text-[90px] opacity-30 group-hover:scale-125 transition-transform duration-700 ease-out">
                          {dest.icon || "📍"}
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Always Visible Content Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 flex flex-col items-center justify-center p-6 text-center z-10">
                  <h3 className="text-white font-display font-bold text-3xl leading-tight mb-2 group-hover:-translate-y-8 transition-transform duration-500 ease-out">{dest.name}</h3>
                  <p className="text-white/80 font-medium text-sm group-hover:-translate-y-8 transition-transform duration-500 ease-out">{dest.label}</p>
                </div>

                {/* Hover Overlay at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-8 pt-12 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col items-center text-center opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-20">
                  <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">Starting at</p>
                  <p className="text-white font-bold text-2xl mb-4">₹ {dest.price}</p>
                  
                  {/* Arrow Button */}
                  <div className="w-12 h-12 bg-[#2fa3f2] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-white hover:text-[#2fa3f2] transition-colors duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
                
              </Link>
            ))
            ) : (
              <div className="flex-1 flex flex-col justify-center items-center py-20 text-gray-400">
                <svg className="w-12 h-12 mb-3 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <p>New destinations coming soon</p>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
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
