export const formatPrice = (n) =>
  new Intl.NumberFormat("en-NG", { style:"currency", currency:"NGN", minimumFractionDigits:0 }).format(n || 0);

export const WHATSAPP_NUMBER  = "2348114719834";
export const WHATSAPP_NUMBER2 = "2348154118442";

export const whatsappLink    = (phone, msg) => `https://wa.me/${phone.replace(/\D/g,"")}?text=${encodeURIComponent(msg)}`;
export const productWhatsApp = (name)       => whatsappLink(WHATSAPP_NUMBER, `Hello Dercy Tech! I'm interested in: ${name}. Is it available?`);
export const truncate        = (str, n)     => str?.length > n ? str.slice(0, n) + "…" : str;