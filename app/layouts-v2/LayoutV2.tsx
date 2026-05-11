"use client";
import React from 'react';
import NavbarV2 from '../components-v2/NavbarV2';
import FooterV2 from '../components-v2/FooterV2';
import '../globals-v2.css';

const LayoutV2: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="v2-body">
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <NavbarV2 />
      <main>{children}</main>
      <FooterV2 />
    </div>
  );
};

export default LayoutV2;
