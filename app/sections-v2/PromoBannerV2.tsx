import React from 'react';

const PromoBannerV2 = () => {
  return (
    <section id="promo" style={{ padding: '4rem 0', background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #0ea5e9 100%)', position: 'relative', overflow: 'hidden' }}>
      <div className="container-v2 promo-inner" style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
        <div className="promo-text reveal visible" style={{ flex: '1 1 300px' }}>
          <div className="promo-tag" style={{ color: 'var(--orange)', fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            ✦ Our Impact
          </div>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)', color: '#fff', lineHeight: 1.2 }}>
            Trusted by <span style={{ color: 'var(--orange)' }}>Thousands</span><br />of Happy Travelers
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginTop: '0.5rem', fontSize: '0.95rem' }}>
            Join a global community of adventurers who've discovered their perfect vacation with stayVacation.
          </p>
        </div>

        <div className="promo-stat reveal visible delay-1" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="stat-item" style={{ textAlign: 'center' }}>
            <div className="stat-num" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: '2.2rem', color: '#fff', lineHeight: 1 }}>50K+</div>
            <div className="stat-lbl" style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.2rem' }}>Happy Travelers</div>
          </div>
          <div className="stat-divider" style={{ width: '1px', height: '50px', background: 'rgba(255,255,255,0.2)' }}></div>
          <div className="stat-item" style={{ textAlign: 'center' }}>
            <div className="stat-num" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: '2.2rem', color: '#fff', lineHeight: 1 }}>120+</div>
            <div className="stat-lbl" style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.2rem' }}>Destinations</div>
          </div>
          <div className="stat-divider" style={{ width: '1px', height: '50px', background: 'rgba(255,255,255,0.2)' }}></div>
          <div className="stat-item" style={{ textAlign: 'center' }}>
            <div className="stat-num" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: '2.2rem', color: '#fff', lineHeight: 1 }}>98%</div>
            <div className="stat-lbl" style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.2rem' }}>Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBannerV2;
