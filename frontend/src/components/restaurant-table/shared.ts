export interface RestaurantInfo {
  id: string;
  name: string;
  state: string;
  city: string;
  telephone: string;
  genre: string; // genre is a comma-separated list of strings
  address1: string;
  zip: string;
  hours: string;
  website: string;
  lat: string;
  long: string;
  tags: string; // tags is a comma-separated list of strings
  attire: string;
}
