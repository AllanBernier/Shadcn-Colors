
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




export const getHex = (color) => {
  const hsl = color.replaceAll('%', '');
  const [h, s, l] = hsl.split(' ');

  console.log("h" + h, "s" + s, "l" + l);

  const hex = hslToHex(h, s, l);
  console.log(hex);
  return hex
}
const hslToHex = (h, s, l) => {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}