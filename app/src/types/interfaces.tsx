export interface Employees {
  people: Person[];
}
  
export interface Person {
  id: number;
  name: Name;
  email: string;
  picture: Picture;
  phone: string;
  cell: string;
}

export interface Name {
  title: string;
  first: string;
  last: string;
}

export interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}