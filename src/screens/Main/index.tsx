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
import MarkType from '../../types/MarkType';

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

    const possibleWinner = getWinner();

    if (possibleWinner !== null) {
      alert(possibleWinner + ' ganhou!');
      setResetFlag(!resetFlag);
      return;
    }

    const unmarkedCells = getUnmarkedCells();
    
    if (unmarkedCells.length === 0) {
      alert('Deu velha!');
      setResetFlag(!resetFlag);
    }
  }

  const getUnmarkedCells = (): CellType[] => {
    let currentBoard = [...board];
    const unmarkedCells = currentBoard.flat().filter((cell) => !cell.mark);
    return unmarkedCells;
  }

  const fightBack = () => {
    switch(difficultyLevel) {
      case 'Fácil':
        
        const unmarkedCells = getUnmarkedCells();

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
  
  const getWinner = (): MarkType | null => {
    const marks = ['X', 'O'];

    for (const mark of marks) {
      if (board[0][0].mark === mark && board[0][1].mark === mark && board[0][2].mark === mark ||
        board[1][0].mark === mark && board[1][1].mark === mark && board[1][2].mark === mark ||
        board[2][0].mark === mark && board[2][1].mark === mark && board[2][2].mark === mark ||
        board[0][0].mark === mark && board[1][0].mark === mark && board[2][0].mark === mark ||
        board[0][1].mark === mark && board[1][1].mark === mark && board[2][1].mark === mark ||
        board[0][2].mark === mark && board[1][2].mark === mark && board[2][2].mark === mark) { // racha cuca
        return mark as MarkType;
      }

      let checksum: number = 0;

      // Diagonal principal
      for (let i = 0; i < 3; ++i) {
        if (board[i][i].mark === mark) {
          ++checksum;
        }
      }
  
      if (checksum === 3) {
        return mark as MarkType;
      }
  
      checksum = 0;
  
      // Diagonal secundária
      for (let i = 0; i < 3; ++i) {
        if (board[i][2 - i].mark === mark) {
          ++checksum;
        }
      }
  
      if (checksum === 3) {
        return mark as MarkType;
      }
    }

    return null;
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