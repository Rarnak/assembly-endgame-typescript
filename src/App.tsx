import Header from "./components/Header.tsx";
import GameStatus from "./components/GameStatus.tsx";
import AriaLiveStatus from "./components/AriaLiveStatus.tsx";
import LanguageChips from "./components/LanguageChips.tsx";
import { languages } from "./languages.ts";
import { useState } from "react";
import clsx from "clsx";
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
  const KeyboardElements = alphabets.split("").map((letter) => {
    const isGuessed = guess.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isIncorrect = isGuessed && !currentWord.includes(letter);

    const className = clsx({
      correct: isCorrect,
      incorrect: isIncorrect,
    });

    return (
      <button
        key={letter}
        className={className}
        disabled={isGameOver}
        aria-disabled={guess.includes(letter)}
        aria-label={`letter ${letter}`}
        onClick={() => {
          addGuessLetter(letter);
        }}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  const revealLetterElements = currentWord.split("").map((letter, index) => {
    return (
      <span
        key={index}
        className={clsx("letter", guess.includes(letter) ? "incorrect" : "")}
      >
        {letter.toUpperCase()}
      </span>
    );
  });

  const letterElements = currentWord.split("").map((letter, index) => {
    return (
      <span key={index} className="letter">
        {guess.includes(letter) ? letter.toUpperCase() : ""}
      </span>
    );
  });

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
      <section className="word">
        {isGameLost ? revealLetterElements : letterElements}
      </section>
      <AriaLiveStatus
        currentWord={currentWord}
        lastGuessLetter={lastGuessLetter}
        guess={guess}
        numberOfGuess={numberOfGuess}
      />
      <section className="keyboard">{KeyboardElements}</section>
      {isGameOver ? (
        <button onClick={startNewGame} className="new-game">
          New Game
        </button>
      ) : undefined}
    </main>
  );
}
