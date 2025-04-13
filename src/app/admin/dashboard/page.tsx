"use client";

import styled from "styled-components";

const AdminContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 80px auto 0; /* Offset for toolbar */
  padding: 2rem;
  background: ${({ theme }) => theme.colors.backgroundContent};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: "Montserrat", sans-serif;
  color: ${({ theme }) => theme.colors.textLight};

  @media (max-width: 768px) {
    margin: 120px auto 0; /* Extra offset for admin nav */
    padding: 1rem;
  }
`;

const AdminTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1.5rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.backgroundLight};
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
`;

const StatLabel = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 0.5rem;
`;

const StatValue = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

export default function Dashboard() {
  return (
    <AdminContainer>
      <AdminTitle>Dashboard</AdminTitle>
      <StatsGrid>
        <StatCard>
          <StatLabel>Total Employees</StatLabel>
          <StatValue>12</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Upcoming Events</StatLabel>
          <StatValue>3</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Music Tracks</StatLabel>
          <StatValue>45</StatValue>
        </StatCard>
      </StatsGrid>
    </AdminContainer>
  );
}