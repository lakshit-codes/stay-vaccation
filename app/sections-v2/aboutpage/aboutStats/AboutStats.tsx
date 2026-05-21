"use client";

import React, { useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { aboutStatsData } from './aboutStatsData';
import LucideIcon from '../../../components/LucideIcon';

interface DynamicContent {
  [key: string]: string;
}

interface StatItem {
  id: string;
  type: string;
  props: {
    iconName: string;
    number: string;
    label: DynamicContent;
  };
}

interface AboutStatsProps {
  section?: {
    adminTitle?: string;
    props?: {
      overlay_color?: string;
      border_color?: string;
    };
    content?: StatItem[];
  };
}

const AboutStats: React.FC<AboutStatsProps> = ({ section: propSection }) => {
  const pathname = usePathname();

  const lang = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === 'hi') return 'hi';
    return 'en';
  }, [pathname]);

  const section = (aboutStatsData as any) || propSection || {};
  const { props = {}, content = [] } = section;

  const t = (obj?: DynamicContent | string): string => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj['en'] || '';
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  return (
    <section 
      id="about-stats"
      className="py-16 md:py-20 border-b"
      style={{ 
        backgroundColor: props.overlay_color || aboutStatsData.props.overlay_color,
        borderColor: props.border_color || aboutStatsData.props.border_color 
      }}
    >
      <div className="container-v2">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center"
        >
          {content.map((item: StatItem) => (
            <motion.div 
              key={item.id} 
              variants={itemVariants}
              className="flex flex-col items-center justify-center p-4 rounded-2xl hover:bg-slate-50/50 transition-all duration-300"
            >
              <div 
                className="mb-4 flex items-center justify-center p-3.5 rounded-2xl bg-sky-50/80 text-sky-500"
                style={{ color: 'var(--sky)' }}
              >
                <LucideIcon name={item.props.iconName} size={36} strokeWidth={1.5} />
              </div>
              <div 
                className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-2"
                style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text)' }}
              >
                {item.props.number}
              </div>
              <div 
                className="text-[11px] md:text-xs font-bold text-slate-400 uppercase tracking-widest"
                style={{ color: 'var(--muted)' }}
              >
                {t(item.props.label)}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutStats;
