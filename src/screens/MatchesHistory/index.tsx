import { FlatList } from 'react-native';
import { RootStackParamList } from '../../routes/MainStackNavigator';
import { MatchesHistoryWrapper, Separator } from './styles';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import MatchCard from '../../components/MatchCard';

type MatchesHistoryProps = NativeStackScreenProps<RootStackParamList, 'MatchesHistory'>;

const MatchesHistory = ({
  navigation: { goBack },
  route: { params: {
    previousMatches,
    tileset
  } }
}: MatchesHistoryProps) => {
  if (!previousMatches) {
    goBack();
  }

  return (
    <MatchesHistoryWrapper>
      <FlatList
        data={previousMatches}
        renderItem={({ item }) => <MatchCard match={item} tileset={tileset} />}
        ItemSeparatorComponent={Separator} />
    </MatchesHistoryWrapper>
  );
}

export default MatchesHistory;