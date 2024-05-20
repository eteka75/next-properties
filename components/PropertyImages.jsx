import Image from "next/image";
import React from "react";

const PropertyImages = ({ images }) => {
  let url = process.env.NEXT_PUBLIC_DOMAINE + "/";
  return (
    <section className="bg-blue-50 pb-10">
      <div className="container   m-auto px-6">
        {images?.length === 1 ? (
          <Image
            src={`${url + "/" + images[0]}`}
            alt={url + "/" + images[0]}
            className="object-cover shadow-md object-top h-[450px] w-full rounded-xl"
            height={0}
            width={0}
            sizes="100vw"
            priority={true}
          />
        ) : (
          <div className="grid grid-cols-2  gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className={`${
                  images.length === 3 && index === 2
                    ? "col-span-2"
                    : "col-span-1"
                }`}
              >
                <Image
                  src={`${url + "/" + image}`}
                  alt={url + "/" + image}
                  className="object-cover shadow-md object-top h-[450px] w-full rounded-xl"
                  height={0}
                  width={0}
                  sizes="100vw"
                  priority={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyImages;
