"use client";

import React, { useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { teamSectionData } from './teamSectionData';
import SectionHeaderV2 from '../../../components-v2/SectionHeaderV2';
import LucideIcon from '../../../components/LucideIcon';

interface DynamicContent {
  [key: string]: string;
}

interface TeamMember {
  id: string;
  type: string;
  props: {
    name: string;
    role: DynamicContent;
    icon: string;
    desc: DynamicContent;
  };
}

interface TeamSectionProps {
  section?: {
    adminTitle?: string;
    props?: {
      badge?: DynamicContent;
      title?: DynamicContent;
      title_highlight?: DynamicContent;
    };
    content?: TeamMember[];
  };
}

const TeamSection: React.FC<TeamSectionProps> = ({ section: propSection }) => {
  const pathname = usePathname();

  const lang = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === 'hi') return 'hi';
    return 'en';
  }, [pathname]);

  const section = (teamSectionData as any) || propSection || {};
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
    <section 
      id="about-team" 
      className="py-20 md:py-32 relative overflow-hidden"
      style={{ background: 'var(--sky-dk)' }}
    >
      {/* Subtle backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-400/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-v2 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <SectionHeaderV2 
            label={t(props.badge)}
            title={t(props.title)}
            titleHighlight={t(props.title_highlight)}
            centered
            className="[&_.section-title]:text-white [&_.section-title_span]:text-sky-300"
          />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {content.map((item: TeamMember) => (
            <motion.div 
              key={item.id} 
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="p-8 rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 text-center hover:border-white/20 transition-all duration-300 flex flex-col items-center"
            >
              {/* Squircle Icon Container */}
              <div className="w-[100px] h-[100px] bg-white rounded-[2rem] flex items-center justify-center mb-6 shadow-lg text-sky-500 hover:scale-105 transition-transform duration-300">
                <LucideIcon name={item.props.icon} size={48} strokeWidth={1} />
              </div>
              
              {/* Member Name */}
              <h3 
                className="font-extrabold text-xl text-white mb-1.5"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {item.props.name}
              </h3>
              
              {/* Member Role */}
              <p className="text-sky-200 text-xs font-bold uppercase tracking-widest mb-5">
                {t(item.props.role)}
              </p>
              
              {/* Member Description */}
              <p className="text-white/70 text-sm leading-relaxed">
                {t(item.props.desc)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
