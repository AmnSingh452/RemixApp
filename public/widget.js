// Simple AI Chatbot Widget Demo
(function() {
  var widget = document.getElementById('my-widget');
  if (widget) {
    widget.innerHTML = '<div style="padding:1em;background:#f4f4f4;border-radius:8px;">AI Chatbot Widget Loaded!</div>';
  }
})();

async function fetchProducts(shop) {
  const response = await fetch("https://your-fastapi-backend.com/shopify-proxy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ shop }),
  });
  const data = await response.json();
  // Render products or handle data
  console.log(data);
}
// Example usage: pass shop domain as a data attribute or from Liquid
// fetchProducts(window.Shopify.shop); 