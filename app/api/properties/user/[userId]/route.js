import { connecteDB } from "@/config/database";
import { Property } from "@/models/Property";

export const GET = async (request, { params }) => {
  try {
    await connecteDB();

    const userId = params.userId;
    if (!userId) {
      return Response("User ID required", { status: 400 });
    }

    const properties = await Property.find({ owner: userId }).sort({
      createdAt: -1,
    });
    return Response.json(properties, { status: 200 });
  } catch (error) {
    return Response("Sommething was wrong !", { status: 500 });
  }
};
