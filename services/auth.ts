import api from "@/config/api";

import { LoginPayload, RegisterPayload, AuthResponse } from "@/dto/auth"; 


export const AuthService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/login', payload);
    return response.data;
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/register', payload);
    return response.data;
  },
};
