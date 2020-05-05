import React from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import logoImage from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => (
  <Container>
    <Background />
    <Content>
      <img src={logoImage} alt="gobarber" />
      <form>
        <h1>Faça seu cadastro</h1>

        <Input placeholder="Nome" icon={FiUser} name="name" />
        <Input placeholder="email" icon={FiMail} name="email" />
        <Input
          placeholder="senha"
          icon={FiLock}
          type="password"
          name="password"
        />

        <Button type="submit">Cadastrar</Button>
      </form>
      <a href="forgot">
        <FiArrowLeft />
        Voltar para Logon
      </a>
    </Content>
  </Container>
);

export default SignUp;
