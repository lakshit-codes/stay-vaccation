export const travelerStoriesData = {
  id: "traveler-stories-main",
  type: "section",
  adminTitle: "Traveler Stories Section",
  props: {
    badge: {
      en: "+ TRAVELER STORIES",
      hi: "+ यात्री कहानियाँ"
    },
    title: {
      en: "What Our ",
      hi: "हमारे "
    },
    title_highlight: {
      en: "Guests Say",
      hi: "मेहमान क्या कहते हैं"
    },
    subtitle: {
      en: "Real reviews from real adventurers who trusted us with their dream vacations.",
      hi: "उन असली साहसी लोगों की समीक्षाएं जिन्होंने अपनी सपनों की छुट्टियां हमें सौंपीं।"
    }
  },
  content: [
    {
      id: "story-1",
      type: "testimonial-item",
      props: {
        name: {
          en: "Sarah Mitchell",
          hi: "सारा मिचेल"
        },
        image: "https://res.cloudinary.com/demo/image/upload/w_150,h_150,c_fill,g_face/rachel.jpg",
        rating: 5,
        review: {
          en: "Absolutely breathtaking trip to the Maldives! Every detail was handled perfectly. The overwater bungalow exceeded our wildest expectations.",
          hi: "मालदीव की यात्रा बिल्कुल अद्भुत थी! हर विवरण का ध्यान रखा गया। ओवरवाटर बंगला हमारी उम्मीदों से कहीं बढ़कर था।"
        },
        packageName: {
          en: "Maldives Retreat",
          hi: "मालदीव रिट्रीट"
        },
        packageIconName: "Palmtree"
      }
    },
    {
      id: "story-2",
      type: "testimonial-item",
      props: {
        name: {
          en: "James Kowalski",
          hi: "जेम्स कोवाल्स्की"
        },
        image: "https://res.cloudinary.com/demo/image/upload/w_150,h_150,c_fill,g_face/business_man_looking_left.jpg",
        rating: 5,
        review: {
          en: "The Swiss Alps hiking package was phenomenal. Our guide knew every secret trail. stayVacation is the only one I trust now.",
          hi: "स्विस आल्प्स हाइकिंग पैकेज अद्भुत था। हमारे गाइड को हर गुप्त रास्ता पता था। stayVacation पर मुझे पूरा भरोसा है।"
        },
        packageName: {
          en: "Swiss Alps Trek",
          hi: "स्विस आल्प्स ट्रेक"
        },
        packageIconName: "Mountain"
      }
    },
    {
      id: "story-3",
      type: "testimonial-item",
      props: {
        name: {
          en: "Priya Sharma",
          hi: "प्रिया शर्मा"
        },
        image: "https://res.cloudinary.com/demo/image/upload/w_150,h_150,c_fill,g_face/lady.jpg",
        rating: 5,
        review: {
          en: "Our Greek islands cruise was pure magic. Santorini sunset from the sailboat — I'm still pinching myself. Seamless booking, zero stress.",
          hi: "ग्रीक द्वीप क्रूज़ जादुई था। सेलबोट से सेंटोरिनी सूर्यास्त — मुझे अभी भी विश्वास नहीं होता। बुकिंग बेहद आसान, कोई तनाव नहीं।"
        },
        packageName: {
          en: "Greek Islands Cruise",
          hi: "ग्रीक द्वीप क्रूज़"
        },
        packageIconName: "Sailboat"
      }
    }
  ]
};
