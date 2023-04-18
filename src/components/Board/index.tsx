import { useEffect, useState } from 'react';
import Cell from '../Cell';
import DifficultyLevelType from '../../types/DifficultyLevelType';
import MatchType from '../../types/MatchType';
import OptionGameType from '../../types/OptionGameType';
import { BoardWrapper, BottomCell, BottomLeftCell, BottomRightCell, CenterCell, LeftCell, RightCell, Row, TopCell, TopLeftCell, TopRightCell } from './styles';
import CellType from '../../types/CellType';

const Board = () => {
  const [optionGame, setOptionGame] = useState<OptionGameType>('Contra a Máquina');
  const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevelType>('Fácil');
  const [isFirstPlayerTurn, setIsFirstPlayerTurn] = useState<boolean>(true);
  const [firstPlayerScore, setFirstPlayerScore] = useState<number>(0); // X
  const [secondPlayerScore, setSecondPlayerScore] = useState<number>(0); // O
  const [drawCounter, setDrawCounter] = useState<number>(0);
  const [previousMatches, setPreviousMatches] = useState<MatchType[]>([]);
  const [board, setBoard] = useState<CellType[][]>([]);
  const [hasBeenInitialized, setHasBeenInitialized] = useState<boolean>(false);

  const initializeBoard = () => {
    let board: CellType[][] = [];

    for (let i = 0; i < 3; ++i) {
      board[i] = [];

      for (let j = 0; j < 3; ++j) {
        board[i][j] = {} as CellType;
      }
    }

    setBoard(board);
    setHasBeenInitialized(true);
  }

  const markCell = (rowPosition: number, columnPosition: number) => {
    console.log('A posição', rowPosition, columnPosition, 'foi marcada!');

    let currentBoard = [...board];
    let cell: CellType = { mark: isFirstPlayerTurn ? 'X' : 'O' };

    currentBoard[rowPosition][columnPosition] = cell;

    setIsFirstPlayerTurn(!isFirstPlayerTurn);
  }

  useEffect(() => {
    initializeBoard();
  }, []);

  return (
    <BoardWrapper>
      {hasBeenInitialized && (
        <>
          <Row>
            <TopLeftCell  rowPosition={0} columnPosition={1} cell={board[0][1]} markCell={markCell} />
            <TopCell      rowPosition={0} columnPosition={2} cell={board[0][2]} markCell={markCell} />
            <TopRightCell rowPosition={0} columnPosition={3} cell={board[0][3]} markCell={markCell} />
          </Row>

          <Row>
            <LeftCell   rowPosition={1} columnPosition={1} cell={board[1][1]} markCell={markCell} />
            <CenterCell rowPosition={1} columnPosition={2} cell={board[1][2]} markCell={markCell} />
            <RightCell  rowPosition={1} columnPosition={3} cell={board[1][3]} markCell={markCell} />
          </Row>
          
          <Row>
            <BottomLeftCell  rowPosition={2} columnPosition={1} cell={board[2][1]} markCell={markCell} />
            <BottomCell      rowPosition={2} columnPosition={2} cell={board[2][2]} markCell={markCell} />
            <BottomRightCell rowPosition={2} columnPosition={3} cell={board[2][3]} markCell={markCell} />
          </Row>
        </>
      )}
    </BoardWrapper>
  );
}

export default Board;