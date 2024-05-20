import Image from "next/image";
import React from "react";

const PropertyHeaderImage = ({ image }) => {
  let url = process.env.NEXT_PUBLIC_IP;
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={`${url + "/" + image}`}
            alt={url + "/" + image}
            className="object-contain bg-gray-900 object-top h-[450px] w-full"
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
