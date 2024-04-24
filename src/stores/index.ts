import { CreateEditRestaurantStore } from './CreateEditRestaurantStore.ts';
import { ToastStore } from './ToastStore.ts';
import { AdminBookStore } from './AdminBookStore.ts';

export interface AppStore {
  restaurantStore: CreateEditRestaurantStore;
  toastStore: ToastStore;
  adminBookStore: AdminBookStore;
}

export const createAppStore = (): AppStore => ({
  restaurantStore: new CreateEditRestaurantStore(),
  toastStore: new ToastStore(),
  adminBookStore: new AdminBookStore(),
});
