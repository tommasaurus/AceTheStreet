import { ReactNode } from "react";
import styles from "./layout.module.css";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.contentWrapper}>{children}</div>
    </div>
  );
}
