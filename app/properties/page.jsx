import React from "react";
//import properties from "@/properties";
import PropertyCard from "@/components/PropertyCard";
import { fetchProperties } from "@/utils/request";

const PropertiesPage = async () => {
  const properties = await fetchProperties();
  return (
    <section className="px-4 py-8">
      <div className="container-xl lg:container m-auto">
        {properties && properties?.lenght === 0 ? (
          <p className="text-center text-gray-500 text-sm p-4 border">
            No properties found
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties?.length &&
              properties?.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
