"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { aboutHeroData } from './aboutHeroData';

interface DynamicContent {
  [key: string]: string;
}

interface AboutHeroProps {
  section?: {
    adminTitle?: string;
    props?: {
      badge?: DynamicContent;
      heading?: DynamicContent;
      description?: DynamicContent;
      overlay_color?: string;
      image?: string;
    };
  };
}

const AboutHero: React.FC<AboutHeroProps> = ({ section: propSection }) => {
  const pathname = usePathname();

  const lang = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === 'hi') return 'hi';
    return 'en';
  }, [pathname]);

  // Prioritize exported TS data, fallback to CMS prop section
  const section = (aboutHeroData as any) || propSection || {};
  const { props = {} } = section;

  // i18n helper
  const t = (obj?: DynamicContent | string): string => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj['en'] || '';
  };

  return (
    <section
      id="about-hero"
      className="relative overflow-hidden"
      style={{ minHeight: '520px' }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
        style={{ backgroundImage: `url('${props.image || aboutHeroData.props.image}')` }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: props.overlay_color || aboutHeroData.props.overlay_color }}
      />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#f8f9fa] to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 container-v2 flex flex-col items-center text-center pt-36 pb-24 md:pt-44 md:pb-28">
        
        {/* Badge */}
        {props.badge && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/15 border border-white/25 backdrop-blur-md text-white text-xs font-bold tracking-widest uppercase mb-6"
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
            className="font-extrabold text-white tracking-tight leading-tight mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontFamily: 'Poppins, sans-serif' }}
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
            className="text-white/90 text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
          >
            {t(props.description)}
          </motion.p>
        )}

      </div>
    </section>
  );
};

export default AboutHero;
