export interface WhyStayVacationReason {
  id: string;
  iconName: 'Globe' | 'Building' | 'Zap' | 'Leaf';
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
  bullets: string[];
}

export const whyStayVacationReasons: WhyStayVacationReason[] = [
  {
    id: 'local-experts',
    iconName: 'Globe',
    iconColor: '#0d9488', // Teal 600
    iconBg: '#ccfbf1', // Teal 100
    title: 'Local Experts',
    description: 'Insider knowledge from locals who live and breathe your destination.',
    bullets: ['On-ground guides & support', 'Hidden gems, not tourist traps', '24/7 in-destination help']
  },
  {
    id: 'premium-stays',
    iconName: 'Building',
    iconColor: '#e11d48', // Rose 600
    iconBg: '#ffe4e6', // Rose 100
    title: 'Premium Stays',
    description: 'Curated collection of world-class hotels, villas, and eco-retreats.',
    bullets: ['5-star to boutique options', 'All inspected & rated by us', 'Best rate guarantee']
  },
  {
    id: 'seamless-booking',
    iconName: 'Zap',
    iconColor: '#ca8a04', // Yellow 600
    iconBg: '#fef9c3', // Yellow 100
    title: 'Seamless Booking',
    description: 'Book flights, hotels, transfers & experiences in one simple flow.',
    bullets: ['One click checkout', 'Instant confirmation', 'Flexible change policy']
  },
  {
    id: 'eco-friendly',
    iconName: 'Leaf',
    iconColor: '#16a34a', // Green 600
    iconBg: '#dcfce7', // Green 100
    title: 'Eco-Friendly',
    description: 'Responsible travel that protects the places we love to explore.',
    bullets: ['Carbon offset on every trip', 'Certified eco-partners', 'Leave No Trace philosophy']
  }
];
