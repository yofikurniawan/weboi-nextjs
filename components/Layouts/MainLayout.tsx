import { ReactNode } from "react";

// import header and footer
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
        <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
