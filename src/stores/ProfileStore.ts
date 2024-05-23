import { authApi } from '../api/authApi.ts';
import { makeAutoObservable, runInAction } from 'mobx';

export enum Role {
  Admin = 'Admin',
  Employee = 'Employee',
  Client = 'Client',
}

export class ProfileStore {
  public role = Role.Client;

  constructor() {
    this.update();
    makeAutoObservable(this);
  }

  public async update() {
    const profile = await authApi.getProfile();
    runInAction(() => {
      this.role = profile.role;
    });
  }
}
