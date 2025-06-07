// src/app/artists/page.tsx
"use client";

import styled from "styled-components";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import Image from "next/image";

// --- FELLES STILER ---
const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.backgroundLight};
  color: ${({ theme }) => theme.colors.textLight};
  font-family: "Montserrat", sans-serif;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  padding-bottom: 0.5rem;
  text-transform: uppercase;
`;

const LargeText = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.8;
  margin-bottom: 2.5rem;
  max-width: 800px;
`;

// --- STILER FOR ARTIST-GALLERI (TOPP) - TILBAKESTILT TIL "GAMMEL" STIL ---
const ArtistsGridSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const ArtistsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

// GJENINNFRT: Gammelt kort-design
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

// GJENINNFRT: Gammel ImageWrapper
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
`;

// GJENINNFRT: Gammelt ArtistImage
const ArtistImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// GJENINNFRT: Gammel Overlay
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

// GJENINNFRT: ArtistInfo for å posisjonere navnet korrekt
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
  font-size: 1.4rem;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;


// --- STILER FOR BIOGRAFI-SEKSJON (BUNN) - BEHOLDT NY STIL ---
const BioContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 4rem 2rem;

  @media (max-width: 768px) {
    padding: 0 1.5rem 2rem 1.5rem;
  }
`;

const TopicContainer = styled.div`
  margin-bottom: 2.5rem;
`;

const TopicSubtitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 0.75rem;
`;

const TopicParagraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 1.5rem;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.backgroundContent};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.backgroundContent};
  cursor: pointer;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
`;

const CardTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
`;

const ChevronIcon = styled.span<{ $isOpen: boolean }>`
  font-size: 1.5rem;
  transition: transform 0.3s ease-in-out;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(90deg)' : 'rotate(0deg)')};
`;

const CardDescription = styled.div<{ $isOpen: boolean }>`
  font-size: 1.1rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
  max-height: ${({ $isOpen }) => ($isOpen ? "1000px" : "0")};
  overflow: hidden;
  transition: padding 0.3s ease, max-height 0.3s ease;
  white-space: pre-wrap;
  padding: ${({ $isOpen }) => ($isOpen ? '0 1.5rem 1.5rem 1.5rem' : '0 1.5rem')};
`;

const TopicCard: React.FC<{
  title: string;
  description: string;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ title, description, isOpen, onToggle }) => {
  return (
    <Card onClick={onToggle}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <ChevronIcon $isOpen={isOpen}>▶</ChevronIcon>
      </CardHeader>
      <CardDescription $isOpen={isOpen}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{description}</ReactMarkdown>
      </CardDescription>
    </Card>
  );
};

// --- Hovedkomponent ---
export default function Artists() {
  const [openArtists, setOpenArtists] = useState<{ [key: number]: boolean }>({});

  const toggleArtist = (index: number) => {
    setOpenArtists((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const gridArtists = [
    { id: 1, name: "Liora", thumbnail: "/Studio51.png" },
    { id: 2, name: "Endrey", thumbnail: "/Studio51.png" },
    { id: 3, name: "Smithy", thumbnail: "/Studio51.png" },
  ];

  const artistBios = [
    {
      subtitle: "Liora",
      visible_description: "Liora er en voksende stjerne på Studio 51, kjent for sine dype house-låter fylt med melodisk vokal. Hun ble med i 2020 og har siden forvandlet sin personlige reise til pulserende rytmer som resonnerer med lytterne.",
      toggle_title: "Hør om Siste Utgivelse",
      toggled_content: "Hennes siste singel, *'Echo Pulse'*, fanger essensen av å finne helbredelse gjennom musikk.",
    },
    {
      subtitle: "Endrey",
      visible_description: "Endrey bringer en funky house-vibb til Studio 51, hvor han blander klassiske beats med moderne eleganse. Som medlem siden 2019, viser hans arbeid på *'Lusitania'* (med Citizen Kay) hans teft for samarbeid og produksjoner med tung groove.",
      toggle_title: "Mer om Artistens Arbeid",
      toggled_content: "Få med deg settene hans på våre live-arrangementer for en uforglemmelig opplevelse!",
    },
    {
      subtitle: "Smithy",
      visible_description: "Smithy, en veteran fra Studio 51s house-scene, leverer hardtslående basslinjer og oppløftende melodier. Aktiv siden 2017, er låten hans *'Night Shift'* en fast del av våre freestyle-sessions, noe som reflekterer hans røtter fra tiden i Villa Walle-kjelleren.",
      toggle_title: "Utforsk Artistens Røtter",
      toggled_content: "Hans musikk er et direkte resultat av energien og samholdet som definerte de tidlige dagene av Studio 51.",
    },
  ];

  return (
    <PageContainer>
      {/* --- Artist-galleri Seksjon --- */}
      <ArtistsGridSection>
        <SectionTitle>Våre Artister</SectionTitle>
        <LargeText>
          Utforsk våre artister som bringer unik energi til Studio 51. Klikk på kortene deres for å dykke dypere inn i deres historier og lydbilder.
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
                    style={{ objectFit: 'cover' }}
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

      {/* --- Biografi-seksjon --- */}
      <BioContentContainer>
        <SectionTitle>Møt Artistene</SectionTitle>
        <LargeText>
          Studio 51 er hjem til en talentfull gruppe house-artister som blander sjelfulle beats med den rå energien fra recovery-reisen. Fra hip-hop-røtter til elektroniske grooves, bringer disse skaperne unike stemmer til vårt fellesskap.
        </LargeText>
        {artistBios.map((artist, index) => (
          <TopicContainer key={index}>
            <TopicSubtitle>{artist.subtitle}</TopicSubtitle>
            <TopicParagraph>{artist.visible_description}</TopicParagraph>
            <TopicCard
              title={artist.toggle_title}
              description={artist.toggled_content}
              isOpen={!!openArtists[index]}
              onToggle={() => toggleArtist(index)}
            />
          </TopicContainer>
        ))}
      </BioContentContainer>
    </PageContainer>
  );
}