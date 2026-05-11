import LayoutV2 from "../layouts-v2/LayoutV2";
import PageHeroV2 from "../components-v2/PageHeroV2";
import SectionHeaderV2 from "../components-v2/SectionHeaderV2";
import ButtonV2 from "../components-v2/ButtonV2";
import LucideIcon from "../components/LucideIcon";

export const metadata = {
  title: "About Us — Stay Vacation",
  description: "Learn about Stay Vacation — our story, mission, and the team crafting unforgettable travel experiences worldwide.",
};

const TEAM = [
  { name: "Arjun Mehta", role: "Founder & CEO", icon: "UserCircle", desc: "15 years in luxury travel. Passionate about crafting journeys that change lives." },
  { name: "Priya Sharma", role: "Head of Operations", icon: "ShieldCheck", desc: "Logistics expert who ensures every trip runs flawlessly from start to finish." },
  { name: "Rohan Verma", role: "Destination Expert", icon: "Map", desc: "Explored 40+ countries and curates our international package portfolio." },
  { name: "Aisha Khan", role: "Customer Experience", icon: "HeartHandshake", desc: "Dedicated to making every client feel valued from first enquiry to return." },
];

const STATS = [
  { num: "500+", label: "Happy Travellers", icon: "Smile" },
  { num: "50+", label: "Destinations", icon: "Globe" },
  { num: "10+", label: "Years Experience", icon: "Award" },
  { num: "4.9★", label: "Average Rating", icon: "Star" },
];

const VALUES = [
  { icon: "Target", title: "Personalised Service", desc: "Every itinerary is crafted specifically for you &mdash; we don&apos;t believe in one-size-fits-all travel." },
  { icon: "Leaf", title: "Responsible Travel", desc: "We partner with eco-conscious operators and promote sustainable tourism practices." },
  { icon: "Lock", title: "Transparent Pricing", desc: "No hidden fees. What you see is what you pay &mdash; always." },
  { icon: "Headphones", title: "24/7 Support", desc: "Our team is reachable round-the-clock during your trip for any assistance." },
  { icon: "Plane", title: "Expert Curation", desc: "Every destination, hotel, and activity is personally vetted by our travel experts." },
  { icon: "Gem", title: "Premium Quality", desc: "We partner only with the best hotels, guides, and local operators." },
];

export default function AboutPage() {
  return (
    <LayoutV2>
      <PageHeroV2 
        title="We Exist to Make Travel Transformative" 
        subtitle="Founded in 2015 with a simple belief &mdash; that a great journey can change your perspective, refresh your soul, and create memories that last a lifetime."
        badge="Our Story"
        image="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1800&auto=format&fit=crop&q=80"
      />

      {/* Stats Section - V2 Style */}
      <section style={{ padding: '4rem 0', background: 'var(--white)', borderBottom: '1px solid #f1f5f9' }}>
        <div className="container-v2">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
            {STATS.map((s, i) => (
              <div key={s.label} className="reveal visible" style={{ textAlign: 'center', animationDelay: `${i * 100}ms` }}>
                <div style={{ color: 'var(--sky)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                  <LucideIcon name={s.icon} size={36} strokeWidth={1.5} />
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text)', fontFamily: 'Poppins, sans-serif' }}>{s.num}</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section - V2 Style */}
      <section style={{ padding: '8rem 0', background: 'var(--cream)' }}>
        <div className="container-v2">
          <div style={{ display: 'flex', gap: '5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 500px' }}>
              <SectionHeaderV2 
                label="Our Mission"
                title="Turning Travel Dreams"
                titleHighlight="into Reality"
              />
              <div style={{ marginTop: '2rem', color: 'var(--muted)', lineHeight: 1.8, fontSize: '1.05rem' }}>
                <p style={{ marginBottom: '1.5rem' }}>
                  Stay Vacation was born from a frustration with cookie-cutter travel packages that treat every traveller the same. We believed &mdash; and still do &mdash; that travel should be as unique as the person taking the journey.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  Over the past decade, we&apos;ve built strong relationships with the finest hotels, local guides, and activity operators across 50+ destinations. This network allows us to offer truly personalised experiences at competitive prices.
                </p>
                <p>
                  From a first-time solo traveller exploring Bali to a family celebrating a milestone anniversary in Europe &mdash; we pour the same dedication and care into every single itinerary.
                </p>
              </div>
              <div style={{ marginTop: '3rem' }}>
                <ButtonV2 href="/packages" variant="sky">Explore Our Packages</ButtonV2>
              </div>
            </div>
            
            <div style={{ flex: '1 1 400px', position: 'relative' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, var(--sky), var(--sky-dk))', 
                borderRadius: '3rem', 
                height: '500px', 
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow2)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                <LucideIcon name="Globe" size={200} color="#fff" strokeWidth={0.5} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid - V2 Style */}
      <section style={{ padding: '8rem 0', background: 'var(--white)' }}>
        <div className="container-v2">
          <SectionHeaderV2 
            label="What we stand for"
            title="Our Core"
            titleHighlight="Values"
            centered
            className="mb-12"
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {VALUES.map((v, i) => (
              <div 
                key={v.title} 
                className="reveal visible"
                style={{ 
                  padding: '2.5rem', 
                  borderRadius: '2rem', 
                  background: 'var(--cream)', 
                  border: '1px solid #f1f5f9',
                  transition: 'all 0.3s',
                  animationDelay: `${i * 100}ms`
                }}
              >
                <div style={{ color: 'var(--orange)', marginBottom: '1.5rem' }}>
                  <LucideIcon name={v.icon} size={40} strokeWidth={1.5} />
                </div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text)' }}>{v.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - V2 Style */}
      <section style={{ padding: '8rem 0', background: 'var(--sky-dk)' }}>
        <div className="container-v2">
          <SectionHeaderV2 
            label="The experts behind your journey"
            title="Meet Our"
            titleHighlight="Team"
            centered
            className="mb-12"
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2rem' }}>
            {TEAM.map((member, i) => (
              <div 
                key={member.name} 
                className="reveal visible"
                style={{ 
                  padding: '2.5rem', 
                  borderRadius: '2rem', 
                  background: 'rgba(255,255,255,0.05)', 
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  textAlign: 'center',
                  animationDelay: `${i * 100}ms`
                }}
              >
                <div style={{ width: '100px', height: '100px', background: 'var(--white)', borderRadius: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--sky)' }}>
                   <div style={{ margin: '0 auto' }}>
                     <LucideIcon name={member.icon} size={48} strokeWidth={1} />
                   </div>
                </div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: '#fff', marginBottom: '0.3rem' }}>{member.name}</h3>
                <p style={{ color: 'var(--sky)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1.5rem' }}>{member.role}</p>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.6 }}>{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: '8rem 0', background: 'linear-gradient(to right, var(--sky), var(--sky-dk))' }}>
        <div className="container-v2" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: '3rem', color: '#fff', marginBottom: '1.5rem' }}>Ready to Start Your Story?</h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 3rem' }}>Let our experts craft your perfect journey. Every detail planned, every moment unforgettable.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <ButtonV2 href="/contact" variant="orange" style={{ padding: '1.2rem 3rem' }}>Talk to an Expert</ButtonV2>
            <ButtonV2 href="/packages" variant="outline" style={{ padding: '1.2rem 3rem', color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}>Browse Packages</ButtonV2>
          </div>
        </div>
      </section>
    </LayoutV2>
  );
}
