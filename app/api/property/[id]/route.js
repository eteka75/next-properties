import { connecteDB } from "@/config/database";
import { Property } from "@/models/Property";

// GET /property/{id}

export const GET = async (request, { params }) => {
  try {
    //XMLDocument;
    await connecteDB();
    const property = await Property.findById(params.id);
    if (!property) {
      return new Response("Property Not Found !");
    }
    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Sommething was wrong !", { status: 500 });
  }
};
