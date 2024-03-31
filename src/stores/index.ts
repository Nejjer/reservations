import { CreateEditRestaurantStore } from './CreateEditRestaurantStore.ts';

export interface AppStore {
  restaurantStore: CreateEditRestaurantStore;
}

export const createAppStore = (): AppStore => ({
  restaurantStore: new CreateEditRestaurantStore(),
});
