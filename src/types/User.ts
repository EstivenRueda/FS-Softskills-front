export type User = {
  id: string;
  email: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  last_login: number;
  permissions?: string[];
  profile: Profile;
};

export type UserCredentials = {
  email: string;
  password: string;
};

export type SendEmail = {
  email: string;
};

export type ResetConfirmLoggedin = {
  email: string;
  current_password: string;
  new_password: string;
};

export type Profile = {
  id: string;
  display_name: string;
  user?: string;
  type: 'STUDENT' | 'ADMINISTRATIVE';
  type_name: string;
};
