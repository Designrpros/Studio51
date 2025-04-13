// app/layout.tsx
import { ReactNode } from "react";
import { Montserrat } from "next/font/google";
import StyledComponentsRegistry from "../components/styled-components-registry";
import Toolbar from "../components/Toolbar";
import ThemeWrapper from "../components/ThemeWrapper";
import LayoutStyles from "../components/LayoutStyles";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

export const metadata = {
  title: "Rap Clinic & Studio 51",
  description: "Creative community for music and mental health",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body 
        className={montserrat.className}
        style={{
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
          fontFamily: "Montserrat, sans-serif",
          backgroundColor: "#f0f0f0",
        }}>
        <StyledComponentsRegistry>
          <ThemeWrapper>
            <LayoutStyles>
              <Toolbar />
              {children}
            </LayoutStyles>
          </ThemeWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}