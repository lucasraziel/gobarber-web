import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Container, Content, Background } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImage from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string()
          .required('E-mail é obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'Deve ter, no mínimo, 6 dígitos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
    }
  }, []);
  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImage} alt="gobarber" />
        <Form onSubmit={handleSubmit} ref={formRef}>
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
        </Form>
        <a href="forgot">
          <FiArrowLeft />
          Voltar para Logon
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
