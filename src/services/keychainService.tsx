import * as Keychain from 'react-native-keychain';

const SERVICE_NAME = 'com.dongademoapp.credentials';

export interface Credentials {
  username: string;
  password: string;
}

export const keychainService = {
  async saveCredentials(username: string, password: string): Promise<boolean> {
    try {
      await Keychain.setGenericPassword(username, password, {
        service: SERVICE_NAME,
      });
      return true;
    } catch (error) {
      console.error('Error saving credentials to keychain:', error);
      return false;
    }
  },

  async getCredentials(): Promise<Credentials | null> {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: SERVICE_NAME,
      });

      if (credentials) {
        return {
          username: credentials.username,
          password: credentials.password,
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting credentials from keychain:', error);
      return null;
    }
  },

  async clearCredentials(): Promise<boolean> {
    try {
      await Keychain.resetGenericPassword({
        service: SERVICE_NAME,
      });
      return true;
    } catch (error) {
      console.error('Error clearing credentials from keychain:', error);
      return false;
    }
  },

  async hasCredentials(): Promise<boolean> {
    const credentials = await this.getCredentials();
    return credentials !== null;
  },
};

export default keychainService;