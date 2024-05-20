import { connecteDB } from "@/config/database";
import { Property } from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

// GET /property/{id}

export const GET = async (request, { params }) => {
  try {
    //XMLDocument;
    await connecteDB();
    const property = await Property.findById(params.id);
    if (!property) {
      return new Response("Property Not Found !", { status: 404 });
    }
    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    console.log("ERREUR DE CHARGEMENT", error);
    return new Response("Sommething was wrong !", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    const propertyId = params.id;
    const sessionUser = await getSessionUser();
    const { userId } = sessionUser;
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    await connecteDB();
    const property = await Property.findById(propertyId);
    if (property.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await property.deleteOne();

    return new Response("Property delected", {
      status: 200,
    });
  } catch (error) {
    console.log("ERREUR DE CHARGEMENT", error);
    return new Response("Sommething was wrong !", { status: 500 });
  }
};
