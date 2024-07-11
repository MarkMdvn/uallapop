export const formatPrice = (price) => {
  return new Intl.NumberFormat("de-DE").format(price);
};
