import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Button from '../components/Button';
import { useCarrinho } from '../context/CarrinhoContext';
import { adicionarEAlertar } from '../utils/cartActions';
import { useTema } from '../context/ThemeContext'; 

export default function Detalhes({ route, navigation }) {
  const { tema, isDarkMode } = useTema(); 
  const { produto } = route.params;
  const [quantidade, setQuantidade] = useState(1);

  const { adicionarAoCarrinho } = useCarrinho();

  const aumentarQtd = () => setQuantidade((prev) => prev + 1);
  const disminuirQtd = () => {
    if (quantidade > 1) setQuantidade((prev) => prev - 1);
  };

  const handleAdicionarAoCarrinho = () => {
    adicionarEAlertar({
      item: produto,
      quantidade,
      adicionarAoCarrinho,
      navigation,
    });
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: tema.cardBg }]}
      contentContainerStyle={styles.content}>
      <Image
        source={{ uri: produto.img }}
        style={[
          styles.image,
          { backgroundColor: isDarkMode ? '#2c2c2c' : '#eee' },
        ]}
      />

      <View style={styles.infoContainer}>
        <Text style={[styles.title, { color: tema.textoPrincipal }]}>
          {produto.name}
        </Text>

        <Text style={[styles.price, { color: tema.primaria }]}>
          R$ {produto.price.toFixed(2).replace('.', ',')}
        </Text>

        <Text style={[styles.description, { color: tema.textoSecundario }]}>
          {produto.dsc}
        </Text>

        <View
          style={[
            styles.quantitySection,
            { borderColor: isDarkMode ? '#2c2c2c' : '#eee' },
          ]}>
          <Text style={[styles.quantityLabel, { color: tema.textoPrincipal }]}>
            Quantidade:
          </Text>

          <View style={styles.counterContainer}>
            <Button
              texto="-"
              acao={disminuirQtd}
              estiloContainer={[
                styles.counterButton,
                { backgroundColor: isDarkMode ? '#2c2c2c' : '#e3f2fd' },
              ]}
              estiloTexto={[styles.counterButtonText, { color: tema.primaria }]}
            />

            <Text style={[styles.quantityText, { color: tema.textoPrincipal }]}>
              {quantidade}
            </Text>

            <Button
              texto="+"
              acao={aumentarQtd}
              estiloContainer={[
                styles.counterButton,
                { backgroundColor: isDarkMode ? '#2c2c2c' : '#e3f2fd' },
              ]}
              estiloTexto={[styles.counterButtonText, { color: tema.primaria }]}
            />
          </View>
        </View>

        <Button
          texto={`Adicionar por R$ ${(produto.price * quantidade)
            .toFixed(2)
            .replace('.', ',')}`}
          acao={handleAdicionarAoCarrinho}
          estiloContainer={[
            styles.btnCarrinho,
            { backgroundColor: tema.primaria },
          ]}
          estiloTexto={styles.btnCarrinhoText}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingBottom: 30 },
  image: { width: '100%', height: 260 },
  infoContainer: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  price: {
    fontSize: 22,
    fontWeight: '700',
    marginVertical: 8,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },

  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 16,
    marginBottom: 24,
  },
  quantityLabel: { fontSize: 16, fontWeight: '600' },
  counterContainer: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  counterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterButtonText: { fontSize: 20, fontWeight: 'bold' },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    minWidth: 20,
    textAlign: 'center',
  },

  btnCarrinho: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
  },
  btnCarrinhoText: { color: '#ffffff', fontWeight: '700', fontSize: 16 },
});
