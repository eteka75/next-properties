import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dyrkcjfwk",
  api_key: "378863583988946",
  api_secret: "XrLZV356jLiUgHmLyZAmQ-c_A8U",
});
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

export default cloudinary;
