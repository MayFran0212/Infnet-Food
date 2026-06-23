import React, { createContext, useState, useContext } from 'react';

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState([]);

  const adicionarAoCarrinho = (produto, quantidade) => {
    setItens((itensAtuais) => {
      const itemExiste = itensAtuais.find((item) => item.id === produto.id);
      
      if (itemExiste) {
        return itensAtuais.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item
        );
      }
      return [...itensAtuais, { ...produto, quantidade }];
    });
  };

  const alterarQuantidade = (id, acao) => {
    setItens((itensAtuais) =>
      itensAtuais
        .map((item) => {
          if (item.id === id) {
            const novaQtd =
              acao === 'aumentar' ? item.quantidade + 1 : item.quantidade - 1;
            return { ...item, quantidade: novaQtd };
          }
          return item;
        })
        .filter((item) => item.quantidade > 0)
    );
  };

  const removerDoCarrinho = (id) => {
    setItens((itensAtuais) => itensAtuais.filter((item) => item.id !== id));
  };

  const limparCarrinho = () => setItens([]);

  const valorTotal = itens.reduce(
    (total, item) => total + item.price * item.quantidade,
    0
  );
  const quantidadeTotal = itens.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        adicionarAoCarrinho,
        alterarQuantidade,
        removerDoCarrinho,
        limparCarrinho,
        valorTotal,
        quantidadeTotal,
      }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  return useContext(CarrinhoContext);
}
