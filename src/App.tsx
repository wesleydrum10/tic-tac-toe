import { useEffect, useState } from "react";
import "./App.css";
import { HiArrowUturnRight } from "react-icons/hi2";

function App() {
  const [init, setInit] = useState(false);
  const [choicePlayerOne, setChoicePlayerOne] = useState("X");
  const [choicePlayerTwo, setChoicePlayerTwo] = useState("");
  const [turnPlayer, setTurnPlayer] = useState("");
  const gameState = ({
    board: Array(9).fill(null),
    winner: null,
    currentPlayer: choicePlayerOne,
    computerPlayer: choicePlayerTwo,
  });

  const handleClickBox = (index: number) => {
    const newBoard = [...gameState.board];
    newBoard[index] = gameState.currentPlayer;
  };

  useEffect(() => {
    if (choicePlayerOne === "X") {
      setChoicePlayerTwo("O");
    } else {
      setChoicePlayerTwo("X");
    }
    setTurnPlayer(choicePlayerOne);
  }, [choicePlayerOne]);

  return (
    <body>
      {init ? (
        <div className="container">
          <div className="top left">
            <p id="player-x">X</p>
            <p id="player-o">O</p>
          </div>
          <div className="box turn">
            <p id="turn">{turnPlayer}</p>
            <p>Turn</p>
          </div>
          <div className="top right">
            <div
              className="box turn"
              id="icon-return"
              onClick={() => setInit(!init)}
            >
              {<HiArrowUturnRight />}
            </div>
          </div>
          {gameState.board.map((item, index) => (
            <div
              key={index}
              className="box"
              onClick={() => handleClickBox(index)}
            >
              {item}
            </div>
          ))}
          <div className={choicePlayerOne === "O" ? "count choice-o" : "count"}>
            <span id="play-you">{choicePlayerOne}(You)</span>
            <span id="count-you">2</span>
          </div>
          <div className="count ties">
            <span id="play-cpu">Ties</span>
            <span id="count-tie">4</span>
          </div>
          <div className={choicePlayerOne === "X" ? "count choice-o" : "count"}>
            <span id="play-cpu">{choicePlayerTwo}(Cpu)</span>
            <span id="count-cpu">1</span>
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
          <button className="options-init" id="vs-player">
            New game(vs player)
          </button>
        </div>
      )}

      <dialog open={!!gameState.winner}>
        <div id="modal">
          <p id="message-top-modal">You Won!</p>
          <div id="takes-round-modal">
            <h2 id="current-winner-modal">{gameState.winner}</h2>
            <h5>Takes The Round</h5>
          </div>
          <div className="buttons-modal">
            <button className="box turn" id="btn-quit-modal">
              Quit
            </button>
            <button className="box turn" id="btn-next-round-modal">
              Next Round
            </button>
          </div>
        </div>
      </dialog>
    </body>
  );
}

export default App;
