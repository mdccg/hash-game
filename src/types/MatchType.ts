type MatchResultType = 'X' | 'O' | 'Empate';

type MatchType = {
  winner: MatchResultType;
  /**
   * TODO
   * Salvar o tabuleiro read-only
   */
  board: unknown;
}

export default MatchType;