import { ID } from './axiosInstance.ts';
import { faker } from './faker.ts';

export interface ICreateEmployee {
  name: string;
  email: string;
  phone: string;
  birthday: number;
}

export interface IEmployee extends ICreateEmployee {
  id: ID;
}

const EMPLOYEE: IEmployee = {
  birthday: 11111111111,
  name: 'Иван Иванов Иван',
  id: Math.floor(Math.random() * 1000000),
  phone: '89874981224',
  email: 'example@example.com',
};

export class EmployeesApi {
  public async getEmployees(): Promise<IEmployee[]> {
    //return (await axiosInstance.get<IEmployee[]>('/api')).data;
    return faker([
      EMPLOYEE,
      { ...EMPLOYEE, id: Math.floor(Math.random() * 1000000) },
    ]);
  }

  public async submitEmployee(employee: ICreateEmployee): Promise<void> {
    //await axiosInstance.post(`/admin/books/submit`, employee)
    await faker(employee);
  }

  public async changeEmployee(employee: ICreateEmployee): Promise<void> {
    //await axiosInstance.post(`/admin/books/submit`, employee)
    await faker(employee);
  }

  public async deleteEmployee(id: ID): Promise<void> {
    //await axiosInstance.delete(`/admin/employees/${id}`);
    await faker(id);
  }
}

export const employeesApi = new EmployeesApi();
