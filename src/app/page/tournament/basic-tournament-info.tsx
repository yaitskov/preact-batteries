
export type SportType = 'TE' | 'TP';

export type JustDate = string; // YYYY-MM-DD
export type JustTime = string; // HH:MM [AP]M

export interface BasicTourInfo {
  name: string;
  type: SportType;
  startDate: JustDate;
  startTime: JustTime;
  placeId: number;
  placeName: string;
  price: number;
  description: string;
}

export const newBasicTourInfo = (type: SportType) => ({
  name: '',
  type: type,
  startDate: '2019-01-01',
  startTime: '10:10 AM',
  placeId: 0,
  placeName: '',
  price: 0,
  description: ''
});
