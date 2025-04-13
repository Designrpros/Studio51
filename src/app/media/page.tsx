// src/app/projects/page.tsx
"use client";

import styled from "styled-components";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
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
  padding: 4rem 2rem; /* Increased padding to offset Toolbar */
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

// TopicCard Component
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

const TopicCard: React.FC<{
  title: string;
  description: string;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ title, description, isOpen, onToggle }) => {
  return (
    <Card $isOpen={isOpen} onClick={onToggle}>
      <CardTitle>{title}</CardTitle>
      <CardDescription $isOpen={isOpen}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  language={match[1]}
                  style={vscDarkPlus}
                  customStyle={{
                    marginTop: "1rem",
                    borderRadius: "4px",
                    padding: "1rem",
                    backgroundColor: "#1e1e1e",
                  }}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {description}
        </ReactMarkdown>
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

  const sections = [
    {
      title: "Music Releases",
      largeText:
        "Studio 51 empowers its members to create and release music under our label, available on platforms like Spotify and SoundCloud. Explore some of our standout projects below.",
      topics: [
        {
          title: "Prima",
          description:
            "A powerful hip-hop single by one of our founding artists, showcasing raw emotion and lyrical depth. Recorded at Studio 51’s Villa Walle basement in 2018.\n\nListen on SoundCloud:\n\n```html\n<iframe width=\"100%\" height=\"166\" scrolling=\"no\" frameborder=\"no\" allow=\"autoplay\" src=\"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/123456789&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true\"></iframe>\n```\n(Replace with real SoundCloud embed URL)",
        },
        {
          title: "Echoes of Recovery",
          description:
            "An album collaboration from 2021, blending hip-hop and electronic beats. Produced at our Smia facility in Stabekk.\n\nStream it here:\n\n```html\n<iframe width=\"100%\" height=\"166\" scrolling=\"no\" frameborder=\"no\" allow=\"autoplay\" src=\"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/987654321&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true\"></iframe>\n```\n(Replace with real SoundCloud embed URL)",
        },
        {
          title: "Freestyle Fridays",
          description:
            "A series of live freestyle recordings from our weekly sessions. Captures the raw energy of Studio 51’s community.\n\nCheck out a sample:\n\n```html\n<iframe width=\"100%\" height=\"166\" scrolling=\"no\" frameborder=\"no\" allow=\"autoplay\" src=\"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/456789123&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true\"></iframe>\n```\n(Replace with real SoundCloud embed URL)",
        },
      ],
    },
    {
      title: "Creative Works",
      topics: [
        {
          title: "Animation Short: ‘Rhythm of Resilience’",
          description:
            "A 3-minute animation created by Studio 51 members in 2022, depicting a journey of recovery through music.\n\nWatch it on YouTube:\n\n```html\n<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/VIDEO_ID\" title=\"Rhythm of Resilience\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>\n```\n(Replace VIDEO_ID with actual YouTube ID)",
        },
        {
          title: "Podcast: ‘Beats & Stories’",
          description:
            "A monthly podcast featuring Studio 51 artists sharing their creative process and recovery stories.\n\nListen to Episode 1:\n\n```html\n<iframe src=\"https://open.spotify.com/embed/episode/EPISODE_ID?utm_source=generator\" width=\"100%\" height=\"152\" frameBorder=\"0\" allowfullscreen=\"\" allow=\"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture\"></iframe>\n```\n(Replace EPISODE_ID with actual Spotify episode ID)",
        },
        {
          title: "Gaming Project: ‘Soundscape’",
          description:
            "An experimental game prototype where players create music to progress, developed during a 2023 workshop.\n\nMore details coming soon!",
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
            {section.topics.map((topic, topicIndex) => {
              const globalIndex = sectionIndex * 100 + topicIndex;
              return (
                <TopicCard
                  key={globalIndex}
                  title={topic.title}
                  description={topic.description}
                  isOpen={!!openTopics[globalIndex]}
                  onToggle={() => toggleTopic(globalIndex)}
                />
              );
            })}
          </Section>
        ))}
      </ContentContainer>
    </PageContainer>
  );
}