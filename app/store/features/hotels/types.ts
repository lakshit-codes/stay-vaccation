export interface MasterHotel {
  _id: string;
  hotelName: string;
  city: string;
  starRating: string;
  description: string;
  roomTypes: string[];
  amenities: string[];
  images: string[];
}

export interface HotelsState {
  masterHotels: MasterHotel[];
  loading: boolean;
  error: string | null;
}
