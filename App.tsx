import { Lato_400Regular } from '@expo-google-fonts/lato';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import { ThemeProvider } from 'styled-components';
import Board from './src/screens/Board';
import theme from './src/styles/theme';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({ Lato_400Regular });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView onLayout={onLayoutRootView}>
      <ThemeProvider theme={theme}>
        <StatusBar style="auto" />
        <Board />
      </ThemeProvider>
    </SafeAreaView>
  );
}