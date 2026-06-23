import React from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import Button from '../components/Button';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useTema } from '../context/ThemeContext';
import { dispararNotificacaoStatus } from '../utils/notificationService'; 

export default function Perfil() {
  const { tema, isDarkMode } = useTema();
  const { usuarioLogado, realizarLogout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Sair do App', 'Tem certeza que deseja encerrar a sessão?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: () => {
          dispararNotificacaoStatus(
            'Sessão Encerrada 👋',
            `Até logo, ${usuarioLogado?.nome}! Esperamos que sua próxima refeição seja com a gente.`,
            0.5
          );
          realizarLogout();
        },
      },
    ]);
  };

  if (!usuarioLogado) return null;

  return (
    <View style={[styles.container, { backgroundColor: tema.bg }]}>
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: usuarioLogado.foto }}
          style={[
            styles.avatar,
            {
              borderColor: tema.cardBg,
              backgroundColor: isDarkMode ? '#2c2c2c' : '#eee',
            },
          ]}
        />
        <Text style={[styles.userName, { color: tema.textoPrincipal }]}>
          {usuarioLogado.nome}
        </Text>
        <Text style={[styles.userSubtitle, { color: tema.textoSecundario }]}>
          Cliente Infnet Food
        </Text>
      </View>

      <View
        style={[
          styles.infoCard,
          { backgroundColor: tema.cardBg, borderColor: tema.borda },
        ]}>
        <View style={styles.infoRow}>
          <Ionicons
            name="mail-outline"
            size={20}
            color={tema.primaria}
            style={styles.icon}
          />
          <View>
            <Text style={[styles.infoLabel, { color: tema.textoSecundario }]}>
              E-mail
            </Text>
            <Text style={[styles.infoValue, { color: tema.textoPrincipal }]}>
              {usuarioLogado.email}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.divider,
            { backgroundColor: isDarkMode ? '#2c2c2c' : '#eee' },
          ]}
        />

        <View style={styles.infoRow}>
          <Ionicons
            name="call-outline"
            size={20}
            color={tema.primaria}
            style={styles.icon}
          />
          <View>
            <Text style={[styles.infoLabel, { color: tema.textoSecundario }]}>
              Telefone
            </Text>
            <Text style={[styles.infoValue, { color: tema.textoPrincipal }]}>
              {usuarioLogado.telefone}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.divider,
            { backgroundColor: isDarkMode ? '#2c2c2c' : '#eee' },
          ]}
        />

        <View style={styles.infoRow}>
          <Ionicons
            name="calendar-outline"
            size={20}
            color={tema.primaria}
            style={styles.icon}
          />
          <View>
            <Text style={[styles.infoLabel, { color: tema.textoSecundario }]}>
              Membro desde
            </Text>
            <Text style={[styles.infoValue, { color: tema.textoPrincipal }]}>
              {usuarioLogado.membroDesde}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          texto="Sair da Conta"
          acao={handleLogout}
          estiloContainer={[
            styles.btnLogout,
            {
              backgroundColor: tema.cardBg,
              borderColor: 'firebrick',
            },
          ]}
          estiloTexto={styles.btnLogoutText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  headerContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    marginBottom: 12,
  },
  userName: { fontSize: 22, fontWeight: 'bold' },
  userSubtitle: { fontSize: 14, marginTop: 2 },

  infoCard: {
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  icon: { marginRight: 16, minWidth: 24, textAlign: 'center' },
  infoLabel: { fontSize: 12, fontWeight: '500' },
  infoValue: { fontSize: 15, marginTop: 2, fontWeight: '600' },
  divider: { height: 1, marginVertical: 4 },

  footer: { flex: 1, justifyContent: 'flex-end', marginBottom: 10 },
  btnLogout: {
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnLogoutText: { color: 'firebrick', fontWeight: 'bold', fontSize: 15 },
});
