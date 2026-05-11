"use client";
import React from 'react';

interface PageHeroV2Props {
  title: string;
  subtitle?: string;
  badge?: string;
  image?: string;
  centered?: boolean;
}

const PageHeroV2: React.FC<PageHeroV2Props> = ({ 
  title, 
  subtitle, 
  badge, 
  image = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1800&auto=format&fit=crop&q=80',
  centered = true
}) => {
  return (
    <section className="page-hero-v2" style={{ 
      padding: '10rem 0 6rem', 
      background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${image}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container-v2" style={{ textAlign: centered ? 'center' : 'left', position: 'relative', zIndex: 1 }}>
        {badge && (
          <div className="hero-badge reveal visible" style={{ 
            display: 'inline-block', 
            background: 'rgba(255,255,255,0.15)', 
            backdropFilter: 'blur(10px)',
            padding: '0.4rem 1.2rem',
            borderRadius: '2rem',
            color: '#fff',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            {badge}
          </div>
        )}
        
        <h1 className="reveal visible delay-1" style={{ 
          fontFamily: 'Poppins, sans-serif', 
          fontWeight: 900, 
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
          color: '#fff', 
          lineHeight: 1.1,
          marginBottom: '1.5rem'
        }}>
          {title}
        </h1>
        
        {subtitle && (
          <p className="reveal visible delay-2" style={{ 
            color: 'rgba(255,255,255,0.85)', 
            fontSize: '1.1rem', 
            maxWidth: '700px', 
            margin: centered ? '0 auto' : '0',
            lineHeight: 1.6 
          }}>
            {subtitle}
          </p>
        )}
      </div>

      <div className="hero-wave" style={{ 
        position: 'absolute', 
        bottom: -1, 
        left: 0, 
        width: '100%', 
        height: '60px', 
        background: 'linear-gradient(to top, var(--white), transparent)' 
      }} />
    </section>
  );
};

export default PageHeroV2;
