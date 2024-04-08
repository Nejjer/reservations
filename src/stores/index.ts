import { CreateEditRestaurantStore } from './CreateEditRestaurantStore.ts';
import { ToastStore } from './ToastStore.ts';

export interface AppStore {
  restaurantStore: CreateEditRestaurantStore;
  toastStore: ToastStore;
}

export const createAppStore = (): AppStore => ({
  restaurantStore: new CreateEditRestaurantStore(),
  toastStore: new ToastStore(),
});
