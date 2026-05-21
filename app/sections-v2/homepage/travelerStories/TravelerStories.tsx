"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Star, Palmtree, Mountain, Sailboat, MapPin } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { travelerStoriesData } from './travelerStoriesData';

// Icon lookup — matches packageIconName values in the data file
const PackageIconMap: Record<string, React.ElementType> = {
  Palmtree,
  Mountain,
  Sailboat,
};

interface DynamicContent {
  [key: string]: string;
}

interface ContentItem {
  id: string;
  type: string;
  props: {
    name?: DynamicContent;
    image?: string;
    rating?: number;
    review?: DynamicContent;
    packageName?: DynamicContent;
    packageIconName?: string;
  };
}

interface TravelerStoriesProps {
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

const TravelerStories: React.FC<TravelerStoriesProps> = ({
  section: propSection,
}) => {
  const pathname = usePathname();

  const lang = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === 'hi') return 'hi';
    return 'en';
  }, [pathname]);

  // Prioritize exported TS data, fallback to CMS prop section — mirrors HeroSection / FaqSection
  const section = (travelerStoriesData as any) || propSection || {};
  const { props = {}, content = [] } = section;

  // i18n helper — same pattern as HeroSection / BookingPlan / TopDestinations
  const t = (obj?: DynamicContent | string): string => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj['en'] || '';
  };

  const items: ContentItem[] = content.length > 0
    ? content
    : (travelerStoriesData.content as ContentItem[]);

  return (
    <section
      id="traveler-stories"
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, var(--cream) 0%, #e8f4fd 100%)' }}
    >
      {/* Decorative background blur shapes */}
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item, index) => {
            const p = item.props;
            const IconComponent = PackageIconMap[p.packageIconName || ''] || MapPin;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="flex flex-col p-8 rounded-[2rem] bg-white border border-sky-100/50 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Star Rating */}
                <div className="flex gap-1 mb-5">
                  {[...Array(p.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 stroke-none" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-slate-600 text-sm md:text-[0.95rem] leading-relaxed mb-6 font-medium italic flex-grow">
                  &ldquo;{t(p.review)}&rdquo;
                </p>

                {/* Author Info */}
                <div className="mt-auto pt-5 border-t border-slate-100/80">
                  <h3 className="font-bold text-slate-800 text-sm md:text-[0.95rem]">
                    {t(p.name)}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-sky-500 font-semibold mt-1">
                    <IconComponent className="w-3.5 h-3.5 shrink-0" />
                    <span>{t(p.packageName)}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default TravelerStories;
