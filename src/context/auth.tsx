import React, { createContext, ReactNode, useEffect, useState } from 'react';
import * as AuthSession from 'expo-auth-session';

import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: string;
  username: string;
  firstname: string;
  avatar: string;
  email: string;
  token: string;
};

type AuthContextProps = {
  user: User | undefined;
  signIn: () => Promise<void>;
  logout: () => Promise<void>;
  loadingAuth: boolean;
};
export const AuthContext = createContext({} as AuthContextProps);

type Props = {
  children: ReactNode;
};

import {
  SCOPE,
  CDN_IMAGE,
  REDIRECT_URI,
  RESPONSE_TYPE,
  CLIENT_ID,
} from '../configs/discord.auth';
import { api } from '../services/api';
import { COLLECTION_USERS } from '../configs/storage';

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token: string;
    error: string;
  };
};
export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);

  async function loadUserByStorage() {
    const userString = await AsyncStorage.getItem(COLLECTION_USERS);
    if (userString) {
      const userLogged = JSON.parse(userString) as User;
      api.defaults.headers.authorization = `Bearer ${userLogged.token}`;

      setUser(userLogged);
    }
  }
  useEffect(() => {
    loadUserByStorage();
  }, []);

  async function signIn() {
    try {
      setLoading(true);

      const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (type !== 'success' || params?.error)
        throw new Error('Não foi possível autenticar');

      api.defaults.headers.authorization = `Bearer ${params.access_token}`;

      const { data } = await api.get('/users/@me');

      const firstName = data.username.split(' ')[0];
      const userAvatar = `${CDN_IMAGE}/avatars/${data.id}/${data.avatar}.png`;

      const userData = {
        id: data.id,
        firstname: firstName,
        avatar: userAvatar,
        email: data.email,
        token: params?.access_token,
        username: data.username,
      };
      await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData));

      setUser(userData);
    } catch (e) {
      throw new Error('Não foi possível autenticar');
    } finally {
      setLoading(false);
    }
  }
  async function logout() {
    setUser({} as User);
    await AsyncStorage.removeItem(COLLECTION_USERS);
  }

  return (
    <AuthContext.Provider
      value={{ user, signIn, loadingAuth: loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
