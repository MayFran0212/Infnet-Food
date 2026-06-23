import { TouchableOpacity, Text } from "react-native";

export default function Button({ acao, texto, estiloContainer, estiloTexto }){
  return(
    <TouchableOpacity onPress={acao} style={estiloContainer} activeOpacity={0.8}>
      <Text style={estiloTexto}>{texto}</Text>
    </TouchableOpacity>
  );
}