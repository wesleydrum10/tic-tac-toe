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
}

export interface ModalWinnerProps {
  open: boolean;
  resetGame: () => void;
  setInit: (params: boolean) => void;
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
  gameState: {
    board: [null] | any[];
    winner: string;
    currentPlayer: string;
    computerPlayer: string;
    turn: string;
  };
}
