import { useState } from "react";
import "./LoginPage.css";
import { Input } from "../../../components/Input/Input";
import { Button } from "../../../components/Button/Button";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log({
      email,
      password,
    });
  }

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="left-content">
          <h1>
            Sistema Tem Sabor
          </h1>
          <p>
            Tecnologia, organização e eficiência para transformar a gestão do seu negócio.
            Uma experiência moderna, segura e intuitiva.
          </p>
        </div>
      </div>

      <div className="login-right">
        <div className="form-container">
          <h2>Login</h2>

          <form onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Senha"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="login-links">
              <a href="#">Esqueceu a senha?</a>
              <a href="#">Suporte</a>
            </div>

            <Button type="submit">Entrar</Button>
          </form>
        </div>
      </div>
    </div>
  );
}