import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import { applicationId } from 'expo-application';
import { useCallback, useEffect } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    console.log('Notification received');
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

      const { status } = await Notifications.getPermissionsAsync();
      console.log({ status })
      if (status !== 'granted') {
        await Notifications.requestPermissionsAsync();
      }
      const pushTokenString = await Notifications.getDevicePushTokenAsync();
      console.log({ pushTokenString })
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
