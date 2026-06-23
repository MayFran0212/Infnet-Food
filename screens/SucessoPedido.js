import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTema } from '../context/ThemeContext';
import { dispararNotificacaoStatus } from '../utils/notificationService';

export default function SucessoPedido({ navigation }) {
  const { tema } = useTema();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    dispararNotificacaoStatus(
      'Pedido Confirmado! 📝',
      'Seu pedido foi aceito.',
      1
    );
    dispararNotificacaoStatus(
      'Pedido na Cozinha! 🍳',
      'O chef começou a preparar.',
      6
    );
    dispararNotificacaoStatus(
      'Pedido a Caminho! 🛵',
      'Jajá você vai estar de barriguinha cheia.',
      12
    );

    const timer = setTimeout(() => navigation.popToTop(), 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: tema.cardBg, opacity: fadeAnim },
      ]}>
      <Ionicons
        name="checkmark-done-circle"
        size={100}
        color="#27ae60"
        style={styles.icone}
      />

      <Text style={[styles.titulo, { color: tema.textoPrincipal }]}>
        Pedido Confirmado! 🎉
      </Text>

      <Text style={[styles.subtitulo, { color: tema.textoSecundario }]}>
        Sua refeição está sendo preparada.
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  icone: { marginBottom: 20 },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
});
