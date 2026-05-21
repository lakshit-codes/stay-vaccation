export const topDestinationsData = {
  id: "top-destinations-main",
  type: "section",
  adminTitle: "Top Destinations Section",
  props: {
    label: {
      en: "✦ ✦ TOP DESTINATIONS",
      hi: "✦ ✦ शीर्ष गंतव्य"
    },
    title: {
      en: "Explore",
      hi: "खोजें"
    },
    title_highlight: {
      en: "Dream Destinations",
      hi: "स्वप्न गंतव्य"
    },
    subtitle: {
      en: "Hand-picked escapes that ignite your wanderlust — from turquoise lagoons to snow-capped peaks.",
      hi: "हाथ से चुने गए स्थान जो आपकी यात्रा की लालसा जगाते हैं — फ़िरोज़ी लैगून से बर्फ से ढकी चोटियों तक।"
    },
    btn_text: {
      en: "View All →",
      hi: "सभी देखें →"
    },
    btn_link: "/destinations"
  },
  content: [
    {
      id: "dest-singapore",
      type: "destination-item",
      props: {
        name: {
          en: "Singapore",
          hi: "सिंगापुर"
        },
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&auto=format&fit=crop&q=80",
        rating: 4.9,
        escapes: {
          en: "12 Escapes",
          hi: "12 पैकेज"
        },
        isFeatured: true
      }
    },
    {
      id: "dest-vietnam",
      type: "destination-item",
      props: {
        name: {
          en: "Vietnam",
          hi: "वियतनाम"
        },
        image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&auto=format&fit=crop&q=80",
        rating: 4.9,
        escapes: {
          en: "8 Escapes",
          hi: "8 पैकेज"
        },
        isFeatured: false
      }
    },
    {
      id: "dest-australia",
      type: "destination-item",
      props: {
        name: {
          en: "Australia",
          hi: "ऑस्ट्रेलिया"
        },
        image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&auto=format&fit=crop&q=80",
        rating: 4.9,
        escapes: {
          en: "10 Escapes",
          hi: "10 पैकेज"
        },
        isFeatured: false
      }
    },
    {
      id: "dest-kerala",
      type: "destination-item",
      props: {
        name: {
          en: "Kerala",
          hi: "केरल"
        },
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format&fit=crop&q=80",
        rating: 4.9,
        escapes: {
          en: "15 Escapes",
          hi: "15 पैकेज"
        },
        isFeatured: false
      }
    },
    {
      id: "dest-goa",
      type: "destination-item",
      props: {
        name: {
          en: "Goa",
          hi: "गोवा"
        },
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
        rating: 4.9,
        escapes: {
          en: "20 Escapes",
          hi: "20 पैकेज"
        },
        isFeatured: false
      }
    }
  ]
};
