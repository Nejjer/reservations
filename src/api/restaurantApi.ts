import { axiosInstance, ID } from './axiosInstance.ts';

export interface ICreateRestaurantDto {
  title: string;
  description: string;
  startWorkTime: string;
  endWorkTime: string;
  contact: IContact;
  kitchenType: EKitchenType;
  reservationThreshold: number;
  menu: IMenuPosition[];
  cost: number;
  pictures: RestaurantPictureDto[];
}

export interface RestaurantPictureDto {
  url: string;
  title: string;
}

export interface IMenuPosition {
  title: string;
  cost: number;
  weight: string;
}

export interface IRestaurant extends ICreateRestaurantDto {
  id: ID;
}

interface IContact {
  email: string;
  phone: string;
  address: string;
}
export enum EKitchenType {
  Russian = 0,
  Asian = 1,
  Indian = 2,
}

// const RESTAURANT: IRestaurant = {
//   title: 'Ресторан 1',
//   description:
//     'Какое-то описание рыба Какое-то описание рыба Какое-то описание рыба Какое-то описание рыба Какое-то описание рыба Какое-то описание рыба ',
//   kitchenType: EKitchenType.Russian,
//   contact: {
//     address: 'Екатеринбург улица Пушкина дом Колотушкина',
//     email: 'example@example.com',
//     phone: '+7 987 222 22-22',
//   },
//   endWorkTime: '20:00',
//   id: getId(),
//   reservationThreshold: 0,
//   startWorkTime: '10:00',
//   menu: [
//     { cost: 100, title: 'Title', weight: '150' },
//     { cost: 100, title: 'Title', weight: '150' },
//   ],
//   cost: 4000,
//   pictures: [],
// };

class RestaurantApi {
  public async getRestaurant(id: ID, isAdmin?: boolean): Promise<IRestaurant> {
    // console.log(id);
    // return await faker<IRestaurant>(RESTAURANT);
    const res = isAdmin
      ? await axiosInstance.get<IRestaurant>(`/admin/restaurants/${id}`)
      : await axiosInstance.get<IRestaurant>(`/client/restaurants/${id}`);
    return res.data;
  }

  public async getRestaurants(isAdmin?: boolean): Promise<IRestaurant[]> {
    const res = isAdmin
      ? await axiosInstance.get<IRestaurant[]>(`/admin/restaurants`)
      : await axiosInstance.get<IRestaurant[]>(`/client/restaurants`);
    return res.data;

    // return await faker<IRestaurant[]>([
    //   { ...RESTAURANT },
    //   { ...RESTAURANT, id: getId() },
    //   { ...RESTAURANT, id: getId() },
    //   { ...RESTAURANT, id: getId() },
    // ]);
  }

  public async createRestaurant(
    restaurant: ICreateRestaurantDto,
  ): Promise<void> {
    // await faker(restaurant);
    return (await axiosInstance.post(`/admin/restaurants`, restaurant)).data;
  }

  public async updateRestaurant(
    id: number,
    restaurant: ICreateRestaurantDto,
  ): Promise<void> {
    // await faker({ restaurant, id });
    return (await axiosInstance.put(`/admin/restaurants/${id}`, restaurant))
      .data;
  }

  public async deleteRestaurant(id: ID) {
    // await faker(id);
    await axiosInstance.delete(`admin/restaurants/${id}`);
  }
}

export const restaurantApi = new RestaurantApi();
