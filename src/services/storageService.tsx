import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  ACCESS_TOKEN: '@auth_token',
  REFRESH_TOKEN: '@refresh_token',
  USER_INFO: '@user_info',
};

export const storageService = {
  async setToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.ACCESS_TOKEN, token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  },

  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(KEYS.ACCESS_TOKEN);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  async setRefreshToken(refreshToken: string): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.REFRESH_TOKEN, refreshToken);
    } catch (error) {
      console.error('Error saving refresh token:', error);
    }
  },

  async getRefreshToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(KEYS.REFRESH_TOKEN);
    } catch (error) {
      console.error('Error getting refresh token:', error);
      return null;
    }
  },

  async setUserInfo(userInfo: object): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.USER_INFO, JSON.stringify(userInfo));
    } catch (error) {
      console.error('Error saving user info:', error);
    }
  },

  async getUserInfo<T>(): Promise<T | null> {
    try {
      const data = await AsyncStorage.getItem(KEYS.USER_INFO);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting user info:', error);
      return null;
    }
  },

  async clearAuth(): Promise<void> {
    try {
      await AsyncStorage.removeMany([
        KEYS.ACCESS_TOKEN,
        KEYS.REFRESH_TOKEN,
        KEYS.USER_INFO,
      ]);
    } catch (error) {
      console.error('Error clearing auth:', error);
    }
  },

  async isLoggedIn(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  },
};

export default storageService;