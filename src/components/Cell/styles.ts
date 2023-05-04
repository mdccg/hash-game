import { TouchableHighlight } from 'react-native';
import styled from 'styled-components/native';

export const CellWrapper = styled(TouchableHighlight)`
  width:  ${({ theme }) => theme.sizes.cellSize}px;
  height: ${({ theme }) => theme.sizes.cellSize}px;
  justify-content: center;
  align-items: center;
`;