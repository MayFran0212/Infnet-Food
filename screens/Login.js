import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import TextField from '../components/TextField';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { useTema } from '../context/ThemeContext'; 

export default function Login({ navigation }) {
  const { tema, isDarkMode } = useTema(); 
  const { realizarLogin } = useAuth();
  const [emailDigitado, setEmailDigitado] = useState('');
  const [senhaDigitada, setSenhaDigitada] = useState('');
  const [mensagemErro, setMensagemErro] = useState({
    email: '',
    senha: '',
  });

  const handleLogin = () => {
    const novoErro = { senha: '', email: '' };
    const emailLimpo = emailDigitado.trim();

    if (!emailLimpo) {
      novoErro.email = 'O e-mail é obrigatório!';
    } else if (!/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(emailLimpo)) {
      novoErro.email = 'O e-mail não é válido!';
    }
    if (!senhaDigitada) {
      novoErro.senha = 'A senha é obrigatória!';
    } else if (senhaDigitada.length < 8) {
      novoErro.senha = 'A senha precisa ter, ao menos, 8 dígitos!';
    }
    if (novoErro.email || novoErro.senha) {
      setMensagemErro(novoErro);
      return;
    }

    const logadoComSucesso = realizarLogin(emailLimpo, senhaDigitada);

    if (logadoComSucesso) {
      setMensagemErro({ email: '', senha: '' });
      setEmailDigitado('');
      setSenhaDigitada('');
    } else {
      setMensagemErro({
        email: 'E-mail ou senha inválidos.',
        senha: 'E-mail ou senha inválidos.',
      });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: tema.bg }]} 
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={true}>
      <View style={styles.logoArea}>
        <View
          style={[
            styles.logoCircle,
            { backgroundColor: isDarkMode ? '#2c2c2c' : '#e3f2fd' },
          ]}>
          <Text style={styles.logoEmoji}>🍽️</Text>
        </View>
        <Text style={[styles.logoTitulo, { color: tema.primaria }]}>
          Infnet Food
        </Text>
      </View>

      <View
        style={[
          styles.card,
          { backgroundColor: tema.cardBg, borderColor: tema.borda },
        ]}>
        <Text style={[styles.cardTitulo, { color: tema.textoPrincipal }]}>
          Login
        </Text>

        <TextField
          label="E-mail"
          type="email"
          icon="fa-at"
          placeholder="seuemail@gmail.com"
          value={emailDigitado}
          onChangeText={setEmailDigitado}
          erro={mensagemErro.email}
        />

        <TextField
          label="Senha"
          type="password"
          icon="fa-key"
          placeholder="sua senha"
          value={senhaDigitada}
          onChangeText={setSenhaDigitada}
          erro={mensagemErro.senha}
        />

        <Button
          texto="Entrar"
          acao={handleLogin}
          estiloContainer={[styles.botao, { backgroundColor: tema.primaria }]}
          estiloTexto={styles.botaoText}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
    gap: 24,
  },
  logoArea: {
    alignItems: 'center',
    gap: 4,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  logoEmoji: { fontSize: 36 },
  logoTitulo: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  card: {
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 40,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  botao: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  botaoText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
});
