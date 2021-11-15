import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const colors = {
  accent: "#4dc2f8",
  primary: "#0AC4BA",
  secondary: "#2BDA8E",
  black: "#262626",
  white: "#FFFFFF",
  gray: "#9DA3B4",
  blue: "#007aff",
  red: "#F3534A",
};

const sizes = {
  radius: 30,
  padding: 10,
  width,
  height
};

const fonts = {
  fontSmall: {
    fontSize: 14,
    color: colors.accent,
    fontFamily: "Roboto-Regular"
  },
  fontMedium: {
    fontSize: 16,
    color: colors.accent,
    fontFamily: "Roboto-Regular"
  },
  fontMediumBold: {
    fontSize: 16,
    color: colors.accent,
    fontFamily: "Roboto-Regular",
    fontWeight: "bold"
  },
  fontLarge: {
    fontSize: 18,
    color: colors.accent,
    fontFamily: "Roboto-Regular"
  }
}

export { colors, fonts, sizes }