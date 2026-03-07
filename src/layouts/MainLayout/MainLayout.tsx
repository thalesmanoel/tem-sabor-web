import { useState } from "react";
import "./MainLayout.css";
import { Sidebar } from "../../components/Sidebar/sidebar";
import { Header } from "../../components/Header/header";

interface Props {
  children: React.ReactNode;
}

export function MainLayout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <div className="layout">
      <Sidebar open={sidebarOpen} />

      <div className="layout-main">
        <Header toggleSidebar={toggleSidebar} />

        <div className="layout-content">
          {children}
        </div>
      </div>
    </div>
  );
}