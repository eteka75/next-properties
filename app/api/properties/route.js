import { connecteDB } from "@/config/database";
import { Property } from "@/models/Property";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/OAuthOptions";

// GET /properties
export const GET = async (request) => {
  try {
    //XMLDocument;
    await connecteDB();
    const properties = await Property.find({});

    return new Response.json(properties);
  } catch (error) {
    //console.log("ERROOOORRRRR", error);
    return new Response("Sommething was wrong !", { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    connecteDB();
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Response("Unauthorized !", { status: 401 });
    }

    const userId = session.user.id;
    console.log("USER", session.user);
    const formDatas = await request?.formData();
    const amenities = formDatas.getAll("amenities");
    const images = formDatas
      .getAll("images")
      .filter((image) => image.name !== "");

    // Create propertyData object for database
    const propertyData = {
      name: formDatas.get("name"),
      type: formDatas.get("type"),
      description: formDatas.get("description"),
      amenities: amenities,
      location: {
        street: formDatas.get("location.street"),
        city: formDatas.get("location.city"),
        state: formDatas.get("location.state"),
        zipcode: formDatas.get("location.zipcode"),
      },
      beds: formDatas.get("beds"),
      baths: formDatas.get("baths"),
      square_feet: formDatas.get("square_feet"),
      rates: {
        weekly: formDatas.get("rates.weekly"),
        monthly: formDatas.get("rates.monthly"),
        nightly: formDatas.get("rates.nightly"),
      },
      seller_info: {
        name: formDatas.get("seller_info.name"),
        email: formDatas.get("seller_info.email"),
        phone: formDatas.get("seller_info.phone"),
      },
      owner: userId,
      images: images,
    };

    console.log(propertyData, session);
    return new Response(JSON.stringify({ message: "Succès" }, { status: 200 }));
  } catch (error) {
    return new Response("Fail to add property / " + error, { status: 500 });
  }
};
