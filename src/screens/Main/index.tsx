import { useEffect, useState } from 'react';
import Board from './../../components/Board';
import CustomIconPickerOption from './../../components/CustomIconPickerOption';
import Footer from './../../components/Footer';
import Header from './../../components/Header';
import Picker from './../../components/Picker';
import Scoreboard from './../../components/Scoreboard';
import BoardType from './../../types/BoardType';
import CellType from './../../types/CellType';
import DifficultyLevelType from './../../types/DifficultyLevelType';
import GameOptionType from './../../types/GameOptionType';
import MarkType from './../../types/MarkType';
import MatchResultType from './../../types/MatchResultType';
import MatchType from './../../types/MatchType';
import PickerOptionType from './../../types/PickerOptionType';
import PunctuationType from './../../types/PunctuationType';
import TilesetType from './../../types/TilesetType';
import { useEffectDeps } from './../../utils/react_utils';
import { MainWrapper, RestartButton, RestartButtonText } from './styles';

const Main = () => {
  const getInitialPunctuationsValue = (): PunctuationType[] => (
    [
      {
        matchResult: 'X',
        score: 0
      },
      {
        matchResult: 'O',
        score: 0
      },
      {
        matchResult: 'Velha',
        score: 0
      },
    ]
  );

  const [gameOption, setGameOption] = useState<GameOptionType>('Contra a Máquina');
  const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevelType>('Fácil');
  const [isFirstPlayerTurn, setIsFirstPlayerTurn] = useState<boolean>(true);
  const [punctuations, setPuctuations] = useState<PunctuationType[]>(getInitialPunctuationsValue());
  const [previousMatches, setPreviousMatches] = useState<MatchType[]>([]);
  const [board, setBoard] = useState<BoardType>([]);
  const [hasBeenInitialized, setHasBeenInitialized] = useState<boolean>(false);
  const [tileset, setTileset] = useState<TilesetType>('Minecraft');
  const [resetFlag, setResetFlag] = useState<boolean>(false);
  const [hasBeenTotallyReseted, setHasBeenTotallyReseted] = useState<boolean>(false);
  const [fightBackTimeout, setFightBackTimeout] = useState<NodeJS.Timeout | null>(null);
  const [difficultyLevelPickerOptions] = useState<PickerOptionType[]>([
    {
      optionLabel: 'Fácil',
      handlePress: () => {
        setGameOption('Contra a Máquina');
        setDifficultyLevel('Fácil');
      }
    },
    {
      optionLabel: 'Médio',
      handlePress: () => {
        setGameOption('Contra a Máquina');
        setDifficultyLevel('Médio');
      }
    },
    {
      optionLabel: 'Impossível',
      handlePress: () => {
        setGameOption('Contra a Máquina');
        setDifficultyLevel('Impossível');
      }
    },
    {
      optionLabel: 'Jogar contra um amigo',
      handlePress: () => {
        setGameOption('Dois jogadores');
      }
    }
  ]);
  const [tilesetPickerOptions] = useState<PickerOptionType[]>([
    {
      optionLabel: 'Padrão',
      handlePress: () => {
        setTileset('Padrão');
      },
      customIcon: (_) => <CustomIconPickerOption tileset="Padrão" />
    },
    {
      optionLabel: 'Minecraft',
      handlePress: () => {
        setTileset('Minecraft');
      },
      customIcon: (_) => <CustomIconPickerOption tileset="Minecraft" />
    },
  ]);

  const initializeBoard = () => {
    let currentBoard: BoardType = [];

    for (let i = 0; i < 3; ++i) {
      currentBoard[i] = [];
      for (let j = 0; j < 3; ++j) {
        const cell: CellType = { rowPosition: i, columnPosition: j, mark: undefined };
        currentBoard[i][j] = cell;
      }
    }

    setIsFirstPlayerTurn(true);
    setBoard(currentBoard);
    setHasBeenInitialized(true);
    setHasBeenTotallyReseted(true);
    clearTimeout(fightBackTimeout);
  }

  const markCell = (rowPosition: number, columnPosition: number) => {
    let currentBoard = [...board];
    let cell: CellType = {
      rowPosition,
      columnPosition,
      mark: isFirstPlayerTurn ? 'X' : 'O'
    };

    currentBoard[rowPosition][columnPosition] = cell;

    setIsFirstPlayerTurn(!isFirstPlayerTurn);
    setBoard(currentBoard);

    const possibleWinner = getWinner();

    if (possibleWinner !== null) {
      savePunctuation(possibleWinner);
      saveMatch(possibleWinner, currentBoard);

      /**
       * TODO
       * Trocar isso por um VictoryPanel
       */
      alert(possibleWinner !== 'Velha' ? `${possibleWinner} ganhou!` : 'Deu velha!');
      
      setHasBeenTotallyReseted(false);
      resetBoard();
    }
  }

  const getUnmarkedCells = (): CellType[] => {
    let currentBoard = [...board];
    const unmarkedCells = currentBoard.flat().filter((cell) => !cell.mark);
    return unmarkedCells;
  }

  const fightBack = () => {
    switch(difficultyLevel) {
      case 'Fácil':
        const unmarkedCells = getUnmarkedCells();
        const randomIndex = Math.floor(Math.random() * unmarkedCells.length);
        const randomCell = unmarkedCells[randomIndex]; // Marca aleatoriamente
        const { rowPosition, columnPosition } = randomCell;
        markCell(rowPosition, columnPosition);
        break;

      case 'Médio':
        /**
         * TODO
         * Implementar modo médio que usará a função getWinner para
         * impedir que o jogador ganhe a partida
         */
        break;

      case 'Impossível':
        /**
         * TODO
         * Fazer a mesma coisa com o médio mas ter preferência
         * pelo centro, extremos e depois pelas direções cardeais básicas
         */
        break;
      
      default:
        throw new Error('Invalid difficulty level.');
    }
  }
  
  const getWinner = (): MatchResultType | null => {
    const marks: MarkType[] = ['X', 'O'];

    for (const mark of marks) {
      if (
        board[0][0].mark === mark && board[0][1].mark === mark && board[0][2].mark === mark ||
        board[1][0].mark === mark && board[1][1].mark === mark && board[1][2].mark === mark ||
        board[2][0].mark === mark && board[2][1].mark === mark && board[2][2].mark === mark ||
        board[0][0].mark === mark && board[1][0].mark === mark && board[2][0].mark === mark ||
        board[0][1].mark === mark && board[1][1].mark === mark && board[2][1].mark === mark ||
        board[0][2].mark === mark && board[1][2].mark === mark && board[2][2].mark === mark ||
        board[0][0].mark === mark && board[1][1].mark === mark && board[2][2].mark === mark ||
        board[0][2].mark === mark && board[1][1].mark === mark && board[2][0].mark === mark
        ) {
        return mark;
      }
    }

    const unmarkedCells = getUnmarkedCells();
    
    if (unmarkedCells.length === 0) {
      return 'Velha';
    }

    return null;
  }

  /**
   * TODO
   * Usar laços de repetição
   */
  const searchByVictoryPattern = (): CellType | null => {
    /*
     * [00][01][02]
     * [10][11][12]
     * [20][21][22]
     */

    return null;
  }

  const resetBoard = () => setResetFlag(!resetFlag);

  const savePunctuation = (winner: MatchResultType) => {
    let currentPunctuations = [...punctuations];
    let winnerPunctuation = currentPunctuations.find(({ matchResult }) => matchResult === winner);
    ++winnerPunctuation.score;
    setPuctuations(currentPunctuations);
  }

  const saveMatch = (winner: MatchResultType, board: BoardType) => {
    let currentPreviousMatches = [...previousMatches];
    let currentMatch: MatchType = { winner, gameOption, difficultyLevel, board };
    currentPreviousMatches.push(currentMatch);
    setPreviousMatches(currentPreviousMatches);
  }
  
  const getDefaultDifficultyLevelPickerOption = (): PickerOptionType => {
    if (gameOption === 'Dois jogadores') {
      return difficultyLevelPickerOptions.at(3);
    } else {
      return difficultyLevelPickerOptions.find(({ optionLabel }) => optionLabel === difficultyLevel);
    }
  }

  const getDefaultTilesetPickerOption = (): PickerOptionType => (
    tilesetPickerOptions.find(({ optionLabel }) => optionLabel === tileset)
  );

  const resetPunctuations = () => {
    let newPunctuations = getInitialPunctuationsValue();
    setPuctuations(newPunctuations);
  }

  useEffect(() => {
    initializeBoard();
  }, [resetFlag]);

  useEffectDeps(() => {
    if (hasBeenTotallyReseted && !isFirstPlayerTurn && gameOption === 'Contra a Máquina') {
      setFightBackTimeout(
        setTimeout(() => {
          fightBack();
        }, 1e3)
      );
    }
  }, [isFirstPlayerTurn]);

  return (
    <MainWrapper>
      <Header>
        <Picker
          defaultOption={getDefaultDifficultyLevelPickerOption()}
          options={difficultyLevelPickerOptions}
          finallyTreatment={() => {
            resetPunctuations();
            resetBoard();
          }} />
      </Header>

      <Scoreboard
        tileset={tileset}
        punctuations={punctuations}
        isFirstPlayerTurn={isFirstPlayerTurn} />

      <Board
        board={board}
        tileset={tileset}
        gameOption={gameOption}
        isFirstPlayerTurn={isFirstPlayerTurn}
        hasBeenInitialized={hasBeenInitialized}
        markCell={markCell} />
      
      <RestartButton onPress={resetBoard}>
        <RestartButtonText>Reiniciar jogo</RestartButtonText>
      </RestartButton>

      <Footer>
        <Picker
          defaultOption={getDefaultTilesetPickerOption()}
          options={tilesetPickerOptions} />
      </Footer>
    </MainWrapper>
  );
}

export default Main;