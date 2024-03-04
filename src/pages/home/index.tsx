import "../../App.css";
import { Playing } from "../../components/Playing";
import { ModalRestart, ModalTies, ModalWinner } from "../../components/Modal";
import { Initial } from "../../components/Initial";
import { useRules } from "../../context/useRules";

function Home() {
  const {
    init,
    restart,
    resetGame,
    setInit,
    setRestart,
    choicePlayerOne,
    gameState,
    gameVsCpu,
  } = useRules();
  return (
    <body>
      {init ? <Playing /> : <Initial />}
      {restart && (
        <ModalRestart
          init={init}
          open={restart}
          resetGame={() => resetGame()}
          restart={restart}
          setInit={setInit}
          setRestart={setRestart}
        />
      )}
      {gameState.winner !== "" && (
        <ModalWinner
          open={gameState.winner !== ""}
          setInit={setInit}
          resetGame={() => resetGame()}
          init={init}
          gameVsCpu={gameVsCpu}
          choicePlayerOne={choicePlayerOne}
          gameState={gameState}
        />
      )}
      {!gameState.board.includes(null) && (
        <ModalTies
          open={!gameState.board.includes(null)}
          setInit={setInit}
          resetGame={() => resetGame()}
          init={init}
          gameState={gameState}
        />
      )}
    </body>
  );
}

export default Home;
