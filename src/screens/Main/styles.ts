import styled from 'styled-components/native';

export const AppWrapper = styled.View`
  background-color: 'white';
  flex-direction: column;
`;

export const RestartButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  min-height: 48px;
  border-color: ${({ theme }) => theme.colors.border};
  border-style: solid;
  border-bottom-width: 1px;
`;

export const RestartButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.boardBorder};
  font-size: 16px;
`;
