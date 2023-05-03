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
                    markCell={markCell}
                    disabled={!isFirstPlayerTurn && !hasAnotherPlayer}
                    cell={board[indexRow][indexColumn]}
                    tileset={tileset} />
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