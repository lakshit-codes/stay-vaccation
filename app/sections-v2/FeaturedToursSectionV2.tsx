import React from 'react';
import SectionHeaderV2 from '../components-v2/SectionHeaderV2';

interface TourPackage {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  category: string;
  duration: string;
  maxPeople: number;
  price: number;
  badge?: string;
}

interface FeaturedToursSectionV2Props {
  packages?: TourPackage[];
}

const FeaturedToursSectionV2: React.FC<FeaturedToursSectionV2Props> = ({ packages }) => {
  const displayPackages = (packages && packages.length > 0) ? packages : [
    { id: '1', name: 'Maldives Luxury Overwater Retreat', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=80', rating: 4.9, reviewCount: 248, category: '🐬 Island Escape', duration: '7 Days', maxPeople: 12, price: 1299, badge: '🔥 Best Seller' },
    { id: '2', name: 'Swiss Alps Scenic Hiking & Skiing', image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=600&auto=format&fit=crop&q=80', rating: 4.8, reviewCount: 132, category: '🥾 Mountain Trek', duration: '10 Days', maxPeople: 8, price: 2199, badge: '🏔 New' },
    { id: '3', name: 'Greek Islands Sailing Discovery', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&auto=format&fit=crop&q=80', rating: 4.9, reviewCount: 316, category: '⛵ Cruise & Culture', duration: '8 Days', maxPeople: 16, price: 1649, badge: '🌅 Popular' }
  ];

  return (
    <section id="tours" style={{ padding: '5rem 0', background: 'linear-gradient(180deg, #f0f9ff 0%, var(--cream) 100%)' }}>
      <div className="container-v2">
        <SectionHeaderV2 
          label="Featured Tours"
          title="Unforgettable"
          titleHighlight="Tour Packages"
          subtitle="Carefully curated experiences designed for explorers who want more than just a holiday."
          centered
          className="mb-12"
        />

        <div className="tours-track">
          {displayPackages.map((pkg) => (
            <article key={pkg.id} className="tour-card reveal visible">
              <div className="tour-img-wrap">
                <img className="tour-img" src={pkg.image} alt={pkg.name} loading="lazy" />
                {pkg.badge && <div className="tour-badge">{pkg.badge}</div>}
                <div className="tour-rating" style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.9)', padding: '0.3rem 0.7rem', borderRadius: '2rem', fontSize: '0.78rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span style={{ color: '#f59e0b' }}>★</span> {pkg.rating} ({pkg.reviewCount})
                </div>
              </div>
              <div className="tour-body">
                <div className="tour-category" style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--sky)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{pkg.category}</div>
                <div className="tour-name" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.5rem' }}>{pkg.name}</div>
                <div className="tour-details" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <div className="tour-detail" style={{ fontSize: '0.78rem', color: 'var(--muted)', background: 'var(--sky-lt)', padding: '0.25rem 0.7rem', borderRadius: '2rem' }}>📅 {pkg.duration}</div>
                  <div className="tour-detail" style={{ fontSize: '0.78rem', color: 'var(--muted)', background: 'var(--sky-lt)', padding: '0.25rem 0.7rem', borderRadius: '2rem' }}>👥 Max {pkg.maxPeople}</div>
                </div>
                <div className="tour-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '0.9rem' }}>
                  <div className="tour-price">
                    <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>Starting from</div>
                    <span className="amount">${pkg.price.toLocaleString()}</span><span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>/person</span>

                  </div>
                  <button className="tour-book-btn" style={{ background: 'linear-gradient(135deg, var(--sky), var(--sky-dk))', color: '#fff', padding: '0.55rem 1.1rem', borderRadius: '2rem', fontWeight: 700, border: 'none', fontSize: '0.8rem' }}>Book Now</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedToursSectionV2;
