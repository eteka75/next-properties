"use client";
import React, { useEffect, useState } from "react";

import profileDefault from "@/assets/images/profile.png";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Spinner from "@/components/Spinner";
import Link from "next/link";

const UserProfile = () => {
  const { data: session } = useSession();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const profileImage = session?.user?.image || profileDefault;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  const handleDeleteProperty = async (propertyId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property ?"
    );

    if (!confirmed) {
      return;
    }
    try {
      const res = await fetch(`/api/property/${propertyId}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        //remove property from state
        const updateProperty = properties.filter((p) => p._id != propertyId);
        setProperties(updateProperty);
        alert("Property deleted");
      } else {
        alert("Fail to delete property");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchUserProperties = async (userId) => {
      if (!userId) {
        return;
      }
      try {
        const res = await fetch(`/api/properties/user/${userId}`);
        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (error) {
        console.log(error);
        return Response("Unable to fin user properties", { staus: 500 });
      } finally {
        setLoading(false);
      }
    };
    if (session?.user?.id) {
      fetchUserProperties(session.user.id);
    }
  }, [session]);
  const http_home = process.env.NEXT_PUBLIC_DOMAINE + "/";
  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={profileImage}
                  width={200}
                  height={200}
                  priority={true}
                  alt="User"
                />
              </div>
              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span> {profileName}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span> {profileEmail}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>

              {!loading && properties.length === 0 && (
                <p>You have no property listings</p>
              )}
              {console.log(properties)}
              {loading ? (
                <Spinner loading={loading} />
              ) : (
                properties.map((p, index) => (
                  <div key={index} className="mb-10">
                    <Link href={`/property/${p._id}`}>
                      <Image
                        className="h-32 w-full rounded-md object-cover"
                        src={http_home + p.images[0]}
                        alt={p.name}
                        width={500}
                        height={500}
                        priority={true}
                      />
                    </Link>
                    <div className="mt-2">
                      <p className="text-lg font-semibold">{p.name}</p>
                      <p className="text-gray-600">
                        Address: {p.location.street} {p.location.city}{" "}
                        {p.location.state}
                      </p>
                    </div>
                    <div className="mt-2">
                      <Link
                        href={`/property/${p._id}/edit`}
                        className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteProperty(p._id)}
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
