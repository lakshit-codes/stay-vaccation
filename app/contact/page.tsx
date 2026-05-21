"use client";

import { useState, useEffect } from "react";
import LayoutV2 from "../layouts-v2/LayoutV2";
import ContactHero from "../sections-v2/contactpage/contactHero/ContactHero";
import ContactForm from "../sections-v2/contactpage/contactForm/ContactForm";
import OfficeLocation from "../sections-v2/contactpage/officeLocation/OfficeLocation";

export default function ContactPage() {
  const [cmsData, setCmsData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/page-cms/contact")
      .then(res => res.json())
      .then(result => {
        if (result.success) setCmsData(result.data);
      })
      .catch(err => console.error("CMS FETCH ERROR:", err));
  }, []);

  const hero = cmsData?.hero || {};

  return (
    <LayoutV2>
      <ContactHero section={hero} />

      <ContactForm cmsData={cmsData} />

      <OfficeLocation cmsData={cmsData} />
    </LayoutV2>
  );
}

