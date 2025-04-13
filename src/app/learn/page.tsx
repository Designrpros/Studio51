// src/app/learn/page.tsx
"use client";

import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Global box-sizing reset
const GlobalStyle = styled.div`
  *, *:before, *:after {
    box-sizing: border-box;
  }
`;

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
  padding: 4rem 1rem; /* Reduced horizontal padding */
  position: relative;
  z-index: 1;
  text-align: center;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 2rem 0.75rem;
  }
  @media (max-width: 480px) {
    padding: 1.5rem 0.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 2rem;
  text-transform: uppercase;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const IntroText = styled.div`
  font-size: clamp(0.875rem, 3vw, 1.25rem);
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.8;
  margin-bottom: 2rem;
  text-align: left;
  width: 100%; /* Full width of container */
  max-width: 100%; /* Prevent exceeding container */
  overflow-x: hidden; /* Clip any overflow */
  overflow-wrap: break-word; /* Break long words */
  word-break: break-word; /* Ensure word breaking */
  white-space: normal; /* Force wrapping */

  & > p {
    margin: 0 0 1rem 0;
    width: 100%;
    max-width: 100%;
    overflow-wrap: break-word;
    word-break: break-word;
    white-space: normal;
  }

  @media (max-width: 768px) {
    line-height: 1.6;
  }
  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
  }
`;

const ResourcesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto 2rem;
  padding: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
    padding: 0 0.75rem;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    padding: 0 0.5rem;
    gap: 0.75rem;
  }
`;

const ResourceCard = styled.div`
  background: ${({ theme }) => theme.colors.backgroundContent};
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;

const ResourceImage = styled(Image)`
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    margin-bottom: 0.75rem;
  }
`;

const ResourceTitle = styled.h3`
  font-size: clamp(1rem, 3vw, 1.5rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;

const ResourceDescription = styled.p`
  font-size: clamp(0.75rem, 2.5vw, 1rem);
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.5;
  margin-bottom: 1rem;
  overflow-wrap: break-word;
  word-break: break-word;
  flex-grow: 1;

  @media (max-width: 768px) {
    line-height: 1.4;
  }
  @media (max-width: 480px) {
    line-height: 1.3;
  }
`;

const ResourceLink = styled(Link)`
  display: inline-block;
  font-size: clamp(0.75rem, 2.5vw, 1rem);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textDark};
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
  }
  @media (max-width: 480px) {
    padding: 0.3rem 0.6rem;
  }
`;

const AdditionalText = styled.div`
  font-size: clamp(0.875rem, 3vw, 1.25rem);
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.8;
  margin-top: 2rem;
  text-align: left;
  width: 100%; /* Full width of container */
  max-width: 100%; /* Prevent exceeding container */
  overflow-x: hidden; /* Clip any overflow */
  overflow-wrap: break-word; /* Break long words */
  word-break: break-word; /* Ensure word breaking */
  white-space: normal; /* Force wrapping */

  & > p {
    margin: 0 0 1rem 0;
    width: 100%;
    max-width: 100%;
    overflow-wrap: break-word;
    word-break: break-word;
    white-space: normal;
  }

  @media (max-width: 768px) {
    line-height: 1.6;
  }
  @media (max-width: 480px) {
    margin-top: 1.5rem;
  }
`;

export default function Learn() {
  const resources = [
    {
      title: "Melodex",
      image: "/Studio51.png",
      description:
        "Dive into music production with Melodex, adapted for Studio 51. Learn Logic Pro X and sound design to create house beats like our artists.",
      link: "https://melodex-seven.vercel.app",
    },
    {
      title: "Prompted",
      image: "/Studio51.png",
      description:
        "Enhance your creative process with Prompted. Learn prompt engineering to inspire lyrics and music ideas for Studio 51 sessions.",
      link: "https://prompted-two.vercel.app/",
    },
    {
      title: "Composition",
      image: "/Studio51.png",
      description:
        "Master graphic design with Composition, perfect for Studio 51’s animation workshops. Explore Figma for prototyping visuals.",
      link: "https://composition-nu.vercel.app",
    },
    {
      title: "Layer",
      image: "/Studio51.png",
      description:
        "Learn web design basics with Layer, tailored for Studio 51’s digital projects. Use VSCode, Next.js, and Styled Components to build creative tools.",
      link: "https://layer-eight.vercel.app",
    },
  ];

  return (
    <GlobalStyle>
      <PageContainer>
        <ContentContainer>
          <SectionTitle>Learn with Studio 51</SectionTitle>
          <ResourcesGrid>
            {resources.map((resource, index) => (
              <ResourceCard key={index}>
                <ResourceImage
                  src={resource.image}
                  alt={resource.title}
                  width={280}
                  height={180}
                  style={{ objectFit: "cover" }}
                />
                <ResourceTitle>{resource.title}</ResourceTitle>
                <ResourceDescription>{resource.description}</ResourceDescription>
                <ResourceLink href={resource.link} target="_blank" rel="noopener noreferrer">
                  Explore Now
                </ResourceLink>
              </ResourceCard>
            ))}
          </ResourcesGrid>
        </ContentContainer>
      </PageContainer>
    </GlobalStyle>
  );
}