import axios from "axios";
import { api } from "./api";
import type {
  ApiResponse,
  AuthSession,
  CreateUserData,
  LoginCredentials,
  User,
} from "../types/auth";

function requireResponseData<T>(response: ApiResponse<T>): T {
  if (response.data === undefined) {
    throw new Error("O servidor retornou uma resposta sem dados.");
  }

  return response.data;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthSession> {
    const response = await api.post<ApiResponse<AuthSession>>(
      "/auth/login",
      credentials,
    );

    return requireResponseData(response.data);
  },

  async register(userData: CreateUserData): Promise<ApiResponse<User>> {
    const response = await api.post<ApiResponse<User>>("/users", userData);

    requireResponseData(response.data);
    return response.data;
  },
};

export function getApiErrorMessage(error: unknown, fallbackMessage: string) {
  if (axios.isAxiosError(error)) {
    const responseMessage = (error.response?.data as { message?: unknown } | undefined)
      ?.message;

    if (Array.isArray(responseMessage)) {
      return responseMessage.filter((message) => typeof message === "string").join(". ");
    }

    if (typeof responseMessage === "string" && responseMessage.trim()) {
      return responseMessage;
    }

    if (!error.response) {
      return "Não foi possível conectar ao servidor. Verifique se o backend está em execução.";
    }

    return fallbackMessage;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
}
