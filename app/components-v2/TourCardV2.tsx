"use client";
import React from 'react';
import Link from 'next/link';

interface TourCardV2Props {
  pkg: {
    id?: string;
    _id?: string;
    name?: string;
    title?: string;
    image?: string;
    rating?: number;
    reviewCount?: number;
    category?: string;
    tourType?: string;
    duration?: string;
    tripDuration?: string;
    maxPeople?: number;
    price?: any;
    badge?: string;
    slug?: string;
  };
  index?: number;
}

const TourCardV2: React.FC<TourCardV2Props> = ({ pkg, index = 0 }) => {
  const id = pkg.id || pkg._id;
  const name = pkg.name || pkg.title;
  const image = pkg.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80';
  const category = pkg.category || pkg.tourType || 'Experience';
  const duration = pkg.duration || pkg.tripDuration || 'Flexible';
  const priceAmount = pkg.price?.amount || pkg.price || 'Contact Us';
  const slug = pkg.slug || id;

  return (
    <article className="tour-card reveal visible" style={{ animationDelay: `${index * 100}ms` }}>
      <Link href={`/packages/${slug}`} className="tour-img-wrap">
        <img className="tour-img" src={image} alt={name} loading="lazy" />
        {pkg.badge && <div className="tour-badge">{pkg.badge}</div>}
        <div className="tour-rating" style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.9)', padding: '0.3rem 0.7rem', borderRadius: '2rem', fontSize: '0.78rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem', zIndex: 2 }}>
          <span style={{ color: '#f59e0b' }}>★</span> {pkg.rating || 4.8} ({pkg.reviewCount || 0})
        </div>
      </Link>
      <div className="tour-body">
        <div className="tour-category" style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--sky)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{category}</div>
        <Link href={`/packages/${slug}`}>
          <h3 className="tour-name" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.5rem', color: 'var(--text)', transition: 'color 0.3s' }}>{name}</h3>
        </Link>
        <div className="tour-details" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <div className="tour-detail" style={{ fontSize: '0.78rem', color: 'var(--muted)', background: 'var(--sky-lt)', padding: '0.25rem 0.7rem', borderRadius: '2rem' }}>📅 {duration}</div>
          {pkg.maxPeople && <div className="tour-detail" style={{ fontSize: '0.78rem', color: 'var(--muted)', background: 'var(--sky-lt)', padding: '0.25rem 0.7rem', borderRadius: '2rem' }}>👥 Max {pkg.maxPeople}</div>}
        </div>
        <div className="tour-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '0.9rem' }}>
          <div className="tour-price">
            <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>Starting from</div>
            <span className="amount">${priceAmount}</span><span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>/person</span>
          </div>
          <Link href={`/packages/${slug}`} className="tour-book-btn" style={{ background: 'linear-gradient(135deg, var(--sky), var(--sky-dk))', color: '#fff', padding: '0.55rem 1.1rem', borderRadius: '2rem', fontWeight: 700, fontSize: '0.8rem', textDecoration: 'none' }}>Book Now</Link>
        </div>
      </div>
    </article>
  );
};

export default TourCardV2;
