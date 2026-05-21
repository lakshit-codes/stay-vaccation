"use client";

import React, { useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { coreValuesData } from './coreValuesData';
import SectionHeaderV2 from '../../../components-v2/SectionHeaderV2';
import LucideIcon from '../../../components/LucideIcon';

interface DynamicContent {
  [key: string]: string;
}

interface ValueItem {
  id: string;
  type: string;
  props: {
    icon: string;
    title: DynamicContent;
    desc: DynamicContent;
  };
}

interface CoreValuesProps {
  section?: {
    adminTitle?: string;
    props?: {
      badge?: DynamicContent;
      title?: DynamicContent;
      title_highlight?: DynamicContent;
    };
    content?: ValueItem[];
  };
}

const CoreValues: React.FC<CoreValuesProps> = ({ section: propSection }) => {
  const pathname = usePathname();

  const lang = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === 'hi') return 'hi';
    return 'en';
  }, [pathname]);

  const section = (coreValuesData as any) || propSection || {};
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

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  return (
    <section id="core-values" className="py-20 md:py-32 bg-[var(--white)]">
      <div className="container-v2">
        <div className="text-center mb-12 md:mb-16">
          <SectionHeaderV2 
            label={t(props.badge)}
            title={t(props.title)}
            titleHighlight={t(props.title_highlight)}
            centered
          />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {content.map((item: ValueItem) => (
            <motion.div 
              key={item.id} 
              variants={cardVariants}
              whileHover={{ y: -5, boxShadow: "var(--shadow3)" }}
              className="p-8 rounded-[2rem] bg-[var(--cream)] border border-[#f1f5f9] transition-all duration-300 flex flex-col justify-start"
            >
              <div 
                className="mb-6 flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 hover:rotate-12 transition-transform duration-300"
                style={{ color: 'var(--orange)' }}
              >
                <LucideIcon name={item.props.icon} size={28} strokeWidth={1.5} />
              </div>
              
              <h3 
                className="font-extrabold text-xl mb-3 text-slate-800"
                style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text)' }}
              >
                {t(item.props.title)}
              </h3>
              
              <p className="text-slate-500 text-sm leading-relaxed md:text-base">
                {t(item.props.desc)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CoreValues;
