import fotoTerno from "../../assets/foto-terno-linkedin.png";

export function UserInfo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <span>Thales</span>

      <img
        src={fotoTerno}
        alt="user"
        style={{
          width: 35,
          height: 35,
          borderRadius: "50%",
        }}
      />
    </div>
  );
}
