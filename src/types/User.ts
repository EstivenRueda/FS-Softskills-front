export type User = {
  id: string;
  email: string;
  name: string;
  first_name: string;
  last_name: string;
  last_login: number;
  permissions?: string[];
};

export type UserCredentials = {
  email: string;
  password: string;
};

export type Profile = {
  id: string;
  display_name: string;
  user?: string;
  type: 'STUDENT' | 'ADMINISTRATIVE';
};
