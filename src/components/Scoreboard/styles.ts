import styled from 'styled-components/native';

export const ScoardboardWrapper = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  height: 96px;
`;

export const PunctuationWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: transparent;
  padding: 8px 16px;
  margin-right: 16px;
  border-radius: 8px;
  border-top-color: ${(({ theme }) => theme.colors.border)};
  border-right-color: ${(({ theme }) => theme.colors.border)};
  border-bottom-color: ${(({ theme }) => theme.colors.boardBorder)};
  border-left-color: ${(({ theme }) => theme.colors.border)};
  border-width: 1px;
  border-bottom-width: 4px;
`;

export const ScoreNumberArea = styled.View`
  justify-content: center;
  align-items: center;
  width:  16px;
  height: 16px;
  margin-left: 16px;
`;

export const ScoreNumber = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
`;