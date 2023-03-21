import { Note } from './Notes';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  notes?: Note[];
}
