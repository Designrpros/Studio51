// src/components/ThemeWrapper.tsx
"use client";

import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import theme from "../lib/theme";
import { ReactNode } from "react";

const getThemeColors = (mode: "light" | "dark") => ({
  colors: {
    backgroundLight: theme.colors.backgroundLight[mode],
    backgroundDark: theme.colors.backgroundDark[mode],
    backgroundContent: theme.colors.backgroundContent[mode],
    primary: theme.colors.primary[mode],
    accent: theme.colors.accent[mode],
    textLight: theme.colors.textLight[mode],
    textDark: theme.colors.textDark[mode],
    secondaryText: theme.colors.secondaryText[mode],
  },
});

interface ThemeWrapperProps {
  children: ReactNode;
}

export default function ThemeWrapper({ children }: ThemeWrapperProps) {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("themeMode");
    if (savedTheme === "light" || savedTheme === "dark") {
      setThemeMode(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const appliedTheme = getThemeColors(themeMode);

  return <ThemeProvider theme={appliedTheme}>{children}</ThemeProvider>;
}