import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ThemeProvider } from 'styled-components';
import Main from './../src/screens/Main';
import theme from './../src/styles/theme';
import { AppWrapper } from './styles';
import { Provider as PaperProvider } from 'react-native-paper';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({ Lato_400Regular, Lato_700Bold });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider>
      <AppWrapper onLayout={onLayoutRootView}>
        <ThemeProvider theme={theme}>
          <StatusBar style="auto" />
          <View style={{ height: getStatusBarHeight() }} />
          <Main />
        </ThemeProvider>
      </AppWrapper>
    </PaperProvider>
  );
}