import { axiosInstance, ID } from './axiosInstance.ts';

export interface ICreateEmployee {
  name: string;
  email: string;
  phoneNumber: string;
  position: string;
  restaurantId: ID;
  password: string;
}

export interface IEmployee extends ICreateEmployee {
  id: ID;
}

// const EMPLOYEE: IEmployee = {
//   birthday: 11111111111,
//   name: 'Иван Иванов Иван',
//   id: Math.floor(Math.random() * 1000000),
//   phoneNumber: '89874981224',
//   email: 'example@example.com',
// };

export class EmployeesApi {
  public async getEmployees(restaurantId: ID): Promise<IEmployee[]> {
    return (
      await axiosInstance.get<IEmployee[]>(
        `/admin/employees?restaurantId=${restaurantId}`,
      )
    ).data;
    // return faker([
    //   EMPLOYEE,
    //   { ...EMPLOYEE, id: Math.floor(Math.random() * 1000000) },
    // ]);
  }

  public async submitEmployee(employee: ICreateEmployee): Promise<void> {
    await axiosInstance.post(`/admin/employees`, employee);
    // await faker(employee);
  }

  public async changeEmployee(
    id: ID,
    employee: ICreateEmployee,
  ): Promise<void> {
    await axiosInstance.put(`/admin/employees/${id}`, employee);
    // await faker(employee);
  }

  public async deleteEmployee(id: ID): Promise<void> {
    await axiosInstance.delete(`/admin/employees/${id}`);
    // await faker(id);
  }
}

export const employeesApi = new EmployeesApi();
