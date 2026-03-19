import { Alert } from 'react-native';
import { storageService } from './storageService';

type LogoutCallback = () => void;

class AuthManager {
  private logoutCallback: LogoutCallback | null = null;

  setLogoutCallback(callback: LogoutCallback) {
    this.logoutCallback = callback;
  }

  async handleTokenExpired() {
    try {
      await storageService.clearAuth();
      
      if (this.logoutCallback) {
        this.logoutCallback();
      }
      
      setTimeout(() => {
        Alert.alert(
          'Phiên đăng nhập hết hạn',
          'Token đã hết hạn. Vui lòng đăng nhập lại.',
          [{ text: 'OK' }],
          { cancelable: false }
        );
      }, 100);
    } catch (error) {
      console.error('[AuthManager] Error handling token expiration:', error);
    }
  }
}

export const authManager = new AuthManager();
export default authManager;