"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { contactFormData } from './contactFormData';
import LucideIcon from '../../../components/LucideIcon';
import ButtonV2 from '../../../components-v2/ButtonV2';

interface ContactFormProps {
  cmsData?: any;
}

interface DynamicContent {
  [key: string]: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ cmsData }) => {
  const pathname = usePathname();

  const lang = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === 'hi') return 'hi';
    return 'en';
  }, [pathname]);

  const [internalCmsData, setInternalCmsData] = useState<any>(null);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", destination: "", travelDate: "", adults: "2", message: ""
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!cmsData) {
      fetch("/api/page-cms/contact")
        .then(res => res.json())
        .then(result => {
          if (result.success) setInternalCmsData(result.data);
        })
        .catch(err => console.error("CMS FETCH ERROR:", err));
    }
  }, [cmsData]);

  const activeCmsData = cmsData || internalCmsData;
  const contact = activeCmsData?.contactInfo || {};
  const social = activeCmsData?.social || {};
  const formSettings = activeCmsData?.formSettings || { enabled: true, successMessage: "" };

  const t = (obj?: DynamicContent | string): string => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj['en'] || '';
  };

  const upd = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate API Submission
    await new Promise(r => setTimeout(r, 1200));
    setSent(true);
    setSending(false);
  };

  const contactInfoList = useMemo(() => {
    const f = contactFormData.props.sidebar;
    return [
      {
        icon: "MapPin",
        label: t(f.visitUs.label),
        value: contact.address?.trim() || t(f.visitUs.value),
        sub: contact.workingHours?.trim() || t(f.visitUs.sub)
      },
      {
        icon: "Phone",
        label: t(f.callUs.label),
        value: contact.phone?.trim() || f.callUs.value,
        sub: contact.supportText?.trim() || t(f.callUs.sub)
      },
      {
        icon: "Mail",
        label: t(f.emailUs.label),
        value: contact.email?.trim() || f.emailUs.value,
        sub: contact.emailText?.trim() || t(f.emailUs.sub)
      },
      {
        icon: "MessageSquare",
        label: t(f.whatsapp.label),
        value: contact.whatsapp?.trim() || f.whatsapp.value,
        sub: contact.whatsappText?.trim() || t(f.whatsapp.sub)
      }
    ];
  }, [contact, lang]);

  const socialLinks = useMemo(() => {
    return [
      { label: "Instagram", icon: "Instagram", url: social.instagram || "https://instagram.com" },
      { label: "Facebook", icon: "Facebook", url: social.facebook || "https://facebook.com" },
      { label: "YouTube", icon: "Youtube", url: social.youtube || "https://youtube.com" }
    ];
  }, [social]);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const sidebarProps = contactFormData.props.sidebar;
  const formProps = contactFormData.props.form;

  return (
    <section className="py-20 md:py-28 bg-white relative">
      <div className="container-v2">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Sidebar Area */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex-1 lg:max-w-md flex flex-col gap-6"
          >
            {contactInfoList.map((info, i) => (
              <motion.div 
                key={info.label} 
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-6 md:p-8 rounded-[2rem] bg-slate-50 border border-slate-100 flex gap-6 items-center shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-14 h-14 bg-sky-50 text-sky rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                  <LucideIcon name={info.icon} size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{info.label}</p>
                  <p className="text-base font-extrabold text-slate-800 leading-tight mb-0.5">{info.value}</p>
                  <p className="text-xs text-slate-500 font-medium">{info.sub}</p>
                </div>
              </motion.div>
            ))}

            {/* Social Block */}
            <motion.div 
              variants={itemVariants}
              className="p-8 rounded-[2rem] text-white shadow-lg flex flex-col gap-6"
              style={{ background: 'var(--sky-dk)' }}
            >
              <h3 
                className="font-extrabold text-xl leading-none"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {social.title || t(sidebarProps.followUs.title)}
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {socialLinks.map(s => (
                  <button 
                    key={s.label} 
                    onClick={() => s.url && window.open(s.url, "_blank")}
                    className="flex items-center justify-center gap-1.5 py-3 px-2 rounded-2xl bg-white/10 border border-white/10 hover:bg-white hover:text-[var(--sky-dk)] hover:border-white text-white text-xs font-bold transition-all hover:scale-[1.03]"
                  >
                    <LucideIcon name={s.icon} size={14} strokeWidth={2.5} />
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Form Box Area */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-[1.3] w-full"
          >
            <div className="p-8 md:p-12 rounded-[3rem] bg-white border border-slate-100 shadow-xl shadow-slate-100/50">
              {sent ? (
                <div className="text-center py-10 flex flex-col items-center justify-center">
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="text-sky mb-6"
                  >
                    <LucideIcon name="PartyPopper" size={80} strokeWidth={1} />
                  </motion.div>
                  <h2 
                    className="font-black text-3xl text-slate-800 mb-4"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {t(formProps.successTitle)}
                  </h2>
                  <p className="text-slate-500 font-medium text-base mb-8 max-w-md leading-relaxed">
                    {formSettings.successMessage ? (
                      formSettings.successMessage.replace("{name}", form.name)
                    ) : (
                      <>Thank you, <strong>{form.name}</strong>! Our travel expert will reach out to you within 24 hours.</>
                    )}
                  </p>
                  <ButtonV2 
                    onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", destination: "", travelDate: "", adults: "2", message: "" }); }} 
                    variant="sky"
                    className="px-8 py-3.5 rounded-full font-bold shadow-md hover:scale-105 transition-transform"
                  >
                    {t(formProps.successBtn)}
                  </ButtonV2>
                </div>
              ) : (
                <>
                  <h2 
                    className="font-black text-3xl text-slate-800 mb-2"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {t(formProps.title)}
                  </h2>
                  <p className="text-slate-500 font-medium text-sm md:text-base mb-8">
                    {t(formProps.desc)}
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Name input */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t(formProps.labels.fullName)}</label>
                        <input 
                          required 
                          value={form.name} 
                          onChange={e => upd("name", e.target.value)} 
                          placeholder={formProps.placeholders.fullName} 
                          className="w-full px-5 py-4 rounded-2xl border border-slate-200 text-slate-800 font-medium text-sm outline-none focus:border-sky transition-colors placeholder:text-slate-400"
                        />
                      </div>

                      {/* Email input */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t(formProps.labels.email)}</label>
                        <input 
                          required 
                          type="email" 
                          value={form.email} 
                          onChange={e => upd("email", e.target.value)} 
                          placeholder={formProps.placeholders.email} 
                          className="w-full px-5 py-4 rounded-2xl border border-slate-200 text-slate-800 font-medium text-sm outline-none focus:border-sky transition-colors placeholder:text-slate-400"
                        />
                      </div>

                      {/* Phone input */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t(formProps.labels.phone)}</label>
                        <input 
                          type="tel" 
                          value={form.phone} 
                          onChange={e => upd("phone", e.target.value)} 
                          placeholder={formProps.placeholders.phone} 
                          className="w-full px-5 py-4 rounded-2xl border border-slate-200 text-slate-800 font-medium text-sm outline-none focus:border-sky transition-colors placeholder:text-slate-400"
                        />
                      </div>

                      {/* Travellers select */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t(formProps.labels.travellers)}</label>
                        <select 
                          value={form.adults} 
                          onChange={e => upd("adults", e.target.value)} 
                          className="w-full px-5 py-4 rounded-2xl border border-slate-200 text-slate-800 font-medium text-sm outline-none focus:border-sky transition-colors bg-white cursor-pointer"
                        >
                          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"].map(n => (
                            <option key={n} value={n}>
                              {n} Traveller{n !== "1" ? "s" : ""}
                            </option>
                          ))}
                        </select>
                      </div>

                    </div>

                    {/* Message textarea */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t(formProps.labels.message)}</label>
                      <textarea 
                        rows={4} 
                        value={form.message} 
                        onChange={e => upd("message", e.target.value)} 
                        placeholder={t(formProps.placeholders.message)} 
                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 text-slate-800 font-medium text-sm outline-none focus:border-sky resize-none transition-colors placeholder:text-slate-400"
                      />
                    </div>

                    <ButtonV2 
                      type="submit" 
                      variant="sky" 
                      className="py-4.5 rounded-full font-bold shadow-md shadow-sky/10 transition-all text-center text-sm md:text-base hover:scale-[1.02]"
                      disabled={sending}
                    >
                      {sending ? t(formProps.submittingBtn) : t(formProps.submitBtn)}
                    </ButtonV2>
                  </form>
                </>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactForm;
