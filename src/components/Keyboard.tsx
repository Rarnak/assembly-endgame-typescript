import type { JSX } from "react/jsx-runtime";
import clsx from "clsx";

type KeyboardProps = {
  alphabets: string;
  guess: string[];
  currentWord: string;
  isGameOver: boolean;
  addGuessLetter: (letter: string) => void;
};

export default function Keyboard({
  alphabets,
  guess,
  currentWord,
  isGameOver,
  addGuessLetter,
}: KeyboardProps): JSX.Element {
  const KeyboardElements: JSX.Element[] = alphabets
    .split("")
    .map((letter: string): JSX.Element => {
      const isGuessed: boolean = guess.includes(letter);
      const isCorrect: boolean = isGuessed && currentWord.includes(letter);
      const isIncorrect: boolean = isGuessed && !currentWord.includes(letter);

      const className: string = clsx({
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
  return <section className="keyboard">{KeyboardElements}</section>;
}
