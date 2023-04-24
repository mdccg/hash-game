import { CellWrapper } from './styles';
import Cross from '../Cross';
import Circle from '../Circle';
import CellType from './../../types/CellType';
import { StyleProp, ViewStyle } from 'react-native';
import { useEffect, useState } from 'react';

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
  cell,
}: CellProps) => {
  const [mark, setMark] = useState<string | undefined>('');

  const handlePress = () => {
    markCell(rowPosition, columnPosition);
  }

  useEffect(() => {
    if (cell) {
      setMark(cell.mark);
    }
  }, [cell]);

  return (
    <CellWrapper style={style} onPress={handlePress}>
      {mark === 'X' ? <Cross /> : (mark === 'O' ? <Circle /> : null)}
    </CellWrapper>
  );
}

export default Cell;