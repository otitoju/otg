/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from 'react-native-toast-notifications';
import MainNavigator from './src/Navigations/MainNavigation';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
// import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

type SectionProps = PropsWithChildren<{
  title: string;
}>;



function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      if (state.isConnected === false) {
        Alert.alert("No Internet!", "Please check and reconnect.")
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <GestureHandlerRootView>
        <SafeAreaProvider>
          <ToastProvider
            offset={70}
            renderType={{
              custom_type: toast => (
                <View style={{ padding: 15, backgroundColor: 'white' }}>
                  <Text>{toast.message}</Text>
                </View>
              ),
            }}>
            <StatusBar backgroundColor='transparent' barStyle='dark-content' translucent />
            <View style={{ flex: 1, }}>
              <MainNavigator />

            </View>
          </ToastProvider>

        </SafeAreaProvider>
      {/* </BottomSheetModalProvider> */}
    </GestureHandlerRootView>

  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
