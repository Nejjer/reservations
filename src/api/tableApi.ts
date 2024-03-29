import { axiosInstance, ID } from './axiosInstance.ts';

export interface ICreateTableDto {
  title: string;
  reserveAll: boolean;
  restaurantId: number;
  menu: ITablePlaceDto[];
  cost: number;
}

export interface ITablePlaceDto {
  title: string;
  number: number;
}
export interface ITable extends ICreateTableDto {
  id: ID;
}


class TableApi {
  public async getTable(id: ID): Promise<ITable> {
    // return await faker<IRestaurant>(RESTAURANT);
    return (await axiosInstance.get<ITable>(`/admin/tables/${id}`))
      .data;
  }

  public async getTables(restaurantId: number): Promise<ITable[]> {
    return (await axiosInstance.get<ITable[]>(`/admin/tables?restaurantId=${restaurantId}`)).data;
  }

  public async createTable(
    table: ICreateTableDto,
  ): Promise<void> {
    //await faker(restaurant);
    return (await axiosInstance.post(`/admin/tables`, table)).data;
  }

  public async updateRestaurant(
    id: number,
    table: ICreateTableDto,
  ): Promise<void> {
    //await faker(restaurant);
    return (await axiosInstance.put(`/admin/tables/${id}`, table))
      .data;
  }

  public async deleteRestaurant(id: ID) {
    //await faker(id);
    await axiosInstance.delete(`admin/tables/${id}`);
  }
}

export const tablesApi = new TableApi();
