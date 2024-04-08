import { makeAutoObservable, runInAction } from 'mobx';

export const TOAST_DELAY = 4000;
export class ToastStore {
  public isOpen: boolean;
  public message: string;

  constructor() {
    this.isOpen = false;
    this.message = '';
    makeAutoObservable(this);
  }

  public showSnackBar(message: string) {
    this.isOpen = true;
    this.message = message;
    setTimeout(() => this.onClose(), TOAST_DELAY);
  }

  public onClose() {
    this.isOpen = false;
    runInAction(() => setTimeout((this.message = ''), TOAST_DELAY));
  }
}
