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

// PUT /api/properties/:id
export const PUT = async (request, { params }) => {
  try {
    connecteDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      throw Response("User Id is required !", { status: 401 });
    }

    const { id } = params;
    const { userId } = sessionUser;
    const formDatas = await request?.formData();
    const amenities = formDatas.getAll("amenities");

    // Get property to update
    const existingProperty = await Property.findById(id);
    if (!existingProperty) {
      return new Response("Property does not exist", { status: 404 });
    }
    // Verify ownership

    if (existingProperty.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }
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
    };
    //Update property in database
    const updateProperty = await Property.findByIdAndUpdate(id, propertyData);

    return new Response(JSON.stringify(updateProperty), { status: 200 });
    // return Response.redirect(
    //   `${process.env.NEXTAUTH_URL}/property/${newProperty._id}`
    // );
  } catch (error) {
    console.log(error);
    return new Response("Fail to add property / " + error.toString(), {
      status: 500,
    });
  }
};
