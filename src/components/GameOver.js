import React, { useContext } from 'react'
import { AppContext } from '../App'

export const GameOver = () => {
    const {gameOver,currAttempt, setGameOver } = useContext(AppContext)
  return (
    <div className='gameover'>
        <h3>{gameOver.guessedWord ? "You COrrectly guessed" : "You failed"}</h3>
        <h1>Correct: {correctWord}</h1>
        {gameOver.guessedWord && (
           <h3> You guesses in {currAttempt.attempt} attempt</h3>
         )}
    </div>
  );
}
