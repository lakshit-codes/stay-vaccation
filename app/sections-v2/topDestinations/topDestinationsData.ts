export interface DestinationItem {
  id: string;
  name: string;
  image: string;
  rating: number;
  escapes: string;
  isFeatured?: boolean;
}

export const topDestinationsData = {
  id: "top-destinations-section",
  type: "top-destinations",
  adminTitle: "Top Destinations Section V2",
  props: {
    label: {
      en: "✦ ✦ TOP DESTINATIONS"
    },
    title: {
      en: "Explore"
    },
    title_highlight: {
      en: "Dream Destinations"
    },
    subtitle: {
      en: "Hand-picked escapes that ignite your wanderlust — from turquoise lagoons to snow-capped peaks."
    },
    btn_text: {
      en: "View All →"
    },
    btn_link: "/destinations"
  },
  destinations: [
    {
      id: "singapore",
      name: "Singapore",
      image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&auto=format&fit=crop&q=80",
      rating: 4.9,
      escapes: "Escape(s)",
      isFeatured: true
    },
    {
      id: "vietnam",
      name: "Vietnam",
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&auto=format&fit=crop&q=80",
      rating: 4.9,
      escapes: "Escape(s)"
    },
    {
      id: "australia",
      name: "Australia",
      image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&auto=format&fit=crop&q=80",
      rating: 4.9,
      escapes: "Escape(s)"
    },
    {
      id: "kerala",
      name: "Kerala",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop&q=80",
      rating: 4.9,
      escapes: "Escape(s)"
    },
    {
      id: "goa",
      name: "Goa",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
      rating: 4.9,
      escapes: "Escape(s)"
    }
  ]
};
