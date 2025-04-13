"use client";

import styled from "styled-components";
import Image from "next/image";
import { useState, useEffect } from "react";
import { configureCloudKit, AuthResponse, Container, signOutCloudKit } from "@/lib/cloudkit";

// Styled Components
const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.backgroundLight};
  color: ${({ theme }) => theme.colors.textLight};
  font-family: "Montserrat", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const LoginContainer = styled.div`
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.backgroundContent};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  z-index: 1;

  @media (max-width: 768px) {
    margin: 1rem;
    padding: 1.5rem;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
  width: 100%;
  max-width: 300px;
  margin: 1rem auto;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }
`;

const Message = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-top: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const AppleButtonContainer = styled.div`
  margin: 1rem auto;
  max-width: 300px;
  min-height: 44px;
  width: 100%;
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(true);
  const [isLightMode] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("studio51_user");
    if (user) {
      setIsLoggedIn(true);
      return;
    }

    // Initialize CloudKit
    configureCloudKit()
      .then((container: Container) => {
        // Check auth state periodically
        const checkAuth = () => {
          if (!isPolling) return;
          container.setUpAuth().then((auth: AuthResponse) => {
            if (auth?.userRecordName) {
              localStorage.setItem("studio51_user", JSON.stringify(auth));
              setIsLoggedIn(true);
              setError(null);
            }
          }).catch((err: unknown) => {
            console.error("Auth check error:", err);
            setError("Failed to check authentication.");
          });
        };

        checkAuth();
        const interval = setInterval(checkAuth, 5000); // Poll every 5 seconds

        return () => clearInterval(interval);
      })
      .catch((err: unknown) => {
        console.error("CloudKit init error:", err);
        setError("Failed to initialize authentication.");
      });
  }, [isPolling]);

  const handleSignOut = async () => {
    try {
      setIsPolling(false); // Stop polling during sign-out
      await signOutCloudKit();
      localStorage.removeItem("studio51_user");
      setIsLoggedIn(false);
      setError(null);
    } catch (err: unknown) {
      console.error("Sign-out error:", err);
      setError("Failed to sign out.");
      setIsPolling(true); // Resume polling if sign-out fails
    }
  };

  return (
    <PageContainer>
      <LoginContainer>
      <HeroBackground>
        <Image
          src={isLightMode ? "/MusicCircleWhite.png" : "/MusicCircle.png"}
          alt="Studio 51 Music Circle"
          fill
          style={{
            objectFit: "cover",
            opacity: 0.5,
          }}
          priority
        />
      </HeroBackground>
        <Title>{isLoggedIn ? "Welcome Back" : "Log In to Studio 51"}</Title>
        {isLoggedIn ? (
          <>
            <Message>You are logged in.</Message>
            <Button onClick={handleSignOut}>Sign Out</Button>
          </>
        ) : (
          <>
            <Message>Please sign in with your Apple ID.</Message>
            <AppleButtonContainer>
              <div id="apple-sign-in-button"></div>
            </AppleButtonContainer>
            {error && <Message>{error}</Message>}
          </>
        )}
      </LoginContainer>
    </PageContainer>
  );
}