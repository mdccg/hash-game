import styled, { css } from 'styled-components/native';
import Cell from './../Cell';
import { Dimensions } from 'react-native';

export const BoardWrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  width: ${Dimensions.get('window').width}px;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
  min-height: 384px;
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
  border-right-width: ${({ theme })  => theme.sizes.borderSize}px;
  border-bottom-width: ${({ theme }) => theme.sizes.borderSize}px;
`;

export const TopCell = styled(Cell)`
  ${borderStyles};
  border-right-width: ${({ theme })  => theme.sizes.borderSize}px;
  border-bottom-width: ${({ theme }) => theme.sizes.borderSize}px;
`;

export const TopRightCell = styled(Cell)`
  ${borderStyles};
  border-bottom-width: ${({ theme }) => theme.sizes.borderSize}px;
`;

export const LeftCell = styled(Cell)`
  ${borderStyles};
  border-right-width: ${({ theme })  => theme.sizes.borderSize}px;
  border-bottom-width: ${({ theme }) => theme.sizes.borderSize}px;
`;

export const CenterCell = styled(Cell)`
  ${borderStyles};
  border-right-width: ${({ theme })  => theme.sizes.borderSize}px;
  border-bottom-width: ${({ theme }) => theme.sizes.borderSize}px;
`;

export const RightCell = styled(Cell)`
  ${borderStyles};
  border-bottom-width: ${({ theme }) => theme.sizes.borderSize}px;
`;

export const BottomLeftCell = styled(Cell)`
  ${borderStyles};
  border-right-width: ${({ theme })  => theme.sizes.borderSize}px;
`;

export const BottomCell = styled(Cell)`
  ${borderStyles};
  border-right-width: ${({ theme })  => theme.sizes.borderSize}px;
`;

export const BottomRightCell = styled(Cell)`
  ${borderStyles};
`;