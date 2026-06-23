import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTema } from '../context/ThemeContext';

const iconMap = {
  'fa-at': 'mail-outline',
  'fa-key': 'lock-closed-outline',
};

export default function TextField({
  label,
  type,
  placeholder,
  icon,
  value,
  onChangeText,
  erro,
}) {
  const [secureText, setSecureText] = useState(type === 'password');
  const { tema, isDarkMode } = useTema();

  const ionIcon = iconMap[icon] || 'ellipse-outline';
  const ehSenha = type === 'password';

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, { color: tema.textoPrincipal }]}>
        {label}
      </Text>

      <View
        style={[
          styles.container,
          {
            backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
            borderColor: isDarkMode ? tema.borda : '#e3f2fd',
          },
        ]}>
        <Ionicons
          name={ionIcon}
          size={18}
          color={isDarkMode ? tema.textoSecundario : '#2c3e50'}
          style={styles.icon}
        />

        <TextInput
          style={[styles.input, { color: tema.textoPrincipal }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder || label}
          placeholderTextColor={isDarkMode ? '#777' : '#999'}
          keyboardType={type === 'email' ? 'email-address' : 'default'}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={secureText}
        />

        {ehSenha && (
          <TouchableOpacity
            onPress={() => setSecureText(!secureText)}
            style={styles.eyeButton}
            activeOpacity={0.6}>
            <Ionicons
              name={secureText ? 'eye-outline' : 'eye-off-outline'}
              size={18}
              color={isDarkMode ? tema.textoSecundario : '#2c3e50'}
            />
          </TouchableOpacity>
        )}
      </View>

      {erro ? <Text style={styles.mensagemErro}>{erro}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
    width: '100%',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
    marginLeft: 2,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 12,
    height: 54,
  },
  icon: {
    paddingLeft: 16,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    paddingHorizontal: 10,
  },
  eyeButton: {
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  mensagemErro: {
    color: 'firebrick',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 2,
  },
});
