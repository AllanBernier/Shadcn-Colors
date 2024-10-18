export const hexToHsl = (hex) => {
  hex = hex.replace(/^#/, '');

  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  let normalizedR = r / 255;
  let normalizedG = g / 255;
  let normalizedB = b / 255;

  let max = Math.max(normalizedR, normalizedG, normalizedB);
  let min = Math.min(normalizedR, normalizedG, normalizedB);

  let lightness = (max + min) / 2;

  let saturation = 0;
  if (max !== min) {
    saturation = lightness <= 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
  }

  let hue = 0;
  if (max === normalizedR) {
    hue = ((normalizedG - normalizedB) / (max - min) + 6) % 6;
  } else if (max === normalizedG) {
    hue = (normalizedB - normalizedR) / (max - min) + 2;
  } else if (max === normalizedB) {
    hue = (normalizedR - normalizedG) / (max - min) + 4;
  }

  hue *= 60;

  return `${Math.round(hue)} ${Math.round(saturation * 100)}% ${Math.round(lightness * 100)}%`;
}
