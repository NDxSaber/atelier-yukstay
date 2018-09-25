// This helper for style

export const pxToRem = (px) => {
  const rootSize = 16;
  px = typeof px === "number" ? px : parseInt(px);
  return parseFloat((px / rootSize).toFixed(3)) + "rem"
}

export const pxToPercent = (px) => {
  px = typeof px === "number" ? px : parseInt(px);
  const containerWidth = 840;
  return (px / containerWidth) * 100 + "%" ;
}