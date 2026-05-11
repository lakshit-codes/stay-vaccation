"use client";
import React from 'react';
import SectionHeaderV2 from '../components-v2/SectionHeaderV2';

const BookingSectionV2 = () => {
  return (
    <section id="booking" style={{ padding: '5rem 0', background: 'var(--white)' }}>
      <div className="container-v2">
        <div className="booking-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          {/* visual left */}
          <div className="booking-visual reveal visible" style={{ position: 'relative' }}>
            <img className="booking-main-img" src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80" alt="Luxury resort" style={{ width: '100%', height: '440px', objectFit: 'cover', borderRadius: '1.5rem', boxShadow: 'var(--shadow2)' }} />
            <img className="booking-thumb" src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400&auto=format&fit=crop&q=80" alt="Beach" style={{ position: 'absolute', bottom: '-1.5rem', right: '-1.5rem', width: '160px', height: '130px', objectFit: 'cover', borderRadius: '1rem', border: '4px solid var(--white)', boxShadow: 'var(--shadow)' }} />
          </div>

          {/* form right */}
          <div className="reveal visible delay-1">
            <SectionHeaderV2 
              label="Start Planning"
              title="Book Your"
              titleHighlight="Perfect Trip"
              subtitle="Fill in the details below and our travel experts will craft your personalised itinerary within 24 hours."
              className="mb-8"
            />
            
            <form className="booking-form" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--sky)', textTransform: 'uppercase' }}>Full Name</label>
                  <input type="text" placeholder="John Doe" style={{ padding: '0.85rem 1rem', border: '1.5px solid #e2e8f0', borderRadius: '0.75rem', background: 'var(--cream)' }} />
                </div>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--sky)', textTransform: 'uppercase' }}>Email</label>
                  <input type="email" placeholder="john@example.com" style={{ padding: '0.85rem 1rem', border: '1.5px solid #e2e8f0', borderRadius: '0.75rem', background: 'var(--cream)' }} />
                </div>
              </div>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--sky)', textTransform: 'uppercase' }}>Destination</label>
                <select style={{ padding: '0.85rem 1rem', border: '1.5px solid #e2e8f0', borderRadius: '0.75rem', background: 'var(--cream)' }}>
                  <option>Select Destination</option>
                  <option>Maldives</option>
                  <option>Switzerland</option>
                  <option>Greece</option>
                </select>
              </div>
              <button className="btn-v2 btn-orange" style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}>
                Confirm Booking Plan
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSectionV2;
