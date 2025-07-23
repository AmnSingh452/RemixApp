import { redirect } from "@remix-run/node";
import { getAccessToken } from "../shopify.server";
import { prisma } from "../db.server";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");
  const code = url.searchParams.get("code");
  if (!shop || !code) return new Response("Missing params", { status: 400 });

  const accessToken = await getAccessToken(shop, code);

  console.log("Registering webhooks for", shop);
  await registerAppUninstalledWebhook(shop, accessToken);
  await registerScopesUpdateWebhook(shop, accessToken);
  console.log("Webhooks registered");

  await prisma.shop.upsert({
    where: { shopDomain: shop },
    update: { accessToken },
    create: { shopDomain: shop, accessToken },
  });

  return redirect("/app"); // or your app's dashboard
}; 