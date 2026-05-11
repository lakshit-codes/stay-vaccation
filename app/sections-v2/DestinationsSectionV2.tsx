import React from 'react';
import SectionHeaderV2 from '../components-v2/SectionHeaderV2';
import ButtonV2 from '../components-v2/ButtonV2';

interface Destination {
  id: string;
  name: string;
  image: string;
  rating?: number;
  price?: number;
  tag?: string;
  category?: string;
}

interface DestinationsSectionV2Props {
  destinations?: Destination[];
}

const DestinationsSectionV2: React.FC<DestinationsSectionV2Props> = ({ destinations }) => {
  // Default fallback data if none provided
  const displayDestinations = (destinations && destinations.length > 0) ? destinations.slice(0, 5) : [
    { id: '1', name: 'Maldives Paradise', tag: '🏆 Most Popular', category: 'Overwater Villas', rating: 4.9, price: 1299, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&auto=format&fit=crop&q=80' },
    { id: '2', name: 'Santorini, Greece', tag: '🏛 Culture', rating: 4.8, price: 899, image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&auto=format&fit=crop&q=80' },
    { id: '3', name: 'Swiss Alps', tag: '⛰ Adventure', rating: 4.7, price: 1099, image: 'https://images.unsplash.com/photo-1531761535209-180857e963b9?w=600&auto=format&fit=crop&q=80' },
    { id: '4', name: 'Bali, Indonesia', tag: '🌿 Nature', rating: 4.9, price: 749, image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=600&auto=format&fit=crop&q=80' },
    { id: '5', name: 'Tokyo, Japan', tag: '🏙 City', rating: 4.8, price: 1199, image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&auto=format&fit=crop&q=80' }
  ];

  return (
    <section id="destinations" style={{ padding: '8.5rem 0 5rem' }}>
      <div className="container-v2">
        <div className="dest-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.8rem', flexWrap: 'wrap', gap: '1rem' }}>
          <SectionHeaderV2 
            label="Top Destinations"
            title="Explore"
            titleHighlight="Dream Destinations"
            subtitle="Hand-picked escapes that ignite your wanderlust — from turquoise lagoons to snow-capped peaks."
          />
          <ButtonV2 href="/destinations" variant="outline" style={{ borderColor: 'var(--sky)', color: 'var(--sky)' }}>
            View All →
          </ButtonV2>
        </div>

        <div className="dest-grid">
          {displayDestinations.map((dest, index) => (
            <div key={dest.id} className={`dest-card ${index === 0 ? 'featured' : ''} reveal visible delay-${index}`}>
              <img className="dest-img" src={dest.image} alt={dest.name} loading="lazy" />
              <div className="dest-overlay"></div>
              <div className="dest-info">
                {dest.tag && <div className="dest-tag">{dest.tag}</div>}
                <div className="dest-name">{dest.name}</div>
                <div className="dest-meta">
                  <span>★ {dest.rating || '4.8'}</span> 
                  {dest.category && ` · ${dest.category}`}
                  {dest.price && ` · From $${(dest.price as any)?.amount || dest.price}`}
                </div>
              </div>
              <button className="dest-hover-cta" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0 }}>Discover →</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSectionV2;
