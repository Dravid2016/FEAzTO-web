import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import GradualBlur from '../ui/GradualBlur';

interface PageContainerProps {
  children: React.ReactNode;
  cartCount?: number;
  onCartClick?: () => void;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  cartCount = 0,
  onCartClick
}) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#FFF8E8' }}>
      <Navbar cartCount={cartCount} onCartClick={onCartClick} />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />

      {/* GradualBlur bottom fade */}
      <GradualBlur
        target="page"
        position="bottom"
        height="8rem"
        strength={2}
        divCount={8}
        curve="bezier"
        exponential={true}
        opacity={1}
        zIndex={9980}
      />
    </div>
  );
};
