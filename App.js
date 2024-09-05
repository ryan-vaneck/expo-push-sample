import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import { applicationId } from 'expo-application';
import { useCallback, useEffect } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async (n) => {
    console.log('Notification received', n);
    return ({
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowAlert: true,
    })
  },
});

export const usePushNotifications = () => {

  const test = useCallback(
    async () => {
      try {
        const { status } = await Notifications.getPermissionsAsync();
        console.log({ status })
        if (status !== 'granted') {
          await Notifications.requestPermissionsAsync();
        }

        Notifications.setNotificationChannelAsync('default', {
          importance: Notifications.AndroidImportance.MAX,
          lightColor: '#FF231F7C',
          name: 'default',
          vibrationPattern: [0, 250, 250, 250],
        });

        const pushTokenString = await Notifications.getDevicePushTokenAsync();
        console.log(1, { pushTokenString })
      } catch (error) {
        console.log({ error })
      }
    },
    [],
  );

  useEffect(() => {
    test()
  }, [test])

};

export default function App() {
  usePushNotifications();
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
