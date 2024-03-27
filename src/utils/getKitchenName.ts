import { EKitchenType } from '../api/restaurantApi.ts';

export const getKitchenName = (kitchen: EKitchenType) => {
  switch (kitchen) {
    case EKitchenType.Asian:
      return 'Азиатская кухня';
    case EKitchenType.Indian:
      return 'Индийская кухня';
    case EKitchenType.Russian:
      return 'Русская кухня';
  }
};
