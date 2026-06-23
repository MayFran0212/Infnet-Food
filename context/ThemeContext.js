import React, { createContext, useState, useContext } from 'react';

const temas = {
  claro: {
    dark: false,
    bg: '#f5f5f5',               
    cardBg: '#ffffff',          
    textoPrincipal: '#2c3e50',  
    textoSecundario: '#777777',  
    primaria: '#286ba1',        
    borda: '#e3f2fd',            
    inputBg: '#ffffff',          
  },
  escuro: {
    dark: true,
    bg: '#121212',               
    cardBg: '#1e1e1e',           
    textoPrincipal: '#f5f6fa',   
    textoSecundario: '#a0a0a0', 
    primaria: '#4ba3e3',         
    borda: '#2c2c2c',            
    inputBg: '#252525',          
  }
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const tema = isDarkMode ? temas.escuro : temas.claro;

  const toggleTema = () => {
    setIsDarkMode((antigo) => !antigo);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTema, tema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTema() {
  return useContext(ThemeContext);
}