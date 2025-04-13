// src/app/artists/page.tsx
"use client";

import styled from "styled-components";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import Image from "next/image";

// Styled Components for Guide Section (Now Bottom)
const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.backgroundLight};
  color: ${({ theme }) => theme.colors.textLight};
  font-family: "Montserrat", sans-serif;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1rem;
  position: relative;
  z-index: 1;
  overflow-x: hidden;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    padding: 2rem 0.75rem;
    margin-bottom: 0.75rem;
  }
  @media (max-width: 480px) {
    padding: 1.5rem 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  padding-bottom: 0.5rem;
  text-transform: uppercase;
  text-align: left;

  @media (max-width: 768px) {
    margin-bottom: 0.75rem;
  }
`;

const LargeText = styled.div`
  font-size: clamp(0.875rem, 3vw, 1.25rem);
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.8;
  margin-bottom: 1.5rem;
  max-width: 100%;
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: normal;
  text-align: left;

  & > p {
    margin: 0 0 1rem 0;
    max-width: 100%;
    overflow-wrap: break-word;
    word-break: break-word;
    white-space: normal;
  }

  @media (max-width: 768px) {
    line-height: 1.6;
  }
`;

const Card = styled.div<{ $isOpen: boolean }>`
  background: ${({ theme }) => theme.colors.backgroundContent};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundLight};
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const CardTitle = styled.h3`
  font-size: clamp(1rem, 3vw, 1.5rem);
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
  text-align: left;
`;

const CardDescription = styled.div<{ $isOpen: boolean }>`
  font-size: clamp(0.75rem, 2.5vw, 1rem);
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
  margin-top: ${({ $isOpen }) => ($isOpen ? "1rem" : "0")};
  max-height: ${({ $isOpen }) => ($isOpen ? "1000px" : "0")};
  overflow: hidden;
  transition: all 0.3s ease;
  max-width: 100%;
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: normal;
  text-align: left;

  & > p {
    margin: 0;
  }

  @media (max-width: 768px) {
    line-height: 1.4;
  }
`;

const ArtistCard: React.FC<{
  title: string;
  description: string;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ title, description, isOpen, onToggle }) => {
  return (
    <Card $isOpen={isOpen} onClick={onToggle}>
      <CardTitle>{title}</CardTitle>
      <CardDescription $isOpen={isOpen}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{description}</ReactMarkdown>
      </CardDescription>
    </Card>
  );
};

// Styled Components for Grid Section (Now Top)
const ArtistsGridSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1rem;

  @media (max-width: 768px) {
    padding: 2rem 0.75rem;
  }
  @media (max-width: 480px) {
    padding: 1.5rem 0.5rem;
  }
`;

const ArtistsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.5rem;
    padding: 0 0.75rem;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0 0.5rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const GridArtistCard = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
`;

const ArtistImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(232, 226, 209, 0) 0%,
    rgba(232, 226, 209, 0.6) 100%
  );
  transition: opacity 0.3s ease;
  opacity: 0.8;

  ${GridArtistCard}:hover & {
    opacity: 1;
  }
`;

const ArtistInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.25rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const ArtistName = styled.h3`
  margin: 0;
  font-size: clamp(1rem, 3vw, 1.4rem);
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  text-align: left;
`;

// Main Component
export default function Artists() {
  const [openArtists, setOpenArtists] = useState<{ [key: number]: boolean }>({});

  const toggleArtist = (index: number) => {
    setOpenArtists((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const sections = [
    {
      title: "House Artists",
      largeText:
        "Studio 51 is home to a talented roster of house artists who blend soulful beats with the raw energy of recovery. From hip-hop roots to electronic grooves, these creators bring unique voices to our community. Meet some of our standout artists below.",
      artists: [
        {
          title: "Liora",
          description:
            "Liora is a rising star at Studio 51, known for her deep house tracks infused with melodic vocals. Joining in 2020, she’s turned her personal journey into pulsating rhythms that resonate with listeners. Her latest single, *‘Echo Pulse,’* captures the essence of healing through music.",
        },
        {
          title: "Endrey",
          description:
            "Endrey brings a funky house vibe to Studio 51, mixing classic beats with modern flair. A member since 2019, his work on *‘Lusitania’* (featuring Citizen Kay) showcases his knack for collaboration and groove-heavy production. Catch his sets at our live events!",
        },
        {
          title: "Smithy",
          description:
            "Smithy, a veteran of Studio 51’s house scene, delivers gritty basslines and uplifting melodies. Active since 2017, his track *‘Night Shift’* is a staple in our freestyle sessions, reflecting his roots in the Villa Walle basement days.",
        },
      ],
    },
  ];

  const gridArtists = [
    { id: 1, name: "Liora", thumbnail: "/Studio51.png" },
    { id: 2, name: "Endrey", thumbnail: "/Studio51.png" },
    { id: 3, name: "Smithy", thumbnail: "/Studio51.png" },
  ];

  return (
    <PageContainer>
      <ArtistsGridSection>
        <SectionTitle>Featured Artists</SectionTitle>
        <LargeText>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {"Explore our featured artists who bring unique energy to Studio 51. Click their cards to dive deeper into their stories and sounds."}
          </ReactMarkdown>
        </LargeText>
        <ArtistsGrid>
          {gridArtists.map((artist) => (
            <StyledLink href={`/artists/${artist.id}`} key={artist.id}>
              <GridArtistCard>
                <ImageWrapper>
                  <ArtistImage
                    src={artist.thumbnail}
                    alt={artist.name}
                    width={280}
                    height={300}
                    style={{ objectFit: "cover" }}
                  />
                  <Overlay />
                </ImageWrapper>
                <ArtistInfo>
                  <ArtistName>{artist.name}</ArtistName>
                </ArtistInfo>
              </GridArtistCard>
            </StyledLink>
          ))}
        </ArtistsGrid>
      </ArtistsGridSection>
      <ContentContainer>
        {sections.map((section, sectionIndex) => (
          <Section key={sectionIndex}>
            <SectionTitle>{section.title}</SectionTitle>
            {section.largeText && (
              <LargeText>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {section.largeText}
                </ReactMarkdown>
              </LargeText>
            )}
            {section.artists.map((artist, artistIndex) => {
              const globalIndex = sectionIndex * 100 + artistIndex;
              return (
                <ArtistCard
                  key={globalIndex}
                  title={artist.title}
                  description={artist.description}
                  isOpen={!!openArtists[globalIndex]}
                  onToggle={() => toggleArtist(globalIndex)}
                />
              );
            })}
          </Section>
        ))}
      </ContentContainer>
    </PageContainer>
  );
}