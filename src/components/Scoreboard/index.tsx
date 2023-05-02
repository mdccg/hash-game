import { StyleProp, ViewStyle } from 'react-native';
import PunctuationType from './../../types/PunctuationType';
import TilesetType from './../../types/TilesetType';
import { PunctuationWrapper, ScoardboardWrapper, ScoreNumber, ScoreNumberArea } from './styles';
import { getIconComponent } from './../../utils/react_utils';
import MatchResultType from './../../types/MatchResultType';
import theme from './../../styles/theme';

type ScoreboardProps = {
  tileset: TilesetType;
  punctuations: PunctuationType[];
  isFirstPlayerTurn: boolean;
}

type PuntuationComponentProps = {
  punctuation: PunctuationType;
  tileset: TilesetType;
  turn: MatchResultType;
  style: StyleProp<ViewStyle>;
}

const PunctuationComponent = ({
  punctuation: {
    matchResult,
    score
  },
  tileset,
  turn,
  style
}: PuntuationComponentProps) => {
  const IconComponent = getIconComponent(matchResult);
  const customBorderBottomColor = turn === matchResult ? theme.colors.boardBorder : 'white';

  return (
    <PunctuationWrapper style={[style, { borderBottomColor: customBorderBottomColor }]}>
      <IconComponent size={16} tileset={tileset} />
      <ScoreNumberArea>
        <ScoreNumber>{score === 0 ? '-' : score}</ScoreNumber>
      </ScoreNumberArea>
    </PunctuationWrapper>
  );
}

const Scoreboard = ({ punctuations, tileset, isFirstPlayerTurn }: ScoreboardProps) => {
  return (
    <ScoardboardWrapper>
      {punctuations.map((punctuation, index) => (
        <PunctuationComponent
          key={punctuation.matchResult}
          punctuation={punctuation}
          tileset={tileset}
          turn={isFirstPlayerTurn ? 'X' : 'O'}
          style={{ marginRight: index !== 2 ? 16 : 0 }} />
      ))}
    </ScoardboardWrapper>
  );
}

export default Scoreboard;