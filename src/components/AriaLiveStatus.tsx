import type { JSX } from "react/jsx-runtime";

type ariaLiveStatusProps = {
  currentWord: string;
  guess: string[];
  lastGuessLetter: string;
  numberOfGuess: number;
};
export default function AriaLiveStatus({
  currentWord,
  guess,
  lastGuessLetter,
  numberOfGuess,
}: ariaLiveStatusProps): JSX.Element {
  return (
    <section className="sr-only" aria-live="polite" role="status">
      <p>
        {currentWord.includes(lastGuessLetter)
          ? `Correct ${lastGuessLetter} is in the word`
          : `Incorrect ${lastGuessLetter} is not in the word`}
        You have {numberOfGuess} attempts left.
      </p>
      <p>
        Current word :
        {currentWord
          .split("")
          .map((letter: string): string =>
            guess.includes(letter) ? letter + "." : "blank",
          )
          .join(" ")}
      </p>
    </section>
  );
}
