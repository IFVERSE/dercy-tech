// Add this to your index.html <head> OR call it before checkout
export function loadPaystack() {
  return new Promise((resolve) => {
    if (window.PaystackPop) return resolve();
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.onload = resolve;
    document.head.appendChild(script);
  });
}