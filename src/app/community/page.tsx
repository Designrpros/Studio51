// src/app/akthe/page.tsx
"use client";

import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from 'next/link';

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

const TopicContainer = styled.div`
  margin-bottom: 3rem;
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

// NY KOMPONENT: Lenke-knapp
const InfoLink = styled(Link)`
  display: inline-block;
  background: ${({ theme }) => theme.colors.backgroundContent};
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  border: 1px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundLight};
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

// Hovedkomponent
export default function Akthe() {
  const aktheInitiatives = [
    {
      subtitle: "Studio 51 / Rap Clinic",
      visible_description: "Et musikkbasert initiativ for å koble individer på nytt med musikk og sosiale bånd, som fremmer mestring gjennom kreativt uttrykk. Siden 2016 har Studio 51 vokst til et levende fellesskap i Sandvika.",
      link_text: "Besøk Nettsiden",
      link_url: "https://rapclinic.no/",
    },
    {
      subtitle: "Høl i CV-en",
      visible_description: "Et brukerstyrt program med kafé, kaffebrenneri og 'food truck', som gir deltakerne mulighet til å bygge positive identiteter gjennom meningsfylt arbeid og praktiske ferdigheter.",
      link_text: "Les Mer hos Bærum Kommune",
      link_url: "https://www.baerum.kommune.no/tjenester/helse-og-omsorg/psykisk-helse-og-rus/aktivitetsbasert-helsehjelp-akthe/",
    },
    {
      subtitle: "Music Truck",
      visible_description: "En mobil musikkterapitjeneste som bruker musikk til å uttrykke tanker og følelser. Den ruller rundt i Bærum og tilbyr et 'studio på hjul' for mestring og tilknytning.",
      link_text: "Les Mer hos Bærum Kommune",
      link_url: "https://www.baerum.kommune.no/tjenester/helse-og-omsorg/psykisk-helse-og-rus/aktivitetsbasert-helsehjelp-akthe/",
    },
    {
      subtitle: "DSA-gruppene",
      visible_description: "Et arbeidsprogram for personer på autismespekteret, som tilbyr praktiske oppgaver i naturen og samarbeid med offentlige partnere i et trygt og støttende miljø.",
      link_text: "Les Mer hos Bærum Kommune",
      link_url: "https://www.baerum.kommune.no/tjenester/helse-og-omsorg/psykisk-helse-og-rus/aktivitetsbasert-helsehjelp-akthe/",
    },
    {
      subtitle: "Bjørnegård Helsesenter",
      visible_description: "Et moderne helsesenter som tilbyr et bredt spekter av tjenester, fra forebygging til rehabilitering. Integrert med AKTHE, støtter det prosjekter ved å tilby helseressurser og aktivitetsrom.",
      link_text: "Besøk Nettsiden",
      link_url: "https://www.baerum.kommune.no/tjenester/helse-og-omsorg/helsestasjoner-og-sentre/bjornegard-helsesenter/",
    },
  ];

  return (
    <PageContainer>
      <ContentContainer>
        <MainTitle>AKTHE - Aktivitetsbasert Helsehjelp</MainTitle>
        <MainParagraph>
          Aktivitetsbasert Helsehjelp (AKTHE), etablert 1. januar 2022, er en avdeling dedikert til psykisk helse, rusomsorg, tilpassede botilbud og akutte tjenester i Bærum. Vårt oppdrag er å tilby helsefremmende aktiviteter som fremmer recovery, forhindrer utenforskap og gir enkeltpersoner mulighet til å mestre sine valgte sysler.
        </MainParagraph>

        <Section>
          <SectionTitle>Våre Initiativer</SectionTitle>
            {aktheInitiatives.map((topic, topicIndex) => {
              return (
                <TopicContainer key={topicIndex}>
                  <TopicSubtitle>{topic.subtitle}</TopicSubtitle>
                  <TopicParagraph>{topic.visible_description}</TopicParagraph>
                  <InfoLink href={topic.link_url} target="_blank" rel="noopener noreferrer">
                    {topic.link_text}
                  </InfoLink>
                </TopicContainer>
              );
            })}
        </Section>
      </ContentContainer>
    </PageContainer>
  );
}