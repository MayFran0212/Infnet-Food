import { Alert } from 'react-native';

export const adicionarEAlertar = ({ item, quantidade, adicionarAoCarrinho, navigation }) => {
  const produtoFormatado = {
    id: item.idMenu || item.id,
    name: item.nome || item.name,
    price: item.preco || item.price,
    img: item.foto || item.img,
  };

  adicionarAoCarrinho(produtoFormatado, quantidade);

  Alert.alert(
    "Adicionado com sucesso!",
    `${quantidade}x ${produtoFormatado.name} no seu carrinho.`,
    [
      { 
        text: "Ver Carrinho", 
        onPress: () => {
          navigation.navigate('Main', { screen: 'AbaCarrinho' });
        } 
      },
      { 
        text: "Continuar Comprando", 
        onPress: () => navigation.navigate('Main', { screen: 'Inicio' }) 
      }
    ]
  );
};