import React from 'react';

import { Container } from './styles';

interface TooltipProps {
  title: string;
  className?: string;
}

const Tootip: React.FC<TooltipProps> = ({ title, children, className }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tootip;
