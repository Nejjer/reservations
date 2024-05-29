import { CreateEditRestaurantStore } from './CreateEditRestaurantStore.ts';
import { ToastStore } from './ToastStore.ts';
import { AdminBookStore } from './AdminBookStore.ts';
import { ProfileStore } from './ProfileStore.ts';
import { EmployeeBookStore } from './EmplpyeeBookStore.ts';

export interface AppStore {
  restaurantStore: CreateEditRestaurantStore;
  toastStore: ToastStore;
  adminBookStore: AdminBookStore;
  profileStore: ProfileStore;
  employeeBookStore: EmployeeBookStore;
}

const toastStore = new ToastStore();

export const createAppStore = (): AppStore => ({
  restaurantStore: new CreateEditRestaurantStore(),
  toastStore: toastStore,
  adminBookStore: new AdminBookStore(toastStore),
  profileStore: new ProfileStore(),
  employeeBookStore: new EmployeeBookStore(toastStore),
});
