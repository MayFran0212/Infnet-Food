import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCarrinho } from '../context/CarrinhoContext';
import { adicionarEAlertar } from '../utils/cartActions';
import { useTema } from '../context/ThemeContext'; 

export default function DetalhesRestaurante({ route, navigation }) {
  const { tema, isDarkMode } = useTema();
  const { restaurante } = route.params;
  const { adicionarAoCarrinho } = useCarrinho();

  const prato = restaurante.itemCardapio;

  const handleAdicionarItem = () => {
    adicionarEAlertar({
      item: prato,
      quantidade: 1,
      adicionarAoCarrinho,
      navigation,
    });
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: tema.bg }]}
      showsVerticalScrollIndicator={false}>
      <View
        style={[
          styles.headerCard,
          { backgroundColor: tema.cardBg, borderColor: tema.borda },
        ]}>
        <View style={styles.titleRow}>
          <Text
            style={[styles.nomeRestaurante, { color: tema.textoPrincipal }]}>
            {restaurante.nome}
          </Text>
          <View
            style={[
              styles.tagNota,
              { backgroundColor: isDarkMode ? '#2c2514' : '#fdf6e2' },
            ]}>
            <Ionicons name="star" size={14} color="#f39c12" />
            <Text
              style={[
                styles.textoNota,
                { color: isDarkMode ? '#f39c12' : '#333' },
              ]}>
              {restaurante.nota}
            </Text>
          </View>
        </View>
        <Text style={[styles.tipoRestaurante, { color: tema.textoSecundario }]}>
          {restaurante.tipo}
        </Text>

        <View
          style={[
            styles.divider,
            { backgroundColor: isDarkMode ? '#2c2c2c' : '#eee' },
          ]}
        />

        <View style={styles.enderecoRow}>
          <Ionicons
            name="location-outline"
            size={18}
            color={tema.primaria}
            style={{ marginRight: 6 }}
          />
          <Text style={[styles.enderecoTexto, { color: tema.textoSecundario }]}>
            {restaurante.endereco}
          </Text>
        </View>
      </View>

      <Text style={[styles.secaoTitulo, { color: tema.textoPrincipal }]}>
        Destaque do Cardápio
      </Text>

      <View
        style={[
          styles.cardPrato,
          { backgroundColor: tema.cardBg, borderColor: tema.borda },
        ]}>
        <Image
          source={{ uri: prato.foto }}
          style={[
            styles.fotoPrato,
            { backgroundColor: isDarkMode ? '#2c2c2c' : '#eee' },
          ]}
        />

        <View style={styles.infoPrato}>
          <Text style={[styles.nomePrato, { color: tema.textoPrincipal }]}>
            {prato.nome}
          </Text>
          <Text style={[styles.descPrato, { color: tema.textoSecundario }]}>
            {prato.descricao}
          </Text>

          <View style={styles.footerPrato}>
            <Text style={[styles.precoPrato, { color: tema.primaria }]}>
              R$ {prato.preco.toFixed(2).replace('.', ',')}
            </Text>

            <TouchableOpacity
              style={[
                styles.botaoAdicionar,
                { backgroundColor: tema.primaria },
              ]}
              onPress={handleAdicionarItem}>
              <Ionicons name="add" size={20} color="#fff" />
              <Text style={styles.btnTexto}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },

  headerCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  nomeRestaurante: { fontSize: 20, fontWeight: 'bold', flex: 1 },
  tagNota: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  textoNota: { fontSize: 13, fontWeight: 'bold' },
  tipoRestaurante: { fontSize: 14, marginTop: 4 },

  divider: { height: 1, marginVertical: 12 },
  enderecoRow: { flexDirection: 'row', alignItems: 'center' },
  enderecoTexto: { fontSize: 13, flex: 1, lineHeight: 18 },

  secaoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    paddingLeft: 4,
  },

  cardPrato: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  fotoPrato: { width: '100%', height: 180 },
  infoPrato: { padding: 16 },
  nomePrato: { fontSize: 18, fontWeight: 'bold' },
  descPrato: {
    fontSize: 13,
    marginTop: 6,
    lineHeight: 18,
    minHeight: 40,
  },

  footerPrato: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  precoPrato: { fontSize: 18, fontWeight: 'bold' },
  botaoAdicionar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 4,
  },
  btnTexto: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
});
