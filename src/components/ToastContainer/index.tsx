import React, { useCallback } from 'react';
import { useTransition } from 'react-spring';

import { Container } from './styles';

import { ToastMessage, useToast } from '../../hooks/toast';

import Toast from './Toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messageWithTransitions = useTransition(
    messages,
    (message) => message.id,
    {
      from: { right: '-120%' },
      enter: { right: '0%' },
      leave: { right: '-120%' },
    }
  );

  return (
    <Container>
      {messageWithTransitions.map(({ item, key, props }) => (
        <Toast message={item} key={key} style={props} />
      ))}
    </Container>
  );
};

export default ToastContainer;
