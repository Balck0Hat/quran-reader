const ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

export const toArabicNumber = (value) =>
  String(value).replace(/\d/g, (digit) => ARABIC_DIGITS[Number(digit)]);
