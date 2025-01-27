import { User } from '@/types';

export type Usuario = Omit<User, 'permissions'> & {
  password?: string;
  repeat_password?: string;
};
