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
import MarkType from './../../types/MarkType';
import Scoreboard from './../../components/Scoreboard';
import PunctuationType from './../../types/PunctuationType';
import MatchResultType from '../../types/MatchResultType';

const Main = () => {
  const [gameOption, setGameOption] = useState<GameOptionType>('Contra a Máquina');
  const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevelType>('Fácil');
  const [isFirstPlayerTurn, setIsFirstPlayerTurn] = useState<boolean>(true);
  const [punctuations, setPuctuations] = useState<PunctuationType[]>([
    {
      player: 'X',
      score: 0
    },
    {
      player: 'O',
      score: 0
    },
    {
      player: 'Empate',
      score: 0
    },
  ]);
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

    const possibleWinner = getWinner(3);

    if (possibleWinner !== null) {
      alert(possibleWinner !== 'Empate' ? `${possibleWinner} ganhou!` : 'Deu velha!');
      reset();
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
        /**
         * TODO
         * Implementar modo médio que usará a função getWinner para
         * impedir que o jogador ganhe a partida
         */
        break;

      case 'Difícil':
        /**
         * TODO
         * Fazer a mesma coisa com o médio mas ter preferência
         * pelo centro, extremos e depois pelas direções cardeais básicas
         */
        break;
      
      default:
        throw new Error('Invalid difficulty level.');
    }
  }
  
  /**
   * FIXME
   * Voltar com os laços de repetição para viabilizar o uso
   * do atributo `times`
   */
  const getWinner = (times: number): MatchResultType | null => {
    const marks: MarkType[] = ['X', 'O'];
  
    for (const mark of marks) {
      // Remover essa feiura aqui
      if (board[0][0].mark === mark && board[0][1].mark === mark && board[0][2].mark === mark ||
        board[1][0].mark === mark && board[1][1].mark === mark && board[1][2].mark === mark ||
        board[2][0].mark === mark && board[2][1].mark === mark && board[2][2].mark === mark ||
        board[0][0].mark === mark && board[1][0].mark === mark && board[2][0].mark === mark ||
        board[0][1].mark === mark && board[1][1].mark === mark && board[2][1].mark === mark ||
        board[0][2].mark === mark && board[1][2].mark === mark && board[2][2].mark === mark) { // racha cuca
        return mark;
      }

      let checksum: number = 0;

      // Diagonal principal
      for (let i = 0; i < times; ++i) {
        if (board[i][i].mark === mark) {
          ++checksum;
        }
      }
  
      if (checksum === times) {
        return mark;
      }
  
      checksum = 0;
  
      // Diagonal secundária
      for (let i = 0; i < times; ++i) {
        if (board[i][2 - i].mark === mark) {
          ++checksum;
        }
      }
  
      if (checksum === times) {
        return mark;
      }
    }

    const unmarkedCells = getUnmarkedCells();
    
    if (unmarkedCells.length === 0) {
      return 'Empate';
    }

    return null;
  }

  const reset = () => setResetFlag(!resetFlag);

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
      <Scoreboard tileset={tileset} punctuations={punctuations} />

      <Board
        hasBeenInitialized={hasBeenInitialized}
        isFirstPlayerTurn={isFirstPlayerTurn}
        board={board}
        markCell={markCell}
        tileset={tileset} />
      
      <RestartButton onPress={reset}>
        <RestartButtonText>Reiniciar Jogo</RestartButtonText>
      </RestartButton>
    </AppWrapper>
  );
}

export default Main;