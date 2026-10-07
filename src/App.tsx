import Header from "./components/Header.tsx";
import GameStatus from "./components/GameStatus.tsx";
import AriaLiveStatus from "./components/AriaLiveStatus.tsx";
import LanguageChips from "./components/LanguageChips.tsx";
import NewGameButton from "./components/NewGame.tsx";
import Word from "./components/Word.tsx";
import Keyboard from "./components/Keyboard.tsx";
import { languages } from "./languages.ts";
import { useState } from "react";
import { getRandomWord } from "./utils.ts";
import ConfettiContainer from "./components/ReactConfetti.tsx";
export default function App() {
  // state variables
  const [currentWord, setCurrentWord] = useState<string>((): string =>
    getRandomWord(),
  );
  const [guess, setGuess] = useState<string[]>([]);

  // derived variables
  const wrongGuessCount: number = guess.filter(
    (letter: string): boolean => !currentWord.includes(letter),
  ).length;
  const numberOfGuess: number = languages.length - 1 - wrongGuessCount;
  const isGameLost: boolean = languages.length - 1 <= wrongGuessCount;
  const isGameWon: boolean = currentWord
    .split("")
    .every((letter: string): boolean => guess.includes(letter));
  const lastGuessLetter: string = guess[guess.length - 1];
  const isLastGuessIncorrect: boolean =
    Boolean(lastGuessLetter) && !currentWord.includes(lastGuessLetter);
  const isGameOver: boolean = isGameLost || isGameWon;

  function addGuessLetter(letter: string): void {
    setGuess((prevGuess: string[]): string[] => {
      return prevGuess.includes(letter) ? prevGuess : [...prevGuess, letter];
    });
  }

  function startNewGame(): void {
    setGuess([]);
    setCurrentWord(() => getRandomWord());
  }

  const alphabets = "abcdefghijklmnopqrstuvwxyz";

  return (
    <main>
      <ConfettiContainer isGameWon={isGameWon} />
      <section className="header">
        <Header />
        <GameStatus
          isGameWon={isGameWon}
          isGameLost={isGameLost}
          isGameOver={isGameOver}
          isLastGuessIncorrect={isLastGuessIncorrect}
          wrongGuessCount={wrongGuessCount}
        />
      </section>
      <LanguageChips languages={languages} wrongGuessCount={wrongGuessCount} />
      <Word isGameLost={isGameLost} currentWord={currentWord} guess={guess} />
      <AriaLiveStatus
        currentWord={currentWord}
        lastGuessLetter={lastGuessLetter}
        guess={guess}
        numberOfGuess={numberOfGuess}
      />
      <Keyboard
        alphabets={alphabets}
        guess={guess}
        currentWord={currentWord}
        isGameOver={isGameOver}
        addGuessLetter={addGuessLetter}
      />
      <NewGameButton isGameOver={isGameOver} startNewGame={startNewGame} />
    </main>
  );
}
