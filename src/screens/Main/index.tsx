import { useEffect, useState } from 'react';
import DifficultyLevelType from './../../types/DifficultyLevelType';
import MatchType from './../../types/MatchType';
import GameOptionType from './../../types/GameOptionType';
import { AppWrapper, RestartButton, RestartButtonText } from './styles';
import CellType from './../../types/CellType';
import { useEffectDeps } from './../../utils/react_utils';
import BoardType from './../../types/BoardType';
import TilesetType from './../../types/TilesetType';
import Board from './../../components/Board';

const Main = () => {
  const [gameOption, setGameOption] = useState<GameOptionType>('Contra a Máquina');
  const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevelType>('Fácil');
  const [isFirstPlayerTurn, setIsFirstPlayerTurn] = useState<boolean>(true);
  const [firstPlayerScore, setFirstPlayerScore] = useState<number>(0); // X
  const [secondPlayerScore, setSecondPlayerScore] = useState<number>(0); // O
  const [drawCounter, setDrawCounter] = useState<number>(0);
  const [previousMatches, setPreviousMatches] = useState<MatchType[]>([]);
  const [board, setBoard] = useState<BoardType>([]);
  const [hasBeenInitialized, setHasBeenInitialized] = useState<boolean>(false);
  const [tileset, setTileset] = useState<TilesetType>('Minecraft');
  const [resetFlag, setResetFlag] = useState<boolean>(false);

  const initializeBoard = () => {
    let currentBoard: BoardType = [];

    for (let i = 0; i < 3; ++i) {
      currentBoard[i] = [];
      for (let j = 0; j < 3; ++j) {
        const cell: CellType = { rowPosition: i, columnPosition: j, mark: undefined };
        currentBoard[i][j] = cell;
      }
    }

    setIsFirstPlayerTurn(true);
    setBoard(currentBoard);
    setHasBeenInitialized(true);
  }

  const markCell = (rowPosition: number, columnPosition: number) => {
    let currentBoard = [...board];
    let cell: CellType = {
      rowPosition,
      columnPosition,
      mark: isFirstPlayerTurn ? 'X' : 'O'
    };

    currentBoard[rowPosition][columnPosition] = cell;

    setIsFirstPlayerTurn(!isFirstPlayerTurn);
    setBoard(currentBoard);
  }

  const fightBack = () => {
    let currentBoard = [...board];

    switch(difficultyLevel) {
      case 'Fácil':
        const unmarkedCells = currentBoard.flat().filter((cell) => !cell.mark);
        
        if (unmarkedCells.length === 0) {
          break;
        }

        const randomIndex = Math.floor(Math.random() * unmarkedCells.length);
        const randomCell = unmarkedCells[randomIndex];
        const { rowPosition, columnPosition } = randomCell;
        markCell(rowPosition, columnPosition);
        break;

      case 'Médio':

        break;

      case 'Difícil':

        break;
      
      default:
        throw new Error('Invalid difficulty level.');
    }
  }
  
  const detectWinner = () => {
    
  }

  useEffect(() => {
    initializeBoard();
  }, [resetFlag]);

  // Contra a Máquina
  useEffectDeps(() => {
    if (!isFirstPlayerTurn && gameOption === 'Contra a Máquina') {
      fightBack();
    }
  }, [isFirstPlayerTurn]);

  return (
    <AppWrapper>
      <Board
        hasBeenInitialized={hasBeenInitialized}
        isFirstPlayerTurn={isFirstPlayerTurn}
        board={board}
        markCell={markCell} />
      
      <RestartButton onPress={() => setResetFlag(!resetFlag)}>
        <RestartButtonText>Reiniciar Jogo</RestartButtonText>
      </RestartButton>
    </AppWrapper>
  );
}

export default Main;