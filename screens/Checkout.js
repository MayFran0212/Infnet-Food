import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator, 
} from 'react-native';
import { useCarrinho } from '../context/CarrinhoContext';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import { useTema } from '../context/ThemeContext';

const METODOS_PAGAMENTO = [
  { id: 'cartao', label: 'Cartão de Crédito/Débito', icone: 'card-outline' },
  { id: 'pix', label: 'Pix (Aprovação Imediata)', icone: 'qr-code-outline' },
  { id: 'dinheiro', label: 'Dinheiro na Entrega', icone: 'cash-outline' },
];

export default function Checkout({ navigation }) {
  const { tema, isDarkMode } = useTema();
  const { itens, valorTotal, limparCarrinho } = useCarrinho();

  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');

  const [carregandoCep, setCarregandoCep] = useState(false);

  const [metodoSelecionado, setMetodoSelecionado] = useState('cartao');

  const buscarCep = async (valorCep) => {
    const cepLimpo = valorCep.replace(/\D/g, '');
    setCep(cepLimpo);

    if (cepLimpo.length === 8) {
      setCarregandoCep(true);
      try {
        const resposta = await fetch(
          `https://viacep.com.br/ws/${cepLimpo}/json/`
        );
        const dados = await resposta.json();

        if (dados.erro) {
          Alert.alert(
            'Erro',
            'CEP não encontrado. Por favor, digite manualmente.'
          );
          setCarregandoCep(false);
          return;
        }

        setRua(dados.logradouro || '');
        bairro || setBairro(dados.bairro || ''); 
        setCidade(`${dados.localidade} / ${dados.uf}`);
      } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
        Alert.alert(
          'Erro de Conexão',
          'Não foi possível buscar o CEP automaticamente.'
        );
      } finally {
        setCarregandoCep(false);
      }
    }
  };

  const handleFinalizarPedido = () => {
    if (
      !cep.trim() ||
      !rua.trim() ||
      !numero.trim() ||
      !bairro.trim() ||
      !cidade.trim()
    ) {
      Alert.alert(
        'Ops!',
        'Por favor, preencha todos os campos do endereço de entrega.'
      );
      return;
    }

    if (!metodoSelecionado) {
      Alert.alert('Ops!', 'Por favor, selecione uma forma de pagamento.');
      return;
    }
    limparCarrinho();
    navigation.navigate('SucessoPedido');
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: tema.bg }]}
      showsVerticalScrollIndicator={false}>
      <View
        style={[
          styles.sectionCard,
          { backgroundColor: tema.cardBg, borderColor: tema.borda },
        ]}>
        <View style={styles.sectionHeader}>
          <Ionicons name="basket-outline" size={20} color={tema.primaria} />
          <Text style={[styles.sectionTitle, { color: tema.textoPrincipal }]}>
            Revisar Itens
          </Text>
        </View>

        {itens.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <Text style={[styles.itemQuantidade, { color: tema.primaria }]}>
              {item.quantidade}x
            </Text>
            <Text
              style={[styles.itemNome, { color: tema.textoPrincipal }]}
              numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={[styles.itemPreco, { color: tema.textoPrincipal }]}>
              R$ {(item.price * item.quantidade).toFixed(2).replace('.', ',')}
            </Text>
          </View>
        ))}

        <View
          style={[
            styles.divider,
            { backgroundColor: isDarkMode ? '#2c2c2c' : '#eee' },
          ]}
        />

        <View style={styles.totalRow}>
          <Text style={[styles.totalLabel, { color: tema.textoSecundario }]}>
            Total Geral:
          </Text>
          <Text style={[styles.totalValue, { color: tema.primaria }]}>
            R$ {valorTotal.toFixed(2).replace('.', ',')}
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.sectionCard,
          { backgroundColor: tema.cardBg, borderColor: tema.borda },
        ]}>
        <View style={styles.sectionHeader}>
          <Ionicons name="location-outline" size={20} color={tema.primaria} />
          <Text style={[styles.sectionTitle, { color: tema.textoPrincipal }]}>
            Endereço de Entrega
          </Text>
        </View>

        <View style={styles.inputCepContainer}>
          <TextInput
            style={[
              styles.input,
              {
                flex: 1,
                marginBottom: 0,
                backgroundColor: tema.inputBg,
                color: tema.textoPrincipal,
                borderColor: isDarkMode ? '#2c2c2c' : '#e0e0e0',
              },
            ]}
            placeholder="Digite o CEP (Ex: 01001000) *"
            maxLength={8}
            keyboardType="numeric"
            value={cep}
            onChangeText={buscarCep}
            placeholderTextColor={isDarkMode ? '#666' : '#999'}
          />
          {carregandoCep && (
            <ActivityIndicator
              size="small"
              color={tema.primaria}
              style={styles.loadingInput}
            />
          )}
        </View>

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: tema.inputBg,
              color: tema.textoPrincipal,
              borderColor: isDarkMode ? '#2c2c2c' : '#e0e0e0',
            },
          ]}
          placeholder="Rua / Avenida *"
          value={rua}
          onChangeText={setRua}
          placeholderTextColor={isDarkMode ? '#666' : '#999'}
        />

        <View style={styles.inputRow}>
          <TextInput
            style={[
              styles.input,
              {
                flex: 1,
                marginRight: 10,
                backgroundColor: tema.inputBg,
                color: tema.textoPrincipal,
                borderColor: isDarkMode ? '#2c2c2c' : '#e0e0e0',
              },
            ]}
            placeholder="Número *"
            keyboardType="numeric"
            value={numero}
            onChangeText={setNumero}
            placeholderTextColor={isDarkMode ? '#666' : '#999'}
          />
          <TextInput
            style={[
              styles.input,
              {
                flex: 2,
                backgroundColor: tema.inputBg,
                color: tema.textoPrincipal,
                borderColor: isDarkMode ? '#2c2c2c' : '#e0e0e0',
              },
            ]}
            placeholder="Bairro *"
            value={bairro}
            onChangeText={setBairro}
            placeholderTextColor={isDarkMode ? '#666' : '#999'}
          />
        </View>

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: tema.inputBg,
              color: tema.textoPrincipal,
              borderColor: isDarkMode ? '#2c2c2c' : '#e0e0e0',
            },
          ]}
          placeholder="Cidade / UF *"
          value={cidade}
          onChangeText={setCidade}
          placeholderTextColor={isDarkMode ? '#666' : '#999'}
        />
      </View>

      <View
        style={[
          styles.sectionCard,
          { backgroundColor: tema.cardBg, borderColor: tema.borda },
        ]}>
        <View style={styles.sectionHeader}>
          <Ionicons name="cash-outline" size={20} color={tema.primaria} />
          <Text style={[styles.sectionTitle, { color: tema.textoPrincipal }]}>
            Forma de Pagamento
          </Text>
        </View>

        {METODOS_PAGAMENTO.map((metodo) => {
          const selecionado = metodoSelecionado === metodo.id;
          return (
            <TouchableOpacity
              key={metodo.id}
              style={[
                styles.metodoBotao,
                {
                  backgroundColor: isDarkMode ? '#1a1a1a' : '#f9f9f9',
                  borderColor: isDarkMode ? '#2c2c2c' : '#eaeaea',
                },
                selecionado && {
                  borderColor: tema.primaria,
                  backgroundColor: isDarkMode ? '#162a3a' : '#f0f7fc',
                },
              ]}
              onPress={() => setMetodoSelecionado(metodo.id)}
              activeOpacity={0.7}>
              <View style={styles.metodoInfo}>
                <Ionicons
                  name={metodo.icone}
                  size={20}
                  color={
                    selecionado ? tema.primaria : isDarkMode ? '#888' : '#666'
                  }
                  style={{ marginRight: 10 }}
                />
                <Text
                  style={[
                    styles.metodoLabel,
                    { color: isDarkMode ? '#aaa' : '#555' },
                    selecionado && { color: tema.primaria, fontWeight: 'bold' },
                  ]}>
                  {metodo.label}
                </Text>
              </View>
              <Ionicons
                name={selecionado ? 'radio-button-on' : 'radio-button-off'}
                size={20}
                color={
                  selecionado ? tema.primaria : isDarkMode ? '#444' : '#ccc'
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>

      <Button
        texto="Concluir e Enviar Pedido"
        acao={handleFinalizarPedido}
        estiloContainer={[
          styles.btnFinalizar,
          { backgroundColor: tema.primaria },
        ]}
        estiloTexto={styles.btnFinalizarText}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  sectionCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 4,
  },
  sectionTitle: { fontSize: 16, fontWeight: 'bold' },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemQuantidade: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
  },
  itemNome: { fontSize: 14, flex: 1 },
  itemPreco: { fontSize: 14, fontWeight: '500' },
  divider: { height: 1, marginVertical: 12 },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: { fontSize: 15, fontWeight: 'bold' },
  totalValue: { fontSize: 18, fontWeight: 'bold' },

  inputCepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 10,
  },
  loadingInput: {
    position: 'absolute',
    right: 12,
  },

  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 10,
  },
  inputRow: { flexDirection: 'row', justifyContent: 'space-between' },
  metodoBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  metodoInfo: { flexDirection: 'row', alignItems: 'center' },
  metodoLabel: { fontSize: 14 },
  btnFinalizar: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
    elevation: 3,
  },
  btnFinalizarText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
