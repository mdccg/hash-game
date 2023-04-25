import BoardType from './BoardType';
import MarkType from './MarkType';

type MatchResultType = MarkType | 'Empate';

type MatchType = {
  winner: MatchResultType;
  /**
   * TODO
   * Salvar o tabuleiro read-only
   */
  board: BoardType;
}

export default MatchType;