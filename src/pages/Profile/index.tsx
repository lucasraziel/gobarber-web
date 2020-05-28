import React, { useCallback, useRef, ChangeEvent } from 'react';
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { useHistory, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Container, Content, AvatarInput } from './styles';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

interface ProfileData {
  name: string;
  email: string;
  password: string;
  old_password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const handleSubmit = useCallback(
    async (data: ProfileData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().when('old_password', {
            is: (val) => !!val.length,
            then: Yup.string().min(6, 'Deve ter no mínimo 6 caracteres'),
            otherwise: Yup.string(),
          }),
          old_password: Yup.string(),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Senha e confirmação devem ser iguais'
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.put('/profile', data);

        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Usuário atualizado',
          description: 'Você já pode utilizar suas novas informações',
        });
        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Falha na atualização',
          description:
            'Houve alguma falha ao atualizar o perfil, tente novamente',
        });
      }
    },
    [addToast, history]
  );

  const handleAvatarChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        const response = await api.patch('users/avatar', data);

        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Avatar atualizado',
          description: 'O avatar foi atualizado',
        });
      }
    },
    [addToast, updateUser]
  );
  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <Form
          onSubmit={handleSubmit}
          ref={formRef}
          initialData={{
            name: user.name,
            email: user.email,
          }}
        >
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>

          <h1>Meu Perfil</h1>

          <Input placeholder="Nome" icon={FiUser} name="name" />
          <Input placeholder="email" icon={FiMail} name="email" />
          <Input
            containerStyle={{ marginTop: '24px' }}
            placeholder="senha antiga"
            icon={FiLock}
            type="password"
            name="old_password"
          />
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

          <Button type="submit">Confirmar Mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
