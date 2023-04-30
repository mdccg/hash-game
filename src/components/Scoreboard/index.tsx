import { View } from 'react-native';
import PunctuationType from './../../types/PunctuationType';
import TilesetType from './../../types/TilesetType';
import CircleIcon from './../CircleIcon';
import CrossIcon from './../CrossIcon';
import { PunctuationWrapper, ScoardboardWrapper } from './styles';

type ScoreboardProps = {
  tileset: TilesetType;
  punctuations: PunctuationType[];
}

type PuntuationComponentProps = {
  punctuation: PunctuationType;
  tileset: TilesetType;
}

const PunctuationComponent = ({
  punctuation: {
    player,
    score
  }, tileset
}: PuntuationComponentProps) => {
  /**
   * TODO
   * Criar ícone do empate substituindo View
   */
  const IconComponent = player === 'X' ? CrossIcon : (player === 'O' ? CircleIcon : View);

  return (
    <PunctuationWrapper>
      <IconComponent size={16} tileset={tileset} />
    </PunctuationWrapper>
  );
}

const Scoreboard = ({ punctuations, tileset }: ScoreboardProps) => {
  return (
    <ScoardboardWrapper>
      {punctuations.map((punctuation) => <PunctuationComponent key={punctuation.player} punctuation={punctuation} tileset={tileset} />)}
    </ScoardboardWrapper>
  );
}

export default Scoreboard;