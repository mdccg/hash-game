import BoardType from './../../types/BoardType';
import GameOptionType from './../../types/GameOptionType';
import TilesetType from './../../types/TilesetType';
import { BoardWrapper, BottomCell, BottomLeftCell, BottomRightCell, CenterCell, LeftCell, RightCell, Row, TopCell, TopLeftCell, TopRightCell } from './styles';

type BoardProps = {
  board: BoardType;
  tileset: TilesetType;
  hasAnotherPlayer: boolean;
  isFirstPlayerTurn: boolean;
  hasBeenInitialized: boolean;
  markCell: (rowPosition: number, columnPosition: number) => void;
}

const Board = ({
  board,
  tileset,
  hasAnotherPlayer,
  isFirstPlayerTurn,
  hasBeenInitialized,
  markCell
}: BoardProps) => {
  
  return (
    <>
      {hasBeenInitialized && (
        <BoardWrapper>
          {
            [
              [TopLeftCell, TopCell, TopRightCell],
              [LeftCell, CenterCell, RightCell],
              [BottomLeftCell, BottomCell, BottomRightCell]
            ].map((row, indexRow) => (
              <Row key={`row-${indexRow}`}>
                {row.map((Cell, indexColumn) => (
                  <Cell
                    key={`cell-${indexRow}-${indexColumn}`}
                    cell={board[indexRow][indexColumn]}
                    tileset={tileset}
                    disabled={!isFirstPlayerTurn && !hasAnotherPlayer}
                    markCell={markCell} />
                ))}
              </Row>
            ))
          }
        </BoardWrapper>
      )}
    </>
  );
}

export default Board;