export const determineStyle = (content: string) => {
    let style = {};
    if (content === "RELOAD YOUR GAME (F5)") {
      style = { color: "red", textDecoration: "underline" };
    } else if (content.startsWith("Shop")) {
      style = { color: "red" };
    }
    return style;
  };