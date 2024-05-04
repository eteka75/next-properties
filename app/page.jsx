import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HomeProperties from "@/components/HomeProperties";
import InfoBoxes from "@/components/InfoBoxes";
import React from "react";
import { connecteDB } from "@/config/database";

export const metadata = {
  title: "Property  | Welcomme to the The perfect Rental",
};
const HomePage = async () => {
  return (
    <div>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
      <Footer />
    </div>
  );
};

export default HomePage;
