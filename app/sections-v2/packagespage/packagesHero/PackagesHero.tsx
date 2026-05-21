"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { packagesHeroData } from './packagesHeroData';

interface DynamicContent {
  [key: string]: string;
}

interface PackagesHeroProps {
  section?: {
    adminTitle?: string;
    props?: {
      badge?: DynamicContent;
      heading?: DynamicContent;
      description?: DynamicContent;
      search_placeholder?: DynamicContent;
      search_btn_text?: DynamicContent;
      overlay_color?: string;
      image?: string;
    };
  };
  /** Controlled search value from parent */
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  onSearchSubmit?: () => void;
}

const PackagesHero: React.FC<PackagesHeroProps> = ({
  section: propSection,
  searchValue = '',
  onSearchChange,
  onSearchSubmit,
}) => {
  const pathname = usePathname();

  const lang = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === 'hi') return 'hi';
    return 'en';
  }, [pathname]);

  // Prioritize exported TS data, fallback to CMS prop section — mirrors HeroSection / FaqSection
  const section = (packagesHeroData as any) || propSection || {};
  const { props = {} } = section;

  // i18n helper — same pattern as HeroSection / BookingPlan / TopDestinations
  const t = (obj?: DynamicContent | string): string => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj['en'] || '';
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearchSubmit?.();
  };

  return (
    <section
      id="packages-hero"
      className="relative overflow-hidden"
      style={{ minHeight: '480px' }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
        style={{ backgroundImage: `url('${props.image || packagesHeroData.props.image}')` }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: props.overlay_color || packagesHeroData.props.overlay_color }}
      />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#f8f9fa] to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 container-v2 flex flex-col items-center text-center pt-32 pb-24 md:pt-40 md:pb-28">

        {/* Badge */}
        {props.badge && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-xs font-bold tracking-widest uppercase mb-6"
          >
            {t(props.badge)}
          </motion.div>
        )}

        {/* Heading */}
        {props.heading && (
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-extrabold text-white tracking-tight leading-none mb-5"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5rem)', fontFamily: 'Poppins, sans-serif' }}
          >
            {t(props.heading)}
          </motion.h1>
        )}

        {/* Description */}
        {props.description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
          >
            {t(props.description)}
          </motion.p>
        )}

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-[620px] mx-auto"
        >
          <div className="bg-white/95 backdrop-blur-xl p-2 rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.18)] border border-white/40 flex items-center gap-2 transition-all duration-300 hover:shadow-[0_24px_60px_rgba(15,23,42,0.24)]">
            <div className="flex-1 flex items-center gap-3 px-4 py-2.5">
              <span className="text-gray-400 text-base shrink-0">🔍</span>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t(props.search_placeholder)}
                className="w-full border-none bg-transparent outline-none text-sm font-bold text-[#1a3f4e] placeholder-gray-400"
              />
            </div>
            <button
              onClick={() => onSearchSubmit?.()}
              className="px-7 py-3.5 bg-gradient-to-r from-[#ff9500] to-[#ff6b00] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-[0_4px_12px_rgba(255,149,0,0.25)] hover:shadow-[0_6px_20px_rgba(255,149,0,0.4)] hover:-translate-y-0.5 transition-all duration-300 shrink-0"
            >
              {t(props.search_btn_text) || 'Search'}
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default PackagesHero;
