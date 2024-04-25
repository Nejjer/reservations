import { bookApi, IBook, ICreateBookAdmin } from '../api/bookApi.ts';
import { makeAutoObservable, runInAction } from 'mobx';
import { ID } from '../api/axiosInstance.ts';
import { ToastStore } from './ToastStore.ts';
import { IRestaurant, restaurantApi } from '../api/restaurantApi.ts';
import { ITable, tablesApi } from '../api/tableApi.ts';

export interface IBookStore extends IBook {
  selected: boolean;
}

export class AdminBookStore {
  public isOpenShowBookModal: boolean = false;
  public isOpenNewBookModal: boolean = false;
  public showingBook: IBook | null = null;
  public loading: boolean = false;
  public books: IBookStore[] = [];
  private toastStore: ToastStore;
  public restaurants: IRestaurant[] = [];
  public tables: ITable[] = [];
  public isOpenChangeBookModal: boolean = false;

  constructor(toastStore: ToastStore) {
    this.toastStore = toastStore;
    makeAutoObservable(this);
  }

  public openNewBookModal(): void {
    this.isOpenNewBookModal = true;
  }

  public closeNewBookModal(): void {
    this.isOpenNewBookModal = false;
  }

  public openChangeBookModal(): void {
    this.isOpenChangeBookModal = true;
  }

  public closeChangeBookModal(): void {
    this.isOpenChangeBookModal = false;
  }

  public changeBookModal(book: IBook): void {
    this.openChangeBookModal();
    this.showingBook = book;
  }

  public async deleteSelectedBook(): Promise<void> {
    await Promise.all(
      this.books.map((book) => {
        if (book.selected) {
          return bookApi.deleteBook(book.id);
        }
      }),
    );
    this.getBooks();
  }

  public async getBooks() {
    this.loading = true;
    const books: IBookStore[] = (await bookApi.getBooks())
      .map((book) => ({
        ...book,
        selected: false,
      }))
      .sort((a, b) => a.id - b.id);

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

  public async showBook(book: IBook) {
    this.showingBook = book;
    this.isOpenShowBookModal = true;
  }

  public hideBook() {
    this.showingBook = null;
    this.isOpenShowBookModal = false;
  }

  public async submitShowingBook() {
    if (!this.showingBook) return;
    try {
      await bookApi.submitBook(this.showingBook?.id);
      await this.getBooks();
      this.hideBook();
    } catch (error) {
      this.toastStore.showSnackBar('Не получилось подтвердить бронирование');
    }
  }

  public async cancelShowingBook() {
    if (!this.showingBook) return;
    try {
      await bookApi.cancelBook(this.showingBook?.id);
      await this.getBooks();
      this.hideBook();
    } catch (e) {
      this.toastStore.showSnackBar('Не получилось отклонить бронирование');
    }
  }

  public async getRestaurants() {
    const restaurants = await restaurantApi.getRestaurants();
    runInAction(() => {
      this.restaurants = restaurants;
    });
  }

  public async getTables(restaurantId: ID) {
    const tables = await tablesApi.getTables(restaurantId);
    runInAction(() => {
      this.tables = tables;
    });
  }

  public async createBook(book: ICreateBookAdmin) {
    await bookApi.createBook(book);
    this.getBooks();
    this.closeNewBookModal();
  }
}
