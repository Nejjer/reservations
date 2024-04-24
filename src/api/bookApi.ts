import { ID } from './axiosInstance.ts';
import { faker } from './faker.ts';

export enum EBookStatus {
  Waiting = 'Waiting',
  Confirmed = 'Confirmed',
  Declined = 'Declined',
}

export const mapEbookStatus = (status: EBookStatus) => {
  switch (status) {
    case EBookStatus.Waiting:
      return 'Ожидание';
    case EBookStatus.Confirmed:
      return 'Подтверждено';
    case EBookStatus.Declined:
      return 'Отклонено';
  }
};

export interface IBook {
  id: ID;
  restaurantName: string;
  name: string;
  phone: string;
  email: string;
  date: number;
  countOfPerson: number;
  numberTable: number;
  status: EBookStatus;
  comment: string;
}

const ExampleBook: IBook = {
  countOfPerson: 2,
  name: 'Ибрагим Игнат',
  date: new Date().getTime(),
  numberTable: 7,
  status: EBookStatus.Waiting,
  restaurantName: 'Суши у Илюши',
  id: Math.floor(Math.random() * 1000),
  phone: '+7 987 233 21 12',
  email: 'example.cim@ex.com',
  comment:
    'Рыба Рыба Рыба Рыба Рыба Рыба Рыба Рыба Рыба Рыба Рыба Рыба Рыба Рыба Рыба Рыба Рыба Рыба ',
};

export class BookApi {
  public async getBook(id: string): Promise<IBook> {
    //return (await axiosInstance.get<IBook>(`/admin/books/${id}`)).data;
    id;
    return faker<IBook>(ExampleBook);
  }

  public async getBooks(): Promise<IBook[]> {
    //return (await axiosInstance.get<IBook[]>(`/admin/books/`)).data;
    return faker<IBook[]>([
      ExampleBook,
      { ...ExampleBook, id: Math.floor(Math.random() * 1000) },
      { ...ExampleBook, id: Math.floor(Math.random() * 1000) },
      { ...ExampleBook, id: Math.floor(Math.random() * 1000) },
      { ...ExampleBook, id: Math.floor(Math.random() * 1000) },
      { ...ExampleBook, id: Math.floor(Math.random() * 1000) },
      { ...ExampleBook, id: Math.floor(Math.random() * 1000) },
      { ...ExampleBook, id: Math.floor(Math.random() * 1000) },
      { ...ExampleBook, id: Math.floor(Math.random() * 1000) },
    ]);
  }
}

export const bookApi = new BookApi();
