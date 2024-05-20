import { connecteDB } from "@/config/database";
import { Property } from "@/models/Property";

// GET /properties
// /api/properties/user/:userId
// export const GET = async (request, { params }) => {
//   try {
//     await connecteDB();
//     const userId = params.userId;
//     console.log(userId);

//     if (!userId) {
//       // return Response("User ID required", { status: 400 });
//     }
//     // const properties = await Property.find({ owner: userId });

//     return Response(JSON.stringify([]), {
//       staus: 200,
//     });
//   } catch (error) {
//     console.log(error);
//     return Response("Sommething was wrong !", { status: 500 });
//   }
// };
export const GET = async (request, { params }) => {
  try {
    await connecteDB();

    const userId = params.userId;
    if (!userId) {
      return Response("User ID required", { status: 400 });
    }

    const properties = await Property.find({ owner: userId });
    return Response.json(properties, { status: 200 });
  } catch (error) {
    return Response("Sommething was wrong !", { status: 500 });
  }
};
