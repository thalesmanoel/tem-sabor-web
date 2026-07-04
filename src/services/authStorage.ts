import type { AuthSession } from "../types/auth";

const AUTH_SESSION_KEY = "tem-sabor:auth-session";

function isExpired(accessToken: string) {
  try {
    const payloadPart = accessToken.split(".")[1];

    if (!payloadPart) {
      return true;
    }

    const normalizedPayload = payloadPart
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(Math.ceil(payloadPart.length / 4) * 4, "=");
    const payload = JSON.parse(window.atob(normalizedPayload)) as {
      exp?: number;
    };

    return typeof payload.exp === "number" && payload.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
}

function isAuthSession(value: unknown): value is AuthSession {
  if (!value || typeof value !== "object") {
    return false;
  }

  const session = value as Partial<AuthSession>;

  return (
    typeof session.accessToken === "string" &&
    session.accessToken.length > 0 &&
    Boolean(session.user) &&
    typeof session.user?.id === "string" &&
    typeof session.user?.name === "string" &&
    typeof session.user?.email === "string"
  );
}

export const authStorage = {
  getSession(): AuthSession | null {
    try {
      const storedSession = window.localStorage.getItem(AUTH_SESSION_KEY);

      if (!storedSession) {
        return null;
      }

      const session: unknown = JSON.parse(storedSession);

      if (!isAuthSession(session) || isExpired(session.accessToken)) {
        window.localStorage.removeItem(AUTH_SESSION_KEY);
        return null;
      }

      return session;
    } catch {
      window.localStorage.removeItem(AUTH_SESSION_KEY);
      return null;
    }
  },

  saveSession(session: AuthSession) {
    window.localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
  },

  clearSession() {
    window.localStorage.removeItem(AUTH_SESSION_KEY);
  },

  isAuthenticated() {
    return this.getSession() !== null;
  },
};
