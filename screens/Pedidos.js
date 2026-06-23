import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTema } from '../context/ThemeContext';

const HISTORICO_PEDIDOS = [
  {
    id: '1024',
    data: 'Hoje, 21:30',
    total: 54.9,
    status: 'Na cozinha',
    statusCor: '#f39c12',
    itens: '1x Burger Suprema, 1x Batata Frita',
  },
  {
    id: '0985',
    data: 'Ontem, 19:15',
    total: 32.0,
    status: 'Entregue',
    statusCor: '#27ae60',
    itens: '2x Combo Esfiha Clássica, 1x Suco de Laranja',
  },
  {
    id: '0841',
    data: '15 Jun 2026, 13:02',
    total: 45.5,
    status: 'Entregue',
    statusCor: '#27ae60',
    itens: '1x Parmegiana de Frango Executivo',
  },
];

export default function Pedidos() {
  const { tema, isDarkMode } = useTema();

  return (
    <View style={[styles.container, { backgroundColor: tema.bg }]}>
      <FlatList
        data={HISTORICO_PEDIDOS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.containerVazio}>
            <Ionicons
              name="document-text-outline"
              size={60}
              color={isDarkMode ? '#444' : '#ccc'}
            />
            <Text style={[styles.textoVazio, { color: tema.textoSecundario }]}>
              Você ainda não fez nenhum pedido.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.cardPedido,
              { backgroundColor: tema.cardBg, borderColor: tema.borda },
            ]}>
            <View style={styles.headerRow}>
              <Text
                style={[styles.numeroPedido, { color: tema.textoPrincipal }]}>
                Pedido #{item.id}
              </Text>
              <Text
                style={[styles.dataPedido, { color: tema.textoSecundario }]}>
                {item.data}
              </Text>
            </View>

            <Text
              style={[styles.itensPedido, { color: tema.textoSecundario }]}
              numberOfLines={2}>
              {item.itens}
            </Text>

            <View
              style={[
                styles.divider,
                { backgroundColor: isDarkMode ? '#2c2c2c' : '#eee' },
              ]}
            />

            <View style={styles.footerRow}>
              <View style={styles.statusContainer}>
                <View
                  style={[
                    styles.statusBolinha,
                    { backgroundColor: item.statusCor },
                  ]}
                />
                <Text style={[styles.statusTexto, { color: item.statusCor }]}>
                  {item.status}
                </Text>
              </View>

              <Text
                style={[styles.totalPedido, { color: tema.textoPrincipal }]}>
                R$ {item.total.toFixed(2).replace('.', ',')}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContent: {
    padding: 15,
    paddingTop: 50,
  },
  containerVazio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  textoVazio: {
    fontSize: 16,
    marginTop: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  cardPedido: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  numeroPedido: { fontSize: 16, fontWeight: 'bold' },
  dataPedido: { fontSize: 13 },
  itensPedido: { fontSize: 14, marginBottom: 12, lineHeight: 20 },
  divider: { height: 1, marginBottom: 12 },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusContainer: { flexDirection: 'row', alignItems: 'center' },
  statusBolinha: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  statusTexto: { fontSize: 14, fontWeight: '600' },
  totalPedido: { fontSize: 16, fontWeight: 'bold' },
});
