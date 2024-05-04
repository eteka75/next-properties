import { connecteDB } from "@/config/database";
import { Property } from "@/models/Property";

// GET /properties
export const GET = async (request) => {
  try {
    //XMLDocument;
    await connecteDB();
    const properties = await Property.find({});

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log("ERROOOORRRRR", error);
    return new Response("Sommething was wrong !", { status: 500 });
  }
};
