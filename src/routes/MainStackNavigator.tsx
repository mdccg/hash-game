import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack';
import MainScreen from './../screens/Main';
import MatchesHistoryScreen from './../screens/MatchesHistory';
import MatchType from './../types/MatchType';

type RootStackParamList = {
  Main: undefined;
  MatchesHistory: {
    previousMatches: MatchType[];
  };
}

const Stack = createStackNavigator<RootStackParamList>();
const screenOptions: StackNavigationOptions = {
  header: () => <></>
};

const MainStackNavigator = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name="Main" component={MainScreen} />
    <Stack.Screen name="MatchesHistory" component={MatchesHistoryScreen} />
  </Stack.Navigator>
);

export default MainStackNavigator;