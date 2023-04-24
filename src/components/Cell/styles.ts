import styled from 'styled-components/native';

export const CellWrapper = styled.TouchableOpacity`
  width:  ${({ theme }) => theme.sizes.cellSize};
  height: ${({ theme }) => theme.sizes.cellSize};
  justify-content: center;
  align-items: center;
`;