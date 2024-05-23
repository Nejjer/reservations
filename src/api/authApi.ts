import { axiosInstance } from './axiosInstance.ts';
import { Role } from '../stores/ProfileStore.ts';

export interface IProfile {
  email: string;
  name: string;
  phoneNumber: string;
  role: Role;
}

export class AuthApi {
  public async authenticate(email: string): Promise<void> {
    await axiosInstance.post('/auth/sendEmail', { email });
  }

  public async authByToken(token: string): Promise<void> {
    await axiosInstance.get(`/auth/login?Token=${token}`);
  }

  public async authByPassword(email: string, password: string): Promise<void> {
    try {
      await axiosInstance.post('/auth/admin/login', { email, password });
    } catch (e) {
      await axiosInstance.post('/auth/employee/login', { email, password });
    }
  }

  public async getProfile(): Promise<IProfile> {
    // return await faker<IProfile>({
    //   name: 'Зубенко Михаил Петрович',
    //   phoneNumber: '89874981224',
    //   email: 'i@devdev.ru',
    //   role: Role.Admin,
    // });
    return (await axiosInstance.get<IProfile>(`/auth/profile`)).data;
  }
}

export const authApi = new AuthApi();
