import { IBook, ICreateBookAdmin } from './bookApi.ts';
import { axiosInstance, ID } from './axiosInstance.ts';

export class BookEmployeeApi {
  public async getBooks(): Promise<IBook[]> {
    return (await axiosInstance.get('/employee/books')).data;
  }

  public async submitBook(reservationId: ID): Promise<void> {
    await axiosInstance.post(`/employee/books/submit`, { reservationId });
  }

  public async cancelBook(reservationId: ID): Promise<void> {
    await axiosInstance.post(`/employee/books/cancel`, { reservationId });
  }

  public async createBook(book: ICreateBookAdmin): Promise<void> {
    await axiosInstance.post(`/employee/books`, book);
  }
}

export const bookEmployeeApi = new BookEmployeeApi();
