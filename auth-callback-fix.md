# Auth Callback Fix

## Issue
In `auth.callback.jsx`, there's a reference to a function called `registerScopesUpdateWebhook` that doesn't appear to be defined in the files we've examined:

```javascript
// Line 15 in auth.callback.jsx
await registerScopesUpdateWebhook(shop, accessToken);
```

## Potential Solutions

### Option 1: Define the Missing Function
Add the `registerScopesUpdateWebhook` function to `shopify.server.js` and export it:

```javascript
// Add to shopify.server.js
export async function registerScopesUpdateWebhook(shop, accessToken) {
  await registerWebhooks({
    shop,
    accessToken,
    webhooks: [
      {
        path: "/webhooks/app/scopes_update",
        topic: "APP_SCOPES_UPDATE",
      },
    ],
  });
}
```

### Option 2: Use the Existing registerAppUninstalledWebhook Function
The `registerAppUninstalledWebhook` function in `shopify.server.js` already registers both the APP_UNINSTALLED and APP_SCOPES_UPDATE webhooks. You could modify `auth.callback.jsx` to only call this function once:

```javascript
// In auth.callback.jsx, replace:
await registerAppUninstalledWebhook(shop, accessToken);
await registerScopesUpdateWebhook(shop, accessToken);

// With:
await registerAppUninstalledWebhook(shop, accessToken);
```

### Option 3: Import the registerWebhooks Function Directly
Since both webhook registrations use the same `registerWebhooks` function, you could import and use it directly:

```javascript
// In auth.callback.jsx, import:
import { getAccessToken, registerWebhooks } from "../shopify.server";

// Then replace:
await registerAppUninstalledWebhook(shop, accessToken);
await registerScopesUpdateWebhook(shop, accessToken);

// With:
await registerWebhooks({
  shop,
  accessToken,
  webhooks: [
    {
      path: "/webhooks/app/uninstalled",
      topic: "APP_UNINSTALLED",
    },
    {
      path: "/webhooks/app/scopes_update",
      topic: "APP_SCOPES_UPDATE",
    },
  ],
});
```

## Recommendation
Option 2 is the simplest solution since the `registerAppUninstalledWebhook` function already registers both webhooks. This avoids code duplication and ensures both webhooks are registered consistently.