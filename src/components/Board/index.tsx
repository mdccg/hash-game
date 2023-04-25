import BoardType from './../../types/BoardType';
import { BoardWrapper, BottomCell, BottomLeftCell, BottomRightCell, CenterCell, LeftCell, RightCell, Row, TopCell, TopLeftCell, TopRightCell } from './styles';

type BoardProps = {
  hasBeenInitialized: boolean;
  isFirstPlayerTurn: boolean;
  board: BoardType;
  markCell: (rowPosition: number, columnPosition: number) => void;
}

const Board = ({ hasBeenInitialized, isFirstPlayerTurn, board, markCell }: BoardProps) => {
  return (
    <>
      {hasBeenInitialized && (
        <BoardWrapper>
          <Row>
            <TopLeftCell     disabled={!isFirstPlayerTurn} rowPosition={0} columnPosition={0} cell={board[0][0]} markCell={markCell} />
            <TopCell         disabled={!isFirstPlayerTurn} rowPosition={0} columnPosition={1} cell={board[0][1]} markCell={markCell} />
            <TopRightCell    disabled={!isFirstPlayerTurn} rowPosition={0} columnPosition={2} cell={board[0][2]} markCell={markCell} />
          </Row>

          <Row>
            <LeftCell        disabled={!isFirstPlayerTurn} rowPosition={1} columnPosition={0} cell={board[1][0]} markCell={markCell} />
            <CenterCell      disabled={!isFirstPlayerTurn} rowPosition={1} columnPosition={1} cell={board[1][1]} markCell={markCell} />
            <RightCell       disabled={!isFirstPlayerTurn} rowPosition={1} columnPosition={2} cell={board[1][2]} markCell={markCell} />
          </Row>
          
          <Row>
            <BottomLeftCell  disabled={!isFirstPlayerTurn} rowPosition={2} columnPosition={0} cell={board[2][0]} markCell={markCell} />
            <BottomCell      disabled={!isFirstPlayerTurn} rowPosition={2} columnPosition={1} cell={board[2][1]} markCell={markCell} />
            <BottomRightCell disabled={!isFirstPlayerTurn} rowPosition={2} columnPosition={2} cell={board[2][2]} markCell={markCell} />
          </Row>
        </BoardWrapper>
      )}
    </>
  );
}

export default Board;