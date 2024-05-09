import Image from "next/image";
import React from "react";

const PropertyHeaderImage = ({ image }) => {
  let url = "http://127.0.0.1:3000/";
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={`${url + image}`}
            alt={url + image}
            className="object-cover h-[400px] w-full"
            height={0}
            width={0}
            sizes="100vw"
            priority={true}
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyHeaderImage;
