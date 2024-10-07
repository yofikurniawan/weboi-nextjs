import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const SecondaryLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <header>Header Sekunder</header>
      <main>{children}</main>
      <footer>Footer Sekunder</footer>
    </div>
  );
};

export default SecondaryLayout;
