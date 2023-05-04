import MatchResultType from './../../types/MatchResultType';
import TilesetType from './../../types/TilesetType';
import { getIconComponent } from './../../utils/react_utils';
import { VictoryMessage, VictoryPanelWrapper } from './styles';
import theme from './../../styles/theme';

type VictoryPanelProps = {
  tileset: TilesetType;
  currentWinner: MatchResultType;
}

const VictoryPanel = ({ tileset, currentWinner }: VictoryPanelProps) => {
  const IconComponent = getIconComponent(currentWinner);
  const customColor = currentWinner === 'Velha' ? theme.colors.whiteFlagColor : (
    currentWinner === 'X' ? theme.colors.crossDefaultColor : theme.colors.circleDefaultColor
  );

  return (
    <VictoryPanelWrapper>
      <IconComponent size={96} tileset={tileset} />
      <VictoryMessage style={{ color: customColor }}>
        {currentWinner === 'Velha' ? 'Deu velha!' : 'Vencedor!'}
      </VictoryMessage>
    </VictoryPanelWrapper>
  );
}

export default VictoryPanel;