import styled from 'styled-components/native';

export const PickerWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 32px;
`;

export const PickerLabel = styled.Text`
  margin-left: 8px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
`;