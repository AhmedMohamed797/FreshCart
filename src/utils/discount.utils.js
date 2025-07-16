export function calcDiscount({ price, priceAfterDiscount }) {
  if (!price || !priceAfterDiscount) return 0;
  const discount = ((price - priceAfterDiscount) / price) * 100;
  return Math.round(discount);
}
