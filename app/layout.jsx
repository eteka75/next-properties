import React from "react";
import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          <ToastContainer />
          <div>{children}</div>
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
