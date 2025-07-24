import { redirect } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  // This uses the official Shopify App SDK authentication
  await authenticate.callback(request);

  // Redirect to the app home page after authentication
  return redirect("/app");
};