import { TouchableHighlight } from 'react-native';
import styled from 'styled-components/native';

export const CellWrapper = styled(TouchableHighlight)`
  width:  ${({ theme }) => theme.sizes.cellSize};
  height: ${({ theme }) => theme.sizes.cellSize};
  justify-content: center;
  align-items: center;
`;