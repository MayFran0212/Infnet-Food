import React, { createContext, useState, useContext } from 'react';
import { Alert } from 'react-native';
import { acessosLiberados } from '../dados/dadosMock';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  const realizarLogin = (email, senha) => {
    const contaValida = acessosLiberados.find(
      (conta) =>
        conta.email.toLowerCase() === email.toLowerCase().trim() &&
        conta.senha === senha
    );

    if (contaValida) {
      const éOAlex = contaValida.email.includes('emaillegal');

      setUsuarioLogado({
        email: contaValida.email,
        nome: éOAlex ? 'Alex Silva' : email.split('@')[0],
        foto: éOAlex
          ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'
          : 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
        telefone: '(21) 99999-8888',
        membroDesde: 'Março de 2026',
      });
      return true;
    } else {
      Alert.alert('Erro de Autenticação', 'E-mail ou senha incorretos.');
      return false;
    }
  };

  const realizarLogout = () => {
    setUsuarioLogado(null);
  };

  return (
    <AuthContext.Provider
      value={{ usuarioLogado, realizarLogin, realizarLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
