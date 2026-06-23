import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from '../screens/Home';
import Carrinho from '../screens/Carrinho';
import Pedidos from '../screens/Pedidos';
import Perfil from '../screens/Perfil';
import Config from '../screens/Config';
import { useCarrinho } from '../context/CarrinhoContext';
import { useTema } from '../context/ThemeContext'; 

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  const { quantidadeTotal } = useCarrinho();
  const { tema, isDarkMode } = useTema(); 

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: tema.primaria, 
        tabBarInactiveTintColor: isDarkMode ? '#777777' : 'gray', 
        tabBarStyle: {
          backgroundColor: tema.cardBg, 
          borderTopColor: tema.borda, 
        },
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Pedidos') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'AbaCarrinho') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Config') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        name="Inicio"
        component={Home}
        options={{ title: 'Início' }}
      />
      <Tab.Screen
        name="Pedidos"
        component={Pedidos}
        options={{ title: 'Pedidos' }}
      />

      <Tab.Screen
        name="AbaCarrinho"
        component={Carrinho}
        options={{
          title: 'Carrinho',
          tabBarBadge: quantidadeTotal > 0 ? quantidadeTotal : null,
          tabBarBadgeStyle: {
            backgroundColor: 'firebrick',
            color: '#fff',
          },
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{ title: 'Perfil' }}
      />
      <Tab.Screen
        name="Config"
        component={Config}
        options={{ title: 'Configurações' }}
      />
    </Tab.Navigator>
  );
}
