// src/lib/styles.ts
import styled from "styled-components";
import Image from "next/image";

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const HeroContainer = styled.div`
  position: relative;
  height: 50vh;
  width: 100%;
`;

export const HeroImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

export const HeroText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
`;

export const HeroTitle = styled.h1`
  font-size: 3rem;
  margin: 0;
`;

export const HeroSubtitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
`;

export const ContentContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;