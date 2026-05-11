import React from 'react';
import SectionHeaderV2 from '../components-v2/SectionHeaderV2';

const TestimonialsSectionV2 = () => {
  const reviews = [
    {
      name: 'Sarah Mitchell',
      trip: '🏝 Maldives Retreat',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      quote: "Absolutely breathtaking trip to the Maldives! Every detail was handled perfectly. The overwater bungalow exceeded our wildest expectations."
    },
    {
      name: 'James Kowalski',
      trip: '🏔 Swiss Alps Trek',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      quote: "The Swiss Alps hiking package was phenomenal. Our guide knew every secret trail. stayVacation is the only one I trust now."
    },
    {
      name: 'Priya Sharma',
      trip: '⛵ Greek Islands Cruise',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
      quote: "Our Greek islands cruise was pure magic. Santorini sunset from the sailboat — I'm still pinching myself. Seamless booking, zero stress."
    }
  ];

  return (
    <section id="testimonials" style={{ padding: '5rem 0', background: 'linear-gradient(180deg, var(--cream) 0%, #e8f4fd 100%)' }}>
      <div className="container-v2">
        <SectionHeaderV2 
          label="Traveler Stories"
          title="What Our"
          titleHighlight="Guests Say"
          subtitle="Real reviews from real adventurers who trusted us with their dream vacations."
          centered
          className="mb-12"
        />

        <div className="test-track" style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem' }}>
          {reviews.map((rev, index) => (
            <div key={index} className="test-card reveal visible" style={{ flex: '0 0 350px', background: 'var(--white)', borderRadius: '1.4rem', padding: '1.8rem', boxShadow: 'var(--shadow)', border: '1.5px solid rgba(135, 206, 235, 0.2)' }}>
              <div className="test-stars" style={{ color: '#f59e0b', fontSize: '1rem', marginBottom: '0.9rem' }}>★★★★★</div>
              <p className="test-quote" style={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.7, position: 'relative', paddingLeft: '1.2rem' }}>
                {rev.quote}
              </p>
              <div className="test-author" style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginTop: '1.2rem' }}>
                <img className="test-avatar" src={rev.avatar} alt={rev.name} style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover', border: '2.5px solid var(--sky-md)' }} />
                <div>
                  <div className="test-name" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.88rem' }}>{rev.name}</div>
                  <div className="test-trip" style={{ fontSize: '0.75rem', color: 'var(--sky)', fontWeight: 600 }}>{rev.trip}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSectionV2;
