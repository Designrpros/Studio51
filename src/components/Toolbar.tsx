"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOutCloudKit } from "@/lib/cloudkit";

const ToolbarContainer = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.backgroundDark};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
`;

const MainToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 2rem;
  width: 100%;
  max-width: 1200px;
  min-height: 48px;
`;

const AdminNav = styled.div<{ $isVisible: boolean }>`
  display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
  justify-content: center;
  gap: 0.5rem;
  padding: 0.25rem 2.5rem;
  background-color: ${({ theme }) => theme.colors.backgroundContent};
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.textLight}20;

  @media (max-width: 768px) {
    gap: 0.5rem;
    padding: 0.25rem 1.5rem;
  }
`;

const AdminNavLink = styled(Link)`
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textLight};
  text-decoration: none;
  transition: color 0.3s ease;
  font-family: "Montserrat", sans-serif;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textDark};
  text-decoration: none;
  transition: color 0.3s ease;
  font-family: "Montserrat", sans-serif;
  margin-right: 1rem;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }

  @media (max-width: 800px) {
    font-size: 1.5rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.25rem;
  align-items: center;
  margin-left: 1rem;

  @media (max-width: 800px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textLight};
  text-decoration: none;
  transition: color 0.3s ease;
  font-family: "Montserrat", sans-serif;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }

  @media (max-width: 800px) {
    font-size: 1rem;
  }
`;

const BurgerIcon = styled.div<{ $isOpen: boolean }>`
  display: none;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 800px) {
    display: flex;
  }

  div {
    width: 22px;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.textDark};
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  ${({ $isOpen }) =>
    $isOpen &&
    `
    div:nth-child(1) {
      transform: rotate(45deg) translate(4px, 4px);
    }
    div:nth-child(2) {
      opacity: 0;
    }
    div:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px);
    }
  `}
`;

const MobileMenu = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 48px;
  left: 0;
  width: 100%;
  background: ${({ theme }) => theme.colors.backgroundContent};
  padding: 1.25rem 0;
  z-index: 999;
  transition: opacity 0.3s ease, transform 0.3s ease;
  transform: ${({ $isOpen }) => ($isOpen ? "translateY(0)" : "translateY(-10px)")};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (min-width: 801px) {
    display: none;
  }
`;

const MobileNavLink = styled(Link)`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textLight};
  text-decoration: none;
  padding: 0.75rem;
  width: 100%;
  text-align: center;
  transition: color 0.3s ease, background-color 0.3s ease;
  font-family: "Montserrat", sans-serif;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    background-color: ${({ theme }) => theme.colors.backgroundLight};
  }
`;

export default function Toolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  useEffect(() => {
    // Check login status
    const user = localStorage.getItem("studio51_user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSignOut = async () => {
    try {
      await signOutCloudKit();
      localStorage.removeItem("studio51_user");
      setIsLoggedIn(false);
      setIsOpen(false);
    } catch (err: unknown) {
      console.error("Sign-out error:", err);
    }
  };

  return (
    <>
      <ToolbarContainer>
        <MainToolbar>
          <Logo href="/">Studio 51</Logo>
          <NavLinks>
            <NavLink href="/artists">Artists</NavLink>
            <NavLink href="/media">Media</NavLink>
            <NavLink href="/community">Community</NavLink>
            <NavLink href="/learn">Learn</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            {isLoggedIn && <NavLink href="/admin/dashboard">Admin</NavLink>}
            <NavLink href="/login" onClick={isLoggedIn ? handleSignOut : undefined}>
              {isLoggedIn ? "Log out" : "Log in"}
            </NavLink>
          </NavLinks>
          <BurgerIcon $isOpen={isOpen} onClick={toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
          </BurgerIcon>
        </MainToolbar>
        <AdminNav $isVisible={isAdminPage}>
          <AdminNavLink href="/admin/dashboard">Dashboard</AdminNavLink>
          <AdminNavLink href="/admin/calendar">Calendar</AdminNavLink>
          <AdminNavLink href="/admin/employees">Employees</AdminNavLink>
          <AdminNavLink href="/admin/music-uploads">Music Uploads</AdminNavLink>
          <AdminNavLink href="/admin/manage">Manage</AdminNavLink>
        </AdminNav>
      </ToolbarContainer>
      <MobileMenu $isOpen={isOpen}>
        <MobileNavLink href="/artists" onClick={toggleMenu}>
          Artists
        </MobileNavLink>
        <MobileNavLink href="/media" onClick={toggleMenu}>
          Media
        </MobileNavLink>
        <MobileNavLink href="/community" onClick={toggleMenu}>
          Community
        </MobileNavLink>
        <MobileNavLink href="/learn" onClick={toggleMenu}>
          Learn
        </MobileNavLink>
        <MobileNavLink href="/contact" onClick={toggleMenu}>
          Contact
        </MobileNavLink>
        {isLoggedIn && (
          <>
            <MobileNavLink href="/admin/dashboard" onClick={toggleMenu}>
              Admin Dashboard
            </MobileNavLink>
            <MobileNavLink href="/admin/calendar" onClick={toggleMenu}>
              Admin Calendar
            </MobileNavLink>
            <MobileNavLink href="/admin/employees" onClick={toggleMenu}>
              Admin Employees
            </MobileNavLink>
            <MobileNavLink href="/admin/music-uploads" onClick={toggleMenu}>
              Admin Music Uploads
            </MobileNavLink>
            <MobileNavLink href="/admin/manage" onClick={toggleMenu}>
              Admin Manage
            </MobileNavLink>
          </>
        )}
        <MobileNavLink
          href="/login"
          onClick={() => {
            if (isLoggedIn) handleSignOut();
            else toggleMenu();
          }}
        >
          {isLoggedIn ? "Log out" : "Log in"}
        </MobileNavLink>
      </MobileMenu>
    </>
  );
}