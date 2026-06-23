import React from 'react';
import { StyleSheet, Text, View, Switch, ScrollView } from 'react-native';
import { useTema } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function Config() {
  const { isDarkMode, toggleTema, tema } = useTema();

  return (
    <ScrollView style={[styles.scrollView, { backgroundColor: tema.bg }]}>
      <View style={styles.container}>
        <Text style={[styles.titulo, { color: tema.textoPrincipal }]}>
          Configurações
        </Text>

        <View style={[styles.secao, { backgroundColor: tema.cardBg }]}>
          <View style={styles.headerSecao}>
            <Ionicons
              name="color-palette-outline"
              size={20}
              color={tema.primaria}
            />
            <Text style={[styles.subtitulo, { color: tema.primaria }]}>
              Aparência
            </Text>
          </View>

          <View style={styles.row}>
            <View style={styles.textRowContainer}>
              <Text style={[styles.opcaoTexto, { color: tema.textoPrincipal }]}>
                Modo Escuro
              </Text>
              <Text
                style={[
                  styles.opcaoDescricao,
                  { color: tema.textoSecundario },
                ]}>
                Ajusta as cores para descansar seus olhos
              </Text>
            </View>

            <Switch
              value={isDarkMode}
              onValueChange={toggleTema}
              trackColor={{ false: '#767577', true: tema.primaria }}
              thumbColor={isDarkMode ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={[styles.secao, { backgroundColor: tema.cardBg }]}>
          <View style={styles.headerSecao}>
            <Ionicons
              name="fast-food-outline"
              size={20}
              color={tema.primaria}
            />
            <Text style={[styles.subtitulo, { color: tema.primaria }]}>
              Preferências do App
            </Text>
          </View>

          <View style={styles.rowInfo}>
            <Text style={[styles.opcaoTexto, { color: tema.textoPrincipal }]}>
              Versão do Aplicativo
            </Text>
            <Text style={{ color: tema.textoSecundario, fontSize: 14 }}>
              v1.0.4
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 24,
    textAlign: 'center',
  },
  secao: {
    padding: 18,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  headerSecao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  subtitulo: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  textRowContainer: {
    flex: 1,
    marginRight: 10,
  },
  opcaoTexto: {
    fontSize: 16,
    fontWeight: '600',
  },
  opcaoDescricao: {
    fontSize: 12,
    marginTop: 2,
  },
});
