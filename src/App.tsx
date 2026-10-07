import Header from "./components/Header.tsx"
import { languages } from "./languages.ts"
import { useState } from "react"
import clsx from "clsx"
import { getFarewellText, getRandomWord } from "./utils.ts"
import ReactConfetti from "react-confetti"
export default function App() {

  // state variables
  const [currentWord, setCurrentWord] = useState<string>(() : string => getRandomWord())
  const [guess, setGuess] = useState<string[]>([])
  
  // derived variables
  // const wrongGuessCount : number = guess.reduce((count : number, letter : string) : number => {
  //   return (currentWord.includes(letter)) ? count : count + 1
  // }, 0)
  const wrongGuessCount:number = guess.filter(((letter :string ) :boolean => !currentWord.includes(letter))).length
  const numberOfGuess:number = languages.length - 1 - wrongGuessCount
  const isGameLost:boolean = (languages.length - 1 <= wrongGuessCount)
  const isGameWon:boolean = currentWord.split("").every((letter:string):boolean => (guess.includes(letter)))
  const lastGuessLetter:string = guess[guess.length - 1]
  const isLastGuessIncorrect:boolean = lastGuessLetter && !currentWord.includes(lastGuessLetter)
  const isGameOver:boolean = isGameLost || isGameWon

  function addGuessLetter(letter) {
    setGuess(prevGuess => {
      return prevGuess.includes(letter) ?
        prevGuess :
        [...prevGuess, letter]
    })
  }

  function startNewGame() {
    setGuess([])
    setCurrentWord(() => getRandomWord())
  }

  const alphabets = 'abcdefghijklmnopqrstuvwxyz'
  const KeyboardElements = alphabets.split("").map(letter => {

    const isGuessed = guess.includes(letter)
    const isCorrect = isGuessed && currentWord.includes(letter)
    const isIncorrect = isGuessed && !currentWord.includes(letter)

    const className = clsx({
      correct: isCorrect,
      incorrect: isIncorrect
    })

    return <button
      key={letter}
      className={className}
      disabled={isGameOver}
      aria-disabled={guess.includes(letter)}
      aria-label={`letter ${letter}`}
      onClick={() => { addGuessLetter(letter) }}
    >
      {letter.toUpperCase()}
    </button>
  }
  )

  const revealLetterElements = currentWord.split("").map((letter, index) => {
    return <span
      key={index}
      className={clsx('letter', guess.includes(letter) ? 'incorrect' : '')}
    >{letter.toUpperCase()}</span>
  })

  const letterElements = currentWord.split("").map((letter, index) => {
    return <span
      key={index}
      className="letter">
      {(guess.includes(letter)) ? letter.toUpperCase() : ""}
    </span>
  })

  const languageElements = languages.map((language, index) => {
    const styles = {
      color: language.color,
      backgroundColor: language.backgroundColor
    }

    const className = clsx({
      chip: true,
      lost: (index) < wrongGuessCount
    })
    return <span
      key={index}
      style={styles}
      className={className}
    >
      {language.name}
    </span>
  })

  const gameStatusClass = clsx('game-status',
    isGameLost ? 'lose' : '',
    isGameWon ? 'win' : '',
    isLastGuessIncorrect && !isGameOver ? 'farewell' : '',
  )

  function renderGameStatus() {

    if (!isGameOver && isLastGuessIncorrect) {
      return <p>
        {getFarewellText(languages[wrongGuessCount - 1].name)} 🫡
      </p>
    }
    else if (isGameWon) {
      return (<>
        <h2>You Win</h2>
        <p>Well done! 🎉</p>
      </>)
    } else if (isGameLost) {
      return (<>
        <h2>Game Over!</h2>
        <p>You lose! Better start learning Assembly 😭</p>
      </>)
    } else {
      return null
    }
  }

  return (<main>
    {isGameWon ? <ReactConfetti
      recycle = {false}
      numberOfPieces={1500}
    /> : undefined}
    <section className="header">
      <Header />
      <section
        aria-live="polite"
        role="status"
        className={gameStatusClass}>
        {renderGameStatus()}
      </section>
    </section>
    <section className="language-chips">
      {languageElements}
    </section>
    <section className="word">
      {isGameLost ? revealLetterElements : letterElements}
    </section>
    <section className="sr-only"
      aria-live="polite"
      role="status"
    >
      <p>
        {currentWord.includes(lastGuessLetter) ?
          `Correct ${lastGuessLetter} is in the word` :
          `Incorrect ${lastGuessLetter} is not in the word`}
        You have {numberOfGuess} attempts left.
      </p>
      <p>Current word :
        {currentWord.split("").map(letter =>
          guess.includes(letter) ? letter + "." : "blank").join(" ")}
      </p>
    </section>
    <section className="keyboard">
      {KeyboardElements}
    </section>
    {isGameOver ? <button
      onClick={startNewGame}
      className="new-game">New Game</button> : undefined}
  </main>)
}