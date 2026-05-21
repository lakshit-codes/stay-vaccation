"use client";

import React, { useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { aboutMissionData } from './aboutMissionData';
import SectionHeaderV2 from '../../../components-v2/SectionHeaderV2';
import ButtonV2 from '../../../components-v2/ButtonV2';
import LucideIcon from '../../../components/LucideIcon';

interface DynamicContent {
  [key: string]: string;
}

interface AboutMissionProps {
  section?: {
    adminTitle?: string;
    props?: {
      badge?: DynamicContent;
      title?: DynamicContent;
      title_highlight?: DynamicContent;
      paragraphs?: {
        en: string[];
        hi: string[];
      };
      btn_text?: DynamicContent;
      btn_link?: string;
      icon_name?: string;
    };
  };
}

const AboutMission: React.FC<AboutMissionProps> = ({ section: propSection }) => {
  const pathname = usePathname();

  const lang = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === 'hi') return 'hi';
    return 'en';
  }, [pathname]);

  const section = (aboutMissionData as any) || propSection || {};
  const { props = {} } = section;

  const t = (obj?: DynamicContent | string): string => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj['en'] || '';
  };

  const getParagraphs = (): string[] => {
    if (props.paragraphs) {
      return props.paragraphs[lang] || props.paragraphs['en'] || [];
    }
    return [];
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, x: 50, scale: 0.95 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="about-mission" className="py-20 md:py-32 bg-[var(--cream)] overflow-hidden">
      <div className="container-v2">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Text Block */}
          <motion.div 
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex-1 space-y-6"
          >
            <SectionHeaderV2 
              label={t(props.badge)}
              title={t(props.title)}
              titleHighlight={t(props.title_highlight)}
            />
            
            <div className="space-y-4 text-[var(--muted)] text-base md:text-lg leading-relaxed pt-2">
              {getParagraphs().map((para: string, idx: number) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {props.btn_text && (
              <div className="pt-6">
                <ButtonV2 href={props.btn_link || '/packages'} variant="sky">
                  {t(props.btn_text)}
                </ButtonV2>
              </div>
            )}
          </motion.div>

          {/* Right Icon / Graphic Block */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="w-full lg:w-[45%] shrink-0"
          >
            <div 
              className="relative overflow-hidden rounded-[3rem] h-[360px] md:h-[500px] w-full flex items-center justify-center shadow-[var(--shadow2)]"
              style={{
                background: 'linear-gradient(135deg, var(--sky), var(--sky-dk))', 
              }}
            >
              {/* Decorative dotted pattern */}
              <div 
                className="absolute inset-0 opacity-10" 
                style={{ 
                  backgroundImage: 'radial-gradient(circle, #fff 1.5px, transparent 1.5px)', 
                  backgroundSize: '24px 24px' 
                }} 
              />
              
              {/* Main Icon */}
              <div className="relative z-10 transition-transform duration-500 hover:scale-110">
                <LucideIcon name={props.icon_name || 'Globe'} size={200} color="#fff" strokeWidth={0.5} />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutMission;
