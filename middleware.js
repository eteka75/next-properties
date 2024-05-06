export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/property/add", "/profile", "/properties/saved", "/messages"],
};
