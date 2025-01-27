import { User } from '@/types';

export type Usuario = Omit<User, 'permissions'> & {
  password?: string;
  password_confirm?: string;
};
