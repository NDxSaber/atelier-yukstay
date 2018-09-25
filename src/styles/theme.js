import { mix, darken, lighten } from "polished";

const primaryColor = "#1278ce";

export default {
  breakpoints: {
    zero: 0,
    xxs: 361,
    xs: 481,
    sm: 737,
    md: 981,
    lg: 1281,
    xl: 1681
  },

  transition: {
    duration: '1s',
  },

  size: {
    elementHeight: 3,
    elementMargin: 1.5,
    padding: 2,
    wrapper: 72
  },

  font: {
    family: "Source Sans Pro",
    familyHeading: "PT Serif",
    familyFixed: "Segoe UI",
    weight: 300,
    weightBold: 400,
    weightHeading: 400,
    weightHeadingBold: 700,
  },

  palette: {
    primary: primaryColor,
    primaryDark: darken(0.2, primaryColor),
    primaryLight: lighten(0.1, primaryColor),
    primaryBg: "#f1f6f9",
    bg: "#f5f5f5",
    fg: "#777",
    fgBold: "#646464",
    fgLight: "#999",
    border: "#e5e5e5",
    borderBg: "#f8f8f8",
    border2: "#dddddd",
    border2Bg: "#f0f0f0",
    red : "#db3e3e",
    green : "#0f866b",

    textColor: "#717171",
    headingColor: "#777777",

    header: {
      bg: "#444",
      fg: "#bbb",
      fgBold: "#fff",
      fgLight: "#999"
    },

    footer: {
      bg: "#f4f4f4",
      fg: "#717171"
    },

    accent1: {
      bg: "#008aff",
      fg: mix(.25, '#008aff', '#ffffff'),
      fgBold: "#008aff",
      fgLight: mix(.60, '#008aff', '#ffffff')
    }
  }
};