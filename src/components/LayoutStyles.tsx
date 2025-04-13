// src/components/LayoutStyles.tsx
"use client";

import styled from "styled-components";
import { ReactNode } from "react";

const GlobalStyle = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0;
  font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  padding-top: 60px; /* Match Toolbar's min-height */
`;

interface LayoutStylesProps {
  children: ReactNode;
}

export default function LayoutStyles({ children }: LayoutStylesProps) {
  return (
    <GlobalStyle>
      {children}
    </GlobalStyle>
  );
}