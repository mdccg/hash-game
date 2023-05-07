import { useState, useEffect } from 'react';
import MatchType from '../../types/MatchType';
import TilesetType from '../../types/TilesetType';
import { getIconComponent } from '../../utils/react_utils';
import { GameOptionCard, GameOptionCardText, MatchCardWrapper, TimeText, WinnerCard, WinnerLabel } from './styles';
import Board from '../Board';

type MatchCardProps = {
  match: MatchType;
  tileset: TilesetType;
}

const MatchCard = ({
  match: {
    winner,
    gameOption,
    difficultyLevel,
    board,
    startDateISOString,
    endDateISOString
  },
  tileset,
}: MatchCardProps) => {
  const [gameOptionMessage, setGameOptionMessage] = useState<string>('');
  const [time, setTime] = useState<string>('');
  
  const IconComponent = getIconComponent(winner);

  const formatGameOptionMessage = () => {
    let gameOptionMessage: string;
    let didFirstPlayerWonMessage: string = winner === 'X' ? 'ganhou' : (winner === 'O' ? 'perdeu!' : 'empatou!');

    switch(gameOption) {
      case 'Dois jogadores':
        gameOptionMessage = 'Jogou contra um amigo e ';
        break;
        
        case 'Contra a Máquina':
          switch(difficultyLevel) {
            case 'Fácil':
              gameOptionMessage = 'Jogou contra o bot noob e ';
              break;
              
            case 'Médio':
              gameOptionMessage = 'Jogou contra o bot na dificuldade média e ';
              break;

            case 'Impossível':
              gameOptionMessage = 'Jogou contra o bot viciado e ';
              break;
        }
        break;
    }

    gameOptionMessage += (didFirstPlayerWonMessage);

    setGameOptionMessage(gameOptionMessage);
  }
  
  const formatTime = () => {
    let time: string;

    const startDate = new Date(startDateISOString);
    const endDate = new Date(endDateISOString);
    const totalTimeInMilliseconds = endDate.getTime() - startDate.getTime();
    const totalSeconds = Math.floor(totalTimeInMilliseconds / 1e3);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);

    time = 'Essa partida durou ';
    time += [minutes, seconds]
      .map((value, index) => `${value} ${index === 0 ? `minuto${value > 1 ? 's' : ''}` : `segundo${value > 1 ? 's' : ''}`}`)
      .filter((value) => value.at(0) !== '0')
      .join(' e ');

    setTime(time);
  }

  useEffect(() => {
    formatGameOptionMessage();
    formatTime();
  }, []);

  return (
    <MatchCardWrapper>
      <WinnerCard>
        <WinnerLabel>Vencedor: </WinnerLabel>
        <IconComponent size={32} tileset={tileset} />
      </WinnerCard>

      <GameOptionCard>
        <GameOptionCardText>{gameOptionMessage}</GameOptionCardText>
      </GameOptionCard>

      <TimeText>{time}</TimeText>

      <Board
        board={board}
        tileset={tileset}
        currentWinner={null}
        isReadOnly={true}
        hasAnotherPlayer={false}
        isFirstPlayerTurn={false}
        hasBeenInitialized={true}
        highlightedSequence={[]}
        markCell={() => {}} />
    </MatchCardWrapper>
  );
}

export default MatchCard;