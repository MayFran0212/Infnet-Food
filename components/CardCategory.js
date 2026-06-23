import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import { categorias } from '../dados/dadosMock';
import { useTema } from '../context/ThemeContext';

export default function CardCategory({ navigation }) {
  const [categoriasMock] = useState(categorias);
  const { tema } = useTema();

  return (
    <View style={[styles.container, { backgroundColor: tema.bg }]}>
      <Text style={[styles.titulo, { color: tema.textoPrincipal }]}>
        Escolha a sua vontade:
      </Text>
      <FlatList
        data={categoriasMock}
        scrollEnabled={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              { backgroundColor: tema.cardBg, borderColor: tema.borda },
            ]}
            onPress={() =>
              navigation.navigate('Produtos', { categoria: item })
            }>
            <View style={styles.textoContainer}>
              <Text
                style={[
                  styles.categoriaTitulo,
                  { color: tema.textoPrincipal },
                ]}>
                {item.emoji} {item.titulo}
              </Text>
              <Text
                style={[styles.categoriaDesc, { color: tema.textoSecundario }]}>
                {item.descricao}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
  },
  card: {
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  textoContainer: { flex: 1 },
  categoriaTitulo: { fontSize: 16, fontWeight: 'bold' },
  categoriaDesc: { fontSize: 13, marginTop: 4 },
});
