import CellType from './../../types/CellType';
import MatchResultType from './../../types/MatchResultType';
import VictoryPanel from './../VictoryPanel';
import BoardType from './../../types/BoardType';
import TilesetType from './../../types/TilesetType';
import { BoardWrapper, BottomCell, BottomLeftCell, BottomRightCell, CenterCell, LeftCell, RightCell, Row, TopCell, TopLeftCell, TopRightCell } from './styles';

type BoardProps = {
  board: BoardType;
  tileset: TilesetType;
  currentWinner: MatchResultType | null;
  hasAnotherPlayer: boolean;
  isFirstPlayerTurn: boolean;
  hasBeenInitialized: boolean;
  highlightedSequence: CellType[];
  markCell: (rowPosition: number, columnPosition: number) => void;
}

const Board = ({
  board,
  tileset,
  currentWinner,
  hasAnotherPlayer,
  isFirstPlayerTurn,
  hasBeenInitialized,
  highlightedSequence,
  markCell
}: BoardProps) => {
  
  return (
    <>
      {hasBeenInitialized && (
        <BoardWrapper>
          {currentWinner ? (
            <VictoryPanel
              tileset={tileset}
              currentWinner={currentWinner} />
          ) :
            [
              [TopLeftCell, TopCell, TopRightCell],
              [LeftCell, CenterCell, RightCell],
              [BottomLeftCell, BottomCell, BottomRightCell]
            ].map((row, indexRow) => (
              <Row key={`row-${indexRow}`}>
                {row.map((Cell, indexColumn) => {
                  const isHighlighted = highlightedSequence
                    .find(({ rowPosition, columnPosition }) => (
                      rowPosition === indexRow && columnPosition === indexColumn
                    )) !== undefined;

                  return (
                    <Cell
                      key={`cell-${indexRow}-${indexColumn}`}
                      cell={board[indexRow][indexColumn]}
                      tileset={tileset}
                      disabled={
                        !isFirstPlayerTurn
                          && !hasAnotherPlayer
                          || highlightedSequence.length > 0
                      }
                      isHighlighted={isHighlighted}
                      markCell={markCell} />
                  );
                })}
              </Row>
            ))
          }
        </BoardWrapper>
      )}
    </>
  );
}

export default Board;