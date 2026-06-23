import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useCarrinho } from '../context/CarrinhoContext';
import Button from '../components/Button';
import { Ionicons } from '@expo/vector-icons';
import { useTema } from '../context/ThemeContext';

const AnimatedCartItem = ({ item, onRemove, alterarQuantidade }) => {
  const { tema, isDarkMode } = useTema();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const avisoOpacity = useRef(new Animated.Value(0)).current;

  const [estaAlerta, setEstaAlerta] = useState(false);
  const [mostrarAviso, setMostrarAviso] = useState(false);
  const timeoutRef = useRef(null);

  const lidarComCliqueCurto = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setMostrarAviso(true);

    Animated.timing(avisoOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    timeoutRef.current = setTimeout(() => {
      Animated.timing(avisoOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setMostrarAviso(false);
      });
    }, 2000);
  };

  const dispararExplosao = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setMostrarAviso(false);
    setEstaAlerta(true);

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1.4,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      onRemove(item.id);
    });
  };

  return (
    <View style={styles.itemWrapper}>
      <Animated.View
        style={[
          styles.cartCard,
          { backgroundColor: tema.cardBg, borderColor: tema.borda }, 
          estaAlerta && {
            backgroundColor: isDarkMode ? '#3a1c1c' : '#ffebee', 
            borderColor: isDarkMode ? '#e53935' : '#ffcdd2',
          },
          {
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}>
        <Image
          source={{ uri: item.img }}
          style={[
            styles.productImage,
            { backgroundColor: isDarkMode ? '#2c2c2c' : '#eee' },
          ]}
        />

        <View style={styles.productInfo}>
          <View style={styles.headerCardRow}>
            <Text
              style={[styles.productName, { color: tema.textoPrincipal }]}
              numberOfLines={1}>
              {item.name}
            </Text>

            <TouchableOpacity
              onPress={lidarComCliqueCurto}
              onLongPress={dispararExplosao}
              delayLongPress={400}
              activeOpacity={0.4}
              style={styles.trashArea}>
              <Ionicons
                name={estaAlerta ? 'flame' : 'trash-outline'}
                size={20}
                color={estaAlerta ? '#ff4444' : 'firebrick'}
              />
            </TouchableOpacity>
          </View>

          <Text style={[styles.productPrice, { color: tema.textoSecundario }]}>
            U: R$ {item.price.toFixed(2).replace('.', ',')}
          </Text>

          <View style={styles.actionsRow}>
            <View style={styles.counterContainer}>
              <TouchableOpacity
                style={[
                  styles.counterButton,
                  { backgroundColor: isDarkMode ? '#2c2c2c' : '#e3f2fd' },
                ]}
                onPress={() => alterarQuantidade(item.id, 'diminuir')}>
                <Text
                  style={[styles.counterButtonText, { color: tema.primaria }]}>
                  -
                </Text>
              </TouchableOpacity>

              <Text
                style={[styles.quantityText, { color: tema.textoPrincipal }]}>
                {item.quantidade}
              </Text>

              <TouchableOpacity
                style={[
                  styles.counterButton,
                  { backgroundColor: isDarkMode ? '#2c2c2c' : '#e3f2fd' },
                ]}
                onPress={() => alterarQuantidade(item.id, 'aumentar')}>
                <Text
                  style={[styles.counterButtonText, { color: tema.primaria }]}>
                  +
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.subtotalText, { color: tema.primaria }]}>
              R$ {(item.price * item.quantidade).toFixed(2).replace('.', ',')}
            </Text>
          </View>
        </View>
      </Animated.View>

      {mostrarAviso && (
        <Animated.View
          style={[styles.avisoContainer, { opacity: avisoOpacity }]}>
          <Ionicons
            name="information-circle-outline"
            size={14}
            color={isDarkMode ? '#ff6b6b' : 'firebrick'}
          />
          <Text
            style={[
              styles.avisoTexto,
              { color: isDarkMode ? '#ff6b6b' : 'firebrick' },
            ]}>
            Segure o ícone da lixeira para remover o item
          </Text>
        </Animated.View>
      )}
    </View>
  );
};

export default function Carrinho({ navigation }) {
  const { tema, isDarkMode } = useTema();
  const { itens, alterarQuantidade, removerDoCarrinho, valorTotal } =
    useCarrinho();

  if (itens.length === 0) {
    return (
      <View style={[styles.containerVazio, { backgroundColor: tema.cardBg }]}>
        <Ionicons
          name="cart-outline"
          size={80}
          color={isDarkMode ? '#444' : '#ccc'}
        />
        <Text style={[styles.textoVazio, { color: tema.textoSecundario }]}>
          Seu carrinho está vazio.
        </Text>
        <Button
          texto="Bora escolher um prato!"
          acao={() => navigation.navigate('Home')}
          estiloContainer={[
            styles.btnVoltar,
            { backgroundColor: tema.primaria },
          ]}
          estiloTexto={styles.btnVoltarText}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: tema.bg }]}>
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <AnimatedCartItem
            item={item}
            onRemove={removerDoCarrinho}
            alterarQuantidade={alterarQuantidade}
          />
        )}
      />

      <View style={[styles.footer, { backgroundColor: tema.cardBg }]}>
        <View style={styles.totalRow}>
          <Text style={[styles.totalLabel, { color: tema.textoSecundario }]}>
            Total do Pedido:
          </Text>
          <Text style={[styles.totalPrice, { color: tema.primaria }]}>
            R$ {valorTotal.toFixed(2).replace('.', ',')}
          </Text>
        </View>

        <Button
          texto="Finalizar Pedido"
          acao={() => navigation.navigate('Checkout')}
          estiloContainer={[
            styles.btnFinalizar,
            { backgroundColor: tema.primaria },
          ]}
          estiloTexto={styles.btnFinalizarText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  containerVazio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textoVazio: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 20,
    fontWeight: '500',
  },
  btnVoltar: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  btnVoltarText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },

  listContent: {
    padding: 15,
    marginTop: 50,
  },
  itemWrapper: {
    marginBottom: 12,
  },
  cartCard: {
    borderRadius: 16,
    flexDirection: 'row',
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1.5,
  },
  productImage: {
    width: 75,
    height: 75,
    borderRadius: 12,
  },
  productInfo: { flex: 1, marginLeft: 12, justifyContent: 'space-between' },
  headerCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: 15,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  trashArea: {
    padding: 6,
    borderRadius: 8,
  },
  productPrice: { fontSize: 13, marginTop: 2 },

  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  counterContainer: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  counterButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterButtonText: { fontSize: 16, fontWeight: 'bold' },
  quantityText: {
    fontSize: 15,
    fontWeight: 'bold',
    minWidth: 16,
    textAlign: 'center',
  },
  subtotalText: { fontSize: 16, fontWeight: 'bold' },

  avisoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
    marginLeft: 8,
  },
  avisoTexto: {
    fontSize: 12,
    fontWeight: '500',
  },

  footer: {
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: { fontSize: 16, fontWeight: '600' },
  totalPrice: { fontSize: 24, fontWeight: 'bold' },
  btnFinalizar: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnFinalizarText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
