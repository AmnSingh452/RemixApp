import { redirect } from "@remix-run/node";
import { login } from "../shopify.server";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");
  if (!shop) return new Response("Missing shop", { status: 400 });
  
  // Use the official SDK login function
  return await login(request);
};