import { Fragment, useEffect, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import CellType from './../../types/CellType';
import MarkType from './../../types/MarkType';
import TilesetType from './../../types/TilesetType';
import { getIconComponent } from './../../utils/react_utils';
import { CellWrapper } from './styles';
import theme from './../../styles/theme';

type CellProps = {
  style?: StyleProp<ViewStyle>;
  cell: CellType;
  tileset: TilesetType;
  disabled: boolean;
  isReadOnly: boolean;
  isHighlighted: boolean;
  markCell: (x: number, y: number) => void;
}

const Cell = ({
  style,
  cell,
  tileset,
  disabled,
  isReadOnly,
  isHighlighted,
  markCell,
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
      style={
        [
          style,
          {
            backgroundColor: isReadOnly ? 'white' : (
              isHighlighted ? theme.colors.highlight : theme.colors.background
            ),
            borderColor: isReadOnly ? theme.colors.text: theme.colors.boardBorder
          }
        ]
      }
      disabled={disabled || mark !== undefined}
      onPress={handlePress}>
      <>
        {mark && <IconComponent size={size} tileset={tileset} />}
      </>
    </CellWrapper>
  );
}

export default Cell;