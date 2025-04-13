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
}

export interface Database {
  performQuery(query: { recordType: string }): Promise<{ records: any[] }>;
  fetchRecords(query: { recordType: string }): Promise<{ records: any[] }>;
}

export interface AuthResponse {
  userRecordName?: string;
  userIdentity?: {
    emailAddress?: string;
    name?: {
      firstName?: string;
      lastName?: string;
    };
  };
}

export interface Container {
  publicCloudDatabase: Database;
  privateCloudDatabase?: Database;
  setUpAuth(): Promise<AuthResponse>;
  whenUserSignsIn(): Promise<AuthResponse>;
  whenUserSignsOut(): Promise<void>;
  signOut(): void;
}

declare global {
  interface Window {
    CloudKit: {
      configure(config: CloudKitConfig): { _containers: Container[] };
      getDefaultContainer(): Container;
    };
  }
}