import { Text } from 'react-native';
import { CellWrapper } from './styles';

type CellProps = {
  rowPosition: number;
  columnPosition: number;
  markCell: (x: number, y: number) => void;
}

const Cell = ({
  rowPosition,
  columnPosition,
  markCell
}: CellProps) => {
  
  const handlePress = () => {
    markCell(rowPosition, columnPosition);
  }
  
  return (
    <CellWrapper onPress={handlePress}>
      <Text>X</Text>
    </CellWrapper>
  );
}

export default Cell;