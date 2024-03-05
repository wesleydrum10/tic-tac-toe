import { HiArrowUturnRight } from "react-icons/hi2";
import { BoxContent, HomeContainer } from "./styles";
import { useRules } from "../../context/useRules";
import "../../App.css";
import Sound from "react-sound";
const { VITE_APP_SOUND_TIES, VITE_APP_PUBLIC_URL, VITE_APP_SOUND_WINNER, VITE_APP_SOUND_CLICK } = import.meta.env;

export const Playing = () => {
  const {
    gameState,
    setRestart,
    restart,
    choicePlayerOne,
    winnerPlayerOneTotal,
    gameVsCpu,
    tiesTotal,
    choicePlayerTwo,
    winnerPlayerTwoTotal,
    handleCellClick,
    isClick,
    setIsClick,
  } = useRules();

  return (
    <HomeContainer>
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
        <BoxContent
          key={index}
          style={{
            color:
              item === "X" ? "var(--color-player-x)" : "var(--color-player-o)",
          }}
          id={String(index)}
          className="box"
          onClick={(e) => {
            handleCellClick(e, index); setIsClick(true)
          }}
        >
          {item}
        </BoxContent>
      ))}
      <div className={choicePlayerOne === "O" ? "count choice-o" : "count"}>
        <span id="play-you">
          {choicePlayerOne} {!gameVsCpu ? "(Player 1)" : "(You)"}
        </span>
        <span id="count-you">{winnerPlayerOneTotal}</span>
      </div>
      <div className="count ties">
        <span id="play-cpu">Ties</span>
        <span id="count-tie">{tiesTotal}</span>
      </div>
      <div className={choicePlayerOne === "X" ? "count choice-o" : "count"}>
        <span id="play-cpu">
          {choicePlayerTwo} {!gameVsCpu ? "(Player 2)" : "(Cpu)"}
        </span>
        <span id="count-cpu">{winnerPlayerTwoTotal}</span>
      </div>
      {gameState.winner && (
        <Sound
          url={`${VITE_APP_PUBLIC_URL}${VITE_APP_SOUND_WINNER}`}
          playStatus="PLAYING"
        ></Sound>
      )}
      {!gameState.winner && !gameState.board.includes(null) && (
        <Sound
          url={`${VITE_APP_PUBLIC_URL}${VITE_APP_SOUND_TIES}`}
          playStatus="PLAYING"
        ></Sound>
      )}
      {isClick && (
        <Sound
          url={`${VITE_APP_PUBLIC_URL}${VITE_APP_SOUND_CLICK}`}
          playStatus="PLAYING"
        ></Sound>
      )}
    </HomeContainer>
  );
};
