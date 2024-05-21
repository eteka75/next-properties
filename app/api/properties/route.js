import { connecteDB } from "@/config/database";
import { Property } from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "@/config/cloudinary";
import { toast } from "react-toastify";

// GET /properties
export const GET = async (request) => {
  try {
    //XMLDocument;
    await connecteDB();
    const properties = await Property.find({}).sort({ timestamps: -1 });

    return Response.json(properties);
  } catch (error) {
    return Response("Sommething was wrong !", { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    connecteDB();
    const sessionUser = await getSessionUser();
    console.log(sessionUser, "SESSION");
    if (!sessionUser || !sessionUser.userId) {
      throw Response("User Id is required !", { status: 401 });
    }

    const { userId } = sessionUser;
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
      //images: images,
    };

    // Uplaod image to Cloudinary
    const imageUplaodPromises = [];

    const uploadedImages = await saveImagesLocally(images);
    propertyData.images = uploadedImages;

    const newProperty = new Property(propertyData);
    await newProperty.save();
    toast.success("Property added");

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/property/${newProperty._id}`
    );
    // console.log(propertyData, sessionUser);
    //return new Response(JSON.stringify({ message: "Succès" }, { status: 200 }));
  } catch (error) {
    console.log(error);
    return new Response("Fail to add property / " + error.toString(), {
      status: 500,
    });
  }
};

const saveImagesLocally = async (
  images,
  destinationFolder = "propertypulse"
) => {
  try {
    // Créer le dossier s'il n _existe pas
    const dossier = "public/" + destinationFolder;
    fs.mkdirSync(dossier, { recursive: true });

    const uploadedImages = [];
    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageExtension = path.extname(image.name);
      const imageName = `${uuidv4()}${imageExtension}`;
      const imagePath = path.join(destinationFolder, imageName);
      fs.writeFileSync(
        "public/" + imagePath,
        Buffer.from(new Uint8Array(imageBuffer))
      );
      uploadedImages.push(imagePath);
    }
    return uploadedImages;
  } catch (error) {
    throw new Error("Failed to save images locally: " + error.toString());
  }
  return null;
};
