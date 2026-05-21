"use client";

import React, { useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { officeLocationData } from './officeLocationData';
import LucideIcon from '../../../components/LucideIcon';

interface DynamicContent {
  [key: string]: string;
}

interface OfficeLocationProps {
  cmsData?: any;
}

const OfficeLocation: React.FC<OfficeLocationProps> = ({ cmsData }) => {
  const pathname = usePathname();

  const lang = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === 'hi') return 'hi';
    return 'en';
  }, [pathname]);

  const sectionProps = useMemo(() => {
    const defaultProps = officeLocationData.props;
    if (!cmsData) return defaultProps;

    const office = cmsData.office || {};
    return {
      badge: office.badge !== undefined ? office.badge : defaultProps.badge,
      title: office.title !== undefined ? office.title : defaultProps.title,
      desc: office.desc !== undefined ? office.desc : defaultProps.desc,
      address: office.address !== undefined ? office.address : defaultProps.address,
      workingHours: office.workingHours !== undefined ? office.workingHours : defaultProps.workingHours,
      phone: office.phone !== undefined ? office.phone : defaultProps.phone,
      email: office.email !== undefined ? office.email : defaultProps.email,
      mapEmbedUrl: office.mapEmbedUrl !== undefined ? office.mapEmbedUrl : defaultProps.mapEmbedUrl,
    };
  }, [cmsData]);

  const t = (obj?: DynamicContent | string): string => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj['en'] || '';
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const mapVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="py-20 md:py-28 bg-[#fdfbf7] border-t border-slate-100 relative overflow-hidden">
      {/* Decorative background blur shapes */}
      <div className="absolute top-1/2 -left-64 w-96 h-96 bg-sky/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 -right-64 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-v2 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Details / Text Column */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 flex flex-col items-start text-left"
          >
            {/* Badge */}
            {sectionProps.badge && (
              <motion.span 
                variants={itemVariants}
                className="inline-flex items-center px-4 py-1.5 rounded-full bg-sky/10 text-sky text-xs font-bold tracking-widest uppercase mb-4"
              >
                {t(sectionProps.badge)}
              </motion.span>
            )}

            {/* Title */}
            <motion.h2 
              variants={itemVariants}
              className="font-black text-slate-800 tracking-tight leading-tight mb-4"
              style={{ 
                fontSize: 'clamp(2.25rem, 5vw, 3.25rem)', 
                fontFamily: 'Poppins, sans-serif'
              }}
            >
              {t(sectionProps.title)}
            </motion.h2>

            {/* Description */}
            {sectionProps.desc && (
              <motion.p 
                variants={itemVariants}
                className="text-slate-500 font-medium text-base md:text-lg mb-8 leading-relaxed"
              >
                {t(sectionProps.desc)}
              </motion.p>
            )}

            {/* Details Cards */}
            <div className="w-full flex flex-col gap-5">
              
              {/* Address */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ x: 4 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100/80 shadow-sm"
              >
                <div className="w-12 h-12 bg-sky/5 text-sky rounded-xl flex items-center justify-center flex-shrink-0">
                  <LucideIcon name="MapPin" size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">
                    {lang === 'hi' ? "कार्यालय का पता" : "Office Address"}
                  </h4>
                  <p className="text-sm font-extrabold text-slate-800 leading-snug">
                    {t(sectionProps.address)}
                  </p>
                </div>
              </motion.div>

              {/* Working Hours */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ x: 4 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100/80 shadow-sm"
              >
                <div className="w-12 h-12 bg-amber-500/5 text-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <LucideIcon name="Clock" size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">
                    {lang === 'hi' ? "कार्यकाल" : "Working Hours"}
                  </h4>
                  <p className="text-sm font-extrabold text-slate-800 leading-snug">
                    {t(sectionProps.workingHours)}
                  </p>
                </div>
              </motion.div>

              {/* Contact Info Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                {sectionProps.phone && (
                  <motion.a 
                    href={`tel:${sectionProps.phone}`}
                    variants={itemVariants}
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-100/80 shadow-sm hover:border-sky/20 transition-all duration-300"
                  >
                    <div className="w-10 h-10 bg-emerald-500/5 text-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <LucideIcon name="Phone" size={18} strokeWidth={2} />
                    </div>
                    <div className="truncate">
                      <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
                        {lang === 'hi' ? "फ़ोन" : "Phone"}
                      </h4>
                      <p className="text-xs font-bold text-slate-700 truncate">
                        {sectionProps.phone}
                      </p>
                    </div>
                  </motion.a>
                )}

                {/* Email */}
                {sectionProps.email && (
                  <motion.a 
                    href={`mailto:${sectionProps.email}`}
                    variants={itemVariants}
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-100/80 shadow-sm hover:border-sky/20 transition-all duration-300"
                  >
                    <div className="w-10 h-10 bg-rose-500/5 text-rose-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <LucideIcon name="Mail" size={18} strokeWidth={2} />
                    </div>
                    <div className="truncate">
                      <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
                        {lang === 'hi' ? "ईमेल" : "Email"}
                      </h4>
                      <p className="text-xs font-bold text-slate-700 truncate">
                        {sectionProps.email}
                      </p>
                    </div>
                  </motion.a>
                )}
              </div>

            </div>
          </motion.div>
          
          {/* Map Column */}
          <motion.div 
            variants={mapVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 w-full h-[350px] sm:h-[450px] md:h-[500px]"
          >
            <div className="w-full h-full rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-100/60 bg-white p-2">
              <iframe
                title="Office Location Map"
                src={sectionProps.mapEmbedUrl}
                className="w-full h-full rounded-[2rem] border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default OfficeLocation;
