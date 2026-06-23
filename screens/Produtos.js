import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useTema } from '../context/ThemeContext';

export default function Produtos({ route, navigation }) {
  const { tema, isDarkMode } = useTema();
  const { categoria } = route.params;

  const [listaProdutos, setListaProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarProdutosDaAPI = async () => {
      try {
        setCarregando(true);

        const resposta = await fetch(
          `https://free-food-menus-api-two.vercel.app/${categoria.endpoint}`
        );
        const dados = await resposta.json();

        setListaProdutos(dados || []);
      } catch (error) {
        console.error('Erro ao buscar cardápio externo:', error);
      } finally {
        setCarregando(false);
      }
    };

    carregarProdutosDaAPI();
  }, [categoria.endpoint]);

  if (carregando) {
    return (
      <View
        style={[styles.containerCentralizado, { backgroundColor: tema.bg }]}>
        <ActivityIndicator size="large" color={tema.primaria} />
        <Text
          style={[
            styles.textoInformativo,
            { color: tema.textoSecundario, marginTop: 12 },
          ]}>
          Carregando cardápio fresco...
        </Text>
      </View>
    );
  }

  if (listaProdutos.length === 0) {
    return (
      <View
        style={[styles.containerCentralizado, { backgroundColor: tema.bg }]}>
        <Text
          style={[styles.textoInformativo, { color: tema.textoSecundario }]}>
          Nenhum produto cadastrado nesta categoria ainda!
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: tema.bg }]}>
      <FlatList
        data={listaProdutos}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.productCard,
              { backgroundColor: tema.cardBg, borderColor: tema.borda },
            ]}
            onPress={() => navigation.navigate('Detalhes', { produto: item })}
            activeOpacity={0.7}>
            <Image
              source={{ uri: item.img }}
              style={[
                styles.productImage,
                { backgroundColor: isDarkMode ? '#2c2c2c' : '#eee' },
              ]}
            />
            <View style={styles.productInfo}>
              <Text
                style={[styles.productName, { color: tema.textoPrincipal }]}>
                {item.name}
              </Text>
              <Text
                style={[
                  styles.productDescription,
                  { color: tema.textoSecundario },
                ]}
                numberOfLines={2}>
                {item.dsc}
              </Text>
              <Text style={[styles.productPrice, { color: tema.primaria }]}>
                R$ {item.price.toFixed(2).replace('.', ',')}
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
  containerCentralizado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textoInformativo: { fontSize: 16, textAlign: 'center' },
  listContent: { padding: 15 },
  productCard: {
    borderRadius: 16,
    flexDirection: 'row',
    padding: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  productImage: { width: 90, height: 90, borderRadius: 12 },
  productInfo: { flex: 1, marginLeft: 12, justifyContent: 'space-between' },
  productName: { fontSize: 16, fontWeight: 'bold' },
  productDescription: { fontSize: 13, marginVertical: 4 },
  productPrice: { fontSize: 15, fontWeight: '700' },
});
