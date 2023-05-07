import { StopwatchText, StopwatchWrapper } from './styles';

type StopwatchProps = {
  counter: number;
}

const getCorrectFormat = (number: number): string => {
  if (`${number}`.length === 1) {
    return '0' + number;
  } else {
    return `${number}`;
  }
}

const Stopwatch = ({ counter }: StopwatchProps) => {
  const getStopwatchText = (): string => {
    let minutes: string = '-';
    let seconds: string = '-';
    
    if (counter !== 0) {
      minutes = getCorrectFormat(Math.floor(counter / 60));
      seconds = getCorrectFormat(counter % 60);
    }
    
    return `${minutes}:${seconds}`;
  }

  return (
    <StopwatchWrapper>
      <StopwatchText>{getStopwatchText()}</StopwatchText>
    </StopwatchWrapper>
  );
}

export default Stopwatch;