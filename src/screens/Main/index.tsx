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
import PositionType from './../../types/PositionType';
import PunctuationType from './../../types/PunctuationType';
import TilesetType from './../../types/TilesetType';
import { useEffectDeps } from './../../utils/react_utils';
import { MainWrapper, RestartButton, RestartButtonText } from './styles';
import config from './../../config';
import { shuffleArray } from './../../utils/javascript_utils';

type WinnerStatisticsType = {
  matchResult: MatchResultType;
  winnerSequence?: CellType[];
}

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
  const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevelType>('Médio');
  const [isFirstPlayerTurn, setIsFirstPlayerTurn] = useState<boolean>(true);
  const [punctuations, setPuctuations] = useState<PunctuationType[]>(getInitialPunctuationsValue());
  const [previousMatches, setPreviousMatches] = useState<MatchType[]>([]);
  const [board, setBoard] = useState<BoardType>([]);
  const [hasBeenInitialized, setHasBeenInitialized] = useState<boolean>(false);
  const [tileset, setTileset] = useState<TilesetType>('Padrão');
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
  const [highlightedSequence, setHighlightedSequence] = useState<CellType[]>([]);
  const [currentWinner, setCurrentWinner] = useState<MatchResultType | null>(null);
  const [currentWinnerTimeout, setCurrentWinnerTimeout] = useState<NodeJS.Timeout | null>(null);

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
    setHighlightedSequence([]);
    setCurrentWinner(null);
    if (fightBackTimeout !== null) {
      clearTimeout(fightBackTimeout);
    }
    if (currentWinnerTimeout !== null) {
      clearTimeout(currentWinnerTimeout);
    }
  }

  const markCell = (rowPosition: number, columnPosition: number, mark?: MarkType) => {
    let currentBoard = [...board];
    let cell: CellType = {
      rowPosition,
      columnPosition,
      mark: mark || (isFirstPlayerTurn ? 'X' : 'O')
    };

    currentBoard[rowPosition][columnPosition] = cell;

    setIsFirstPlayerTurn(!isFirstPlayerTurn);
    setBoard(currentBoard);

    const possibleWinner = getWinnerStatistics();
    
    if (possibleWinner !== null) {
      const { matchResult, winnerSequence } = possibleWinner;
      
      if (matchResult !== 'Velha') {
        setHighlightedSequence(winnerSequence as CellType[]);
      }

      savePunctuation(matchResult);
      saveMatch(matchResult, currentBoard);

      setHasBeenTotallyReseted(false);
      
      setCurrentWinnerTimeout(
        setTimeout(() => {
          setCurrentWinner(matchResult);
        }, config.highlightInterval * 1000)
      );
    }
  }

  const markRandomCell = () => {
    const unmarkedCells = getUnmarkedCells();
    const randomIndex = Math.floor(Math.random() * unmarkedCells.length);
    const randomCell = unmarkedCells[randomIndex];
    const { rowPosition, columnPosition } = randomCell;
    markCell(rowPosition, columnPosition);
  }

  const getUnmarkedCells = (cellsArg?: CellType[]): CellType[] => {
    let cells = cellsArg || [...board];
    const unmarkedCells = cells.flat().filter((cell) => !cell.mark);
    return unmarkedCells;
  }

  const finishWinnerSequence = (sequenceMark: MarkType, finishingMark: MarkType = 'O'): boolean => {
    const possibleWinner = getWinnerStatistics(2, sequenceMark);

    if (possibleWinner === null) {
      return false;
    }

    const { winnerSequence } = possibleWinner;
    const remainingCell = getUnmarkedCells(winnerSequence).at(0) as CellType;
    const { rowPosition, columnPosition } = remainingCell;

    markCell(rowPosition, columnPosition, finishingMark);

    return true;
  }
  
  const getCellsByPositions = (positions: PositionType[]): CellType[] => (
    positions.map(({ x, y }) => board[x][y])
  );

  const fightBack = () => {
    switch(difficultyLevel) {
      case 'Fácil':
        if (finishWinnerSequence('O')) {
          break;
        }

        markRandomCell();
        break;

      case 'Médio':
        if (finishWinnerSequence('O')) {
          break;
        }

        if (finishWinnerSequence('X')) {
          break;
        }

        markRandomCell();
        break;

      case 'Impossível':
        if (finishWinnerSequence('O')) {
          break;
        }

        if (finishWinnerSequence('X')) {
          break;
        }

        const center: PositionType = { x: 1, y: 1 };
        const corners: PositionType[] = [
          { x: 0, y: 0 },
          { x: 0, y: 2 },
          { x: 2, y: 0 },
          { x: 2, y: 2 }
        ];

        shuffleArray(corners);

        const chadSequence: PositionType[] = [ center, ...corners ];
        const strategicCells: CellType[] = getCellsByPositions(chadSequence);
        const unmarkedCells = getUnmarkedCells(strategicCells);

        if (unmarkedCells.length === 0) {
          markRandomCell();
          break;
        }

        const { rowPosition, columnPosition } = unmarkedCells.at(0) as CellType;
        markCell(rowPosition, columnPosition);
        break;
    }
  }
  
  const getWinnerStatistics = (sequenceNumber: number = 3, winnerMark?: MarkType): WinnerStatisticsType | null => {
    const marks: MarkType[] = winnerMark ? [winnerMark] : ['X', 'O'];

    const winnerSequences: PositionType[][] = [
      [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }],
      [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }],
      [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }],
      [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }],
      [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
      [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }],
      [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }],
      [{ x: 0, y: 2 }, { x: 1, y: 1 }, { x: 2, y: 0 }]
    ];

    for (const mark of marks) {
      for (const possibleWinnerSequence of winnerSequences) {
        let checksum: number = 0;

        for (const { x: rowPosition, y: columnPosition } of possibleWinnerSequence) {
          const { mark: markOnTheBoard } = board[rowPosition][columnPosition];

          if (markOnTheBoard === mark) {
            ++checksum;
          }
        }

        if (checksum === sequenceNumber) {
          const winnerSequence = getCellsByPositions(possibleWinnerSequence);
          const unmarkedCells = getUnmarkedCells(winnerSequence);
          const isAnotherCellsEmpty = unmarkedCells.length === 3 - sequenceNumber;

          if (isAnotherCellsEmpty) {
            return ({ winnerSequence, matchResult: mark });
          }
        }
      }
    }

    const unmarkedCells = getUnmarkedCells();
    
    if (unmarkedCells.length === 0) {
      return ({ matchResult: 'Velha' });
    }

    return null;
  }

  const savePunctuation = (winner: MatchResultType) => {
    const currentPunctuations = [...punctuations];
    let winnerPunctuation = currentPunctuations.find(({ matchResult }) => matchResult === winner) as PunctuationType;
    ++winnerPunctuation.score;
    setPuctuations(currentPunctuations);
  }

  const saveMatch = (winner: MatchResultType, board: BoardType) => {
    const currentPreviousMatches = [...previousMatches];
    const createdAt = new Date();
    const currentMatch: MatchType = { winner, gameOption, difficultyLevel, board, createdAt };
    currentPreviousMatches.push(currentMatch);
    setPreviousMatches(currentPreviousMatches);
  }
  
  const getDefaultDifficultyLevelPickerOption = (): PickerOptionType => {
    if (gameOption === 'Dois jogadores') {
      return difficultyLevelPickerOptions.at(3) as PickerOptionType;
    } else {
      return difficultyLevelPickerOptions.find(({ optionLabel }) => optionLabel === difficultyLevel) as PickerOptionType;
    }
  }

  const getDefaultTilesetPickerOption = (): PickerOptionType => (
    tilesetPickerOptions.find(({ optionLabel }) => optionLabel === tileset) as PickerOptionType
  );

  const resetPunctuations = () => {
    let punctuations = getInitialPunctuationsValue();
    setPuctuations(punctuations);
  }

  useEffect(() => {
    initializeBoard();
  }, []);

  useEffectDeps(() => {
    if (hasBeenTotallyReseted && !isFirstPlayerTurn && gameOption === 'Contra a Máquina') {
      setFightBackTimeout(
        setTimeout(() => {
          fightBack();
        }, config.fightBackInterval * 1000)
      );
    }
  }, [isFirstPlayerTurn]);

  return (
    <MainWrapper>
      <Header>
        <Picker
          defaultOption={getDefaultDifficultyLevelPickerOption()}
          options={difficultyLevelPickerOptions}
          finallyCallback={() => {
            resetPunctuations();
            initializeBoard();
          }} />
      </Header>

      <Scoreboard
        tileset={tileset}
        punctuations={punctuations}
        isFirstPlayerTurn={isFirstPlayerTurn} />

      <Board
        board={board}
        tileset={tileset}
        currentWinner={currentWinner}
        hasAnotherPlayer={gameOption === 'Dois jogadores'}
        isFirstPlayerTurn={isFirstPlayerTurn}
        hasBeenInitialized={hasBeenInitialized}
        highlightedSequence={highlightedSequence}
        markCell={markCell} />
      
      <RestartButton onPress={initializeBoard}>
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