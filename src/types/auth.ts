export interface User {
  id: string;
  name: string;
  email: string;
  isActive?: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  isActive?: boolean;
}

export interface AuthSession {
  accessToken: string;
  user: User;
}

export interface ApiResponse<T> {
  message: string;
  data?: T;
}
