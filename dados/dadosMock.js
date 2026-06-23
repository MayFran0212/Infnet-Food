export const acessosLiberados = [
  { email: 'emaillegal@email.com', senha: '12345@ab' },
  { email: 'teste@gmail.com', senha: 'abcd/589' },
  { email: 'admin@admin.com', senha: 'admin123' },
];

export const categorias = [
  {
    id: '1',
    emoji: '🍞',
    titulo: 'Pães',
    endpoint: 'breads',
    descricao: 'Pães quentinhos, artesanais e saídos do forno a toda hora.',
  },
  {
    id: '2',
    emoji: '🍔',
    titulo: 'Burguers',
    endpoint: 'burgers',
    descricao:
      'Hambúrgueres suculentos, artesanais e com muito queijo derretido.',
  },
  {
    id: '3',
    emoji: '🍫',
    titulo: 'Chocolates',
    endpoint: 'chocolates',
    descricao: 'Barras, trufas e bombons artesanais para adoçar o seu dia.',
  },
  {
    id: '4',
    emoji: '🍰',
    titulo: 'Sobremesas',
    endpoint: 'desserts',
    descricao: 'Bolos, tortas e doces incríveis que valem cada caloria.',
  },
  {
    id: '5',
    emoji: '🥤',
    titulo: 'Bebidas',
    endpoint: 'drinks',
    descricao: 'Refrigerantes, sucos naturais e bebidas trincando de geladas.',
  },
  {
    id: '6',
    emoji: '🍗',
    titulo: 'Frangos Fritos',
    endpoint: 'fried-chicken',
    descricao:
      'Porções de frango super crocantes por fora e suculentas por dentro.',
  },
  {
    id: '7',
    emoji: '🍨',
    titulo: 'Sorvetes',
    endpoint: 'ice-cream',
    descricao:
      'Sorvetes de massa, picolés e milkshakes artesanais bem refrescantes.',
  },
  {
    id: '8',
    emoji: '🍕',
    titulo: 'Pizzas',
    endpoint: 'pizzas',
    descricao: 'Pizzas com massa de fermentação lenta e recheios generosos.',
  },
  {
    id: '9',
    emoji: '🥓',
    titulo: 'Suínos',
    endpoint: 'porks',
    descricao:
      'Costelinhas ao molho barbecue, bacon crocante e cortes selecionados.',
  },
  {
    id: '10',
    emoji: '🥪',
    titulo: 'Sanduíches',
    endpoint: 'sandwiches',
    descricao:
      'Sanduíches naturais e tostados perfeitos para um lanche rápido.',
  },
  {
    id: '11',
    emoji: '🌭',
    titulo: 'Hot Dogs',
    endpoint: 'sausages',
    descricao:
      'Cachorros-quentes prensados e completos com tudo o que tem direito.',
  },
  {
    id: '12',
    emoji: '🥩',
    titulo: 'Steaks',
    endpoint: 'steaks',
    descricao:
      'Cortes de carne nobres, grelhados no ponto certo e muito macios.',
  },
  {
    id: '13',
    emoji: '🫕',
    titulo: 'Churrascos',
    endpoint: 'bbqs',
    descricao:
      'Espetinhos e carnes assadas na brasa com o verdadeiro sabor do churrasco.',
  },
];

export const produtosMock = {
  burgers: [
    {
      id: 'the-gramercy-tavern-burger',
      img: 'https://images.pexels.com/photos/30500756/pexels-photo-30500756.jpeg',
      name: 'Gramercy Tavern',
      dsc: 'O famoso burger com blend da casa, queijo cheddar artesanal e cebolas caramelizadas.',
      price: 49.9,
    },
    {
      id: 'shake-shack-shackburger',
      img: 'https://images.pexels.com/photos/13526737/pexels-photo-13526737.jpeg',
      name: 'ShackBurger Kit',
      dsc: 'Clássico cheeseburger com o molho secreto ShackSauce em pão de batata macio.',
      price: 39.9,
    },
  ],
  breads: [
    {
      id: 'artisan-bread-loaves',
      img: 'https://images.pexels.com/photos/13247700/pexels-photo-13247700.jpeg',
      name: 'Combo Pães Artesanais',
      dsc: 'Três unidades de pães de fermentação natural perfeitos para torrar.',
      price: 25.0,
    },
  ],
};

export const RESTAURANTES_CENTRO = [
  {
    id: '1',
    nome: 'Confeitaria Colombo',
    tipo: 'Cafeteria & Doces',
    nota: '4.8',
    lat: -22.9051,
    lon: -43.1762,
    endereco: 'R. do Ouvidor, 38 - Centro, Rio de Janeiro - RJ',
    itemCardapio: {
      idMenu: 'colombo-01',
      nome: 'Mil-Folhas Tradicional',
      descricao:
        'Massa folhada crocante intercalada com o legítimo creme de confeiteiro e açúcar de confeiteiro polvilhado.',
      preco: 18.9,
      foto: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=500&q=80',
    },
  },
  {
    id: '2',
    nome: 'Angu do Gomes',
    tipo: 'Brasileira / Boteco',
    nota: '4.5',
    lat: -22.8988,
    lon: -43.1804,
    endereco: 'Largo da Prainha, 17 - Centro, Rio de Janeiro - RJ',
    itemCardapio: {
      idMenu: 'gomes-01',
      nome: 'Angu Tradicional de Carne',
      descricao:
        'Polenta cremosa servida quente com farto molho de carne moída perfeitamente temperada e guarnecida de cheiro-verde.',
      preco: 28.0,
      foto: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80',
    },
  },
  {
    id: '3',
    nome: 'Fellini Centro',
    tipo: 'Self-Service Premium',
    nota: '4.4',
    lat: -22.9035,
    lon: -43.1791,
    endereco: 'R. da Alfândega, 25 - Centro, Rio de Janeiro - RJ',
    itemCardapio: {
      idMenu: 'fellini-01',
      nome: 'Filé de Salmão Grelhado',
      descricao:
        'Posta de salmão grelhada ao molho de alcaparras, servida com arroz integral e legumes no vapor.',
      preco: 45.0,
      foto: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=500&q=80',
    },
  },
  {
    id: '4',
    nome: 'Galeto Liceu',
    tipo: 'Grelhados e Carnes',
    nota: '4.6',
    lat: -22.9072,
    lon: -43.1755,
    endereco: 'R. Senador Dantas, 118 - Centro, Rio de Janeiro - RJ',
    itemCardapio: {
      idMenu: 'liceu-01',
      nome: 'Galeto Clássico na Brasa',
      descricao:
        'Galeto perfeitamente marinado em ervas finas, assado na brasa, servido com arroz de brócolis e batatas portuguesas.',
      preco: 39.9,
      foto: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=500&q=80',
    },
  },
  {
    id: '5',
    nome: 'Al-Farabi',
    tipo: 'Cultura & Gastronomia',
    nota: '4.7',
    lat: -22.9012,
    lon: -43.1812,
    endereco: 'R. do Rosário, 30 - Centro, Rio de Janeiro - RJ',
    itemCardapio: {
      idMenu: 'alfarabi-01',
      nome: 'Sanduíche de Pernil Crocante',
      descricao:
        'Pernil desfiado marinado na cerveja preta, queijo derretido e cebola caramelizada na bagete artesanal semi-italiana.',
      preco: 34.0,
      foto: 'https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?auto=format&fit=crop&w=500&q=80',
    },
  },
  {
    id: '6',
    nome: 'Rio Minho',
    tipo: 'Frutos do Mar',
    nota: '4.5',
    lat: -22.9023,
    lon: -43.1741,
    endereco: 'R. do Ouvidor, 10 - Centro, Rio de Janeiro - RJ',
    itemCardapio: {
      idMenu: 'riominho-01',
      nome: 'Risoto de Camarão Premium',
      descricao:
        'Arroz arbóreo cremoso com fartos camarões salteados no azeite de ervas, finalizado com queijo parmesão e raspas de limão siciliano.',
      preco: 58.0,
      foto: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80',
    },
  },
  {
    id: '7',
    nome: 'Santo Scenarium',
    tipo: 'Contemporânea',
    nota: '4.3',
    lat: -22.9095,
    lon: -43.1821,
    endereco: 'R. do Lavradio, 36 - Centro, Rio de Janeiro - RJ',
    itemCardapio: {
      idMenu: 'scenarium-01',
      nome: 'Medalhão de Mignon ao Molho Madeira',
      descricao:
        'Grelhado ao ponto do cliente, acompanhado de risoto de cogumelos frescos e batata rústica alecrim.',
      preco: 62.0,
      foto: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80',
    },
  },
  {
    id: '8',
    nome: 'Nova Capela',
    tipo: 'Tradicional Portuguesa',
    nota: '4.4',
    lat: -22.9123,
    lon: -43.1802,
    endereco: 'Av. Mem de Sá, 96 - Centro, Rio de Janeiro - RJ',
    itemCardapio: {
      idMenu: 'capela-01',
      nome: 'Bolinho de Bacalhau da Casa',
      descricao:
        'Porção com 6 unidades douradas por fora e super cremosas por dentro, feitas com o legítimo bacalhau Gadus Morhua.',
      preco: 29.9,
      foto: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=500&q=80',
    },
  },
  {
    id: '9',
    nome: 'Beco do Rato',
    tipo: 'Samba & Petiscos',
    nota: '4.6',
    lat: -22.9134,
    lon: -43.1845,
    endereco: 'R. Joaquim Silva, 11 - Centro, Rio de Janeiro - RJ',
    itemCardapio: {
      idMenu: 'beco-01',
      nome: 'Tábua de Petiscos do Beco',
      descricao:
        'Combinação perfeita de calabresa acebolada, batata frita crocante, cubos de queijo coalho grelhado e molho barbecue.',
      preco: 46.5,
      foto: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=500&q=80',
    },
  },
  {
    id: '10',
    nome: 'Gourmet Centro',
    tipo: 'Pratos Executivos',
    nota: '4.1',
    lat: -22.9064,
    lon: -43.1786,
    endereco: 'R. da Assembléia, 51 - Centro, Rio de Janeiro - RJ',
    itemCardapio: {
      idMenu: 'gourmet-01',
      nome: 'Strogonoff de Frango Especial',
      descricao:
        'Tiras de frango macias em molho cremoso com cogumelos caseiros, servido com arroz branco soltinho e batata palha extra fina.',
      preco: 26.9,
      foto: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=500&q=80',
    },
  },
];
