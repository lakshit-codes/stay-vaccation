"use client";

import React, { useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { aboutCtaData } from './aboutCtaData';
import ButtonV2 from '../../../components-v2/ButtonV2';

interface DynamicContent {
  [key: string]: string;
}

interface AboutCtaProps {
  section?: {
    adminTitle?: string;
    props?: {
      title?: DynamicContent;
      desc?: DynamicContent;
      primaryBtn?: {
        text?: DynamicContent;
        link?: string;
      };
      secondaryBtn?: {
        text?: DynamicContent;
        link?: string;
      };
    };
  };
}

const AboutCta: React.FC<AboutCtaProps> = ({ section: propSection }) => {
  const pathname = usePathname();

  const lang = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === 'hi') return 'hi';
    return 'en';
  }, [pathname]);

  const section = (aboutCtaData as any) || propSection || {};
  const { props = {} } = section;

  const t = (obj?: DynamicContent | string): string => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj['en'] || '';
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section 
      id="about-cta" 
      className="py-24 md:py-32 relative overflow-hidden text-center"
      style={{ background: 'linear-gradient(to right, var(--sky), var(--sky-dk))' }}
    >
      {/* Light background flares for depth */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[80%] bg-white rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[80%] bg-sky-200 rounded-full blur-[120px]" />
      </div>

      <div className="container-v2 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          {/* Section Heading */}
          <motion.h2 
            variants={itemVariants}
            className="text-white font-extrabold text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight leading-tight"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {t(props.title)}
          </motion.h2>

          {/* Section Description */}
          <motion.p 
            variants={itemVariants}
            className="text-white/90 text-base md:text-lg lg:text-xl mb-10 leading-relaxed max-w-2xl font-medium"
          >
            {t(props.desc)}
          </motion.p>

          {/* Buttons Container */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
          >
            {props.primaryBtn && (
              <ButtonV2 
                href={props.primaryBtn.link || "/contact"} 
                variant="orange" 
                className="w-full sm:w-auto text-center px-10 py-4 font-bold rounded-full transition-transform hover:scale-105"
              >
                {t(props.primaryBtn.text)}
              </ButtonV2>
            )}

            {props.secondaryBtn && (
              <ButtonV2 
                href={props.secondaryBtn.link || "/packages"} 
                variant="outline" 
                className="w-full sm:w-auto text-center px-10 py-4 font-bold rounded-full border-white/40 text-white hover:bg-white hover:text-sky hover:border-white transition-all hover:scale-105"
              >
                {t(props.secondaryBtn.text)}
              </ButtonV2>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutCta;
