import { CellWrapper } from './styles';
import Cross from '../Cross';
import Circle from '../Circle';
import CellType from './../../types/CellType';
import { StyleProp, ViewStyle } from 'react-native';

type CellProps = {
  style?: StyleProp<ViewStyle>;
  rowPosition: number;
  columnPosition: number;
  markCell: (x: number, y: number) => void;
  cell?: CellType;
}

const Cell = ({
  style,
  rowPosition,
  columnPosition,
  markCell,
  cell = {},
}: CellProps) => {
  
  const handlePress = () => {
    markCell(rowPosition, columnPosition);
  }

  return (
    <CellWrapper style={style} onPress={handlePress}>
      {cell.mark === 'X' ? <Cross /> : (cell.mark === 'O' ? <Circle /> : null)}
    </CellWrapper>
  );
}

export default Cell;