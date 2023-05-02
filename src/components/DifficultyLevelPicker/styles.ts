import styled from 'styled-components/native';

export const DifficultyLevelPickerWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 32px;
`;

export const DifficultyLevelPickerText = styled.Text`
  margin-left: 8px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
`;