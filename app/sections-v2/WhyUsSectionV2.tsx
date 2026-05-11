import React from 'react';
import SectionHeaderV2 from '../components-v2/SectionHeaderV2';

const WhyUsSectionV2 = () => {
  const reasons = [
    {
      icon: '🗺',
      title: 'Local Experts',
      text: 'Insider knowledge from locals who live and breathe your destination.',
      bullets: ['On-ground guides & support', 'Hidden gems, not tourist traps', '24/7 in-destination help']
    },
    {
      icon: '🏨',
      title: 'Premium Stays',
      text: 'Curated collection of world-class hotels, villas, and eco-retreats.',
      bullets: ['5-star to boutique options', 'All inspected & rated by us', 'Best rate guarantee']
    },
    {
      icon: '⚡',
      title: 'Seamless Booking',
      text: 'Book flights, hotels, transfers & experiences in one simple flow.',
      bullets: ['One click checkout', 'Instant confirmation', 'Flexible change policy']
    },
    {
      icon: '🌱',
      title: 'Eco-Friendly',
      text: 'Responsible travel that protects the places we love to explore.',
      bullets: ['Carbon offset on every trip', 'Certified eco-partners', 'Leave No Trace philosophy']
    }
  ];

  return (
    <section id="why" style={{ padding: '5rem 0', background: 'var(--white)', position: 'relative', overflow: 'hidden' }}>
      <div className="container-v2">
        <SectionHeaderV2 
          label="Why stayVacation"
          title="Travel"
          titleHighlight="Smarter, Live Better"
          subtitle="We go beyond booking. Our team of travel experts crafts every detail for your perfect escape."
          centered
          className="mb-14"
        />

        <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {reasons.map((reason, index) => (
            <div key={index} className="why-card reveal visible" style={{ padding: '2rem 1.5rem', borderRadius: '1.4rem', background: 'var(--cream)', border: '1.5px solid #e5e7eb', textAlign: 'center' }}>
              <div className="why-icon" style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)', borderRadius: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', margin: '0 auto 1.1rem' }}>
                {reason.icon}
              </div>
              <div className="why-title" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>{reason.title}</div>
              <p className="why-text" style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>{reason.text}</p>
              <ul className="why-bullets" style={{ marginTop: '0.7rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.3rem', listStyle: 'none', padding: 0 }}>
                {reason.bullets.map((bullet, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--muted)' }}>
                    <span style={{ color: 'var(--green)', fontWeight: 700 }}>✓</span> {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSectionV2;
