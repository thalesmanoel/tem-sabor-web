import "./StatCard.css";

interface Props {
  title: string;
  value: string;
}

export function StatCard({ title, value }: Props) {
  return (
    <div className="stat-card">
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}