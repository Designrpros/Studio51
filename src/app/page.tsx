// app/page.tsx
"use client";

import styled, { keyframes } from "styled-components";
import Image from "next/image";
import { useState, useEffect } from "react";

// Nøkkelord for skrivemaskin-effekten er oversatt
const typeWriter = keyframes`
  0%, 20% { content: "Musikk"; }
  25%, 40% { content: "Fellesskap"; }
  45%, 60% { content: "Mestring"; }
  65%, 80% { content: "Kreativitet"; }
  85%, 100% { content: "Studio 51"; }
`;

const blinkCaret = keyframes`
  50% { border-color: transparent; }
`;

const PageContainer = styled.div`
  width: 100%;
  font-family: "Montserrat", sans-serif;
  overflow-x: hidden;
  background: ${({ theme }) => theme.colors.backgroundLight};
  margin: 0;
`;

const HeroSection = styled.section`
  width: 100%;
  min-height: calc(100vh - 60px);
  background: ${({ theme }) => theme.colors.backgroundDark};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 2rem 4rem;
  box-sizing: border-box;
  position: relative;
  z-index: 0;

  @media (max-width: 768px) {
    min-height: 70vh;
    padding: 60px 1rem 2rem;
  }

  @media (max-width: 400px) {
    min-height: 60vh;
    padding: 60px 1rem 1rem;
  }
`;

const HeroBackground = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1500px;
  height: 1500px;
  z-index: -1;
`;

const HeroContent = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.textDark};
`;

const HeroTitle = styled.h1`
  font-size: 5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textDark};
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 3rem;
  }

  @media (max-width: 400px) {
    font-size: 2.5rem;
  }
`;

const HeroSubText = styled.p`
  font-size: 1.5rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textDark};
  text-transform: uppercase;
  display: inline-block;
  position: relative;
  border-right: 2px solid ${({ theme }) => theme.colors.textDark};
  animation: ${blinkCaret} 0.75s step-end infinite;
  margin-top: 1rem;

  &::after {
    content: "Musikk"; // Startverdi for animasjonen
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    animation: ${typeWriter} 10s infinite;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 400px) {
    font-size: 1rem;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  margin: 0;
  padding: 4rem 2rem;
  background: ${({ theme }) => theme.colors.backgroundContent};
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 5rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 50px;
    height: 3px;
    background: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 400px) {
    font-size: 1.8rem;
  }
`;

const SectionText = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.8;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SectionList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-bottom: 1.5rem;
`;

const ListItem = styled.li`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.8;
  margin-bottom: 1rem;
  position: relative;
  padding-left: 1.5rem;

  &::before {
    content: "→";
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
  }

  strong {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.textDark};
  font-size: 1.5rem;
  text-decoration: none;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    transform: scale(1.1);
  }

  @media (max-width: 400px) {
    font-size: 1.2rem;
  }
`;

export default function Home() {
  const [isLightMode, setIsLightMode] = useState(true);

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    setIsLightMode(currentTheme === "light");

    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.getAttribute("data-theme") || "light";
      setIsLightMode(newTheme === "light");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => observer.disconnect();
  }, []);

  return (
    <PageContainer>
      <HeroSection>
        <HeroBackground>
          <Image
            src={isLightMode ? "/MusicCircleWhite.png" : "/MusicCircle.png"}
            alt="Studio 51 Musikksirkel"
            width={1500}
            height={1500}
            style={{
              objectFit: "contain",
            }}
            priority
          />
        </HeroBackground>
        <HeroContent>
          <HeroTitle>Studio 51</HeroTitle>
          <HeroSubText />
          <SocialIcons>
            <SocialLink
              href="https://facebook.com/studio51"
              target="_blank"
              rel="noopener noreferrer"
            >
              f
            </SocialLink>
            <SocialLink
              href="https://instagram.com/studio51"
              target="_blank"
              rel="noopener noreferrer"
            >
              i
            </SocialLink>
            <SocialLink href="mailto:Rapclinic.baerum@gmail.com">✉</SocialLink>
          </SocialIcons>
        </HeroContent>
      </HeroSection>

      <ContentContainer>
        <Section>
          <SectionTitle>Hva er Studio 51?</SectionTitle>
          <SectionText>
            Rap Clinic & Studio 51 er et levende fellesskap i Sandvika, dedikert til å støtte enkeltpersoner med utfordringer innen psykisk helse og rus gjennom musikk og kreative uttrykk. Etablert i 2016, tilbyr vi et trygt sted for å skape, knytte bånd og finne helbredelse, ved å bruke hip-hop, musikkproduksjon og andre kunstformer som verktøy for mestring og vekst.
          </SectionText>
        </Section>

        <Section>
          <SectionTitle>Hva Vi Tilbyr</SectionTitle>
          <SectionText>
            Våre programmer gir medlemmene mulighet til å utforske sin kreativitet, bygge selvtillit og skape positive rutiner. Her er noe av det du kan oppleve hos Studio 51:
          </SectionText>
          <SectionList>
            <ListItem>
              <strong>Musikkproduksjon</strong>: Skriv tekster, produser låter og gi ut musikk på plattformer som Spotify og SoundCloud under vårt eget Studio 51-label.
            </ListItem>
            <ListItem>
              <strong>Kreative Verksteder</strong>: Delta i animasjon, videoproduksjon, podcasting og gaming for å uttrykke deg på nye måter.
            </ListItem>
            <ListItem>
              <strong>Fellesskap og Støtte</strong>: Bli en del av over 50 medlemmer i et inkluderende miljø som fremmer samhold og samarbeid.
            </ListItem>
            <ListItem>
              <strong>Arbeidstrening</strong>: Utvikle ferdigheter og rutiner gjennom praktiske prosjekter, med muligheter for å lede grupper.
            </ListItem>
            <ListItem>
              <strong>Live-arrangementer</strong>: Opptre på lokale arrangementer eller del arbeidet ditt med fellesskapet for å bygge selvtillit og synlighet.
            </ListItem>
          </SectionList>
          <SectionText>
            Klar til å skape musikk og en forskjell? <strong>Studio 51</strong> er her for å støtte deg på reisen.
          </SectionText>
        </Section>
      </ContentContainer>
    </PageContainer>
  );
}