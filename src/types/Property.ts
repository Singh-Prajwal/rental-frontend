export interface Appliance {
  name: string;
  model?: string;
  manual_text: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatarUrl: string;
  rating: number;
  text: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  type: string;
  beds: number;
  bedrooms: number;
  baths: number;
  maxGuests: number;
  pricePerNight: number;
  location: string;
  images: string[];
  host: {
    name: string;
    avatarUrl: string;
  };
  amenities: string[];
  reviews: Review[];
}
