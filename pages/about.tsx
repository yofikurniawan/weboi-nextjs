import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react";
import MainLayout from "../components/Layouts/MainLayout";

const Home = () => {

  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-bg-dark">Home</h1>
    </div>
  );
};

Home.getLayout = (page: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined) => <MainLayout>{page}</MainLayout>;

export default Home;
