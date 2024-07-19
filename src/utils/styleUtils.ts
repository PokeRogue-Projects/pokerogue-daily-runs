export const determineStyle = (content: string) => {
  let style = {};
  if (content === "RELOAD YOUR GAME (F5)") {
    style = { color: "red", textDecoration: "underline" };
  } else if (content.startsWith("Shop")) {
    style = { color: "red" };
  }
  return style;
};


export const TAILWIND_RESPONSIVE_MIN_WIDTH = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  TWO_XL: 1536,
}