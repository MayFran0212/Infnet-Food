import { StyleSheet, Text, ScrollView } from 'react-native';
import CardHighlight from '../components/CardHighlight';
import CardCategory from '../components/CardCategory';
import Map from '../components/Map';
import CarrosselRestaurantes from '../components/CarrosselRestaurantes';
import { useTema } from '../context/ThemeContext'; 

export default function Home({ navigation }) {
  const { tema } = useTema(); 

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: tema.bg }]} 
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      <Text style={[styles.titulo, { color: tema.textoPrincipal }]}>
        Bem-vindo ao Infnet Food!
      </Text>

      <CardHighlight />
      <Map />
      <CarrosselRestaurantes navigation={navigation} />
      <CardCategory navigation={navigation} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});
