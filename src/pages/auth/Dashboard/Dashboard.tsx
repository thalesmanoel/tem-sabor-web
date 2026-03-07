import { StatCard } from "../../../components/StatCard/StatCard";
import { MainLayout } from "../../../layouts/MainLayout/MainLayout";
import "./Dashboard.css";

export function Dashboard() {
  return (
    <MainLayout>

      <h1>Bom dia, Ana</h1>
      <p>Aqui está o resumo do sistema hoje.</p>

      <div className="stats-grid">

        <StatCard
          title="Total de Pedidos"
          value="1.240"
        />

        <StatCard
          title="Clientes Ativos"
          value="847"
        />

        <StatCard
          title="Produtos"
          value="356"
        />

        <StatCard
          title="Alertas"
          value="12"
        />

      </div>

    </MainLayout>
  );
}