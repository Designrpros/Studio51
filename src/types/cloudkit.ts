// src/types/cloudkit.d.ts

export interface ApiTokenAuth {
  apiToken: string;
  persist?: boolean;
  signInButton?: {
    id: string;
    theme?: 'black' | 'white' | 'light' | 'dark';
  };
  signOutButton?: {
    id: string;
    theme?: 'black' | 'white' | 'light' | 'dark';
  };
}

export interface ContainerConfig {
  containerIdentifier: string;
  apiTokenAuth?: ApiTokenAuth;
  environment: 'development' | 'production';
}

export interface CloudKitConfig {
  containers: ContainerConfig[];
  auth?: {
    signIn?: { button?: boolean };
  };
}

export interface Database {
  performQuery(query: { recordType: string }): Promise<{ records: any[] }>;
  fetchRecords(query: { recordType: string }): Promise<{ records: any[] }>;
}

export interface Container {
  publicCloudDatabase: Database;
  privateCloudDatabase?: Database;
  setUpAuth(): Promise<{ isLoggedIn: boolean }>;
  signIn(): Promise<void>;
}