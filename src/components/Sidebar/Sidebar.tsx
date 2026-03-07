import "./Sidebar.css";

interface Props {
  open: boolean;
}

export function Sidebar({ open }: Props) {
  return (
    <aside className={`sidebar ${open ? "open" : "closed"}`}>
      
      <div className="sidebar-logo">
        <div className="logo-icon">S</div>
        {open && <span>Sistema</span>}
      </div>

      <nav className="sidebar-menu">

        <a className="active">
          <span>Dashboard</span>
        </a>

        <a>Pedidos</a>
        <a>Clientes</a>
        <a>Produtos</a>
        <a>Relatórios</a>
        <a>Configurações</a>

      </nav>

      <div className="sidebar-footer">
        Sair
      </div>

    </aside>
  );
}