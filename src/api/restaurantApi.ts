import { ID } from './axiosInstance.ts';
import { faker, getId } from './faker.ts';

export interface ICreateRestaurantDto {
  Title: string;
  Description: string;
  StartWorkTimeUtc: string;
  EndWorkTimeUtc: string;
  Contact: IContact;
  KitchenType: EKitchenType;
  ReservationThreshold: number;
  Menu: IMenuPosition[];
  Cost: number;
}

export interface IMenuPosition {
  Title: string;
  Cost: number;
  Weight: number;
}

export interface IRestaurant extends ICreateRestaurantDto {
  Id: ID;
}

interface IContact {
  Email: string;
  Phone: string;
  Address: string;
}
export enum EKitchenType {
  Russian = '0',
  Asian = '1',
  Indian = '2',
}

class RestaurantApi {
  public async getRestaurant(): Promise<IRestaurant> {
    return await faker<IRestaurant>({
      Title: 'Ресторан 1',
      Description:
        'Какое-то описание рыба Какое-то описание рыба Какое-то описание рыба Какое-то описание рыба Какое-то описание рыба Какое-то описание рыба ',
      KitchenType: EKitchenType.Russian,
      Contact: {
        Address: 'Екатеринбург улица Пушкина дом Колотушкина',
        Email: 'example@example.com',
        Phone: '+7 987 222 22-22',
      },
      EndWorkTimeUtc: '20:00',
      Id: getId(),
      ReservationThreshold: 0,
      StartWorkTimeUtc: '10:00',
      Menu: [
        { Cost: 100, Title: 'Title', Weight: 150 },
        { Cost: 100, Title: 'Title', Weight: 150 },
      ],
      Cost: 4000,
    });
  }
}

export const restaurantApi = new RestaurantApi();
