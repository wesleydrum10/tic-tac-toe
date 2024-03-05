import { useRules } from "../../context/useRules";
import "../../App.css";
import { IoSettingsOutline } from "react-icons/io5";
import Sound from "react-sound";
const { VITE_APP_PUBLIC_URL, VITE_APP_SOUND_INIT } = import.meta.env;

export const Initial = () => {
  const {
    choicePlayerOne,
    gameVsCpu,
    setChoicePlayerOne,
    setInit,
    init,
    setGameVsCpu,
    setRemoveStorage,
    removeStorage,
    isSound,
    setIsSound,
    setVolume,
    volume,
  } = useRules();
  return (
    <div className="choice-init-container">
      <div className="top left">
        <p id="player-x">X</p>
        <p id="player-o">O</p>
      </div>
      <div className="box init-container">
        <p>Pick player 1's maker</p>
        <div id="init-content-choice">
          <button
            className={
              choicePlayerOne === "X" ? "btn-choice clicked" : "btn-choice"
            }
            onClick={() => setChoicePlayerOne("X")}
          >
            X
          </button>
          <button
            className={
              choicePlayerOne === "O" ? "btn-choice clicked" : "btn-choice"
            }
            onClick={() => setChoicePlayerOne("O")}
          >
            O
          </button>
        </div>
        <p id="remember">Remember: {choicePlayerOne} Goes First</p>
      </div>
      <button
        onClick={() => {
          setInit(!init), setGameVsCpu(!gameVsCpu);
        }}
        className="options-init"
        id="vs-cpu"
      >
        New game(vs cpu)
      </button>
      <button
        onClick={() => {
          setInit(!init), setGameVsCpu(false);
        }}
        className="options-init"
        id="vs-player"
      >
        New game(vs player)
      </button>
      <span onClick={() => setRemoveStorage(!removeStorage)}>
        {
          <IoSettingsOutline
            color="var(--color-white)"
            fontSize={16}
            cursor="pointer"
          />
        }
      </span>
      {removeStorage && (
        <>
          <button
            onClick={() => {
              localStorage.clear(), window.location.reload();
            }}
            className="options-init clicked"
          >
            Clear the game scoreboard
          </button>
          <button
            className="options-init clicked"
            onClick={() => setIsSound(!isSound)}
          >
            {isSound ? "Turn off sound" : "Turn on sound"}
          </button>
          <div className="volume-container">
            <p>Adjust volume</p>

            <input
              type="range"
              min={0}
              max={30}
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
            />
            <output>{volume}</output>
          </div>
        </>
      )}
      <Sound
        url={`${VITE_APP_PUBLIC_URL}${VITE_APP_SOUND_INIT}`}
        playStatus={isSound ? "PLAYING" : "STOPPED"}
        autoLoad
        loop
        volume={parseInt(volume)}
      ></Sound>
    </div>
  );
};
