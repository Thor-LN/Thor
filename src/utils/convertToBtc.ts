import Currency from '@/utils/currency';

const convertToBtc = (amount: number | string) => {
  return Currency(amount, {precision: 8}).multiply(10 ** -8).value;
};

export default convertToBtc;
