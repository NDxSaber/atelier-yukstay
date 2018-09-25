export function createWhatsAppLinkUrl(phone_number, text) {
  return "https://wa.me/" + phone_number + "?text=" + encodeURIComponent(text);
  //return "whatsapp://send?text=" + encodeURIComponent(text) + "&phone=" + encodeURIComponent("+" + phone_number);
}

export function formatPrice(price) {
  return new Intl.NumberFormat("ID", {
    style: "currency",
    currencyDisplay: "symbol",
    currency: "IDR"
  }).format(price);
}

export function buildProtocolUrl(path) {
  return (typeof window !== 'undefined') ? window.location.protocol + '//' + path : 'http://' + path;
}
