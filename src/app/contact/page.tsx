// src/app/contact/page.tsx
"use client";

import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

// Styled Components
const ContactSection = styled.section`
  width: 100%;
  min-height: calc(100vh - 60px); /* Offset Toolbar */
  background: ${({ theme }) => theme.colors.backgroundLight};
  color: ${({ theme }) => theme.colors.textLight};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  font-family: "Montserrat", sans-serif;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const ContactTitle = styled.h2`
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1.5rem;
  text-align: center;
  text-transform: uppercase;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const ContactText = styled.p`
  font-size: clamp(0.875rem, 3vw, 1.125rem);
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto 1.5rem;
  text-align: center;
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: normal;

  @media (max-width: 768px) {
    line-height: 1.5;
    margin-bottom: 1rem;
  }
`;

const ContactLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textLight};
  text-decoration: none;
  font-size: clamp(0.875rem, 3vw, 1.125rem);
  margin-bottom: 1rem;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.accent}; /* Orange hover */
  }

  span {
    margin-right: 0.5rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 0.25rem;
  }
`;

const Address = styled.div`
  text-align: center;
  font-size: clamp(0.875rem, 3vw, 1.125rem);
  line-height: 1.8;
  margin-top: 1rem;

  a {
    color: ${({ theme }) => theme.colors.textLight};
    text-decoration: none;
    transition: color 0.3s;
    overflow-wrap: break-word;
    word-break: break-word;
    white-space: normal;

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }

  div {
    margin-bottom: 0.5rem;
  }

  @media (max-width: 768px) {
    line-height: 1.6;
  }
`;

const SocialLinks = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  font-size: clamp(0.875rem, 3vw, 1.125rem);

  a {
    color: ${({ theme }) => theme.colors.textLight};
    text-decoration: none;
    margin: 0 0.75rem;
    transition: color 0.3s;

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Logo = styled(Image)`
  display: block;
  margin: 1.5rem auto 0;
  filter: ${({ theme }) => (theme.colors.backgroundLight === "#F7F4E9" ? "none" : "invert(1)")};
  width: clamp(150px, 20vw, 200px);
  height: auto;

  @media (max-width: 768px) {
    margin: 1rem auto 0;
  }
`;

const Footer = styled.footer`
  width: 100%;
  background: ${({ theme }) => theme.colors.backgroundDark};
  color: ${({ theme }) => theme.colors.textLight};
  text-align: center;
  padding: 1rem;
  font-size: clamp(0.75rem, 2.5vw, 1rem);
`;

const FooterText = styled.p`
  margin: 0;
`;

export default function Contact() {
  return (
    <>
      <ContactSection>
        <ContactTitle>Kontakt Oss</ContactTitle>
        <ContactText>
          Ta gjerne kontakt med oss via e-post eller telefon, eller besøk oss på en av våre adresser.
        </ContactText>
        <ContactLink href="mailto:home@rapclinic.no">
          <span>📧</span> home@rapclinic.no
        </ContactLink>
        <ContactLink href="tel:+4797739908">
          <span>📞</span> +47 977 39 908
        </ContactLink>
        <Address>
          <div>
            <Link href="https://www.google.com/maps?q=Gamle+Drammensvei+25,+1369+Stabekk,+Norge" target="_blank" rel="noopener noreferrer">
              Gamle Drammensvei 25, 1369 Stabekk, Norge
            </Link>
          </div>
          <div>
            <Link href="https://www.google.com/maps?q=Anthon+Walles+vei+37,+1337+Sandvika,+Norge" target="_blank" rel="noopener noreferrer">
              Anthon Walles vei 37, 1337 Sandvika, Norge
            </Link>
          </div>
        </Address>
        <SocialLinks>
          <Link href="https://instagram.com/rapclinic" target="_blank" rel="noopener noreferrer">
            Instagram
          </Link>
          <Link href="https://facebook.com/rapclinic" target="_blank" rel="noopener noreferrer">
            Facebook
          </Link>
          <Link href="https://twitter.com/rapclinic" target="_blank" rel="noopener noreferrer">
            Twitter
          </Link>
        </SocialLinks>
        <Logo src="/Studio51.png" alt="Studio 51 Logo" width={200} height={100} />
      </ContactSection>
      <Footer>
        <FooterText>© 2025 Studio 51</FooterText>
      </Footer>
    </>
  );
}