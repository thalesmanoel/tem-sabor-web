import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";
import { authService, getApiErrorMessage } from "../../../services/authService";
import "../Login/LoginPage.css";
import "./RegisterPage.css";

export function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setPasswordError(undefined);

    if (!name.trim()) {
      setError("Informe o nome do usuário.");
      return;
    }

    if (password !== passwordConfirmation) {
      setPasswordError("As senhas informadas não coincidem.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await authService.register({
        name: name.trim(),
        email: email.trim(),
        password,
        isActive,
      });

      navigate("/login", {
        replace: true,
        state: {
          email: email.trim(),
          registrationMessage: response.message,
        },
      });
    } catch (requestError) {
      setError(
        getApiErrorMessage(
          requestError,
          "Não foi possível cadastrar o usuário. Tente novamente.",
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="login-container register-page">
      <section className="login-left" aria-label="Apresentação do sistema">
        <div className="login-brand">
          <span className="login-brand-mark" aria-hidden="true">
            TS
          </span>
          <span>Sistema Tem Sabor</span>
        </div>

        <div className="left-content">
          <span className="login-eyebrow">Novo acesso</span>
          <h1>Comece por aqui</h1>
          <p>
            Cadastre um usuário para acessar a gestão de pedidos, clientes,
            produtos e estoque em um só lugar.
          </p>
        </div>

        <div className="login-visual" aria-hidden="true">
          <span className="login-visual-tile login-visual-tile-primary" />
          <span className="login-visual-tile login-visual-tile-white" />
          <span className="login-visual-tile login-visual-tile-dark" />
          <span className="login-visual-tile login-visual-tile-red" />
        </div>
      </section>

      <section className="login-right" aria-label="Cadastro de usuário">
        <div className="form-container register-form-container">
          <div className="form-header">
            <span className="form-eyebrow">Cadastro de usuário</span>
            <h2>Criar acesso</h2>
            <p>Preencha os dados abaixo para cadastrar um novo usuário.</p>
          </div>

          <form className="login-form register-form" onSubmit={handleSubmit}>
            {error && (
              <div className="auth-feedback auth-feedback-error" role="alert">
                {error}
              </div>
            )}

            <Input
              id="register-name"
              label="Nome"
              type="text"
              placeholder="Digite o nome completo"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              disabled={isSubmitting}
              required
            />

            <Input
              id="register-email"
              label="Email"
              type="email"
              placeholder="Digite o email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              disabled={isSubmitting}
              required
            />

            <div className="register-password-grid">
              <Input
                id="register-password"
                label="Senha"
                type="password"
                placeholder="Mínimo de 6 caracteres"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
                minLength={6}
                disabled={isSubmitting}
                required
              />

              <Input
                id="register-password-confirmation"
                label="Confirmar senha"
                type="password"
                placeholder="Repita a senha"
                value={passwordConfirmation}
                onChange={(event) => setPasswordConfirmation(event.target.value)}
                autoComplete="new-password"
                minLength={6}
                disabled={isSubmitting}
                error={passwordError}
                required
              />
            </div>

            <label className="register-active-option" htmlFor="register-is-active">
              <input
                id="register-is-active"
                type="checkbox"
                checked={isActive}
                onChange={(event) => setIsActive(event.target.checked)}
                disabled={isSubmitting}
              />
              <span>
                <strong>Permitir acesso imediatamente</strong>
                <small>Usuários inativos não conseguem entrar no sistema.</small>
              </span>
            </label>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Cadastrando..." : "Cadastrar usuário"}
            </Button>

            <div className="auth-switch auth-switch-centered">
              <span>Já possui uma conta?</span>
              <Link to="/login">Voltar para o login</Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
