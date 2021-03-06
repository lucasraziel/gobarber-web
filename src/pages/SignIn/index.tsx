import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Container, Content, Background, AnimationContainer } from './styles';
import logoImage from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

interface Credentials {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn, user } = useAuth();
  const { addToast } = useToast();

  console.log(user);

  const handleSubmit = useCallback(
    async (data: Credentials) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha é obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn(data);
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
    [signIn, addToast]
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImage} alt="gobarber" />
          <Form onSubmit={handleSubmit} ref={formRef}>
            <h1>Faça seu logon</h1>

            <Input placeholder="email" icon={FiMail} name="email" />
            <Input
              placeholder="senha"
              icon={FiLock}
              type="password"
              name="password"
            />

            <Button type="submit">Entrar</Button>

            <Link to="/forgot-password">Esqueci minha senha</Link>
          </Form>
          <Link to="/signup">
            <FiLogIn />
            Criar Conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
