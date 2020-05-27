import React, { useRef, useCallback } from 'react';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useHistory, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { Container, Content, Background, AnimationContainer } from './styles';
import logoImage from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

interface Credentials {
  password: string;
  password_confirmation: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const history = useHistory();

  const location = useLocation();

  const handleSubmit = useCallback(
    async (data: Credentials) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string()
            .required('Senha é obrigatória')
            .min(6, 'Tamanho mínimo da senha: 6'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Senha e confirmação devem ser iguais'
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, password_confirmation } = data;
        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error('');
        }

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        } else {
          addToast({
            type: 'error',
            title: 'Erro na autenticação',
            description:
              'Ocorreu um erro ao fazer login, cheque as credenciais',
          });
        }
      }
    },
    [addToast, history, location.search]
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImage} alt="gobarber" />
          <Form onSubmit={handleSubmit} ref={formRef}>
            <h1>Resetar a senha</h1>

            <Input
              placeholder="nova senha"
              icon={FiLock}
              type="password"
              name="password"
            />

            <Input
              placeholder="confirmação de senha"
              icon={FiLock}
              type="password"
              name="password_confirmation"
            />

            <Button type="submit">Alterar senha</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
