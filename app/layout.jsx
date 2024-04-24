import React from "react";
import "@/assets/styles/globals.css";

export const metadata = {
  title: "Property  | Find The perfect Rental",
  description: "Find your dream rental property",
  keywords: "renta, find rental, find property, house",
};
const MainLayout = ({ children }) => {
  return (
    <html lang="fr">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
};

export default MainLayout;
