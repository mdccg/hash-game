import styled from 'styled-components/native';

export const MatchesHistoryWrapper = styled.View`
  background-color: white;
  flex: 1;
`;

export const Separator = styled.View`
  align-self: center;
  height: 1px;
  flex: 1;

  width: 90%;
  background-color: ${({ theme }) => theme.colors.text};
`;