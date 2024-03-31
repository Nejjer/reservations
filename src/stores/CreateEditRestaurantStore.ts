import { makeAutoObservable, runInAction } from 'mobx';
import {
  EKitchenType,
  ICreateRestaurantDto,
  restaurantApi,
} from '../api/restaurantApi.ts';
import { ID } from '../api/axiosInstance.ts';
import { EMode } from '../pages/CreateEditRestaurant';

const emptyRestaurant = {
  title: '',
  cost: 0,
  contact: {
    address: '',
    email: '',
    phone: '',
  },
  description: '',
  menu: [],
  endWorkTime: '',
  kitchenType: EKitchenType.Asian,
  startWorkTime: '',
  reservationThreshold: 0,
};

export class CreateEditRestaurantStore {
  public restaurant: ICreateRestaurantDto = emptyRestaurant;
  public loading = false;
  constructor() {
    makeAutoObservable(this);
  }

  public async getRestaurant(id: ID) {
    this.loading = true;
    this.updateRestaurant(await restaurantApi.getRestaurant(id));
    runInAction(() => (this.loading = false));
  }

  public async saveRestaurant(mode: EMode, id?: string) {
    this.loading = true;
    if (!id || !this.restaurant) {
      console.error('Не смогли сохранить ресторан');
      return;
    }
    if (mode === EMode.Edit) {
      await restaurantApi.updateRestaurant(+id, this.restaurant);
    } else {
      await restaurantApi.createRestaurant(this.restaurant);
    }

    runInAction(() => {
      this.loading = false;
      this.clearRestaurant();
    });
  }

  public updateRestaurant(restaurant: ICreateRestaurantDto) {
    this.restaurant = restaurant;
  }

  public clearRestaurant() {
    this.updateRestaurant(emptyRestaurant);
  }
}
