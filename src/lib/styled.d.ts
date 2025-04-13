// src/lib/styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      backgroundLight: string;
      backgroundDark: string;
      backgroundContent: string;
      primary: string;
      accent: string;
      textLight: string;
      textDark: string;
      secondaryText: string;
    };
  }
}