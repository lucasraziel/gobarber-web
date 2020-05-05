import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import logoImage from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImage} alt="gobarber" />
      <form>
        <h1>Faça seu logon</h1>

        <Input placeholder="email" icon={FiMail} name="email" />
        <Input
          placeholder="senha"
          icon={FiLock}
          type="password"
          name="password"
        />

        <Button type="submit">Entrar</Button>

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
