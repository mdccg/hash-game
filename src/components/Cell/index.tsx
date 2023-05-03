import { Fragment, useEffect, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import CellType from './../../types/CellType';
import MarkType from './../../types/MarkType';
import TilesetType from './../../types/TilesetType';
import { getIconComponent } from './../../utils/react_utils';
import { CellWrapper } from './styles';

type CellProps = {
  style?: StyleProp<ViewStyle>;
  cell: CellType;
  tileset: TilesetType;
  disabled: boolean;
  markCell: (x: number, y: number) => void;
}

const Cell = ({
  style,
  markCell,
  disabled,
  cell,
  tileset,
}: CellProps) => {
  const [mark, setMark] = useState<MarkType | undefined>();
  const [size] = useState<number>(64);
  const IconComponent = mark ? getIconComponent(mark) : Fragment;

  const handlePress = () => {
    const { rowPosition, columnPosition } = cell;
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