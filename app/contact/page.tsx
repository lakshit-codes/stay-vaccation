"use client";

import { useState, useEffect } from "react";
import LayoutV2 from "../layouts-v2/LayoutV2";
import PageHeroV2 from "../components-v2/PageHeroV2";
import ButtonV2 from "../components-v2/ButtonV2";
import LucideIcon from "../components/LucideIcon";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", destination: "", travelDate: "", adults: "2", message: ""
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [cmsData, setCmsData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/page-cms/contact")
      .then(res => res.json())
      .then(result => {
        if (result.success) setCmsData(result.data);
      })
      .catch(err => console.error("CMS FETCH ERROR:", err));
  }, []);

  const upd = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate submit (replace with real API call)
    await new Promise(r => setTimeout(r, 1200));
    setSent(true);
    setSending(false);
  };

  // Static Fallbacks
  const contact = cmsData?.contactInfo || {};
  const hero = cmsData?.hero || {};
  const social = cmsData?.social || {};
  const office = cmsData?.office || {};
  const formSettings = cmsData?.formSettings || { enabled: true, successMessage: "" };

  const CONTACT_INFO = [
    { 
      icon: "MapPin", 
      label: "Visit Us", 
      value: contact.address || "123 Travel Lane, Mumbai, India 400001", 
      sub: contact.workingHours || "Mon–Sat 9am – 6pm" 
    },
    { 
      icon: "Phone", 
      label: "Call Us", 
      value: contact.phone || "+91 98765 43210", 
      sub: contact.supportText || "Support available daily" 
    },
    { 
      icon: "Mail", 
      label: "Email Us", 
      value: contact.email || "hello@stayvacation.com", 
      sub: contact.emailText || "We reply within 24 hours" 
    },
    { 
      icon: "MessageSquare", 
      label: "WhatsApp", 
      value: contact.whatsapp || "+91 98765 43210", 
      sub: contact.whatsappText || "Quick response guaranteed" 
    },
  ];

  const socialLinks = [
    { label: "Instagram", url: social.instagram },
    { label: "Facebook", url: social.facebook },
    { label: "YouTube", url: social.youtube }
  ];

  return (
    <LayoutV2>
      <PageHeroV2 
        title={hero.title || "Let&apos;s Start Your Journey"} 
        subtitle={hero.description || "Have a question or want to plan your dream trip? Our travel experts are here to help you craft the perfect itinerary."}
        badge="Get in touch"
        image="https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=1800&auto=format&fit=crop&q=80"
      />

      <section style={{ padding: '6rem 0', background: 'var(--white)' }}>
        <div className="container-v2">
          <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
            
            {/* Contact Info Sidebar */}
            <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {CONTACT_INFO.map((info, i) => (
                <div 
                  key={info.label} 
                  className="reveal visible"
                  style={{ 
                    padding: '2rem', 
                    borderRadius: '2rem', 
                    background: 'var(--cream)', 
                    border: '1px solid #f1f5f9',
                    display: 'flex',
                    gap: '1.5rem',
                    alignItems: 'center',
                    animationDelay: `${i * 100}ms`,
                    transition: 'transform 0.3s'
                  }}
                >
                  <div style={{ color: 'var(--sky)' }}>
                    <LucideIcon name={info.icon} size={32} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>{info.label}</p>
                    <p style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text)' }}>{info.value}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{info.sub}</p>
                  </div>
                </div>
              ))}

              {/* Social Box */}
              <div style={{ padding: '2rem', borderRadius: '2rem', background: 'var(--sky-dk)', color: '#fff', marginTop: '1rem' }}>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.1rem', marginBottom: '1.5rem' }}>{social.title || "Follow Our Journeys"}</h3>
                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  {socialLinks.map(s => (
                    <button 
                      key={s.label} 
                      onClick={() => s.url && window.open(s.url, "_blank")}
                      style={{ 
                        flex: 1, 
                        padding: '0.8rem', 
                        borderRadius: '1rem', 
                        background: 'rgba(255,255,255,0.1)', 
                        border: '1px solid rgba(255,255,255,0.1)', 
                        color: '#fff',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: s.url ? 'pointer' : 'not-allowed',
                        opacity: s.url ? 1 : 0.5,
                        transition: 'all 0.3s'
                      }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div style={{ flex: '2 1 500px' }}>
              <div style={{ padding: '3rem', borderRadius: '3rem', background: 'var(--white)', border: '1.5px solid #f1f5f9', boxShadow: 'var(--shadow)' }}>
                {sent ? (
                  <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                    <div style={{ color: 'var(--sky)', marginBottom: '1.5rem' }}>
                      <LucideIcon name="PartyPopper" size={80} strokeWidth={1} />
                    </div>
                    <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: '2rem', marginBottom: '1rem' }}>Enquiry Sent!</h2>
                    <p style={{ color: 'var(--muted)', fontSize: '1rem', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                      {formSettings.successMessage ? (
                        formSettings.successMessage.replace("{name}", form.name)
                      ) : (
                        <>Thank you, <strong>{form.name}</strong>! Our travel expert will reach out to you within 24 hours.</>
                      )}
                    </p>
                    <ButtonV2 onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", destination: "", travelDate: "", adults: "2", message: "" }); }} variant="sky">Send Another Enquiry</ButtonV2>
                  </div>
                ) : (
                  <>
                    <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.6rem', marginBottom: '0.5rem' }}>Plan Your Trip</h2>
                    <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '2.5rem' }}>Fill in the details below and we&apos;ll craft a personalised itinerary for you.</p>

                    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>Full Name *</label>
                          <input required value={form.name} onChange={e => upd("name", e.target.value)} placeholder="John Doe" style={{ width: '100%', padding: '1rem 1.2rem', borderRadius: '1rem', border: '1.5px solid #e5e7eb', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.3s' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>Email Address *</label>
                          <input required type="email" value={form.email} onChange={e => upd("email", e.target.value)} placeholder="john@example.com" style={{ width: '100%', padding: '1rem 1.2rem', borderRadius: '1rem', border: '1.5px solid #e5e7eb', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.3s' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>Phone Number</label>
                          <input type="tel" value={form.phone} onChange={e => upd("phone", e.target.value)} placeholder="+91 98765 43210" style={{ width: '100%', padding: '1rem 1.2rem', borderRadius: '1rem', border: '1.5px solid #e5e7eb', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.3s' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>Travellers</label>
                          <select value={form.adults} onChange={e => upd("adults", e.target.value)} style={{ width: '100%', padding: '1rem 1.2rem', borderRadius: '1rem', border: '1.5px solid #e5e7eb', fontSize: '0.9rem', outline: 'none', background: 'var(--white)', cursor: 'pointer' }}>
                            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"].map(n => <option key={n} value={n}>{n} Traveller{n !== "1" ? "s" : ""}</option>)}
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>Message</label>
                        <textarea rows={4} value={form.message} onChange={e => upd("message", e.target.value)} placeholder="Tell us about your dream trip..." style={{ width: '100%', padding: '1rem 1.2rem', borderRadius: '1rem', border: '1.5px solid #e5e7eb', fontSize: '0.9rem', outline: 'none', resize: 'none', transition: 'border-color 0.3s' }} />
                      </div>

                      <ButtonV2 type="submit" variant="sky" style={{ padding: '1.2rem' }} disabled={sending}>
                        {sending ? "Sending Enquiry..." : "Send Enquiry →"}
                      </ButtonV2>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Section */}
      <section style={{ padding: '6rem 0', background: 'var(--cream)', borderTop: '1px solid #f1f5f9' }}>
        <div className="container-v2" style={{ textAlign: 'center' }}>
          <div style={{ color: 'var(--sky)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
            <LucideIcon name="Map" size={60} strokeWidth={1} />
          </div>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: '2rem', marginBottom: '1rem' }}>{office.title || "Visit Our Office"}</h2>
          <p style={{ color: 'var(--muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            {office.address || "123 Travel Lane, Mumbai, India 400001"}
          </p>
        </div>
      </section>
    </LayoutV2>
  );
}
