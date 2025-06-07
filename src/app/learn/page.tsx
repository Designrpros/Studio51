// src/app/learn/page.tsx
"use client";

import styled from "styled-components";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Styled Components
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

// ENDRING: Fjernet 'text-align: center' og 'margin: auto'
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

// --- VISUELL FORBEDRING AV TOGGLE-KOMPONENT ---

const Card = styled.div`
  background: ${({ theme }) => theme.colors.backgroundContent};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.backgroundContent};
  cursor: pointer;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden; // Sørger for at innholdet holder seg innenfor border-radius

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

  & ul {
    list-style-position: inside;
    padding-left: 0;
  }

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

// --- Hovedkomponent for Læringssiden ---
export default function Learn() {
  const [openTopics, setOpenTopics] = useState<{ [key: number]: boolean }>({});

  const toggleTopic = (index: number) => {
    setOpenTopics((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // ENDRING: Fjernet "▼" fra toggle_title
  const learningSections = [
    {
      sectionTitle: "Musikk & Tekst",
      sectionParagraph: "Kjernen i Studio 51 er å skape musikk. Her er verktøyene som hjelper deg med å transformere ideer til ferdige låter. Lær alt fra å bygge beats og mestre produksjonsteknikker, til å bruke AI for å overvinne skrivesperre og finne nye lyriske vinklinger.",
      topics: [
        {
          subtitle: "Melodex: Fra Idé til Beat",
          visible_description: "Melodex er vår portal til profesjonell musikkproduksjon. Her lærer du å bruke Logic Pro X, et av bransjens kraftigste verktøy, for å bygge beats, arrangere låter og forme ditt unike lydbilde.",
          toggle_title: "Se nøkkelfunksjoner og teknisk info",
          toggled_content: "I Melodex-kurset fokuserer vi på:\n\n* **Logic Pro X:** Grunnleggende og avanserte teknikker.\n* **Lyddesign:** Skap egne lyder fra bunnen av.\n* **Sjangerforståelse:** Spesialisering i house og elektronisk musikk.\n\n[Utforsk Melodex](https://melodex-seven.vercel.app)"
        },
        {
          subtitle: "Prompted: Kreativ Skrivehjelp",
          visible_description: "Prompted er din kreative partner for å skrive tekster. Dette verktøyet bruker avansert AI for å gi deg inspirasjon, hjelpe deg med å finne rim og metaforer, og bryte gjennom enhver skrivesperre.",
          toggle_title: "Se nøkkelfunksjoner og teknisk info",
          toggled_content: "Med Prompted kan du:\n\n* **Generere idéer:** Få forslag til temaer og konsepter.\n* **Forbedre tekster:** Analyser og få forslag til bedre formuleringer.\n* **Lær 'Prompt Engineering':** Mestre kunsten å kommunisere med AI for best resultat.\n\n[Utforsk Prompted](https://prompted-two.vercel.app/)"
        },
      ],
    },
    {
      sectionTitle: "Visuell & Digital Design",
      sectionParagraph: "En god låt fortjener et sterkt visuelt uttrykk. I denne seksjonen finner du verktøy for å designe alt fra platecovere og animasjoner til komplette nettsider. Utforsk hvordan du kan bygge en visuell identitet for musikken din.",
      topics: [
        {
          subtitle: "Composition: Grafisk Design",
          visible_description: "Composition er verktøykassen for alt visuelt. Lær å bruke Figma, bransjestandarden for design, til å lage slående platecovere, promomateriell og prototyper for animasjoner og nettsider.",
          toggle_title: "Se nøkkelfunksjoner og teknisk info",
          toggled_content: "Våre Composition-workshops dekker:\n\n* **Figma:** Fra grunnleggende til avansert prototyping.\n* **Designprinsipper:** Farge, typografi og komposisjon.\n* **Animasjon:** Grunnleggende prinsipper for bevegelsesgrafikk.\n\n[Utforsk Composition](https://composition-nu.vercel.app)"
        },
        {
          subtitle: "Layer: Web- og Apputvikling",
          visible_description: "Med Layer kan du ta din digitale tilstedeværelse til neste nivå. Lær å kode dine egne nettsider og små applikasjoner ved hjelp av moderne teknologier som brukes av profesjonelle utviklere.",
          toggle_title: "Se nøkkelfunksjoner og teknisk info",
          toggled_content: "I Layer jobber vi med:\n\n* **Kode-editor:** Visual Studio Code.\n* **Framework:** Next.js (React).\n* **Styling:** Styled Components for dynamisk design.\n\n[Utforsk Layer](https://layer-eight.vercel.app)"
        },
      ],
    },
  ];

  return (
    <PageContainer>
      <ContentContainer>
        <MainTitle>Læringsverktøy</MainTitle>
        <MainParagraph>
          Utforsk de kreative verktøyene vi bruker på Studio 51. Her kan du lære alt fra musikkproduksjon og lyrikk til grafisk design og koding.
        </MainParagraph>

        {learningSections.map((section, sectionIndex) => (
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