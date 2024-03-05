/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface RulesProviderProps {
  children: ReactNode;
}

interface RulesContextData {
  setInit: (params: boolean) => void;
  init: boolean;
  setGameVsCpu: (params: boolean) => void;
  gameVsCpu: boolean;
  setRemoveStorage: (params: boolean) => void;
  removeStorage: boolean;
  setChoicePlayerOne: (params: string) => void;
  choicePlayerOne: string;
  setChoicePlayerTwo: (params: string) => void;
  choicePlayerTwo: string;
  setCurrentPlayer: (params: string) => void;
  currentPlayer: string;
  setBoxesWinnerOne: (params: number | undefined) => void;
  boxesWinnerOne: number | undefined;
  setBoxesWinnerTwo: (params: number | undefined) => void;
  boxesWinnerTwo: number | undefined;
  setBoxesWinnerThree: (params: number | undefined) => void;
  boxesWinnerThree: number | undefined;
  setRestart: (params: boolean) => void;
  restart: boolean;
  setWinnerPlayerOneTotal: (params: number) => void;
  winnerPlayerOneTotal: number;
  setWinnerPlayerTwoTotal: (params: number) => void;
  winnerPlayerTwoTotal: number;
  setTiesTotal: (params: number) => void;
  tiesTotal: number;
  gameState: {
    board: [null] | any[];
    winner: string;
    currentPlayer: string;
    computerPlayer: string;
    turn: string;
  };
  handleCellClick: (
    _e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => void;
  resetGame: () => void;
}

const RulesContext = createContext<RulesContextData>({} as RulesContextData);

export const RulesProvider = ({ children }: RulesProviderProps) => {
  const [init, setInit] = useState<boolean>(false);
  const [gameVsCpu, setGameVsCpu] = useState<boolean>(false);
  const [removeStorage, setRemoveStorage] = useState<boolean>(false);
  const [choicePlayerOne, setChoicePlayerOne] = useState("X");
  const [choicePlayerTwo, setChoicePlayerTwo] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState(choicePlayerOne);
  const [boxesWinnerOne, setBoxesWinnerOne] = useState<number>();
  const [boxesWinnerTwo, setBoxesWinnerTwo] = useState<number>();
  const [boxesWinnerThree, setBoxesWinnerThree] = useState<number>();
  const [restart, setRestart] = useState<boolean>(false);
  const [winnerPlayerOneTotal, setWinnerPlayerOneTotal] = useState<number>(0);
  const [winnerPlayerTwoTotal, setWinnerPlayerTwoTotal] = useState<number>(0);
  const [tiesTotal, setTiesTotal] = useState<number>(0);
  const [gameState, setGameState] = useState({
    board: Array(9).fill(null),
    winner: "",
    currentPlayer: choicePlayerOne,
    computerPlayer: choicePlayerTwo,
    turn: choicePlayerOne,
  });
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleCellClick = (
    _e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    if (gameVsCpu) {
      const newBoard = [...gameState.board];
      newBoard[index] = gameState.currentPlayer;
      const winningPlayer = checkWinner(newBoard);
      applicationStyleBoxWinner(winningPlayer);

      if (!winningPlayer) {
        setGameState({
          board: newBoard,
          currentPlayer: gameState.currentPlayer,
          winner: winningPlayer,
          computerPlayer: gameState.computerPlayer,
          turn: gameState.computerPlayer,
        });
        setTimeout(() => {
          const computerMove = makeComputerMove(newBoard);
          newBoard[computerMove] = gameState.computerPlayer;
          const newWinningPlayer = checkWinner(newBoard);
          applicationStyleBoxWinner(winningPlayer);
          setGameState({
            board: newBoard,
            currentPlayer: gameState.currentPlayer,
            winner: newWinningPlayer,
            computerPlayer: gameState.computerPlayer,
            turn: gameState.currentPlayer,
          });
        }, 1000);
      } else {
        setGameState({
          board: newBoard,
          currentPlayer: gameState.currentPlayer,
          winner: winningPlayer,
          computerPlayer: gameState.computerPlayer,
          turn: winningPlayer,
        });
      }
    } else {
      if (gameState.board[index] === null && !gameState.winner) {
        const newBoard = [...gameState.board];
        newBoard[index] = currentPlayer;

        const winningPlayer = checkWinner(newBoard);
        applicationStyleBoxWinner(winningPlayer);

        setGameState({
          board: newBoard,
          currentPlayer: currentPlayer === "X" ? "O" : "X",
          winner: winningPlayer,
          computerPlayer: gameState.computerPlayer,
          turn: currentPlayer === "X" ? "O" : "X",
        });
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      }
    }
  };

  const makeComputerMove = (board: any | []) => {
    const availableMoves = getAvailableMoves(board);
    for (const move of availableMoves) {
      const newBoard = [...board];
      newBoard[move] = gameState.computerPlayer;
      if (checkWinner(newBoard) === gameState.computerPlayer) {
        return move;
      }
    }

    for (const move of availableMoves) {
      const newBoard = [...board];
      newBoard[move] = gameState.currentPlayer;
      if (checkWinner(newBoard) === gameState.currentPlayer) {
        return move;
      }
    }

    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  };

  const getAvailableMoves = (board: string | []) => {
    const moves = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        moves.push(i);
      }
    }
    return moves;
  };

  const resetGame = () => {
    setGameState({
      board: Array(9).fill(null),
      winner: "",
      currentPlayer: choicePlayerOne,
      computerPlayer: choicePlayerTwo,
      turn: choicePlayerOne,
    });

    const boxOne = document.getElementById(`${boxesWinnerOne}`);
    const boxTwo = document.getElementById(`${boxesWinnerTwo}`);
    const boxThree = document.getElementById(`${boxesWinnerThree}`);

    if (boxOne) {
      boxOne.style.backgroundColor = "var(--bg-gray-box)";
      boxOne.style.color =
        gameState.winner === "X"
          ? "var(--color-player-x)"
          : "var(--color-player-o)";
    }
    if (boxTwo) {
      boxTwo.style.backgroundColor = "var(--bg-gray-box)";
      boxTwo.style.color =
        gameState.winner === "X"
          ? "var(--color-player-x)"
          : "var(--color-player-o)";
    }
    if (boxThree) {
      boxThree.style.backgroundColor = "var(--bg-gray-box)";
      boxThree.style.color =
        gameState.winner === "X"
          ? "var(--color-player-x)"
          : "var(--color-player-o)";
    }
  };

  const boxStyleWinner = (
    player: string,
    boxOne: number,
    boxTwo: number,
    boxThree: number
  ) => {
    const contentOne = document.getElementById(`${boxOne}`);
    const contentTwo = document.getElementById(`${boxTwo}`);
    const contentThree = document.getElementById(`${boxThree}`);

    if (contentOne) {
      contentOne.style.backgroundColor =
        player === "X" ? "var(--color-player-x)" : "var(--color-player-o)";
      contentOne.style.color = "var(--bg-gray-default)";
    }
    if (contentTwo) {
      contentTwo.style.backgroundColor =
        player === "X" ? "var(--color-player-x)" : "var(--color-player-o)";
      contentTwo.style.color = "var(--bg-gray-default)";
    }
    if (contentThree) {
      contentThree.style.backgroundColor =
        player === "X" ? "var(--color-player-x)" : "var(--color-player-o)";
      contentThree.style.color = "var(--bg-gray-default)";
    }
  };

  const applicationStyleBoxWinner = (player: string) => {
    winningCombinations.map((_item, index) => {
      const validateOne = gameState.board[winningCombinations[index][0]];
      const validateTwo = gameState.board[winningCombinations[index][1]];
      const validateThree = gameState.board[winningCombinations[index][2]];

      if (
        validateOne === player &&
        validateTwo === player &&
        validateThree === player
      ) {
        boxStyleWinner(
          player,
          winningCombinations[index][0],
          winningCombinations[index][1],
          winningCombinations[index][2]
        );

        setBoxesWinnerOne(winningCombinations[index][0]);
        setBoxesWinnerTwo(winningCombinations[index][1]);
        setBoxesWinnerThree(winningCombinations[index][2]);
      }
    });
  };

  const checkWinner = (board: any[]): string => {
    for (const combination of winningCombinations) {
      if (
        board[combination[0]] === board[combination[1]] &&
        board[combination[1]] === board[combination[2]] &&
        board[combination[0]] !== null
      ) {
        return board[combination[0]];
      }
    }

    return "";
  };

  useEffect(() => {
    if (choicePlayerOne === "X") {
      setChoicePlayerTwo("O");
      setCurrentPlayer(choicePlayerOne)
    }
    if (choicePlayerOne === "O") {
      setChoicePlayerTwo("X");
      setCurrentPlayer(choicePlayerOne)
    }

    setGameState({
      ...gameState,
      currentPlayer: choicePlayerOne,
      computerPlayer: choicePlayerTwo,
      turn: choicePlayerOne,
    });
  }, [choicePlayerOne, choicePlayerTwo]);

  useEffect(() => {
    if (!!gameState.winner && gameState.winner === choicePlayerOne) {
      localStorage.setItem(
        "@winnerPlayerOne",
        String(winnerPlayerOneTotal + 1)
      );
    }

    if (!!gameState.winner && gameState.winner === choicePlayerTwo) {
      localStorage.setItem(
        "@winnerPlayerTwo",
        String(winnerPlayerTwoTotal + 1)
      );
    }
  }, [!gameState.winner]);

  useEffect(() => {
    if (gameState.winner === "" && !gameState.board.includes(null)) {
      localStorage.setItem("@tiesGame", String(tiesTotal + 1));
    }
  }, [!gameState.board.includes(null)]);

  useEffect(() => {
    const playerOneTotal = localStorage.getItem("@winnerPlayerOne");
    if (playerOneTotal) {
      setWinnerPlayerOneTotal(parseInt(playerOneTotal));
    }
    const playerTwoTotal = localStorage.getItem("@winnerPlayerTwo");
    if (playerTwoTotal) {
      setWinnerPlayerTwoTotal(parseInt(playerTwoTotal));
    }
    const tiesStorageTotal = localStorage.getItem("@tiesGame");
    if (tiesStorageTotal) {
      setTiesTotal(parseInt(tiesStorageTotal));
    }
  }, [gameState.winner, !gameState.board.includes(null)]);

  useEffect(() => {
    applicationStyleBoxWinner(gameState.winner);
  }, [gameState.winner]);

  return (
    <RulesContext.Provider
      value={{
        setInit,
        init,
        setGameVsCpu,
        gameVsCpu,
        setRemoveStorage,
        removeStorage,
        setChoicePlayerOne,
        choicePlayerOne,
        setChoicePlayerTwo,
        choicePlayerTwo,
        setCurrentPlayer,
        currentPlayer,
        setBoxesWinnerOne,
        boxesWinnerOne,
        setBoxesWinnerTwo,
        boxesWinnerTwo,
        setBoxesWinnerThree,
        boxesWinnerThree,
        setRestart,
        restart,
        setWinnerPlayerOneTotal,
        winnerPlayerOneTotal,
        setWinnerPlayerTwoTotal,
        winnerPlayerTwoTotal,
        setTiesTotal,
        tiesTotal,
        gameState,
        handleCellClick,
        resetGame,
      }}
    >
      {children}
    </RulesContext.Provider>
  );
};

export const useRules = (): RulesContextData => {
  const context = useContext(RulesContext);
  return context;
};
