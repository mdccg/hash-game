import { useState } from 'react';
import Cell from '../Cell';
import DifficultyLevelType from '../../types/DifficultyLevelType';
import MatchType from '../../types/MatchType';
import OptionGameType from '../../types/OptionGameType';
import { BoardWrapper, Row, TopLeftCell } from './styles';

const Board = () => {
  const [optionGame, setOptionGame] = useState<OptionGameType>('Contra a Máquina');
  const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevelType>('Fácil');
  const [isFirstPlayerTurn, setIsFirstPlayerTurn] = useState<boolean>(true);
  const [firstPlayerScore, setFirstPlayerScore] = useState<number>(0); // X
  const [secondPlayerScore, setSecondPlayerScore] = useState<number>(0); // O
  const [drawCounter, setDrawCounter] = useState<number>(0);
  const [previousMatches, setPreviousMatches] = useState<MatchType[]>([]);

  const markCell = (rowPosition: number, columnPosition: number) => {
    console.log('A posição', rowPosition, columnPosition, 'foi marcada!');

    setIsFirstPlayerTurn(!isFirstPlayerTurn);
  }

  return (
    <BoardWrapper>
      <Row>
        <TopLeftCell rowPosition={0} columnPosition={1} markCell={markCell} />
        <Cell rowPosition={0} columnPosition={2} markCell={markCell} />
        <Cell rowPosition={0} columnPosition={3} markCell={markCell} />
      </Row>

      <Row>
        <Cell rowPosition={1} columnPosition={1} markCell={markCell} />
        <Cell rowPosition={1} columnPosition={2} markCell={markCell} />
        <Cell rowPosition={1} columnPosition={3} markCell={markCell} />
      </Row>
      
      <Row>
        <Cell rowPosition={2} columnPosition={1} markCell={markCell} />
        <Cell rowPosition={2} columnPosition={2} markCell={markCell} />
        <Cell rowPosition={2} columnPosition={3} markCell={markCell} />
      </Row>
    </BoardWrapper>
  );
}

export default Board;