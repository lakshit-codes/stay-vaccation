"use client";

import React, { useMemo } from 'react';
import SectionHeaderV2 from '../../components-v2/SectionHeaderV2';
import ButtonV2 from '../../components-v2/ButtonV2';
import { topDestinationsData, DestinationItem } from './topDestinationsData';

interface TopDestinationsProps {
  destinations?: any[];
  section?: {
    adminTitle?: string;
    props?: {
      label?: Record<string, string>;
      title?: Record<string, string>;
      title_highlight?: Record<string, string>;
      subtitle?: Record<string, string>;
      btn_text?: Record<string, string>;
      btn_link?: string;
    };
    destinations?: DestinationItem[];
  };
  lang?: string;
}

const TopDestinations: React.FC<TopDestinationsProps> = ({
  destinations,
  section: propSection,
  lang = 'en'
}) => {
  const section = propSection || topDestinationsData;
  const { props = {} } = section;
  
  const t = (obj?: Record<string, string>) => obj?.[lang] || obj?.['en'] || '';

  // Process and merge database destinations with visual mock items
  const displayDestinations = useMemo(() => {
    const defaults = [...(section.destinations || topDestinationsData.destinations)];
    
    if (destinations && destinations.length > 0) {
      return defaults.map((def) => {
        // Match by case-insensitive name or id/slug
        const dbMatch = destinations.find((d) => 
          d.name?.toLowerCase().includes(def.name.toLowerCase()) || 
          d.id?.toLowerCase() === def.id || 
          d.slug?.toLowerCase() === def.id
        );

        if (dbMatch) {
          const hasCustomImage = dbMatch.image && 
            !dbMatch.image.includes('placeholder') && 
            !dbMatch.image.includes('photo-1514282401047-d79a71a590e8');

          return {
            ...def,
            rating: dbMatch.rating || def.rating,
            // Format package count nicely if available, otherwise use default
            escapes: dbMatch.packageCount !== undefined 
              ? `${dbMatch.packageCount} Escape${dbMatch.packageCount !== 1 ? 's' : ''}` 
              : def.escapes,
            // Use database image if custom, otherwise keep premium default Unsplash image
            image: hasCustomImage ? dbMatch.image : def.image
          };
        }
        return def;
      });
    }
    return defaults;
  }, [destinations, section.destinations]);

  return (
    <section id="top-destinations" className="py-20 md:py-28 bg-[#f8f9fa]">
      <div className="container-v2">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
          <SectionHeaderV2 
            label={t(props.label) || "✦ TOP DESTINATIONS"}
            title={t(props.title) || "Explore"}
            titleHighlight={t(props.title_highlight) || "Dream Destinations"}
            subtitle={t(props.subtitle) || "Hand-picked escapes that ignite your wanderlust — from turquoise lagoons to snow-capped peaks."}
          />
          <div className="flex-shrink-0">
            <ButtonV2 
              href={props.btn_link || "/destinations"} 
              variant="outline" 
              style={{ borderColor: 'var(--sky)', color: 'var(--sky)' }}
            >
              {t(props.btn_text) || "View All →"}
            </ButtonV2>
          </div>
        </div>

        {/* Dest Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:grid-rows-[280px_280px]">
          {displayDestinations.map((dest, index) => {
            const isFeatured = index === 0;
            return (
              <div 
                key={dest.id}
                className={`group relative overflow-hidden rounded-[24px] cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300
                  ${isFeatured ? 'col-span-1 md:col-span-2 lg:col-span-1 lg:row-span-2 h-[420px] md:h-[360px] lg:h-auto' : 'col-span-1 h-[220px] md:h-[260px] lg:h-auto'}`}
              >
                {/* Background Image with hover zoom */}
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  loading="lazy" 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity duration-300" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col justify-end text-white">
                  <h3 className={`font-bold tracking-tight mb-1 text-white leading-tight
                    ${isFeatured ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}
                  >
                    {dest.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-white/95 font-medium text-sm md:text-base">
                    <span className="text-amber-400 text-lg">★</span>
                    <span>{dest.rating.toFixed(1)}</span>
                    <span className="opacity-60 font-light">·</span>
                    <span className="text-white/90">{dest.escapes}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopDestinations;
