import { bookApi, IBook } from '../api/bookApi.ts';
import { makeAutoObservable, runInAction } from 'mobx';
import { ID } from '../api/axiosInstance.ts';

export interface IBookStore extends IBook {
  selected: boolean;
}

export class AdminBookStore {
  public isOpenShowBookModal: boolean = false;
  public showingBook: IBook | null = null;
  public loading: boolean = false;
  public books: IBookStore[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  public async getBooks() {
    this.loading = true;
    const books: IBookStore[] = (await bookApi.getBooks()).map((book) => ({
      ...book,
      selected: false,
    }));

    runInAction(() => {
      this.books = books;
      this.loading = false;
    });
  }

  public selectBook(id: ID, isSelected: boolean) {
    const book = this.books.find((book) => book.id === id);
    if (book) {
      book.selected = isSelected;
    }
  }

  public selectAllBooks(isSelected: boolean) {
    this.books.map((book) => (book.selected = isSelected));
  }

  public async deleteSelectedBook() {}

  public async showBook(book: IBook) {
    this.showingBook = book;
    this.isOpenShowBookModal = true;
  }

  public async hideBook() {
    this.showingBook = null;
    this.isOpenShowBookModal = false;
  }
}
