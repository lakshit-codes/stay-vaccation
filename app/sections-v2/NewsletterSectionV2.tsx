import React from 'react';

const NewsletterSectionV2 = () => {
  return (
    <section id="newsletter" style={{ padding: '4rem 0', background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)' }}>
      <div className="container-v2">
        <div className="nl-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
          <div className="nl-text reveal visible">
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.6rem' }}>
              Subscribe to <span>stayVacation</span>
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginTop: '0.3rem' }}>
              Get exclusive travel deals and inspiration delivered to your inbox.
            </p>
          </div>
          
          <form className="nl-form reveal visible delay-1" style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="nl-input" 
              style={{ padding: '0.85rem 1.2rem', border: '1.5px solid #fcd34d', borderRadius: '3rem', background: 'var(--white)', width: '280px' }} 
            />
            <button 
              className="btn-v2 btn-orange" 
              style={{ padding: '0.85rem 1.8rem' }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSectionV2;
