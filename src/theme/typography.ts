import { TextStyle } from "react-native";

export const typography: Record<string, TextStyle> = {
  h1: {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 32,
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28,
  },
  h4: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
  },
  bodyMedium: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24,
  },
  bodySm: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },
  bodySmMedium: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
  },
  captionMedium: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
  },
  buttonSm: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
};

export type Typography = typeof typography;
