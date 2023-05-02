import BoardType from './BoardType';
import DifficultyLevelType from './DifficultyLevelType';
import GameOptionType from './GameOptionType';
import MatchResultType from './MatchResultType';

type MatchType = {
  winner: MatchResultType;
  /**
   * TODO
   * Salvar o tabuleiro read-only
   */
  gameOption: GameOptionType;
  difficultyLevel: DifficultyLevelType;
  board: BoardType;
}

export default MatchType;