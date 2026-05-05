"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "../../components/frontend/Navbar";
import Footer from "../../components/frontend/Footer";
import Link from "next/link";
import { useAppSelector } from "@/app/store/hooks";
import { useCurrency } from "@/app/hooks/useCurrency";

const DAY_COLORS: Record<string, string> = {
  arrival: "border-l-emerald-500 bg-emerald-50",
  sightseeing: "border-l-blue-500 bg-blue-50",
  transfer: "border-l-orange-500 bg-orange-50",
  leisure: "border-l-violet-500 bg-violet-50",
  departure: "border-l-slate-400 bg-slate-50",
};
const DAY_TYPE_BADGE: Record<string, string> = {
  arrival: "bg-emerald-100 text-emerald-700",
  sightseeing: "bg-blue-100 text-blue-700",
  transfer: "bg-orange-100 text-orange-700",
  leisure: "bg-violet-100 text-violet-700",
  departure: "bg-slate-100 text-slate-600",
};

function fmt12(t: string) {
  if (!t) return "—";
  const [h, m] = t.split(":").map(Number);
  return `${(h % 12) || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

import { useParams } from "next/navigation";
import Image from "next/image";
import LucideIcon from "../../components/LucideIcon";

const TABS = ["Overview", "Itinerary", "Activities", "Hotels", "Transfers", "Policies", "Reviews"];


const HeroSlider = ({ images, title }: { images: string[]; title: string }) => {
  const [idx, setIdx] = useState(0);
  const next = () => setIdx(p => (p + 1) % images.length);
  const prev = () => setIdx(p => (p - 1 + images.length) % images.length);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <div className="relative w-full aspect-[4/3] lg:aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl group">
      {images.map((img, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === idx ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
          <Image src={img} alt={`${title} ${i}`} fill className="object-cover" priority={i === 0} sizes="(max-w-lg) 100vw, 500px" />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-20 pointer-events-none" />
      
      {/* Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {images.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-[#2fa3f2]" : "w-2 bg-white/40 hover:bg-white/60"}`} />
        ))}
      </div>

      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-30 hover:bg-[#2fa3f2]">
        <LucideIcon name="ChevronLeft" size={20} />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-30 hover:bg-[#2fa3f2]">
        <LucideIcon name="ChevronRight" size={20} />
      </button>
    </div>
  );
};

const Lightbox = ({ images, initialIdx, onClose }: { images: string[]; initialIdx: number; onClose: () => void }) => {
  const [idx, setIdx] = useState(initialIdx);
  const next = (e?: React.MouseEvent) => { e?.stopPropagation(); setIdx((p) => (p + 1) % images.length); };
  const prev = (e?: React.MouseEvent) => { e?.stopPropagation(); setIdx((p) => (p - 1 + images.length) % images.length); };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length, onClose]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 lg:p-10" onClick={onClose}>
      <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white z-[110] transition-colors">
        <LucideIcon name="X" size={32} />
      </button>

      <div className="relative w-full h-full max-w-6xl mx-auto flex items-center justify-center" onClick={e => e.stopPropagation()}>
        <Image 
          src={images[idx]} 
          alt={`Gallery Image ${idx + 1}`} 
          fill 
          className="object-contain"
          sizes="100vw"
        />
      </div>

      {images.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-4 lg:left-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all z-[110]">
            <LucideIcon name="ChevronLeft" size={24} />
          </button>
          <button onClick={next} className="absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all z-[110]">
            <LucideIcon name="ChevronRight" size={24} />
          </button>
        </>
      )}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium tracking-widest z-[110]">
        {idx + 1} / {images.length}
      </div>
    </div>
  );
};

const ImageGallery = ({ images, title }: { images: string[]; title: string }) => {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  
  if (!images?.length) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img, i) => (
          <div 
            key={i} 
            onClick={() => setLightboxIdx(i)}
            className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-sm group cursor-pointer border border-gray-100"
          >
            <Image 
              src={img} 
              alt={`${title} - Gallery ${i + 1}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-w-md) 50vw, 300px"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full text-[#1a3f4e] shadow-lg">
                <LucideIcon name="Maximize2" size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {lightboxIdx !== null && (
        <Lightbox images={images} initialIdx={lightboxIdx} onClose={() => setLightboxIdx(null)} />
      )}
    </div>
  );
};

export default function SinglePackagePage() {
  const params = useParams();
  const matchedId = params?.id as string;

  const { packages, loading: reduxLoading } = useAppSelector(state => state.packages);
  const pkg = packages.find(p => p.id === matchedId || p._id === matchedId);
  const loading = reduxLoading && !pkg;
  
  const { formatPrice } = useCurrency();

  const [activeTab, setActiveTab] = useState("Overview");
  const [openDays, setOpenDays] = useState<Set<number>>(new Set([0]));

  // Enquiry form state
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", adults: "2", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const isFormValid = !!(
    form.name.trim() && 
    form.email.trim() && 
    form.phone.trim() && 
    form.date && 
    form.adults
  );

  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [openPolicy, setOpenPolicy] = useState<string | null>("Cancellation");
  const tabBarRef = useRef<HTMLDivElement>(null);

  const toggleDay = (i: number) => {
    setOpenDays(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const handleEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (form.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Enter a valid 10-digit number";
    }

    if (!form.date) newErrors.date = "Travel date is required";
    if (!form.adults || Number(form.adults) < 1) newErrors.adults = "Required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSending(true);
    setServerError(null);

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Success case
          resolve(true);
          // For testing error state, you could use: reject(new Error("Network Error"));
        }, 2000);
      });
      setSent(true);
    } catch (err) {
      setServerError("Failed to send enquiry. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  const upd = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen hero-bg flex items-center justify-center pt-20">
          <div className="text-center text-white">
            <div className="w-12 h-12 border-4 border-white/20 border-t-[#2fa3f2] rounded-full mx-auto mb-4 animate-spin" />
            <p className="text-white/70 text-sm">Loading package…</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!pkg) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
          <div className="text-center">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-2xl font-bold text-[#1a3f4e] mb-2">Package Not Found</h1>
            <p className="text-gray-400 mb-6">This package may have been removed or doesn't exist.</p>
            <Link href="/packages" className="px-6 py-3 bg-[#2fa3f2] text-white font-bold rounded-xl text-sm">Browse All Packages</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const basePriceValue = Number(pkg.price?.amount) || 0;
  const discountedPriceValue = Number(pkg.price?.originalAmount) || 0;
  
  const hasDiscount = discountedPriceValue > 0 && discountedPriceValue < basePriceValue;
  const savingsValue = hasDiscount ? basePriceValue - discountedPriceValue : 0;

  const mainPrice = hasDiscount ? formatPrice(discountedPriceValue, "INR") : formatPrice(basePriceValue, "INR");
  const strikePrice = hasDiscount ? formatPrice(basePriceValue, "INR") : null;
  const savings = hasDiscount ? formatPrice(savingsValue, "INR") : null;
  const days = pkg.tripDuration?.match(/^(\d+)/)?.[1] || "—";
  const nights = pkg.tripDuration?.match(/(\d+)\s*Night/i)?.[1] || String(Number(days) - 1);

  return (
    <>
      <Navbar />

      {/* ─── HERO ────────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-0 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-50/50 -skew-x-12 transform translate-x-1/4 z-0" />
        
        <div className="container-sv relative z-10 pt-10 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-12 items-start">
            {/* Left Content (Gallery, Header, Highlights, Summary) */}
            <div className="space-y-12">
              {/* Premium Hero Gallery Grid */}
              <div className="w-full">
                {pkg.images && pkg.images.length >= 5 ? (
                  <div className="relative group cursor-pointer" onClick={() => setLightboxIdx(0)}>
                    <div className="grid grid-cols-4 grid-rows-2 gap-3 aspect-[16/9] lg:aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-3xl">
                      <div className="col-span-2 row-span-2 relative overflow-hidden">
                        <Image src={pkg.images[0]} alt={`${pkg.title} 1`} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" priority sizes="(max-w-lg) 100vw, 800px" />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                      </div>
                      {pkg.images.slice(1, 5).map((img, i) => (
                        <div key={i} className="relative overflow-hidden">
                          <Image src={img} alt={`${pkg.title} ${i + 2}`} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" sizes="(max-w-md) 50vw, 400px" />
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                        </div>
                      ))}
                    </div>
                    
                    {/* View All Button */}
                    <button 
                      onClick={(e) => { e.stopPropagation(); setLightboxIdx(0); }}
                      className="absolute bottom-6 right-6 px-6 py-3 bg-white/90 backdrop-blur-md text-[#1a3f4e] rounded-2xl shadow-xl flex items-center gap-2 hover:bg-[#2fa3f2] hover:text-white transition-all z-20 group/btn"
                    >
                      <LucideIcon name="Grid" size={18} className="group-hover/btn:rotate-12 transition-transform" />
                      <span className="text-xs font-black uppercase tracking-widest">View All {pkg.images.length} Photos</span>
                    </button>
                  </div>
                ) : pkg.images && pkg.images.length > 1 ? (
                  <HeroSlider images={pkg.images} title={pkg.title} />
                ) : (
                  <div className="relative w-full aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <Image src={pkg.coverImage || pkg.images?.[0] || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800"} alt={pkg.title} fill className="object-cover" />
                  </div>
                )}
              </div>

              {/* Package Header Section - Moved Below Gallery */}
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-[#2fa3f2]/10 text-[#2fa3f2] rounded-full text-[10px] font-black uppercase tracking-widest">{pkg.travelStyle}</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-[10px] font-black uppercase tracking-widest">{pkg.tourType}</span>
                  {pkg.summary?.tags?.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-[#1a3f4e]/5 text-[#1a3f4e]/70 border border-[#1a3f4e]/10 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-[#1a3f4e] leading-[1.1] tracking-tighter">
                  {pkg.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[#2fa3f2]">
                      <LucideIcon name="MapPin" size={16} />
                    </div>
                    <span className="text-[#1a3f4e]">{pkg.location || pkg.destination}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[#2fa3f2]">
                      <LucideIcon name="Clock" size={16} />
                    </div>
                    <span className="text-[#1a3f4e]">{pkg.duration || `${days} Days / ${nights} Nights`}</span>
                  </div>
                  {pkg.rating && (
                    <div className="flex items-center gap-2">
                      <div className="flex text-emerald-500">
                        <LucideIcon name="Star" size={16} className="fill-emerald-500" />
                      </div>
                      <span className="text-[#1a3f4e]">{pkg.rating} <span className="text-gray-300 font-medium">Rating</span></span>
                    </div>
                  )}
                </div>
              </div>

              {/* Highlights List */}
              {(pkg.highlights?.length || pkg.additionalInfo?.experiencesCovered?.length) && (
                <div className="bg-gray-50 rounded-[2.5rem] p-10 border border-gray-100">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-8">Trip Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    {(pkg.highlights?.length ? pkg.highlights : pkg.additionalInfo?.experiencesCovered || []).map((exp: string, i: number) => (
                      <div key={i} className="flex items-start gap-4 group">
                        <div className="w-6 h-6 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 group-hover:border-[#2fa3f2] transition-all">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#2fa3f2]" />
                        </div>
                        <p className="text-sm text-[#1a3f4e] font-bold leading-relaxed">{exp}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Summary Description */}
              <div className="max-w-3xl">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-6">Experience Summary</h3>
                <p className="text-lg text-gray-600 leading-relaxed font-medium whitespace-pre-line">
                  {pkg.summary?.description || pkg.shortDescription}
                </p>
              </div>

              {/* Tab Navigation - Inside Left Column */}
              <div ref={tabBarRef} className="bg-white border-y border-gray-100 sticky top-16 z-40 -mx-4 px-4 sm:mx-0 sm:px-0">
                <div className="flex overflow-x-auto no-scrollbar">
                  {TABS.map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-5 text-[10px] font-black uppercase tracking-widest whitespace-nowrap border-b-4 transition-all ${activeTab === tab ? "border-[#2fa3f2] text-[#2fa3f2]" : "border-transparent text-gray-400 hover:text-[#1a3f4e]"}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content - Inside Left Column */}
              <div className="pt-4 pb-20">
                {activeTab === "Overview" && (
                  <div className="space-y-8 animate-fadeIn">
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                      <h2 className="font-display font-bold text-[#1a3f4e] text-2xl mb-6 tracking-tight">🗺️ Trip Summary</h2>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { label: "Location", value: pkg.location || pkg.destination },
                          { label: "Duration", value: pkg.duration || pkg.tripDuration },
                          { label: "Start Point", value: pkg.additionalInfo?.quickInfo?.startPoint },
                          { label: "End Point", value: pkg.additionalInfo?.quickInfo?.endPoint },
                        ].filter(i => i.value).map(item => (
                          <div key={item.label} className="text-center p-5 bg-gray-50 rounded-2xl border border-gray-100/50">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{item.label}</p>
                            <p className="text-sm font-bold text-[#1a3f4e] leading-snug">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <h3 className="font-bold text-[#1a3f4e] mb-6 flex items-center gap-2 text-lg">
                          <LucideIcon name="CheckCircle" size={20} className="text-emerald-500" /> Inclusions
                        </h3>
                        <ul className="space-y-4">
                          {pkg.inclusions?.map((inc, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                              {inc}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <h3 className="font-bold text-[#1a3f4e] mb-6 flex items-center gap-2 text-lg">
                          <LucideIcon name="XCircle" size={20} className="text-red-500" /> Exclusions
                        </h3>
                        <ul className="space-y-4">
                          {pkg.exclusions?.map((exc, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                              {exc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "Itinerary" && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="font-display font-black text-[#1a3f4e] text-3xl tracking-tight">Daily Journey</h2>
                      <button onClick={() => setOpenDays(new Set(pkg.itinerary?.map((_, i) => i) || []))} className="text-[10px] font-black uppercase tracking-widest text-[#2fa3f2]">Expand All</button>
                    </div>
                    {pkg.itinerary?.map((day, idx) => {
                      const open = openDays.has(idx);
                      return (
                        <div key={idx} className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden mb-6">
                          <button onClick={() => toggleDay(idx)} className="w-full text-left flex items-center gap-6 p-8 hover:bg-gray-50 transition-all">
                            <div className="w-16 h-16 rounded-full bg-[#1a3f4e] flex flex-col items-center justify-center flex-shrink-0">
                              <span className="text-white/40 text-[8px] font-black uppercase tracking-widest leading-none mb-1">Day</span>
                              <span className="text-white font-black text-2xl leading-none">{day.day || day.dayNumber}</span>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-display font-bold text-[#1a3f4e] text-2xl tracking-tight">{day.title}</h3>
                              <div className="flex items-center gap-4 mt-1">
                                {day.city && <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{day.city}</span>}
                                {day.dayType && <span className="text-[#2fa3f2] text-[10px] font-black uppercase tracking-widest">{day.dayType}</span>}
                              </div>
                            </div>
                            <LucideIcon name={open ? "ChevronUp" : "ChevronDown"} size={24} className="text-gray-300" />
                          </button>
                          {open && (
                            <div className="px-8 pb-10 space-y-8 animate-fadeIn">
                               <div className="flex flex-col xl:flex-row gap-10">
                                  <div className="flex-1">
                                     <p className="text-lg text-gray-600 leading-relaxed font-medium italic">"{day.description}"</p>
                                     {day.notes && <p className="mt-4 p-4 bg-amber-50 rounded-2xl text-sm text-amber-900 border border-amber-100 font-bold">{day.notes}</p>}
                                  </div>
                                  {day.images?.length > 0 && (
                                    <div className="w-full xl:w-72 flex-shrink-0 rounded-3xl overflow-hidden border-4 border-white shadow-xl">
                                      <HeroSlider images={day.images} title={day.title} />
                                    </div>
                                  )}
                               </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {activeTab === "Activities" && (
                  <div className="space-y-8 animate-fadeIn">
                    <h2 className="font-display font-black text-[#1a3f4e] text-3xl tracking-tight mb-10">Curated Activities</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {(pkg.activities || pkg.activitiesList || []).map((act: any, i: number) => {
                        const title = typeof act === "string" ? act : act.title;
                        return (
                          <div key={i} className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 p-8 flex gap-6 hover:shadow-xl transition-all">
                            <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 text-[#2fa3f2]">
                              <LucideIcon name="Camera" size={32} />
                            </div>
                            <div>
                              <h3 className="font-bold text-[#1a3f4e] text-lg mb-2">{title}</h3>
                              <p className="text-gray-500 text-sm line-clamp-2">{act.description || "Immerse yourself in this curated local experience."}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeTab === "Hotels" && (
                  <div className="space-y-8 animate-fadeIn">
                    <h2 className="font-display font-black text-[#1a3f4e] text-3xl tracking-tight mb-10">Luxury Accommodations</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                      {(pkg.hotels || pkg.hotelsList || []).map((hotel: any, i: number) => (
                        <div key={i} className="group rounded-[2.5rem] overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all">
                          <div className="relative h-64">
                            <Image src={hotel.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945"} alt={hotel.name} fill className="object-cover transition-transform group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-6 left-8 text-white">
                              <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-70">{hotel.location}</p>
                              <h3 className="text-2xl font-bold">{hotel.name}</h3>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "Transfers" && (
                  <div className="space-y-8 animate-fadeIn">
                    <h2 className="font-display font-black text-[#1a3f4e] text-3xl tracking-tight mb-10">Seamless Logistics</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {(pkg.transfers || pkg.transfersList || []).map((tr: string, i: number) => (
                        <div key={i} className="p-8 bg-white border border-gray-100 rounded-[2.5rem] flex items-center gap-6">
                          <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center shrink-0">
                            <LucideIcon name="MoveHorizontal" size={28} />
                          </div>
                          <p className="text-lg font-bold text-[#1a3f4e]">{tr}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "Policies" && (
                  <div className="space-y-8 animate-fadeIn">
                    <h2 className="font-display font-black text-[#1a3f4e] text-3xl tracking-tight mb-10">Terms & Policies</h2>
                    <div className="space-y-4">
                      {["Cancellation", "Refund", "Confirmation"].map(policy => (
                        <div key={policy} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                          <button onClick={() => setOpenPolicy(openPolicy === policy ? null : policy)} className="w-full flex items-center justify-between p-8 hover:bg-gray-50 transition-all text-left">
                            <h3 className="font-bold text-[#1a3f4e] text-xl">{policy} Policy</h3>
                            <LucideIcon name={openPolicy === policy ? "ChevronUp" : "ChevronDown"} size={20} className="text-gray-300" />
                          </button>
                          {openPolicy === policy && (
                            <div className="px-8 pb-10 text-gray-500 text-sm leading-relaxed animate-fadeIn">
                               {pkg.policies?.[policy.toLowerCase() as keyof typeof pkg.policies] || "Standard policies apply. Please refer to your booking confirmation for full details."}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "Reviews" && (
                  <div className="space-y-10 animate-fadeIn">
                    <div className="flex flex-col xl:flex-row items-center justify-between bg-[#1a3f4e] rounded-[3rem] p-12 text-white shadow-2xl">
                       <div className="text-center xl:text-left mb-8 xl:mb-0">
                          <p className="text-white/50 text-xs font-black uppercase tracking-widest mb-2">Guest Satisfaction</p>
                          <h2 className="text-6xl font-black">{pkg.rating || "4.9"}</h2>
                          <div className="flex text-amber-400 mt-2 justify-center xl:justify-start">
                            {[1,2,3,4,5].map(s => <LucideIcon key={s} name="Star" size={20} className="fill-current" />)}
                          </div>
                          <p className="text-white/40 text-sm font-bold mt-4">Based on verified guest reviews</p>
                       </div>
                       <div className="w-full xl:w-64 space-y-3">
                          {[5,4,3,2,1].map(star => (
                            <div key={star} className="flex items-center gap-3">
                              <span className="text-xs font-black text-white/50 w-4">{star}</span>
                              <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                 <div className="h-full bg-[#2fa3f2]" style={{ width: star === 5 ? "85%" : star === 4 ? "12%" : "3%" }} />
                              </div>
                            </div>
                          ))}
                       </div>
                    </div>

                    <div className="space-y-6">
                      {(pkg.reviews || [
                        { name: "Lakshit Bhardwaj", rating: 5, comment: "Incredible attention to detail. Every day felt like a dream." },
                        { name: "Priya Sharma", rating: 5, comment: "The best travel experience we've had. Seamless and luxurious." }
                      ]).map((rev, i) => (
                        <div key={i} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                           <div className="flex items-center justify-between mb-4">
                              <h4 className="font-bold text-[#1a3f4e]">{rev.name}</h4>
                              <div className="flex text-amber-400">
                                 {Array.from({length: rev.rating}).map((_, j) => <LucideIcon key={j} name="Star" size={12} className="fill-current" />)}
                              </div>
                           </div>
                           <p className="text-gray-500 text-sm leading-relaxed">"{rev.comment}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Sticky Price & Enquiry */}
            <div className="lg:sticky lg:top-36 space-y-6">
              {/* Main Booking Card */}
              <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-500 hover:shadow-3xl">
                {/* Pricing Header */}
                <div className="p-8 bg-gray-50/50 border-b border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-black text-[#1a3f4e]">{mainPrice}</span>
                      <span className="text-gray-400 text-xs font-bold mb-1">Per Adult</span>
                    </div>
                    {pkg.rating && (
                      <div className="flex items-center gap-1 text-[#2fa3f2] font-black text-sm bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                        <LucideIcon name="Star" size={14} className="fill-[#2fa3f2]" />
                        <span>{pkg.rating}</span>
                      </div>
                    )}
                  </div>
                  {strikePrice && (
                    <div className="flex items-center gap-3">
                      <div className="text-gray-400 text-sm line-through decoration-[#2fa3f2]/30 decoration-2">{strikePrice}</div>
                      <span className="px-2 py-0.5 bg-[#1a3f4e] text-white text-[9px] font-black uppercase tracking-widest rounded-md">Save {savings}</span>
                    </div>
                  )}
                </div>

                {/* Form Section */}
                <div id="enquiry-form" className="p-8">
                  <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">Secure Your Experience</h3>
                  
                  {sent ? (
                    <div className="py-10 text-center animate-fadeIn">
                      <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <LucideIcon name="Check" size={40} />
                      </div>
                      <h3 className="font-display font-bold text-[#1a3f4e] text-2xl mb-3 tracking-tight">Request Received!</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">Our travel expert will contact you within 24 hours.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleEnquiry} className="space-y-4">
                      <div className="relative">
                        <input 
                          value={form.name} 
                          onChange={e => upd("name", e.target.value)} 
                          placeholder="Full Name*" 
                          className={`w-full px-6 py-4 rounded-xl border ${errors.name ? 'border-red-500 bg-red-50/30' : 'border-gray-100'} text-sm font-medium focus:outline-none focus:border-[#2fa3f2] transition-all placeholder:text-gray-400`} 
                        />
                        {errors.name && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">{errors.name}</p>}
                      </div>

                      <div className="relative">
                        <input 
                          type="email" 
                          value={form.email} 
                          onChange={e => upd("email", e.target.value)} 
                          placeholder="Email*" 
                          className={`w-full px-6 py-4 rounded-xl border ${errors.email ? 'border-red-500 bg-red-50/30' : 'border-gray-100'} text-sm font-medium focus:outline-none focus:border-[#2fa3f2] transition-all placeholder:text-gray-400`} 
                        />
                        {errors.email && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">{errors.email}</p>}
                      </div>

                      <div className="flex gap-3">
                        <div className="w-20 shrink-0 relative">
                          <select className="w-full px-3 py-4 rounded-xl border border-gray-100 text-xs font-bold focus:outline-none focus:border-[#2fa3f2] appearance-none bg-white">
                            <option>+91</option>
                            <option>+1</option>
                            <option>+44</option>
                          </select>
                          <LucideIcon name="ChevronDown" size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                        <div className="flex-1 relative">
                          <input 
                            value={form.phone} 
                            onChange={e => upd("phone", e.target.value)} 
                            placeholder="Phone Number*" 
                            className={`w-full px-6 py-4 rounded-xl border ${errors.phone ? 'border-red-500 bg-red-50/30' : 'border-gray-100'} text-sm font-medium focus:outline-none focus:border-[#2fa3f2] transition-all placeholder:text-gray-400`} 
                          />
                          {errors.phone && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">{errors.phone}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                          <input 
                            type="date" 
                            value={form.date} 
                            onChange={e => upd("date", e.target.value)} 
                            className={`w-full px-4 py-4 rounded-xl border ${errors.date ? 'border-red-500 bg-red-50/30' : 'border-gray-100'} text-xs font-bold focus:outline-none focus:border-[#2fa3f2] transition-all text-gray-400`} 
                          />
                          {errors.date && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">{errors.date}</p>}
                        </div>
                        <div className="relative">
                          <input 
                            type="number"
                            min="1"
                            value={form.adults} 
                            onChange={e => upd("adults", e.target.value)} 
                            placeholder="Adults*" 
                            className={`w-full px-4 py-4 rounded-xl border ${errors.adults ? 'border-red-500 bg-red-50/30' : 'border-gray-100'} text-sm font-medium focus:outline-none focus:border-[#2fa3f2] transition-all placeholder:text-gray-400`} 
                          />
                          {errors.adults && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">{errors.adults}</p>}
                        </div>
                      </div>

                      <button 
                        type="submit" 
                        disabled={sending || !isFormValid} 
                        className={`w-full py-5 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 ${
                          sending || !isFormValid 
                          ? 'bg-gray-300 shadow-none cursor-not-allowed' 
                          : 'bg-[#2fa3f2] shadow-[#2fa3f2]/20 hover:scale-[1.02] active:scale-[0.98]'
                        }`}
                      >
                        {sending ? "Sending..." : "Book Your Spot"}
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-[#1a3f4e]/5 rounded-3xl p-6 flex items-center justify-between gap-4 border border-[#1a3f4e]/10">
                <div className="flex flex-col items-center text-center gap-2 flex-1">
                  <LucideIcon name="ShieldCheck" size={20} className="text-[#2fa3f2]" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-[#1a3f4e]/60 leading-tight">Secure<br/>Booking</span>
                </div>
                <div className="w-px h-8 bg-[#1a3f4e]/10" />
                <div className="flex flex-col items-center text-center gap-2 flex-1">
                  <LucideIcon name="Banknote" size={20} className="text-[#2fa3f2]" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-[#1a3f4e]/60 leading-tight">Best Price<br/>Guaranteed</span>
                </div>
                <div className="w-px h-8 bg-[#1a3f4e]/10" />
                <div className="flex flex-col items-center text-center gap-2 flex-1">
                  <LucideIcon name="Headphones" size={20} className="text-[#2fa3f2]" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-[#1a3f4e]/60 leading-tight">24/7 Luxury<br/>Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      {lightboxIdx !== null && pkg.images && (
        <Lightbox images={pkg.images} initialIdx={lightboxIdx} onClose={() => setLightboxIdx(null)} />
      )}
    </>
  );
}
