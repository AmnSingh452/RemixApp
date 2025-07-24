# OAuth Scope Update Plan

## Required Scopes
Based on the API calls the backend is making, the following scopes are required:

- `read_orders` - Required for the order_agent to fetch order details via GraphQL
- `read_products` - Required for product recommendations and product info
- `read_customers` - Required for customer order history
- `write_price_rules` - Required for creating discount codes

## Files to Update

### 1. shopify.app.toml
Current:
```toml
[access_scopes]
# Learn more at https://shopify.dev/docs/apps/tools/cli/configuration#access_scopes
scopes = "write_products"
```

Update to:
```toml
[access_scopes]
# Learn more at https://shopify.dev/docs/apps/tools/cli/configuration#access_scopes
scopes = "write_products,read_orders,read_products,read_customers,write_price_rules"
```

### 2. shopify.server.js
Current:
```javascript
const SCOPES = "read_products,write_products";
```

Update to:
```javascript
const SCOPES = "write_products,read_orders,read_products,read_customers,write_price_rules";
```

### 3. Check auth.callback.jsx
There's a reference to a `registerScopesUpdateWebhook` function that doesn't appear to be defined in the files we've examined. This should be investigated and fixed if necessary.

## Redeployment Instructions
After making these changes, the app will need to be redeployed. When merchants access the app after redeployment, they will be prompted to approve the new scopes.

1. Commit and push the changes to your repository
2. Deploy the app using your deployment platform (e.g., Render)
3. Test the app to ensure it can access the required data with the new scopes