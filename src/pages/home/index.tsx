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
    setIsClick
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
          setIsClick={setIsClick}
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
          setIsClick={setIsClick}
        />
      )}
      {!gameState.board.includes(null) && (
        <ModalTies
          open={!gameState.board.includes(null)}
          setInit={setInit}
          resetGame={() => resetGame()}
          init={init}
          gameState={gameState}
          setIsClick={setIsClick}
        />
      )}
    </body>
  );
}

export default Home;
