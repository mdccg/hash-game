import { useEffect, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import CellType from './../../types/CellType';
import TilesetType from './../../types/TilesetType';
import CircleIcon from './../CircleIcon';
import CrossIcon from './../CrossIcon';
import { CellWrapper } from './styles';

type CellProps = {
  style?: StyleProp<ViewStyle>;
  rowPosition: number;
  columnPosition: number;
  markCell: (x: number, y: number) => void;
  disabled: boolean;
  cell?: CellType;
  tileset: TilesetType;
}

const Cell = ({
  style,
  rowPosition,
  columnPosition,
  markCell,
  disabled,
  cell,
  tileset,
}: CellProps) => {
  const [mark, setMark] = useState<string | undefined>();
  const [size] = useState<number>(64);

  const handlePress = () => {
    markCell(rowPosition, columnPosition);
  }

  useEffect(() => {
    if (cell) {
      setMark(cell.mark);
    }
  }, [cell]);

  return (
    <CellWrapper
      underlayColor="transparent"
      style={style}
      disabled={disabled || mark !== undefined}
      onPress={handlePress}>
      <>
        {mark === 'X' ? <CrossIcon size={size} tileset={tileset} /> : (mark === 'O' ? <CircleIcon size={size} tileset={tileset} /> : null)}
      </>
    </CellWrapper>
  );
}

export default Cell;