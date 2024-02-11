export type Position = {
  id: number;
  name: string;
  address: string;
  location: { lat: number; lng: number };
};

export type Route = Position[];
