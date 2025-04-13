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

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  text-align: center;
`;

const CalendarDay = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: 4px;
`;

export default function Calendar() {
  return (
    <AdminContainer>
      <AdminTitle>Calendar</AdminTitle>
      <CalendarGrid>
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <CalendarDay key={day}>{day}</CalendarDay>
        ))}
        {Array(28).fill(0).map((_, i) => (
          <CalendarDay key={i + 1}>{i + 1}</CalendarDay>
        ))}
      </CalendarGrid>
    </AdminContainer>
  );
}