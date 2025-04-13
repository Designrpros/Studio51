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

const EmployeeTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.backgroundLight};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: ${({ theme }) => theme.colors.backgroundLight}50;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

export default function Employees() {
  return (
    <AdminContainer>
      <AdminTitle>Employees</AdminTitle>
      <EmployeeTable>
        <thead>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>Role</TableHeader>
          </tr>
        </thead>
        <tbody>
          {[
            { name: "John Doe", role: "Producer" },
            { name: "Jane Smith", role: "Engineer" },
            { name: "Alex Lee", role: "Manager" },
          ].map((emp, i) => (
            <TableRow key={i}>
              <TableCell>{emp.name}</TableCell>
              <TableCell>{emp.role}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </EmployeeTable>
    </AdminContainer>
  );
}