import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CarrinhoProvider } from '../context/CarrinhoContext';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { useTema } from '../context/ThemeContext'; 
import { registrarParaNotificacoesLocais } from '../utils/notificationService';

import MainTabNavigator from './MainTabNavigator';
import Login from '../screens/Login';
import Produtos from '../screens/Produtos';
import Detalhes from '../screens/Detalhes';
import Checkout from '../screens/Checkout';
import DetalhesRestaurante from '../screens/DetalhesRestaurante';
import SucessoPedido from '../screens/SucessoPedido';

const Stack = createNativeStackNavigator();

function RootStack() {
  const { usuarioLogado } = useAuth();
  const { tema } = useTema();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: tema.primaria, 
        headerStyle: {
          backgroundColor: tema.cardBg, 
        },
        headerTitleStyle: {
          color: tema.textoPrincipal, 
        },
        headerShadowVisible: false, 
      }}>
      {usuarioLogado === null ? (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Main"
            component={MainTabNavigator}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Produtos"
            component={Produtos}
            options={({ route }) => ({
              title: route.params?.categoria?.titulo || 'Produtos',
            })}
          />

          <Stack.Screen
            name="SucessoPedido"
            component={SucessoPedido}
            options={{ headerShown: false, gestureEnabled: false }}
          />

          <Stack.Screen
            name="Detalhes"
            component={Detalhes}
            options={{ title: 'Detalhes do Produto' }}
          />

          <Stack.Screen
            name="Checkout"
            component={Checkout}
            options={{ title: 'Finalizar Pedido' }}
          />

          <Stack.Screen
            name="DetalhesRestaurante"
            component={DetalhesRestaurante}
            options={{ title: 'Sobre o Restaurante' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  useEffect(() => {
    registrarParaNotificacoesLocais();
  }, []);

  return (
    <AuthProvider>
      <CarrinhoProvider>
        <RootStack />
      </CarrinhoProvider>
    </AuthProvider>
  );
}
