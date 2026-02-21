import "./LoginPage.css"
import { useState } from "react"

export function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    console.log({
      email,
      password,
    })
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Sistema Tem Sabor</h1>
        <p>Faça login para continuar</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  )
}