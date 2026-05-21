"use client";

import React, { useState, useMemo } from "react";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "@/lib/router";
import { useAppSelector } from "@/lib/store/hooks";
import { faqSectionData } from "./faqSectionData";

interface FAQProps {
  section?: any;
}

const FaqSection = ({ section: propSection }: FAQProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const pathname = usePathname();
  // Safe selector to avoid TypeError if pages slice is missing
  const currentPages = useAppSelector((state: any) => state.pages?.currentPages);

  const lang = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments[0] === "hi") return "hi";
    return "en";
  }, [pathname]);

  const getCurrentSection = useMemo(() => {
    if (!currentPages) return;
    return currentPages.content?.find((page: any) => page?.adminTitle === "FAQ");
  }, [currentPages]);

  const section = propSection || getCurrentSection;
  const p = (section as any)?.props || {};
  
  const heading = p.heading?.[lang] || p.heading?.en || p.heading || "Frequently Asked Questions";
  const subheading = p.subheading?.[lang] || p.subheading?.en || p.subheading || "";
  const viewAllLabel = p.viewAllLabel?.[lang] || p.viewAllLabel?.en || p.viewAllLabel || "View All FAQs";
  const viewAllLink = p.viewAllLink || "/faq";

  const items = (section as any)?.content || faqSectionData;

  return (
    <section
      data-annotate-id="home-faq-section"
      className="md:py-[120px] md:px-[5%] py-[50px] px-[5%] bg-white"
    >
      <div className="flex flex-col items-center text-center mb-[60px]">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:text-[38px] text-[28px] font-bold leading-tight tracking-tight mb-4"
        >
          {heading}
        </motion.h2>
        {subheading && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted max-w-2xl mb-6"
          >
            {subheading}
          </motion.p>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            href={viewAllLink}
            className="text-secondary font-black tracking-[2px] uppercase text-xs border-b border-secondary pb-1 hover:text-secondary/80 transition-colors"
          >
            {viewAllLabel}
          </Link>
        </motion.div>
      </div>

      <div className="max-w-[800px] mx-auto">
        {items.map((faq: any, idx: number) => {
          const p = faq.props || {};
          const title = p.title?.[lang] || p.title?.en || p.title || faq.title?.[lang] || faq.title?.en || faq.title || "";
          const description = p.description?.[lang] || p.description?.en || p.description || faq.description?.[lang] || faq.description?.en || faq.description || "";
          
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="border-b border-border py-[22px] cursor-pointer group"
              onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
            >
              <div className="flex justify-between items-center gap-3.5">
                <h4 className="font-heading text-[20px] font-bold group-hover:text-secondary transition-colors">
                  {title}
                </h4>
                <div className="flex-shrink-0">
                  {activeIndex === idx ? (
                    <Minus className="text-secondary" size={22} />
                  ) : (
                    <Plus className="text-secondary" size={22} />
                  )}
                </div>
              </div>
              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="text-muted text-[15px] font-semibold mt-3 leading-relaxed">
                      {description}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default FaqSection;
