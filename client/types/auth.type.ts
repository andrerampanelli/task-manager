export type Auth = {
  token: string;
  name: string;
  email: string;
};

export type Login = {
  email: string;
  password: string;
};

export type SignUp = {
  name: string;
  email: string;
  password: string;
};
