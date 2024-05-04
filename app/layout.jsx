import React from "react";
import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";

export const metadata = {
  title: "Property  | Find The perfect Rental",
  description: "Find your dream rental property",
  keywords: "renta, find rental, find property, house",
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="fr">
        <body>
          <Navbar />
          <div>{children}</div>
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
