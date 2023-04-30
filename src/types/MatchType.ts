import BoardType from './BoardType';
import MatchResultType from './MatchResultType';

type MatchType = {
  winner: MatchResultType;
  /**
   * TODO
   * Salvar o tabuleiro read-only
   */
  board: BoardType;
}

export default MatchType;