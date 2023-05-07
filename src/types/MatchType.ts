import BoardType from './BoardType';
import DifficultyLevelType from './DifficultyLevelType';
import GameOptionType from './GameOptionType';
import MatchResultType from './MatchResultType';

type MatchType = {
  winner: MatchResultType;
  gameOption: GameOptionType;
  difficultyLevel: DifficultyLevelType;
  board: BoardType;
  startDateISOString: string;
  endDateISOString: string;
}

export default MatchType;