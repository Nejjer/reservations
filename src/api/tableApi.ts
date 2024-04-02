import { axiosInstance, ID } from './axiosInstance.ts';

export interface ICreateTableDto {
  restaurantId: ID;
  title: string;
  reserveAll: boolean;
  places: ITablePlaceDto[];
}

export interface ITablePlaceDto {
  title: string;
  number: number;
}
export interface ITable extends ICreateTableDto {
  id: ID;
}

// const Table: ICreateTableDto = {
//   places: [
//     { title: 'Название места', number: 1 },
//     { title: 'Название места', number: 1 },
//     { title: 'Название места', number: 1 },
//   ],
//   reserveAll: false,
//   restaurantId: getId(),
//   title: 'Стол',
// };

class TableApi {
  public async getTable(id: ID): Promise<ITable> {
    // return await faker<IRestaurant>(RESTAURANT);
    return (await axiosInstance.get<ITable>(`/admin/tables/${id}`)).data;
  }

  public async getTables(restaurantId: number): Promise<ITable[]> {
    // console.log(restaurantId);
    // return await faker<ITable[]>([
    //   { ...Table, id: getId() },
    //   { ...Table, id: getId() },
    // ]);
    return (
      await axiosInstance.get<ITable[]>(
        `/admin/tables?restaurantId=${restaurantId}`,
      )
    ).data;
  }

  public async createTable(table: ICreateTableDto): Promise<void> {
    // await faker(table);
    return (await axiosInstance.post(`/admin/tables`, table)).data;
  }

  public async updateTable(id: number, table: ICreateTableDto): Promise<void> {
    //await faker(restaurant);
    return (await axiosInstance.put(`/admin/tables/${id}`, table)).data;
  }

  public async deleteTable(id: ID) {
    //await faker(id);
    await axiosInstance.delete(`admin/tables/${id}`);
  }
}

export const tablesApi = new TableApi();
