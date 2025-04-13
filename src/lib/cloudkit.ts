import { Container, AuthResponse } from '@/types/cloudkit-types';

let cachedContainer: Container | null = null;

export async function configureCloudKit(): Promise<Container> {
  if (typeof window === 'undefined') {
    throw new Error('CloudKit is only available in the browser');
  }

  if (!window.CloudKit) {
    console.log('Loading CloudKit JS...');
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.apple-cloudkit.com/ck/2/cloudkit.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load CloudKit JS'));
      document.head.appendChild(script);
    });
    console.log('CloudKit JS loaded');
  }

  if (!cachedContainer) {
    const config = {
      containers: [
        {
          containerIdentifier: 'iCloud.Studio51',
          apiTokenAuth: {
            apiToken: process.env.NEXT_PUBLIC_CLOUDKIT_API_TOKEN || '2ee56a6327423a6be985f2420602d37904cda8ba351bf486d98f4372e65e45c8',
            persist: true,
            signInButton: {
              id: 'apple-sign-in-button',
              theme: 'black',
            },
            signOutButton: {
              id: 'apple-sign-out-button',
              theme: 'black',
            },
          },
          environment: 'development',
        },
      ],
    } as any;

    try {
      const cloudKitInstance = window.CloudKit.configure(config);
      if (!cloudKitInstance || !cloudKitInstance._containers || cloudKitInstance._containers.length === 0) {
        throw new Error('CloudKit configuration failed: No containers returned');
      }
      cachedContainer = cloudKitInstance._containers[0];
      console.log('CloudKit Container:', cloudKitInstance);
      console.log('Container Properties:', Object.keys(cloudKitInstance));
      console.log('Containers Array:', cloudKitInstance._containers);
      console.log('First Container:', cachedContainer);
      console.log('First Container Methods:', cachedContainer ? Object.keys(cachedContainer) : 'No container');
      console.log('Public Database:', cachedContainer?.publicCloudDatabase);
      console.log('Window.CloudKit Methods:', Object.keys(window.CloudKit));
    } catch (error) {
      console.error('Failed to configure CloudKit:', error);
      throw error;
    }
  }

  if (!cachedContainer) {
    throw new Error('Cached container is null after configuration');
  }
  return cachedContainer;
}

export async function signInToCloudKit(): Promise<void> {
  const container = await configureCloudKit();
  try {
    console.log('Setting up authentication...');
    const authResult: AuthResponse = await container.setUpAuth();
    if (!authResult) {
      throw new Error('setUpAuth returned null or undefined');
    }
    console.log('Auth Result:', authResult);
    if (!authResult.userRecordName) {
      console.log('User not authenticated. Please use the iCloud sign-in button.');
    } else {
      console.log('User authenticated successfully');
    }
  } catch (err: unknown) {
    console.error('Authentication Error:', err);
    throw err;
  }
}

export async function signOutCloudKit(): Promise<void> {
  const container = await configureCloudKit();
  try {
    await container.signOut();
    cachedContainer = null; // Clear cached container
    console.log('User signed out successfully');
  } catch (err: unknown) {
    console.error('Sign-out error:', err);
    throw err;
  }
}

export async function uploadTrack(title: string, artist: string, file: File): Promise<void> {
  const container = await configureCloudKit();
  try {
    const record = {
      recordType: 'Track',
      fields: {
        title: { value: title },
        artist: { value: artist },
        audioAsset: { value: file },
      },
    };
    await container.publicCloudDatabase.saveRecord(record);
    console.log('Track uploaded successfully:', title);
  } catch (err: unknown) {
    console.error('Track upload error:', err);
    throw err;
  }
}

export type { AuthResponse, Container } from '@/types/cloudkit-types';