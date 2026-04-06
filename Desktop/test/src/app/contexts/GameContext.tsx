import React, { createContext, useContext, useState } from "react";
import { GameState } from "../utils/gameLogic";
import { Question, Respondent } from "../data/content";

interface GameContextType {
  gameState: GameState;
  currentQuestion: Question | null;
  currentRespondents: [Respondent, Respondent] | null;
  selectQuestion: () => void;
  usedQuestionsCount: number;
  remainingQuestionsCount: number;
  isGameOver: boolean;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState] = useState(() => new GameState());
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentRespondents, setCurrentRespondents] = useState<[Respondent, Respondent] | null>(null);
  const [usedQuestionsCount, setUsedQuestionsCount] = useState(0);
  const [remainingQuestionsCount, setRemainingQuestionsCount] = useState(28);
  const [isGameOver, setIsGameOver] = useState(false);

  const selectQuestion = () => {
    // 게임이 이미 종료되었으면 선택 불가
    if (gameState.isGameOver()) {
      setIsGameOver(true);
      return;
    }

    const question = gameState.getRandomQuestion();
    if (!question) {
      setIsGameOver(true);
      return;
    }

    const respondents = gameState.getRandomRespondents();

    setCurrentQuestion(question);
    setCurrentRespondents(respondents);
    setUsedQuestionsCount(gameState.getUsedQuestionsCount());
    setRemainingQuestionsCount(gameState.getRemainingQuestionsCount());

    if (gameState.isGameOver()) {
      setIsGameOver(true);
    }
  };

  const resetGame = () => {
    gameState.reset();
    setCurrentQuestion(null);
    setCurrentRespondents(null);
    setUsedQuestionsCount(0);
    setRemainingQuestionsCount(28);
    setIsGameOver(false);
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        currentQuestion,
        currentRespondents,
        selectQuestion,
        usedQuestionsCount,
        remainingQuestionsCount,
        isGameOver,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
