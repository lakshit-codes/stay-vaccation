"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { contactHeroData } from './contactHeroData';

interface DynamicContent {
  [key: string]: string;
}

interface ContactHeroProps {
  section?: {
    adminTitle?: string;
    props?: {
      badge?: DynamicContent;
      title?: DynamicContent;
      desc?: DynamicContent;
      bgImage?: string;
    };
  };
}

const ContactHero: React.FC<ContactHeroProps> = ({ section: propSection }) => {
  const pathname = usePathname();

  const lang = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === 'hi') return 'hi';
    return 'en';
  }, [pathname]);

  const sectionProps = useMemo(() => {
    const defaultProps = contactHeroData.props;
    if (!propSection) return defaultProps;

    // Handle both CMS style (flat title/description/badge) and standard sections-v2 shape
    const p = (propSection.props || propSection) as any;

    return {
      badge: p.badge !== undefined ? p.badge : defaultProps.badge,
      title: p.title !== undefined ? p.title : defaultProps.title,
      desc: p.description !== undefined ? p.description : (p.desc !== undefined ? p.desc : defaultProps.desc),
      bgImage: p.bgImage !== undefined ? p.bgImage : (p.image !== undefined ? p.image : defaultProps.bgImage),
    };
  }, [propSection]);

  const t = (obj?: DynamicContent | string): string => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj['en'] || '';
  };


  return (
    <section
      id="contact-hero"
      className="relative overflow-hidden"
      style={{ minHeight: '520px' }}
    >
      {/* Background image with subtle parallax/scale zoom */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{ 
          backgroundImage: `url('${sectionProps.bgImage || contactHeroData.props.bgImage}')`,
          filter: 'brightness(0.65)'
        }}
      />

      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" />

      {/* Premium Bottom fade to transition to white page body */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 container-v2 flex flex-col items-center text-center pt-36 pb-28 md:pt-48 md:pb-36">
        
        {/* Badge */}
        {sectionProps.badge && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center px-6 py-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-xs font-bold tracking-widest uppercase mb-6 shadow-sm"
          >
            {t(sectionProps.badge)}
          </motion.div>
        )}

        {/* Title */}
        {sectionProps.title && (
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="font-black text-white tracking-tight leading-none mb-6"
            style={{ 
              fontSize: 'clamp(3rem, 7vw, 5.5rem)', 
              fontFamily: 'Poppins, sans-serif'
            }}
          >
            {t(sectionProps.title)}
          </motion.h1>
        )}

        {/* Description */}
        {sectionProps.desc && (
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium"
          >
            {t(sectionProps.desc)}
          </motion.p>
        )}

      </div>
    </section>
  );
};

export default ContactHero;
