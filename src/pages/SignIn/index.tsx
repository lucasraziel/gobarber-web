import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import backgroundImage from '../../assets/sign-in-background.png';
import logoImage from '../../assets/logo.svg';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImage} alt="gobarber" />
      <form>
        <h1>Faça seu logon</h1>

        <input placeholder="email" />
        <input placeholder="senha" type="password" />

        <button type="submit">Entrar</button>

        <a href="forgot">Esqueci minha senha</a>
      </form>
      <a href="forgot">
        <FiLogIn />
        Criar Conta
      </a>
    </Content>
    <Background />
  </Container>
);

export default SignIn;
