import styled from 'styled-components/native';
import Cell from '../Cell';

export const BoardWrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

export const Row = styled.View`
  flex-direction: row;
`;

export const TopLeftCell = styled(Cell)`

`;