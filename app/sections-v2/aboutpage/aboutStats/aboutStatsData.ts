export const aboutStatsData = {
  id: "about-stats-main",
  type: "section",
  adminTitle: "About Page Stats Section",
  props: {
    overlay_color: "var(--white)",
    border_color: "#f1f5f9"
  },
  content: [
    {
      id: "stat-happy-travellers",
      type: "stat-item",
      props: {
        iconName: "Smile",
        number: "500+",
        label: {
          en: "Happy Travellers",
          hi: "खुश यात्री"
        }
      }
    },
    {
      id: "stat-destinations",
      type: "stat-item",
      props: {
        iconName: "Globe",
        number: "50+",
        label: {
          en: "Destinations",
          hi: "गंतव्य"
        }
      }
    },
    {
      id: "stat-years-experience",
      type: "stat-item",
      props: {
        iconName: "Award",
        number: "10+",
        label: {
          en: "Years Experience",
          hi: "वर्षों का अनुभव"
        }
      }
    },
    {
      id: "stat-average-rating",
      type: "stat-item",
      props: {
        iconName: "Star",
        number: "4.9★",
        label: {
          en: "Average Rating",
          hi: "औसत रेटिंग"
        }
      }
    }
  ]
};
