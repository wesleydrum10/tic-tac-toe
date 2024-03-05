/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

export interface ModalProps {
  children: ReactNode;
  open: boolean;
}

export interface ModalRestartProps {
  open: boolean;
  setRestart: (params: boolean) => void;
  resetGame: () => void;
  setInit: (params: boolean) => void;
  init: boolean;
  restart: boolean;
  setIsClick: (params: boolean) => void;
}

export interface ModalWinnerProps {
  open: boolean;
  resetGame: () => void;
  setInit: (params: boolean) => void;
  setIsClick: (params: boolean) => void;
  init: boolean;
  choicePlayerOne: string;
  gameState: {
    board: [null] | any[];
    winner: string;
    currentPlayer: string;
    computerPlayer: string;
    turn: string;
  };
  gameVsCpu: boolean;
}

export interface ModalTiesProps {
  open: boolean;
  resetGame: () => void;
  setInit: (params: boolean) => void;
  init: boolean;
  setIsClick: (params: boolean) => void;
  gameState: {
    board: [null] | any[];
    winner: string;
    currentPlayer: string;
    computerPlayer: string;
    turn: string;
  };
}

export interface ReactSoundProps {
    url: string;
    playStatus: "PLAYING" | "STOPPED" | "PAUSED";
    playFromPosition?: number | undefined;
    position?: number | undefined;
    volume?: number | undefined;
    playbackRate?: number | undefined;
    autoLoad?: boolean | undefined;
    loop?: boolean | undefined;
    onError?: (() => void) | undefined;
    onLoading?: (() => void) | undefined;
    onLoad?: (() => void) | undefined;
    onPlaying?: (() => void) | undefined;
    onPause?: (() => void) | undefined;
    onResume?: (() => void) | undefined;
    onStop?: (() => void) | undefined;
    onFinishedPlaying?: (() => void) | undefined;
    onBufferChange?: (() => void) | undefined;
}
