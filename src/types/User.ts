export type User = {
  id: string;
  email: string;
  name: string;
  first_name: string;
  last_name: string;
  last_login: number;
  permissions?: string[];
};
