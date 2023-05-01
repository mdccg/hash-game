import { useEffect, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import CellType from './../../types/CellType';
import TilesetType from './../../types/TilesetType';
import { CellWrapper } from './styles';
import { getIconComponent } from './../../utils/react_utils';
import MatchResultType from './../../types/MatchResultType';

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
  const [mark, setMark] = useState<MatchResultType | undefined>();
  const [size] = useState<number>(64);
  const IconComponent = getIconComponent(mark);

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
        {mark && <IconComponent size={size} tileset={tileset} />}
      </>
    </CellWrapper>
  );
}

export default Cell;