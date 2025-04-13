"use client";

import styled from "styled-components";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Styled Components
const ArtistPageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.backgroundLight};
  color: ${({ theme }) => theme.colors.textLight};
  font-family: "Montserrat", sans-serif;
`;

const ArtistContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 1rem;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 2rem 0.75rem;
  }
  @media (max-width: 480px) {
    padding: 1.5rem 0.5rem;
  }
`;

const ArtistTitle = styled.h1`
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1.5rem;
  text-align: center;
  text-transform: uppercase;
`;

const ArtistDescription = styled.div`
  font-size: clamp(0.875rem, 3vw, 1.25rem);
  line-height: 1.8;
  max-width: 100%;
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: normal;

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

export default function ArtistDetail() {
  const { id } = useParams();

  const artistsData = {
    1: {
      name: "Liora",
      description:
        "Liora is a rising star at Studio 51, known for her deep house tracks infused with melodic vocals. Joining in 2020, she’s turned her personal journey into pulsating rhythms that resonate with listeners. Her latest single, *‘Echo Pulse,’* captures the essence of healing through music.",
    },
    2: {
      name: "Endrey",
      description:
        "Endrey brings a funky house vibe to Studio 51, mixing classic beats with modern flair. A member since 2019, his work on *‘Lusitania’* (featuring Citizen Kay) showcases his knack for collaboration and groove-heavy production. Catch his sets at our live events!",
    },
    3: {
      name: "Smithy",
      description:
        "Smithy, a veteran of Studio 51’s house scene, delivers gritty basslines and uplifting melodies. Active since 2017, his track *‘Night Shift’* is a staple in our freestyle sessions, reflecting his roots in the Villa Walle basement days.",
    },
  } as const;

  // Convert id to a number and validate
  const artistId = typeof id === "string" ? parseInt(id, 10) : NaN;
  const validKeys = Object.keys(artistsData).map(Number) as number[];
  const artist = validKeys.includes(artistId as keyof typeof artistsData)
    ? artistsData[artistId as keyof typeof artistsData]
    : { name: "Artist Not Found", description: "No details available for this artist." };

  return (
    <ArtistPageContainer>
      <ArtistContent>
        <ArtistTitle>{artist.name}</ArtistTitle>
        <ArtistDescription>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{artist.description}</ReactMarkdown>
        </ArtistDescription>
      </ArtistContent>
    </ArtistPageContainer>
  );
}