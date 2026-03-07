import "./Header.css";

interface Props {
  toggleSidebar: () => void;
}

export function Header({ toggleSidebar }: Props) {
  return (
    <header className="header">

      <div className="header-left">
        <button onClick={toggleSidebar}>☰</button>
        <span>Dashboard</span>
      </div>

      <div className="header-right">

        <div className="notification">
          🔔
          <span className="badge">3</span>
        </div>

        <div className="user">
          <div>
            <strong>Ana Souza</strong>
            <small>Administrador</small>
          </div>

          <div className="avatar">
            AS
          </div>
        </div>

      </div>

    </header>
  );
}