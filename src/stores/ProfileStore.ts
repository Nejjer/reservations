import { authApi } from '../api/authApi.ts';
import { makeAutoObservable, runInAction } from 'mobx';
import { ID } from '../api/axiosInstance.ts';

export enum Role {
  Admin = 'Admin',
  Employee = 'Employee',
  Client = 'Client',
}

export class ProfileStore {
  public role = Role.Client;
  public restaurantId: ID | null = null;

  constructor() {
    this.update();
    makeAutoObservable(this);
  }

  public async update() {
    const profile = await authApi.getProfile();
    runInAction(() => {
      this.role = profile.role;
      this.restaurantId = profile.restaurantId;
    });
  }
}
