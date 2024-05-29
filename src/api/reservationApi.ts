import { axiosInstance, ID } from './axiosInstance.ts';

export interface ITimeSlot {
  dateTime: number;
  tableId: number;
  tableName: string;
  availablePlaces: number;
}

export interface IReservation {
  date: number;
  comment: string;
  tableId: number;
  clientEmail: string;
  clientPhone: string;
  clientName: string;
  personsCount: number;
  restaurantId: number;
}

class ReservationApi {
  public async getTimeSlots(id: ID, date: number): Promise<ITimeSlot[]> {
    const response = await axiosInstance.get<ITimeSlot[]>(
      `reservations/timeslots?RestaurantId=${id}&DateTime=${date}`,
    );
    return response.data;
  }

  public async reserve(reservation: IReservation): Promise<void> {
    await axiosInstance.post(`http://localhost:5019/reserve`, reservation);
  }
}

export const reservationApi = new ReservationApi();
