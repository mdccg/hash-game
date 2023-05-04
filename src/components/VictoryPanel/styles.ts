import styled from 'styled-components/native';

export const VictoryPanelWrapper = styled.View`
  align-items: center;
`;

export const VictoryMessage = styled.Text`
  margin-top: 24px;

  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.crossDefaultColor};
  font-size: 32px;
  
  text-transform: uppercase;
`;