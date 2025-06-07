// src/components/Toolbar.tsx
"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOutCloudKit } from "@/lib/cloudkit";

// Data arrays for easier maintenance
const mainNavLinks = [
  { href: "/artists", label: "Artists" },
  { href: "/media", label: "Media" },
  { href: "/community", label: "Community" },
  { href: "/learn", label: "Learn" },
  { href: "/contact", label: "Contact" },
];

const adminNavLinks = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/calendar", label: "Calendar" },
  { href: "/admin/employees", label: "Employees" },
  { href: "/admin/music-uploads", label: "Music Uploads" },
  { href: "/admin/manage", label: "Manage" },
];

// Styled Components
const ToolbarContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1001;
  background-color: ${({ theme }) => theme.colors.backgroundDark};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MainToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 2rem;
  width: 100%;
  max-width: 1200px;
  min-height: 50px;
  margin: 0 auto;

  @media (max-width: 480px) {
    padding: 0.75rem 1rem;
  }
`;

const AdminNav = styled.div<{ $isVisible: boolean }>`
  display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 0.75rem 2.5rem;
  background-color: ${({ theme }) => theme.colors.backgroundContent};
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.textLight}20;
`;

const AdminNavLink = styled(Link)`
  font-size: 0.95rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textLight};
  text-decoration: none;
  transition: color 0.3s ease;
  font-family: "Montserrat", sans-serif;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Logo = styled(Link)`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textDark};
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.25rem;
  align-items: center;
  margin-left: auto;

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
`;

// FIX: Changed to use a transient prop '$isOpen' to avoid the TypeScript error
const BurgerIcon = styled.button<{ $isOpen: boolean }>`
  display: none;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
  padding: 0.5rem;
  background: none;
  border: none;
  z-index: 1002;

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
    div { background-color: #fff; }
    div:nth-child(1) { transform: rotate(45deg) translate(4px, 4px); }
    div:nth-child(2) { opacity: 0; }
    div:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
  `}
`;

const MobileMenu = styled.div<{ $isOpen: boolean; }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.backgroundDark};
  z-index: 1000;
  overflow-y: auto;
  
  opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
  transition: opacity 0.35s ease;

  @media (min-width: 801px) {
    display: none;
  }
`;

const MobileNavLink = styled(Link)`
  font-size: 2rem;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
  padding: 1rem;
  width: 100%;
  text-align: center;
  transition: color 0.3s ease, letter-spacing 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    letter-spacing: 1px;
  }
`;

const MobileAdminHeader = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.textLight}30;
  width: 80%;
  text-align: center;
`;

export default function Toolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  useEffect(() => {
    const user = localStorage.getItem("studio51_user");
    setIsLoggedIn(!!user);
  }, []);
  
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  const handleSignOut = async () => {
    try {
      await signOutCloudKit();
      localStorage.removeItem("studio51_user");
      setIsLoggedIn(false);
      closeMenu();
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
            {mainNavLinks.map(link => <NavLink key={link.href} href={link.href}>{link.label}</NavLink>)}
            {isLoggedIn && <NavLink href="/admin/dashboard">Admin</NavLink>}
            <NavLink href="/login" onClick={isLoggedIn ? handleSignOut : undefined}>{isLoggedIn ? "Log out" : "Log in"}</NavLink>
          </NavLinks>
          {/* FIX: Passing '$isOpen' prop instead of 'data-is-open' */}
          <BurgerIcon $isOpen={isOpen} onClick={toggleMenu} aria-label="Toggle menu">
            <div /><div /><div />
          </BurgerIcon>
        </MainToolbar>
        <AdminNav $isVisible={isAdminPage}>
          {adminNavLinks.map(link => <AdminNavLink key={link.href} href={link.href}>{link.label}</AdminNavLink>)}
        </AdminNav>
      </ToolbarContainer>
      
      <MobileMenu $isOpen={isOpen}>
        {mainNavLinks.map(link => <MobileNavLink key={link.href} href={link.href} onClick={closeMenu}>{link.label}</MobileNavLink>)}
        {isLoggedIn && (
          <>
            <MobileAdminHeader>Admin Panel</MobileAdminHeader>
            {adminNavLinks.map(link => <MobileNavLink key={link.href} href={link.href} onClick={closeMenu}>{link.label}</MobileNavLink>)}
          </>
        )}
        <MobileNavLink href="/login" onClick={isLoggedIn ? handleSignOut : closeMenu}>
          {isLoggedIn ? "Log out" : "Log in"}
        </MobileNavLink>
      </MobileMenu>
    </>
  );
}