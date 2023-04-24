import styled, { css } from 'styled-components/native';
import Cell from './../Cell';

export const BoardWrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

export const Row = styled.View`
  flex-direction: row;
`;

const sharedStyles = css`
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.border};
`;

export const TopLeftCell = styled(Cell)`
  ${sharedStyles};
  border-right-width: ${({ theme })  => theme.sizes.borderSize};
  border-bottom-width: ${({ theme }) => theme.sizes.borderSize};
`;

export const TopCell = styled(Cell)`
  ${sharedStyles};
  border-right-width: ${({ theme })  => theme.sizes.borderSize};
  border-bottom-width: ${({ theme }) => theme.sizes.borderSize};
`;

export const TopRightCell = styled(Cell)`
  ${sharedStyles};
  border-bottom-width: ${({ theme }) => theme.sizes.borderSize};
`;

export const LeftCell = styled(Cell)`
  ${sharedStyles};
  border-right-width: ${({ theme })  => theme.sizes.borderSize};
  border-bottom-width: ${({ theme }) => theme.sizes.borderSize};
`;

export const CenterCell = styled(Cell)`
  ${sharedStyles};
  border-right-width: ${({ theme })  => theme.sizes.borderSize};
  border-bottom-width: ${({ theme }) => theme.sizes.borderSize};
`;

export const RightCell = styled(Cell)`
  ${sharedStyles};
  border-bottom-width: ${({ theme }) => theme.sizes.borderSize};
`;

export const BottomLeftCell = styled(Cell)`
  ${sharedStyles};
  border-right-width: ${({ theme })  => theme.sizes.borderSize};
`;

export const BottomCell = styled(Cell)`
  ${sharedStyles};
  border-right-width: ${({ theme })  => theme.sizes.borderSize};
`;

export const BottomRightCell = styled(Cell)`
  ${sharedStyles};
`;