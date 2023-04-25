import styled, { css } from 'styled-components/native';
import Cell from './../Cell';
import { Dimensions } from 'react-native';

export const BoardWrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  width: ${Dimensions.get('window').width}px;
  align-items: center;
  padding: 30px 0;
`;

export const Row = styled.View`
  flex-direction: row;
`;

const borderStyles = css`
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.boardBorder};
`;

export const TopLeftCell = styled(Cell)`
  ${borderStyles};
  border-right-width: ${({ theme })  => theme.sizes.borderSize};
  border-bottom-width: ${({ theme }) => theme.sizes.borderSize};
`;

export const TopCell = styled(Cell)`
  ${borderStyles};
  border-right-width: ${({ theme })  => theme.sizes.borderSize};
  border-bottom-width: ${({ theme }) => theme.sizes.borderSize};
`;

export const TopRightCell = styled(Cell)`
  ${borderStyles};
  border-bottom-width: ${({ theme }) => theme.sizes.borderSize};
`;

export const LeftCell = styled(Cell)`
  ${borderStyles};
  border-right-width: ${({ theme })  => theme.sizes.borderSize};
  border-bottom-width: ${({ theme }) => theme.sizes.borderSize};
`;

export const CenterCell = styled(Cell)`
  ${borderStyles};
  border-right-width: ${({ theme })  => theme.sizes.borderSize};
  border-bottom-width: ${({ theme }) => theme.sizes.borderSize};
`;

export const RightCell = styled(Cell)`
  ${borderStyles};
  border-bottom-width: ${({ theme }) => theme.sizes.borderSize};
`;

export const BottomLeftCell = styled(Cell)`
  ${borderStyles};
  border-right-width: ${({ theme })  => theme.sizes.borderSize};
`;

export const BottomCell = styled(Cell)`
  ${borderStyles};
  border-right-width: ${({ theme })  => theme.sizes.borderSize};
`;

export const BottomRightCell = styled(Cell)`
  ${borderStyles};
`;