"use client";
import React, { useState, useEffect } from 'react';
import ButtonV2 from '../components-v2/ButtonV2';

const HERO_SLIDES = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1800&auto=format&fit=crop&q=80'
];

import SearchBarV2 from '../components-v2/SearchBarV2';

const HeroSectionV2 = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero-v2">
      <div className="hero-slides">
        {HERO_SLIDES.map((slide, index) => (
          <div 
            key={index} 
            className={`hero-slide ${index === activeSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url('${slide}')` }}
          />
        ))}
      </div>

      <div className="hero-content-v2">
        <div className="hero-badge reveal visible">✈ Explore the World with stayVacation</div>
        <div className="hero-logo-large reveal visible delay-1">stay<span>Vacation</span></div>
        <h1 className="hero-title-v2 reveal visible delay-2">Your Dream Vacation Starts Here:<br />Stays, Tours & Adventures</h1>
        <p className="hero-sub-v2 reveal visible delay-3">Discover luxury stays and epic journeys worldwide. From hidden beaches to mountain peaks — we craft memories that last a lifetime.</p>
        <div className="hero-btns reveal visible delay-4">
          <ButtonV2 href="/destinations" variant="orange" pulse>🌍 Explore Now</ButtonV2>
          <ButtonV2 href="/contact" variant="outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.5)' }}>📋 Plan Trip</ButtonV2>
        </div>
      </div>

      <SearchBarV2 />


      <div className="hero-dots">
        {HERO_SLIDES.map((_, index) => (
          <button 
            key={index} 
            className={`hero-dot ${index === activeSlide ? 'active' : ''}`}
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>

      <div className="hero-scroll">
        <div className="hero-scroll-line"></div>
        SCROLL
      </div>
    </section>
  );
};

export default HeroSectionV2;
