export interface TestimonialItem {
  name: string;
  image: string;
  rating: number;
  review: string;
  packageName: string;
  packageIconName: 'Palmtree' | 'Mountain' | 'Sailboat';
}

export interface TravelerStoriesContent {
  badge: string;
  titleNormal: string;
  titleHighlight: string;
  subtitle: string;
  testimonials: TestimonialItem[];
}

export const travelerStoriesData: TravelerStoriesContent = {
  badge: '+ TRAVELER STORIES',
  titleNormal: 'What Our ',
  titleHighlight: 'Guests Say',
  subtitle: 'Real reviews from real adventurers who trusted us with their dream vacations.',
  testimonials: [
    {
      name: 'Sarah Mitchell',
      image: 'https://res.cloudinary.com/demo/image/upload/w_150,h_150,c_fill,g_face/rachel.jpg',
      rating: 5,
      review: 'Absolutely breathtaking trip to the Maldives! Every detail was handled perfectly. The overwater bungalow exceeded our wildest expectations.',
      packageName: 'Maldives Retreat',
      packageIconName: 'Palmtree'
    },
    {
      name: 'James Kowalski',
      image: 'https://res.cloudinary.com/demo/image/upload/w_150,h_150,c_fill,g_face/business_man_looking_left.jpg',
      rating: 5,
      review: 'The Swiss Alps hiking package was phenomenal. Our guide knew every secret trail. stayVacation is the only one I trust now.',
      packageName: 'Swiss Alps Trek',
      packageIconName: 'Mountain'
    },
    {
      name: 'Priya Sharma',
      image: 'https://res.cloudinary.com/demo/image/upload/w_150,h_150,c_fill,g_face/lady.jpg',
      rating: 5,
      review: "Our Greek islands cruise was pure magic. Santorini sunset from the sailboat — I'm still pinching myself. Seamless booking, zero stress.",
      packageName: 'Greek Islands Cruise',
      packageIconName: 'Sailboat'
    }
  ]
};
