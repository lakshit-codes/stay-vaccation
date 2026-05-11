"use client";
import React, { useState, useEffect } from 'react';
import ButtonV2 from './ButtonV2';

interface DynamicContent {
  [key: string]: string;
}

interface SectionItem {
  id: string;
  type: string;
  props: {
    image?: string;
    title?: DynamicContent;
    [key: string]: any;
  };
}

interface HeroSectionV2Props {
  section: {
    adminTitle?: string;
    props?: {
      badge?: DynamicContent;
      heading?: DynamicContent;
      subheading?: DynamicContent;
      btn1_text?: DynamicContent;
      btn1_link?: string;
      btn2_text?: DynamicContent;
      btn2_link?: string;
      search_placeholder?: DynamicContent;
      search_label_1?: DynamicContent;
      search_placeholder_1?: DynamicContent;
      search_label_2?: DynamicContent;
      search_placeholder_2?: DynamicContent;
      search_label_3?: DynamicContent;
      search_placeholder_3?: DynamicContent;
      search_label_4?: DynamicContent;
      search_placeholder_4?: DynamicContent;
      search_btn_text?: DynamicContent;
    };
    content?: SectionItem[];
  };
  lang?: string;
}

const HeroSectionV2: React.FC<HeroSectionV2Props> = ({ section, lang = 'en' }) => {
  const [activeSlide, setActiveSlide] = useState(0);


  const { props = {}, content = [] } = section || {};
  const t = (obj?: DynamicContent) => obj?.[lang] || obj?.['en'] || '';

  const slides = content.length > 0 ? content.map(item => item.props.image).filter(Boolean) : [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1800&auto=format&fit=crop&q=80'
  ];

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="hero-v2">
      <div className="hero-slides">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === activeSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url('${slide}')` }}
          />
        ))}
      </div>

      <div className="hero-content-v2">
        {props.badge && (
          <div className="hero-badge reveal visible">
            {t(props.badge)}
          </div>
        )}

        <div className="hero-logo-large reveal visible delay-1">
          stay<span>Vacation</span>
        </div>

        {props.heading && (
          <h1 className="hero-title-v2 reveal visible delay-2">
            {t(props.heading)}
          </h1>
        )}

        {props.subheading && (
          <p className="hero-sub-v2 reveal visible delay-3">
            {t(props.subheading)}
          </p>
        )}

        <div className="hero-btns reveal visible delay-4">
          <ButtonV2 href={props.btn1_link || '/destinations'} variant="orange" pulse>
            {t(props.btn1_text) || '🌍 Explore Now'}
          </ButtonV2>
          <ButtonV2 href={props.btn2_link || '/contact'} variant="outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.5)' }}>
            {t(props.btn2_text) || '📋 Plan Trip'}
          </ButtonV2>
        </div>
      </div>

      {/* Search Bar */}
      <div className="hero-search-v2">
        <div className="hs-field">
          <div className="hs-label">{t(props.search_label_1) || '📍 Destination'}</div>
          <input className="hs-input" type="text" placeholder={t(props.search_placeholder_1) || "Where do you want to go?"} />
        </div>
        <div className="hs-field">
          <div className="hs-label">{t(props.search_label_2) || '📅 Check-in'}</div>
          <input className="hs-input" type="date" />
        </div>
        <div className="hs-field">
          <div className="hs-label">{t(props.search_label_3) || '📅 Check-out'}</div>
          <input className="hs-input" type="date" />
        </div>
        <div className="hs-field">
          <div className="hs-label">{t(props.search_label_4) || '👥 Guests'}</div>
          <input className="hs-input" type="number" placeholder={t(props.search_placeholder_4) || "2 Guests"} min="1" />
        </div>
        <button className="hs-btn">
          <span>🔍</span> {t(props.search_btn_text) || 'Search'}
        </button>
      </div>

      {slides.length > 1 && (
        <div className="hero-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`hero-dot ${index === activeSlide ? 'active' : ''}`}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      )}

      <div className="hero-scroll">
        <div className="hero-scroll-line"></div>
        SCROLL
      </div>
    </section>
  );
};

export default HeroSectionV2;
