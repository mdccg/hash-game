import BoardType from './BoardType';

type MatchResultType = 'X' | 'O' | 'Empate';

type MatchType = {
  winner: MatchResultType;
  /**
   * TODO
   * Salvar o tabuleiro read-only
   */
  board: BoardType;
}

export default MatchType;