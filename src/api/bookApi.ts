import { axiosInstance, ID } from './axiosInstance.ts';
import { faker } from './faker.ts';

export enum EBookStatus {
  Requested,
  AcceptedByManager,
  DeclinedByClient,
  DeclinedByManager,
}

export const mapEbookStatus = (status: EBookStatus) => {
  switch (status) {
    case EBookStatus.Requested:
      return 'Ожидание';
    case EBookStatus.AcceptedByManager:
      return 'Подтверждено';
    case EBookStatus.DeclinedByClient:
    case EBookStatus.DeclinedByManager:
      return 'Отклонено';
  }
};

export interface IBook {
  id: ID;
  restaurantName: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  date: number;
  reservedPlacesCount: number;
  numberTable: number;
  status: EBookStatus;
  comment: string;
  tableName: string;
}

export interface ICreateBookAdmin {
  date: number;
  comment: string;
  tableId: number;
  clientEmail: string;
  clientPhone: string;
  clientName: string;
  personsCount: number;
  restaurantId: number;
}

const ExampleBook: IBook = {
  reservedPlacesCount: 2,
  clientName: 'Ибрагим Игнат',
  date: new Date().getTime(),
  numberTable: 7,
  status: EBookStatus.Requested,
  restaurantName: 'Суши у Илюши',
  id: Math.floor(Math.random() * 1000),
  clientPhone: '+7 987 233 21 12',
  clientEmail: 'example.cim@ex.com',
  comment:
    'Рыба Рыба Рыба Рыба Рыба Рыба Рыба Рыба Рыба Рыба Рыба Рыба Рыба Рыба Рыба Рыба Рыба Рыба ',
  tableName: 'sad',
};

export class BookApi {
  public async getBook(id: string): Promise<IBook> {
    //return (await axiosInstance.get<IBook>(`/admin/books/${id}`)).data;
    id;
    return faker<IBook>(ExampleBook);
  }

  public async getBooks(): Promise<IBook[]> {
    return (await axiosInstance.get<IBook[]>(`/admin/books/`)).data;
    // return faker<IBook[]>([
    //   ExampleBook,
    //   { ...ExampleBook, id: Math.floor(Math.random() * 1000) },
    //   { ...ExampleBook, id: Math.floor(Math.random() * 1000) },
    //   { ...ExampleBook, id: Math.floor(Math.random() * 1000) },
    //   { ...ExampleBook, id: Math.floor(Math.random() * 1000) },
    //   { ...ExampleBook, id: Math.floor(Math.random() * 1000) },
    //   { ...ExampleBook, id: Math.floor(Math.random() * 1000) },
    //   { ...ExampleBook, id: Math.floor(Math.random() * 1000) },
    //   { ...ExampleBook, id: Math.floor(Math.random() * 1000) },
    // ]);
  }

  public async submitBook(ReservationId: ID): Promise<void> {
    await axiosInstance.post(`/admin/books/submit`, { ReservationId });
  }

  public async cancelBook(ReservationId: ID): Promise<void> {
    await axiosInstance.post(`/admin/books/cancel`, { ReservationId });
  }

  public async createBook(book: ICreateBookAdmin): Promise<void> {
    await axiosInstance.post(`/admin/books`, book);
  }

  public async deleteBook(id: number): Promise<void> {
    await axiosInstance.delete(`/admin/books/${id}`);
  }

  public async changeBook(bookId: ID, book: IBook): Promise<void> {
    await axiosInstance.put(`/admin/books/${bookId}`, book);
  }
}

export const bookApi = new BookApi();
