import { useState } from "react";
import "./LoginPage.css";
import { Input } from "../../../components/Input/Input";
import { Button } from "../../../components/Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authService, getApiErrorMessage } from "../../../services/authService";
import { authStorage } from "../../../services/authStorage";

interface LoginRouteState {
  email?: string;
  from?: string;
  registrationMessage?: string;
}

export function LoginPage() {
  const location = useLocation();
  const routeState = location.state as LoginRouteState | null;
  const [email, setEmail] = useState(routeState?.email ?? "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const session = await authService.login({
        email: email.trim(),
        password,
      });

      authStorage.saveSession(session);
      navigate(routeState?.from ?? "/dashboard", { replace: true });
    } catch (requestError) {
      setError(
        getApiErrorMessage(
          requestError,
          "Não foi possível realizar o login. Tente novamente.",
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="login-container">
      <section className="login-left" aria-label="Apresentação do sistema">
        <div className="login-brand">
          <span className="login-brand-mark" aria-hidden="true">
            TS
          </span>
          <span>Sistema Tem Sabor</span>
        </div>

        <div className="left-content">
          <span className="login-eyebrow">Gestão com sabor</span>
          <h1>
            Sistema Tem Sabor
          </h1>
          <p>
            Tecnologia, organização e eficiência para transformar a gestão do seu negócio.
            Uma experiência moderna, segura e intuitiva.
          </p>
        </div>

        <div className="login-visual" aria-hidden="true">
          <span className="login-visual-tile login-visual-tile-primary" />
          <span className="login-visual-tile login-visual-tile-white" />
          <span className="login-visual-tile login-visual-tile-dark" />
          <span className="login-visual-tile login-visual-tile-red" />
        </div>
      </section>

      <section className="login-right" aria-label="Acesso ao sistema">
        <div className="form-container">
          <div className="form-header">
            <span className="form-eyebrow">Acesso ao sistema</span>
            <h2>Entrar</h2>
            <p>Bem-vindo de volta.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {routeState?.registrationMessage && (
              <div className="auth-feedback auth-feedback-success" role="status">
                {routeState.registrationMessage}. Agora entre com suas credenciais.
              </div>
            )}

            {error && (
              <div className="auth-feedback auth-feedback-error" role="alert">
                {error}
              </div>
            )}

            <Input
              id="login-email"
              label="Email"
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              disabled={isSubmitting}
              required
            />

            <Input
              id="login-password"
              label="Senha"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              minLength={6}
              disabled={isSubmitting}
              required
            />

            <div className="auth-switch">
              <span>Ainda não tem acesso?</span>
              <Link to="/cadastro">Cadastrar usuário</Link>
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
