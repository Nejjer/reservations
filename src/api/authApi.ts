import { axiosInstance } from './axiosInstance.ts';

export class AuthApi {
  public async authenticate(email: string): Promise<void> {
    await axiosInstance.post('/auth/sendEmail', { email });
  }

  public async authByToken(token: string): Promise<void> {
    await axiosInstance.get(`/auth/login?Token=${token}`);
  }
}

export const authApi = new AuthApi();
