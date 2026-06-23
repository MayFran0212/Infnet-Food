import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTema } from '../context/ThemeContext';

export default function CardHighlight() {
  const { usuarioLogado } = useAuth();
  const { tema } = useTema();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: tema.cardBg, borderColor: tema.borda },
      ]}>
      <Text style={[styles.titulo, { color: tema.textoPrincipal }]}>
        Olá, {usuarioLogado.nome}!
      </Text>
      <Text style={[styles.descricao, { color: tema.textoSecundario }]}>
        Qual a sua fome de hoje?
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  titulo: { fontSize: 18, fontWeight: 'bold' },
  descricao: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
});
