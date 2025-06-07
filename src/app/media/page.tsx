// src/app/projects/page.tsx
"use client";

import styled from "styled-components";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Styled Components (hentet fra det nye 'learn'-designet)
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
  padding: 4rem 2rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const MainTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
  text-transform: uppercase;
`;

const MainParagraph = styled.p`
  font-size: 1.25rem;
  line-height: 1.8;
  max-width: 800px;
  margin-bottom: 4rem;
`;

const Section = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  padding-bottom: 0.5rem;
`;

const LargeText = styled.div`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.8;
  margin-bottom: 2.5rem;
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
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
  max-height: ${({ $isOpen }) => ($isOpen ? "1000px" : "0")};
  overflow: hidden;
  transition: padding 0.3s ease, max-height 0.3s ease;
  white-space: pre-wrap;
  padding: ${({ $isOpen }) => ($isOpen ? '0 1.5rem 1.5rem 1.5rem' : '0 1.5rem')};

  & a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-weight: bold;
    &:hover {
      text-decoration: underline;
    }
  }
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

// Main Component
export default function Projects() {
  const [openTopics, setOpenTopics] = useState<{ [key: number]: boolean }>({});

  const toggleTopic = (index: number) => {
    setOpenTopics((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const projectSections = [
    {
      sectionTitle: "Offisielle Kanaler",
      sectionParagraph: "Dette er de sentrale knutepunktene for Rap Clinic og Studio 51. Her finner du den mest oppdaterte informasjonen, presseklipp og direkte kontaktinfo.",
      topics: [
        {
          subtitle: "RapClinic.no",
          visible_description: "Vår offisielle nettside er hjertet av vår digitale tilstedeværelse. Utforsk vår historie, lær om våre tjenester, og se hvordan du kan støtte vårt arbeid.",
          toggle_title: "Besøk Nettsiden",
          toggled_content: "[Gå til rapclinic.no](https://rapclinic.no/)",
        },
        {
          subtitle: "Nyhetsartikler",
          visible_description: "Les hva media skriver om oss. Disse artiklene gir et dypere innblikk i vår påvirkning i lokalsamfunnet og historiene til våre medlemmer.",
          toggle_title: "Les Artikler",
          toggled_content: "* **Bærum Kommune:** [Et Kreativt Fristed](https://www.baerum.kommune.no/aktuelt/et-kreativt-fristed-for-rusavhengige/)\n* **Budstikka:** [Huset Som Musikken Bygget](https://www.budstikka.no/rus-og-psykiatri/musikk/sandvika/huset-som-musikken-bygget/520261!/)",
        },
      ],
    },
    {
      sectionTitle: "Musikk & Video",
      sectionParagraph: "Musikk er kjernen i alt vi gjør. Utforsk de kreative verkene fra våre artister på YouTube og Spotify, fra musikkvideoer og singler til podcaster og samlealbum.",
      topics: [
        {
          subtitle: "YouTube",
          visible_description: "Vår YouTube-kanal er et visuelt galleri for medlemmenes kreativitet. Her finner du offisielle musikkvideoer, låter og innhold fra studio-hverdagen.",
          toggle_title: "Se på YouTube",
          toggled_content: "* **Hovedkanal:** [Besøk Rap Clinic på YouTube](https://www.youtube.com/@rapclinicstudio5175)\n* **Musikkvideo:** [GAMMAL MA$A - 'HJERTESORG'](https://www.youtube.com/watch?v=D-A7y3NzqKk)",
        },
        {
          subtitle: "Spotify",
          visible_description: "Gjennom labelet Studio 51 produserer og utgir våre medlemmer egen musikk. Lytt til deres historier, følg oss for nye utgivelser, og hør på vår podcast.",
          toggle_title: "Lytt på Spotify",
          toggled_content: "* **Artistprofil:** [Følg Studio 51](https://open.spotify.com/artist/0Vp8nF2M1kOYp3a8gX2Haa)\n* **Podcast:** [Studio 51-podden](https://open.spotify.com/show/5J0aL9uB9iG4oO7G4a8gH9)\n* **Album:** [Kompilasjon 2022](https://open.spotify.com/album/43ko3y5fGdoL55B5aYrtwM)",
        },
      ],
    },
    {
      sectionTitle: "Sosiale Medier",
      sectionParagraph: "Følg oss i hverdagen for å få et innblikk i vårt fellesskap og kreative prosesser. Her deler vi øyeblikk bak kulissene, kunngjøringer og ufiltrert kreativitet.",
      topics: [
        {
          subtitle: "Instagram",
          visible_description: "Instagram er der du får de ferskeste oppdateringene. Se bilder og videoer fra sessions, arrangementer og dagliglivet på huset.",
          toggle_title: "Følg @rap_klinikken",
          toggled_content: "[Besøk vår Instagram-profil](https://www.instagram.com/rap_klinikken/)",
        },
        {
          subtitle: "Facebook",
          visible_description: "Bli med i vårt Facebook-fellesskap for å koble deg til den større Studio 51-familien, motta invitasjoner til arrangementer og delta i samtalen.",
          toggle_title: "Besøk vår Facebook-side",
          toggled_content: "[Gå til Facebook](https://www.facebook.com/rapklinikken/)",
        },
        {
          subtitle: "SoundCloud",
          visible_description: "Vår SoundCloud er lekeplassen for rå, ufiltrert kreativitet. Lytt til demoer, uferdige spor og spontane opptak fra våre sessions.",
          toggle_title: "Lytt på SoundCloud",
          toggled_content: "[Utforsk vår SoundCloud](https://soundcloud.com/user-725912429)",
        },
      ],
    },
  ];

  return (
    <PageContainer>
      <ContentContainer>
        <MainTitle>Media & Plattformer</MainTitle>
        <MainParagraph>
          Oppdag de ulike plattformene hvor Rap Clinic og Studio 51 deler sitt arbeid, sine historier og sin musikk. Her finner du alt fra offisielle utgivelser og nyhetsartikler til våre kanaler i sosiale medier.
        </MainParagraph>

        {projectSections.map((section, sectionIndex) => (
          <Section key={sectionIndex}>
            <SectionTitle>{section.sectionTitle}</SectionTitle>
            <LargeText>
              <ReactMarkdown>{section.sectionParagraph}</ReactMarkdown>
            </LargeText>

            {section.topics.map((topic, topicIndex) => {
              const globalIndex = sectionIndex * 100 + topicIndex;
              return (
                <TopicContainer key={globalIndex}>
                  <TopicSubtitle>{topic.subtitle}</TopicSubtitle>
                  <TopicParagraph>{topic.visible_description}</TopicParagraph>
                  <TopicCard
                    title={topic.toggle_title}
                    description={topic.toggled_content}
                    isOpen={!!openTopics[globalIndex]}
                    onToggle={() => toggleTopic(globalIndex)}
                  />
                </TopicContainer>
              );
            })}
          </Section>
        ))}
      </ContentContainer>
    </PageContainer>
  );
}