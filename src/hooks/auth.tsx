import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface UserData {
  id: string;
  avatar_url: string;
  name: string;
  email: string;
}

interface AuthContextData {
  user: UserData;
  signIn: (data: Credentials) => Promise<void>;
  signOut: () => void;
  updateUser: (updateDate: UserData) => void;
}

interface Credentials {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  user: UserData;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const updateUser = useCallback(
    (updateData: UserData) => {
      setData({
        token: data.token,
        user: {
          ...updateData,
        },
      });

      localStorage.setItem('@GoBarber:user', JSON.stringify(updateData));
    },
    [data.token]
  );

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post<AuthState>('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as AuthState);
  }, []);
  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
