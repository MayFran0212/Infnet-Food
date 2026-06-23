import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { RESTAURANTES_CENTRO } from '../dados/dadosMock';
import { useTema } from '../context/ThemeContext';

export default function Map() {
  const { tema, isDarkMode } = useTema();
  const centroLat = -22.9064;
  const centroLon = -43.1786;

  const mapFilter = isDarkMode
    ? `filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);`
    : '';

  const htmlLeaflet = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        body { margin: 0; padding: 0; background-color: ${tema.cardBg}; }
        #map { height: 100vh; width: 100vw; }
        .leaflet-tile-container { ${mapFilter} }
        .leaflet-popup-content-wrapper { background: ${tema.cardBg}; color: ${
    tema.textoPrincipal
  }; }
        .leaflet-popup-tip { background: ${tema.cardBg}; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        var map = L.map('map', { zoomControl: false }).setView([${centroLat}, ${centroLon}], 14);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);
   
        const restaurantes = ${JSON.stringify(RESTAURANTES_CENTRO)};
        restaurantes.forEach(res => {
          L.marker([res.lat, res.lon])
            .addTo(map)
            .bindPopup("<b>" + res.nome + "</b><br>" + res.tipo);
        });
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <Text style={[styles.subtituloSection, { color: tema.textoSecundario }]}>
        Restaurantes perto de você (Centro-RJ)
      </Text>

      <View
        style={[
          styles.mapWrapper,
          { backgroundColor: isDarkMode ? '#2c2c2c' : '#e0e0e0' },
        ]}>
        <WebView
          originWhitelist={['*']}
          source={{ html: htmlLeaflet }}
          style={styles.mapView}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 12 },
  subtituloSection: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  mapWrapper: {
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    marginBottom: 4,
  },
  mapView: { flex: 1 },
});
