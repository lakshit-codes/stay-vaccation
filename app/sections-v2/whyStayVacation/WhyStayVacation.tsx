"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Building2, Zap, Leaf, Check } from 'lucide-react';
import { whyStayVacationReasons } from './whyStayVacationData';

const IconMap = {
  Globe: Globe,
  Building: Building2,
  Zap: Zap,
  Leaf: Leaf,
};

const WhyStayVacation = () => {
  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-50/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-50/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="container-v2">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-bold tracking-widest uppercase mb-4"
          >
            + WHY STAYVACATION
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight"
          >
            Travel <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">Smarter, Live Better</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-500 text-base md:text-lg max-w-xl mx-auto mt-4 leading-relaxed"
          >
            We go beyond booking. Our team of travel experts crafts every detail for your perfect escape.
          </motion.p>
        </div>

        {/* Grid of Reasons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {whyStayVacationReasons.map((reason, index) => {
            const IconComponent = IconMap[reason.iconName];
            return (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="flex flex-col p-8 rounded-[2rem] bg-slate-50/60 border border-slate-100 hover:border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Icon Container */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform duration-300 hover:rotate-6 hover:scale-110"
                  style={{ backgroundColor: reason.iconBg }}
                >
                  <IconComponent className="w-6 h-6" style={{ color: reason.iconColor }} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-slate-800 text-center mb-3">
                  {reason.title}
                </h3>
                <p className="text-sm text-slate-500 text-center leading-relaxed mb-6">
                  {reason.description}
                </p>

                {/* Bullets List */}
                <ul className="flex flex-col gap-3 text-left w-fit mx-auto mt-auto pt-5 border-t border-slate-100/70 w-full">
                  {reason.bullets.map((bullet, idx) => (
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
