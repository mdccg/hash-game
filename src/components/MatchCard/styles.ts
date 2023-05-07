import styled from 'styled-components/native';

export const MatchCardWrapper = styled.View`
  flex-direction: column;
  padding: 16px;
`;

export const WinnerCard = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const WinnerLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.crossDefaultColor};
  font-size: 16px;
  text-transform: uppercase;
  margin-right: 8px;
`;

export const GameOptionCard = styled.View`
  margin: 8px 0;
  width: 75%;
`;

export const GameOptionCardText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 16px;
  line-height: 24px;
  `;

export const TimeText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
`;