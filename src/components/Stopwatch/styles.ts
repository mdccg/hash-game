import styled from 'styled-components/native';

export const StopwatchWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

export const StopwatchText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.border};
`;