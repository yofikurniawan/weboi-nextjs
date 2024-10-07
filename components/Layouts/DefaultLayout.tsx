import { PropsWithChildren } from 'react';

import Header from './Header';
import Footer from './Footer';

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
    <div className="body_wrap">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
    </>
    
  );

};

export default DefaultLayout;