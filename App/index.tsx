import { Lato_400Regular } from '@expo-google-fonts/lato';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import Board from '../src/components/Board';
import theme from './../src/styles/theme';
import { AppWrapper } from './styles';
import { View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

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
    <AppWrapper onLayout={onLayoutRootView}>
      <ThemeProvider theme={theme}>
        <StatusBar style="auto" />
        <View style={{ height: getStatusBarHeight() }} />
        <Board />
      </ThemeProvider>
    </AppWrapper>
  );
}