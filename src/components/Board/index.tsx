import BoardType from './../../types/BoardType';
import GameOptionType from './../../types/GameOptionType';
import TilesetType from './../../types/TilesetType';
import { BoardWrapper, BottomCell, BottomLeftCell, BottomRightCell, CenterCell, LeftCell, RightCell, Row, TopCell, TopLeftCell, TopRightCell } from './styles';

type BoardProps = {
  board: BoardType;
  tileset: TilesetType;
  gameOption: GameOptionType;
  isFirstPlayerTurn: boolean;
  hasBeenInitialized: boolean;
  markCell: (rowPosition: number, columnPosition: number) => void;
}

const Board = ({
  board,
  tileset,
  gameOption,
  isFirstPlayerTurn,
  hasBeenInitialized,
  markCell
}: BoardProps) => {
  const hasAnotherPlayer: boolean = gameOption === 'Dois jogadores';
  
  return (
    <>
      {hasBeenInitialized && (
        <BoardWrapper>
          <Row>
            <TopLeftCell  disabled={!isFirstPlayerTurn && !hasAnotherPlayer} rowPosition={0} columnPosition={0} cell={board[0][0]} markCell={markCell} tileset={tileset} />
            <TopCell      disabled={!isFirstPlayerTurn && !hasAnotherPlayer} rowPosition={0} columnPosition={1} cell={board[0][1]} markCell={markCell} tileset={tileset} />
            <TopRightCell disabled={!isFirstPlayerTurn && !hasAnotherPlayer} rowPosition={0} columnPosition={2} cell={board[0][2]} markCell={markCell} tileset={tileset} />
          </Row>

          <Row>
            <LeftCell   disabled={!isFirstPlayerTurn && !hasAnotherPlayer} rowPosition={1} columnPosition={0} cell={board[1][0]} markCell={markCell} tileset={tileset} />
            <CenterCell disabled={!isFirstPlayerTurn && !hasAnotherPlayer} rowPosition={1} columnPosition={1} cell={board[1][1]} markCell={markCell} tileset={tileset} />
            <RightCell  disabled={!isFirstPlayerTurn && !hasAnotherPlayer} rowPosition={1} columnPosition={2} cell={board[1][2]} markCell={markCell} tileset={tileset} />
          </Row>
          
          <Row>
            <BottomLeftCell  disabled={!isFirstPlayerTurn && !hasAnotherPlayer} rowPosition={2} columnPosition={0} cell={board[2][0]} markCell={markCell} tileset={tileset} />
            <BottomCell      disabled={!isFirstPlayerTurn && !hasAnotherPlayer} rowPosition={2} columnPosition={1} cell={board[2][1]} markCell={markCell} tileset={tileset} />
            <BottomRightCell disabled={!isFirstPlayerTurn && !hasAnotherPlayer} rowPosition={2} columnPosition={2} cell={board[2][2]} markCell={markCell} tileset={tileset} />
          </Row>
        </BoardWrapper>
      )}
    </>
  );
}

export default Board;