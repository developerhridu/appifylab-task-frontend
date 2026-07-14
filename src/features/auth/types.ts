export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserMini {
  id: string;
  firstName: string;
  lastName: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
