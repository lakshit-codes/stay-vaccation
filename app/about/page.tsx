import Navbar from "../components/frontend/Navbar";
import Footer from "../components/frontend/Footer";
import Link from "next/link";
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
  { icon: "Target", title: "Personalised Service", desc: "Every itinerary is crafted specifically for you — we don't believe in one-size-fits-all travel." },
  { icon: "Leaf", title: "Responsible Travel", desc: "We partner with eco-conscious operators and promote sustainable tourism practices." },
  { icon: "Lock", title: "Transparent Pricing", desc: "No hidden fees. What you see is what you pay — always." },
  { icon: "Headphones", title: "24/7 Support", desc: "Our team is reachable round-the-clock during your trip for any assistance." },
  { icon: "Plane", title: "Expert Curation", desc: "Every destination, hotel, and activity is personally vetted by our travel experts." },
  { icon: "Gem", title: "Premium Quality", desc: "We partner only with the best hotels, guides, and local operators." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="hero-bg pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 400" fill="none">
            <circle cx="200" cy="200" r="300" stroke="white" strokeWidth="0.5" />
            <circle cx="900" cy="100" r="200" stroke="white" strokeWidth="0.5" />
          </svg>
        </div>
        <div className="container-sv relative z-10">
          <div className="max-w-3xl">
            <p className="text-[#2fa3f2] font-semibold text-sm uppercase tracking-widest mb-4">Our Story</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              We Exist to Make<br />
              <span className="gradient-text">Travel Transformative</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-xl">
              Founded in 2015 with a simple belief — that a great journey can change your perspective, refresh your soul, and create memories that last a lifetime.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="container-sv py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-[#2fa3f2] mb-2 flex justify-center">
                  <LucideIcon name={s.icon} size={32} />
                </div>
                <div className="text-3xl font-bold text-[#1a3f4e] font-display">{s.num}</div>
                <div className="text-gray-400 text-sm mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-pad bg-[#F4F9E9]">
        <div className="container-sv">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#2fa3f2] font-semibold text-sm uppercase tracking-widest mb-4">Our Mission</p>
              <h2 className="font-display text-4xl font-bold text-[#1a3f4e] mb-6 leading-tight">
                Turning Travel Dreams into Reality
              </h2>
              <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                <p>
                  Stay Vacation was born from a frustration with cookie-cutter travel packages that treat every traveller the same. We believed — and still do — that travel should be as unique as the person taking the journey.
                </p>
                <p>
                  Over the past decade, we've built strong relationships with the finest hotels, local guides, and activity operators across 50+ destinations. This network allows us to offer truly personalised experiences at competitive prices.
                </p>
                <p>
                  From a first-time solo traveller exploring Bali to a family celebrating a milestone anniversary in Europe — we pour the same dedication and care into every single itinerary.
                </p>
              </div>
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 bg-[#1a3f4e] text-white font-bold rounded-xl text-sm hover:-translate-y-0.5 hover:shadow-lg transition-all"
              >
                Explore Our Packages
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {["Umbrella", "Mountain", "Building2", "Palmtree"].map((iconName, i) => (
                  <div
                    key={i}
                    className={`rounded-2xl flex items-center justify-center text-white/80 ${
                      i % 2 === 0 ? "h-44 bg-[#1a3f4e]" : "h-56 bg-[#2fa3f2]"
                    } ${i > 1 ? "-mt-6" : ""}`}
                  >
                    <LucideIcon name={iconName} size={48} strokeWidth={1} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-white">
        <div className="container-sv">
          <div className="text-center mb-12">
            <p className="text-[#2fa3f2] font-semibold text-sm uppercase tracking-widest mb-3">What we stand for</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1a3f4e]">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className="p-6 rounded-2xl border border-gray-100 hover:shadow-md hover:border-[#2fa3f2]/30 hover:-translate-y-1 transition-all group"
              >
                <div className="text-[#2fa3f2] mb-4 group-hover:scale-110 transition-transform inline-block">
                  <LucideIcon name={v.icon} size={32} strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-[#1a3f4e] text-base mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-pad bg-[#1a3f4e]">
        <div className="container-sv">
          <div className="text-center mb-12">
            <p className="text-[#2fa3f2] font-semibold text-sm uppercase tracking-widest mb-3">The people behind your journey</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:-translate-y-1 transition-all text-center"
              >
                <div className="text-[#2fa3f2] mb-4 flex justify-center">
                  <LucideIcon name={member.icon} size={48} strokeWidth={1} />
                </div>
                <h3 className="font-bold text-white text-sm mb-0.5">{member.name}</h3>
                <p className="text-[#2fa3f2] text-xs font-semibold mb-3">{member.role}</p>
                <p className="text-white/50 text-xs leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#2fa3f2] to-[#1a7abf]">
        <div className="container-sv text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
            Ready to Start Your Story?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Let our experts craft your perfect journey. Every detail planned, every moment unforgettable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-white text-[#1a3f4e] font-bold rounded-xl text-sm hover:-translate-y-0.5 hover:shadow-xl transition-all">
              Talk to an Expert
            </Link>
            <Link href="/packages" className="px-8 py-4 bg-white/20 text-white border border-white/30 font-semibold rounded-xl text-sm hover:bg-white/30 transition-all">
              Browse Packages
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
