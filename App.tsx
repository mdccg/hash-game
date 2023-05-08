import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { View } from 'react-native';
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ThemeProvider } from 'styled-components';
import MainStackNavigator from './src/routes/MainStackNavigator';
import theme from './src/styles/theme';
import { AppWrapper } from './styles';

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
      <AppWrapper onLayout={onLayoutRootView}>
        <NavigationContainer>
          <PaperProvider>
            <ThemeProvider theme={theme}>
              <StatusBar style="auto" />
              <View style={{ height: getStatusBarHeight() }} />
              <MainStackNavigator />
            </ThemeProvider>
          </PaperProvider>
        </NavigationContainer>
    </AppWrapper>
  );
}