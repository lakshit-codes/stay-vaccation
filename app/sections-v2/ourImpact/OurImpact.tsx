"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ourImpactData } from './ourImpactData';

interface OurImpactProps {
  section?: any;
}

const OurImpact: React.FC<OurImpactProps> = ({ section: propSection }) => {
  const pathname = usePathname();

  const lang = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === 'hi') return 'hi';
    return 'en';
  }, [pathname]);

  // Prioritize exported TS data, fallback to CMS prop section
  const section = (ourImpactData as any) || propSection || {};
  const p = section.props || {};
  const statItems = section.content || [];

  // i18n helper – mirrors HeroSection / FaqSection pattern
  const t = (obj?: Record<string, string> | string): string => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj['en'] || '';
  };

  return (
    <section
      id="our-impact"
      className="py-16 md:py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #0ea5e9 100%)'
      }}
    >
      {/* Decorative premium light reflections */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-sky-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-v2 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 lg:gap-16">

          {/* Left Text Area */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 max-w-2xl"
          >
            {/* Badge */}
            {p.badge && (
              <div className="text-[#ff9500] font-sans text-xs md:text-sm font-extrabold tracking-widest uppercase mb-3">
                {t(p.badge)}
              </div>
            )}

            {/* Heading */}
            {(p.titleNormalPre || p.titleHighlight || p.titleNormalPost) && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                {t(p.titleNormalPre)}
                <span className="text-[#ff9500]">{t(p.titleHighlight)}</span>
                {t(p.titleNormalPost)}
              </h2>
            )}

            {/* Subtitle */}
            {p.subtitle && (
              <p className="text-blue-100/80 mt-4 text-base md:text-lg max-w-xl leading-relaxed">
                {t(p.subtitle)}
              </p>
            )}
          </motion.div>

          {/* Right Stats Area — rendered from content[] */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-row flex-wrap items-center justify-start lg:justify-end gap-6 sm:gap-10 md:gap-12"
          >
            {statItems.map((item: any, index: number) => (
              <React.Fragment key={item.id || index}>
                {index > 0 && (
                  <div className="hidden sm:block w-[1px] h-12 bg-white/20 self-center" />
                )}
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  className="text-center min-w-[100px] flex-1 sm:flex-none"
                >
                  <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-none">
                    {item.props?.value}
                  </div>
                  <div className="text-xs md:text-sm text-blue-100/70 font-semibold mt-2.5 tracking-wider">
                    {t(item.props?.label)}
                  </div>
                </motion.div>
              </React.Fragment>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default OurImpact;
