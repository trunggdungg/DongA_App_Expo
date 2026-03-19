import api from './api';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
}

export interface UserInfo {
  id: {
    id: string;
    entityType: string;
  };
  createdTime: number;
  email: string;
  name: string;
  authority: string;
  tenantId?: {
    id: string;
    entityType: string;
  };
  customerId?: {
    id: string;
    entityType: string;
  };
  firstName?: string;
  lastName?: string;
}

export const authService = {
  async login(credentials: LoginRequest): Promise<{
    success: boolean;
    data?: LoginResponse;
    error?: string;
  }> {
    const response = await api.post<LoginResponse>('/api/auth/login', credentials);

    if (response.error) {
      return { success: false, error: response.error };
    }

    return { success: true, data: response.data };
  },

  async getUserInfo(token: string): Promise<{
    success: boolean;
    data?: UserInfo;
    error?: string;
  }> {
    const response = await api.get<UserInfo>('/api/auth/user', token);

    if (response.error) {
      return { success: false, error: response.error };
    }

    return { success: true, data: response.data };
  },

  async refreshToken(refreshToken: string): Promise<{
    success: boolean;
    data?: LoginResponse;
    error?: string;
  }> {
    const response = await api.post<LoginResponse>('/api/auth/token', {
      refreshToken,
    });

    if (response.error) {
      return { success: false, error: response.error };
    }

    return { success: true, data: response.data };
  },

  async logout(token: string): Promise<{ success: boolean; error?: string }> {
    const response = await api.post('/api/auth/logout', {}, token);

    if (response.error) {
      return { success: false, error: response.error };
    }

    return { success: true };
  },
};

export default authService;