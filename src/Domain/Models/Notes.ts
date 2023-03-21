import { User } from './User';

export interface Note {
  id: number;
  title: string;
  description: string;
  user: User;
}
