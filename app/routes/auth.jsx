import { redirect } from "@remix-run/node";
import { getShopifyAuthUrl } from "../shopify.server";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");
  if (!shop) return new Response("Missing shop", { status: 400 });
  return redirect(getShopifyAuthUrl(shop));
}; 