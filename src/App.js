import './App.css';
import Board from './components/Board';
import Keyboard from "./components/Keyboard";
import { createContext, useState } from 'react';
import { boardDefault, generateWordSet } from './Words'

export const AppContext = createContext();

function App() {
   const [board, setBoard] = useState(boardDefault);
   const [currentAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0});
   const [wordSet, setWordSet] = useState(new Set());
   const [disabledLetter, setDisabledLetters] = useState([]);
   const [GameOver, setGameOver] = useState({
    GameOver: false,
    guessedWord: false,
   });


   useEffect(() => {
    generateWordSet().then((words) => {
      console.log(words);
    }); 
   }, [])

   const onSelectLetter = (keyVal) => {
      if (currentAttempt.letterPos > 4) return;
      const newBoard = [...board];
      newBoard[currentAttempt.attempt][currentAttempt.letterPos] = keyVal;
      setBoard(newBoard);
      setCurrAttempt({ ...currentAttempt, letterPos: currentAttempt.letterPos + 1});
   };
  
   const onDelete = () => {
    if (currentAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currentAttempt, letterpos: currentAttempt.letterPos - 1 });
   };

   const onEnter = () => {
    if (currentAttempt.letterPos !== 5) return;

    let currWord = "";
    for (let i = 0; i<5; i++) {
      currWord += board[currentAttempt.attempt][i];
    }

    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currentAttempt.attempt+ 1, letterPos: 0});
    } else {
      alert("Word Not Found");
    }
    
    if (currWord === correctWord) {
       setGameOver({gameOver: true, guessedWord: true });
       return;
    }

    if (currentAttempt.attempt === 5) {
      setGameOver({gameOver: true, guessedWord: false });
    }

   };

   return (
     <div className='App'>
        <nav>
          <h1>Wordle</h1>
        </nav>
        <AppContext.Provider
          value={{
            board,
            setBoard,
            currentAttempt,
            setCurrAttempt,
            onSelectLetter,
            onDelete,
            onEnter,
            correctWord,
            setDisabledLetters,
            disabledLetters,
            setGameOver,
            gameOver
           }}
         >
          <div className='game'>
            <Board />
           {gameOver.gameOver ? <GameOver /> : <Keyboard />}
          </div>
        </AppContext.Provider>
     </div>
  );
}

export default App;
