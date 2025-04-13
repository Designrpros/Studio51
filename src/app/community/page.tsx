// src/app/akthe/page.tsx
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
  padding: 4rem 2rem; /* Offset Toolbar */
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  padding-bottom: 0.5rem;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const LargeText = styled.div`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.8;
  margin-bottom: 1.5rem;

  & > p {
    margin: 0;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// AktheCard Component
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
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
`;

const CardDescription = styled.div<{ $isOpen: boolean }>`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
  margin-top: ${({ $isOpen }) => ($isOpen ? "1rem" : "0")};
  max-height: ${({ $isOpen }) => ($isOpen ? "1000px" : "0")};
  overflow: hidden;
  transition: all 0.3s ease;

  & > p {
    margin: 0;
  }
`;

const AktheCard: React.FC<{
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

// Main Component
export default function Akthe() {
  const [openCards, setOpenCards] = useState<{ [key: number]: boolean }>({});

  const toggleCard = (index: number) => {
    setOpenCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const sections = [
    {
      title: "AKTHE - Activity-Based Healthcare",
      largeText:
        "Aktivitetsbasert Helsehjelp (AKTHE), established on January 1, 2022, is a division dedicated to mental health, substance abuse support, tailored housing, and acute services in Bærum. Our mission is to provide health-promoting activities that foster recovery, prevent exclusion, and empower individuals to master their chosen pursuits—be it social connection, work training, employment, or skill development.\n\nRooted in recovery-oriented principles, Supported Employment, IPS, and lived experience, AKTHE operates through social entrepreneurship. Our projects are co-created with public and private partners to deliver meaningful activities and job opportunities.",
      cards: [
        {
          title: "Studio 51 / Rap Clinic",
          description:
            "A music-based initiative to reconnect individuals with music and social bonds, promoting recovery through creative expression with the motto *‘Beats for Recovery.’* Since 2016, Studio 51 has grown into a vibrant community in Sandvika, offering house music workshops, recording sessions, and live events to support mental health and substance abuse recovery.",
        },
        {
          title: "Høl i CV-en",
          description:
            "A user-driven program featuring a café, coffee roastery, and food truck, empowering participants to build positive identities through meaningful work. *‘It’s about filling gaps with purpose,’* says a participant. Høl i CV-en provides practical skills and social engagement, helping individuals re-enter the workforce.",
        },
        {
          title: "The Music Truck",
          description:
            "A mobile music therapy service using music to express thoughts and emotions, enhancing quality of life for participants. Deployed across Bærum, it brings house beats and creative outlets to those in need, offering *‘a studio on wheels’* for recovery and connection.",
        },
        {
          title: "DSA Groups",
          description:
            "A work program for individuals on the autism spectrum, offering practical tasks in nature and collaboration with public partners. *‘Nature and teamwork gave me focus,’* shares a member. DSA Groups combine activity-based support with skill-building in a supportive environment.",
        },
        {
          title: "Bjørnegård Health Center",
          description:
            "A modern health center in Bærum offering a wide range of services, from prevention to rehabilitation, with a multidisciplinary team focused on holistic care. Integrated with AKTHE, it supports Studio 51 and other projects by providing health resources and activity spaces.",
        },
      ],
    },
  ];

  return (
    <PageContainer>
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
            {section.cards.map((card, cardIndex) => {
              const globalIndex = sectionIndex * 100 + cardIndex;
              return (
                <AktheCard
                  key={globalIndex}
                  title={card.title}
                  description={card.description}
                  isOpen={!!openCards[globalIndex]}
                  onToggle={() => toggleCard(globalIndex)}
                />
              );
            })}
          </Section>
        ))}
      </ContentContainer>
    </PageContainer>
  );
}