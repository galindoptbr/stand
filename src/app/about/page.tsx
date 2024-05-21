"use client";

import React from "react";

import bannerAbout from "@/assets/images/banner-about1.png";
import Image from "next/image";

const AboutPage: React.FC = () => {
  return (
    <>
      <div>
        <Image className="w-full" src={bannerAbout} alt="banner about" />
      </div>
    </>
  );
};

export default AboutPage;
