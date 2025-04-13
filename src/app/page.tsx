// app/page.tsx
"use client";

import styled, { keyframes } from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const typeWriter = keyframes`
  0%, 20% { content: "Music"; }
  25%, 40% { content: "Community"; }
  45%, 60% { content: "Recovery"; }
  65%, 80% { content: "Creativity"; }
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
    content: "Music";
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
            alt="Studio 51 Music Circle"
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
          <SectionTitle>What is Studio 51?</SectionTitle>
          <SectionText>
            Rap Clinic & Studio 51 is a vibrant community in Sandvika, Norway,
            dedicated to supporting individuals with mental health and substance
            abuse challenges through music and creative expression. Founded in
            2016, we provide a safe space to create, connect, and heal, using
            hip-hop, music production, and other arts as tools for recovery and
            growth.
          </SectionText>
        </Section>

        <Section>
          <SectionTitle>What We Offer</SectionTitle>
          <SectionText>
            Our programs empower members to explore their creativity, build
            confidence, and foster positive routines. Here’s what you can
            experience at Studio 51:
          </SectionText>
          <SectionList>
            <ListItem>
              <strong>Music Production</strong>: Write lyrics, produce tracks, and
              release music on platforms like Spotify and SoundCloud under our
              Studio 51 label.
            </ListItem>
            <ListItem>
              <strong>Creative Workshops</strong>: Engage in animation, video
              production, podcasting, and gaming to express yourself in new ways.
            </ListItem>
            <ListItem>
              <strong>Community Support</strong>: Join over 50 members in a
              welcoming environment that promotes connection and collaboration.
            </ListItem>
            <ListItem>
              <strong>Work Training</strong>: Develop skills and routines through
              hands-on projects, with opportunities to lead groups.
            </ListItem>
            <ListItem>
              <strong>Live Events</strong>: Perform at local events or share your
              work with the community, boosting confidence and visibility.
            </ListItem>
          </SectionList>
          <SectionText>
            Ready to make music and make a difference? <strong>Studio 51</strong>{" "}
            is here to support your journey.
          </SectionText>
        </Section>
      </ContentContainer>
    </PageContainer>
  );
}