import type { JSX } from "react/jsx-runtime";
import clsx from "clsx";

type WordProps = {
  isGameLost: boolean;
  currentWord: string;
  guess: string[];
};

export default function Word({
  isGameLost,
  currentWord,
  guess,
}: WordProps): JSX.Element {
  const letterElements: JSX.Element[] = currentWord
    .split("")
    .map((letter: string, index: number): JSX.Element => {
      const className: string = clsx(
        "letter",
        isGameLost && guess.includes(letter) && "incorrect",
      );
      return (
        <span key={index} className={className}>
          {isGameLost || guess.includes(letter) ? letter.toUpperCase() : ""}
        </span>
      );
    });

  return <section className="word">{letterElements}</section>;
}
