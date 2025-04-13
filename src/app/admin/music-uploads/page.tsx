"use client";

import { useState } from "react";
import styled from "styled-components";
import { uploadTrack } from "@/lib/cloudkit";

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.textLight}50;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.backgroundLight};
  color: ${({ theme }) => theme.colors.textLight};
  font-family: "Montserrat", sans-serif;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SubmitButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
`;

const SuccessMessage = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.9rem;
`;

export default function MusicUploads() {
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploadError(null);
    setUploadSuccess(null);

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const artist = formData.get("artist") as string;
    const file = formData.get("file") as File;

    if (!title || !artist || !file) {
      setUploadError("Please fill in all fields.");
      return;
    }

    try {
      await uploadTrack(title, artist, file);
      setUploadSuccess("Track uploaded successfully!");
      e.currentTarget.reset();
    } catch {
      setUploadError("Failed to upload track. Please try again.");
    }
  };

  return (
    <AdminContainer>
      <AdminTitle>Music Uploads</AdminTitle>
      <Form onSubmit={handleUpload}>
        <Input type="text" name="title" placeholder="Track Title" required />
        <Input type="text" name="artist" placeholder="Artist" required />
        <Input type="file" name="file" accept="audio/*" required />
        <SubmitButton type="submit">Upload Track</SubmitButton>
      </Form>
      {uploadError && <ErrorMessage>{uploadError}</ErrorMessage>}
      {uploadSuccess && <SuccessMessage>{uploadSuccess}</SuccessMessage>}
    </AdminContainer>
  );
}