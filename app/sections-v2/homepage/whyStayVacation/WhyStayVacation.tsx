"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Globe, Building2, Zap, Leaf, Check } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { whyStayVacationData } from './whyStayVacationData';

// Icon lookup — matches iconName values in the data file
const IconMap: Record<string, React.ElementType> = {
  Globe,
  Building: Building2,
  Zap,
  Leaf,
};

interface DynamicContent {
  [key: string]: string;
}

interface DynamicBullets {
  [key: string]: string[];
}

interface ContentItem {
  id: string;
  type: string;
  props: {
    iconName?: string;
    iconColor?: string;
    iconBg?: string;
    title?: DynamicContent;
    description?: DynamicContent;
    bullets?: DynamicBullets;
  };
}

interface WhyStayVacationProps {
  section?: {
    adminTitle?: string;
    props?: {
      badge?: DynamicContent;
      title?: DynamicContent;
      title_highlight?: DynamicContent;
      subtitle?: DynamicContent;
    };
    content?: ContentItem[];
  };
  lang?: string;
}

const WhyStayVacation: React.FC<WhyStayVacationProps> = ({
  section: propSection,
}) => {
  const pathname = usePathname();

  const lang = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === 'hi') return 'hi';
    return 'en';
  }, [pathname]);

  // Prioritize exported TS data, fallback to CMS prop section — mirrors HeroSection / FaqSection
  const section = (whyStayVacationData as any) || propSection || {};
  const { props = {}, content = [] } = section;

  // i18n helper — same pattern as HeroSection / BookingPlan / TopDestinations / TravelerStories
  const t = (obj?: DynamicContent | string): string => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj['en'] || '';
  };

  // Bullets helper — returns the correct language array
  const tb = (obj?: DynamicBullets): string[] => {
    if (!obj) return [];
    return obj[lang] || obj['en'] || [];
  };

  const items: ContentItem[] = content.length > 0
    ? content
    : (whyStayVacationData.content as ContentItem[]);

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden relative">
      {/* Decorative background blurs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-50/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-50/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="container-v2">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          {props.badge && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-bold tracking-widest uppercase mb-4"
            >
              {t(props.badge)}
            </motion.div>
          )}

          {(props.title || props.title_highlight) && (
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight"
            >
              {t(props.title)}
              {props.title_highlight && (
                <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                  {t(props.title_highlight)}
                </span>
              )}
            </motion.h2>
          )}

          {props.subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-500 text-base md:text-lg max-w-xl mx-auto mt-4 leading-relaxed"
            >
              {t(props.subtitle)}
            </motion.p>
          )}
        </div>

        {/* Grid of Reasons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {items.map((item, index) => {
            const p = item.props;
            const IconComponent = IconMap[p.iconName || ''] || Globe;
            const bullets = tb(p.bullets);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="flex flex-col p-8 rounded-[2rem] bg-slate-50/60 border border-slate-100 hover:border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Icon Container */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform duration-300 hover:rotate-6 hover:scale-110"
                  style={{ backgroundColor: p.iconBg }}
                >
                  <IconComponent className="w-6 h-6" style={{ color: p.iconColor }} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-800 text-center mb-3">
                  {t(p.title)}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-500 text-center leading-relaxed mb-6">
                  {t(p.description)}
                </p>

                {/* Bullets */}
                <ul className="flex flex-col gap-3 text-left w-full mt-auto pt-5 border-t border-slate-100/70">
                  {bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyStayVacation;
