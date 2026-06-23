import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function registrarParaNotificacoesLocais() {
  const { status: statusExistente } = await Notifications.getPermissionsAsync();
  let statusFinal = statusExistente;

  if (statusExistente !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    statusFinal = status;
  }

  if (statusFinal !== 'granted') {
    console.log('Permissão de notificação negada!');
    return false;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Canal Padrão',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#286ba1',
    });
  }

  return true;
}

export async function dispararNotificacaoStatus(titulo, corpo, segundos = 1) {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: titulo,
        body: corpo,
        sound: true,
        android: {
          channelId: 'default',
        }
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: segundos,
      },
    });
  } catch (error) {
    console.log("Erro ao agendar via Expo, aplicando fallback com setTimeout:", error);
    
    setTimeout(async () => {
      await Notifications.presentNotificationAsync({
        title: titulo,
        body: corpo,
      });
    }, segundos * 1000);
  }
}