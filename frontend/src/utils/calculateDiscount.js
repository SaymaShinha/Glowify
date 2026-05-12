export const calculateDiscount = (price, discount) => {
  return price - price * (discount / 100);
};
