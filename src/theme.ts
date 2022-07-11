import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
    txtColor: "#f8f8fc",
    bgColor: "#191921",
    accentColor: "#25cef2",
    cardBgColor: "rgba(255, 255, 255, 0.1)",
    boxShadow: "2px 2px 8px -2px rgba(0, 0, 0, 0.9)",
    state: "dark",
};

export const lightTheme: DefaultTheme = {
    txtColor: "#191921",
    bgColor: "#f8f8fc",
    accentColor: "#20acff",
    cardBgColor: "rgba(255, 255, 255, 0.7)",
    boxShadow: "2px 2px 8px -2px rgba(0, 0, 0, 0.5)",
    state: "light",
};
