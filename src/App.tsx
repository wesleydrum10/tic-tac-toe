/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./App.css";
import { HiArrowUturnRight } from "react-icons/hi2";

function App() {
  const [init, setInit] = useState(false);
  const [choicePlayerOne, setChoicePlayerOne] = useState("X");
  const [choicePlayerTwo, setChoicePlayerTwo] = useState("");
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

  const handleCellClick = (_e: React.MouseEvent<HTMLDivElement>, index: number) => {
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
      boxOne.style.backgroundColor = "#1f3540";
      boxOne.style.color = gameState.winner === "X" ? "#31c4be" : "#f2b236";
    }
    if (boxTwo) {
      boxTwo.style.backgroundColor = "#1f3540";
      boxTwo.style.color = gameState.winner === "X" ? "#31c4be" : "#f2b236";
    }
    if (boxThree) {
      boxThree.style.backgroundColor = "#1f3540";
      boxThree.style.color = gameState.winner === "X" ? "#31c4be" : "#f2b236";
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
      contentOne.style.backgroundColor = player === "X" ? "#31c4be" : "#f2b236";
      contentOne.style.color = "#1a2b33";
    }
    if (contentTwo) {
      contentTwo.style.backgroundColor = player === "X" ? "#31c4be" : "#f2b236";
      contentTwo.style.color = "#1a2b33";
    }
    if (contentThree) {
      contentThree.style.backgroundColor =
        player === "X" ? "#31c4be" : "#f2b236";
      contentThree.style.color = "#1a2b33";
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
    }
    if (choicePlayerOne === "O") {
      setChoicePlayerTwo("X");
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
    <body>
      {init ? (
        <div className="container">
          <div className="top left">
            <p id="player-x">X</p>
            <p id="player-o">O</p>
          </div>
          <div className="box turn">
            <p id="turn">{gameState.turn}</p>
            <p>Turn</p>
          </div>
          <div className="top right">
            <div
              className="box turn"
              id="icon-return"
              onClick={() => {
                setRestart(!restart);
              }}
            >
              {<HiArrowUturnRight />}
            </div>
          </div>
          {gameState.board.map((item, index) => (
            <div
              key={index}
              id={String(index)}
              className="box"
              style={{ color: item === "X" ? "#31c4be" : "#f2b236" }}
              onClick={(e) => handleCellClick(e, index)}
            >
              {item}
            </div>
          ))}
          <div className={choicePlayerOne === "O" ? "count choice-o" : "count"}>
            <span id="play-you">{choicePlayerOne}(You)</span>
            <span id="count-you">{winnerPlayerOneTotal}</span>
          </div>
          <div className="count ties">
            <span id="play-cpu">Ties</span>
            <span id="count-tie">{tiesTotal}</span>
          </div>
          <div className={choicePlayerOne === "X" ? "count choice-o" : "count"}>
            <span id="play-cpu">{choicePlayerTwo}(Cpu)</span>
            <span id="count-cpu">{winnerPlayerTwoTotal}</span>
          </div>
        </div>
      ) : (
        <div className="choice-init-container">
          <div className="top left">
            <p id="player-x">X</p>
            <p id="player-o">O</p>
          </div>
          <div className="box init-container">
            <p>Pick player 1's maker</p>
            <div id="init-content-choice">
              <button
                className="btn-choice"
                autoFocus={choicePlayerOne === "X"}
                onClick={() => setChoicePlayerOne("X")}
              >
                X
              </button>
              <button
                className="btn-choice"
                autoFocus={choicePlayerOne === "O"}
                onClick={() => setChoicePlayerOne("O")}
              >
                O
              </button>
            </div>
            <p id="remember">Remember {choicePlayerOne} Goes First</p>
          </div>
          <button
            onClick={() => setInit(!init)}
            className="options-init"
            id="vs-cpu"
          >
            New game(vs cpu)
          </button>
          <button disabled className="options-init" id="vs-player">
            New game(vs player)
          </button>
        </div>
      )}

      <dialog open={gameState.winner !== ""}>
        <div id="modal">
          <p id="message-top-modal">
            {gameState.winner === choicePlayerOne ? "You Won!" : "Cpu Won!"}
          </p>
          <div id="takes-round-modal">
            <h2
              id="current-winner-modal"
              style={{
                color: gameState.winner === "X" ? "#31c4be" : "#f2b236",
              }}
            >
              {gameState.winner}
            </h2>
            <h5>Takes The Round</h5>
          </div>
          <div className="buttons-modal">
            <button
              className="box turn"
              id="btn-quit-modal"
              onClick={() => {
                resetGame(), setInit(!init);
              }}
            >
              Quit
            </button>
            <button
              className="box turn"
              id="btn-next-round-modal"
              onClick={() => resetGame()}
            >
              Next Round
            </button>
          </div>
        </div>
      </dialog>
      <dialog open={!gameState.board.includes(null)}>
        <div id="modal">
          <div id="takes-round-modal">
            <h5>Ties Game</h5>
          </div>
          <div className="buttons-modal">
            <button
              className="box turn"
              id="btn-quit-modal"
              onClick={() => {
                resetGame(), setInit(!init);
              }}
            >
              Quit
            </button>
            <button
              className="box turn"
              id="btn-next-round-modal"
              onClick={() => resetGame()}
            >
              Next Round
            </button>
          </div>
        </div>
      </dialog>
      {restart && (
        <dialog open={restart}>
          <div id="modal">
            <div id="msg-restart-modal">
              <h5>Restart Game?</h5>
            </div>
            <div className="buttons-modal">
              <button
                className="box turn"
                id="btn-quit-modal"
                onClick={() => setRestart(!restart)}
              >
                No, Cancel
              </button>
              <button
                className="box turn"
                id="btn-next-round-modal"
                onClick={() => {
                  resetGame(), setInit(!init), setRestart(!restart);
                }}
              >
                Yes, Restart
              </button>
            </div>
          </div>
        </dialog>
      )}
    </body>
  );
}

export default App;
