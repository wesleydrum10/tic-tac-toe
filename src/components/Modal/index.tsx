import "../../App.css"
import { ModalProps, ModalRestartProps, ModalTiesProps, ModalWinnerProps } from "../../@Types/types";

const Modal = ({ children, open }: ModalProps) => {
  return (
    <dialog open={open}>
      <div id="modal">{children}</div>
    </dialog>
  );
};

export const ModalRestart = ({
  open,
  setRestart,
  resetGame,
  setInit,
  init,
  restart,
  setIsClick
}: ModalRestartProps) => {
  return (
    <Modal open={open}>
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
            resetGame(), setInit(!init), setRestart(!restart), setIsClick(false);
          }}
        >
          Yes, Restart
        </button>
      </div>
    </Modal>
  );
};

export const ModalWinner = ({
    choicePlayerOne,
    resetGame,
    setInit,
    init,
    gameVsCpu,
    gameState,
    setIsClick
}: ModalWinnerProps) => {
  return (
    <Modal open={gameState.winner !== ""}>
      {!gameVsCpu ? (
        <p id="message-top-modal">
          {gameState.winner === choicePlayerOne
            ? "Player 1 Won!"
            : "Player 2 Won!"}
        </p>
      ) : (
        <p id="message-top-modal">
          {gameState.winner === choicePlayerOne ? "You Won!" : "Cpu Won!"}
        </p>
      )}
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
            resetGame(), setInit(!init), setIsClick(false)
          }}
        >
          Quit
        </button>
        <button
          className="box turn"
          id="btn-next-round-modal"
          onClick={() => {resetGame(); setIsClick(false)}}
        >
          Next Round
        </button>
      </div>
    </Modal>
  );
};

export const ModalTies = ({gameState, resetGame, setInit, init, setIsClick}: ModalTiesProps) => {
  return (
    <Modal open={!gameState.board.includes(null)}>
      <div id="takes-round-modal">
        <h5>Ties Game</h5>
      </div>
      <div className="buttons-modal">
        <button
          className="box turn"
          id="btn-quit-modal"
          onClick={() => {
            resetGame(), setInit(!init), setIsClick(false);
          }}
        >
          Quit
        </button>
        <button
          className="box turn"
          id="btn-next-round-modal"
          onClick={() => {resetGame(); setIsClick(false)}}
        >
          Next Round
        </button>
      </div>
    </Modal>
  );
};
