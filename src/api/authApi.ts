import { axiosInstance } from './axiosInstance.ts';

export interface IProfile {
  email: string;
  name: string;
  phoneNumber: string;
}

export class AuthApi {
  public async authenticate(email: string): Promise<void> {
    await axiosInstance.post('/auth/sendEmail', { email });
  }

  public async authByToken(token: string): Promise<void> {
    await axiosInstance.get(`/auth/login?Token=${token}`);
  }

  public async getProfile(): Promise<IProfile> {
    // return await faker<IProfile>({
    //   name: 'Зубенко Михаил Петрович',
    //   phoneNumber: '89874981224',
    //   email: 'i@devdev.ru',
    // });
    return (await axiosInstance.get<IProfile>(`/auth/profile`)).data;
  }
}

export const authApi = new AuthApi();
