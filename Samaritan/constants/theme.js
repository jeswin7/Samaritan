const COLORS = {
  primary: "#50A4AB",
  secondary: "#242948",
  tertiary: "#E8F6F7",
  quad: '#008080',
  red: "#ff4d4d",

  gray: "#83829A",
  gray2: "#C1C0C8",

  white: "#FFFFFF",
  lightWhite: "#FAFAFC",
  yellow: '#FFBF00',
  green: '#85e085'
};

const FONT = {
  regular: "DMRegular",
  medium: "DMMedium",
  bold: "DMBold",
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
  xxxLarge: 40
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT, SIZES, SHADOWS };
