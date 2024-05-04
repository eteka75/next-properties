import React from "react";
import InfoBoxe from "./InfoBoxe";

const InfoBoxes = () => {
  return (
    <section>
      <div className="container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 rounded-lg">
          <InfoBoxe
            heading={"For Renters"}
            buttonInfo={{
              text: "Browse Properties",
              link: "/properties",
              backgroundColor: "bg-black",
            }}
          >
            Find your dream rental property. Bookmark properties and contact
            owners.
          </InfoBoxe>
          <InfoBoxe
            heading="For Property Owners"
            backgroundColor="bg-blue-100"
            buttonInfo={{
              text: "Add Property",
              link: "/property/add",
              backgroundColor: "bg-blue-500",
            }}
          >
            List your properties and reach potential tenants. Rent as an airbnb
            or long term.
          </InfoBoxe>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
