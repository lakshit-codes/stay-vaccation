"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Palmtree, Mountain, Sailboat, MapPin } from 'lucide-react';
import { travelerStoriesData } from './travelerStoriesData';

const PackageIconMap = {
  Palmtree: Palmtree,
  Mountain: Mountain,
  Sailboat: Sailboat,
};

const TravelerStories = () => {
  const { badge, titleNormal, titleHighlight, subtitle, testimonials } = travelerStoriesData;

  return (
    <section 
      id="traveler-stories" 
      className="py-20 md:py-28 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, var(--cream) 0%, #e8f4fd 100%)'
      }}
    >
      {/* Decorative background blur shapes */}
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="container-v2">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-bold tracking-widest uppercase mb-4"
          >
            {badge}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight"
          >
            {titleNormal}
            <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
              {titleHighlight}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-500 text-base md:text-lg max-w-xl mx-auto mt-4 leading-relaxed"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item, index) => {
            const IconComponent = PackageIconMap[item.packageIconName] || MapPin;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="flex flex-col p-8 rounded-[2rem] bg-white border border-sky-100/50 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Gold Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 stroke-none" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-slate-600 text-sm md:text-[0.95rem] leading-relaxed mb-6 font-medium italic flex-grow">
                  "{item.review}"
                </p>

                {/* Author Info */}
                <div className="mt-auto pt-5 border-t border-slate-100/80">
                  <h3 className="font-bold text-slate-800 text-sm md:text-[0.95rem]">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-sky-500 font-semibold mt-1">
                    <IconComponent className="w-3.5 h-3.5 shrink-0" />
                    <span>{item.packageName}</span>
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
