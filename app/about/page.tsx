import LayoutV2 from "../layouts-v2/LayoutV2";
import AboutHero from "../sections-v2/aboutpage/aboutHero/AboutHero";
import AboutStats from "../sections-v2/aboutpage/aboutStats/AboutStats";
import AboutMission from "../sections-v2/aboutpage/aboutMission/AboutMission";
import CoreValues from "../sections-v2/aboutpage/coreValues/CoreValues";
import TeamSection from "../sections-v2/aboutpage/teamSection/TeamSection";
import AboutCta from "../sections-v2/aboutpage/aboutCta/AboutCta";

export const metadata = {
  title: "About Us — Stay Vacation",
  description: "Learn about Stay Vacation — our story, mission, and the team crafting unforgettable travel experiences worldwide.",
};

export default function AboutPage() {
  return (
    <LayoutV2>
      <AboutHero />

      <AboutStats />

      <AboutMission />

      <CoreValues />

      <TeamSection />

      <AboutCta />
    </LayoutV2>
  );
}


