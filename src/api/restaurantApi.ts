import { axiosInstance, ID } from './axiosInstance.ts';
import { getId } from './faker.ts';

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

const RESTAURANT = {
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
};

class RestaurantApi {
  public async getRestaurant(id: ID): Promise<IRestaurant> {
    //return await faker<IRestaurant>(RESTAURANT);
    return (await axiosInstance.get<IRestaurant>(`/admin/restaurants/${id}`))
      .data;
  }

  public async getRestaurants(): Promise<IRestaurant[]> {
    return (await axiosInstance.get<IRestaurant[]>(`/admin/restaurants`)).data;

    // return await faker<IRestaurant[]>([
    //   { ...RESTAURANT },
    //   { ...RESTAURANT, Id: getId() },
    //   { ...RESTAURANT, Id: getId() },
    //   { ...RESTAURANT, Id: getId() },
    // ]);
  }

  public async createRestaurant(
    restaurant: ICreateRestaurantDto,
  ): Promise<void> {
    //await faker(restaurant);
    return (await axiosInstance.post(`/admin/restaurants`, restaurant)).data;
  }

  public async updateRestaurant(
    restaurant: ICreateRestaurantDto,
  ): Promise<void> {
    //await faker(restaurant);
    return (await axiosInstance.put(`/admin/restaurants`, restaurant)).data;
  }
}

export const restaurantApi = new RestaurantApi();
