import { useState, useEffect } from 'react';
import './App.css';
import angular from './assets/angular.png';
import css from './assets/css.png';
import html from './assets/html.png';
import js from './assets/js.png';
import nodejs from './assets/nodejs.png';
import reactLogo from './assets/react.png';
import Card from './components/Card';

const cardImages = [
  { src: angular ,matched: false },
  { src: css ,matched: false },
  { src: html ,matched: false },
  { src: js ,matched: false },
  { src: nodejs ,matched: false },
  { src: reactLogo ,matched: false }
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const[choiceOne, setChoiceOne] = useState(null);
  const[choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [gameOver, setGameOver] = useState(false);
 

  const shuffleCards = () => {
    const shuffled = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffled);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    setShowAll(true);
    setDisabled(false);
    setTimeout(() => {
      setShowAll(false);
    }, 2000);
  };

  const handleChoice = (card) => {
    if (!choiceOne) {
      setChoiceOne(card);
    } else {
      setChoiceTwo(card);
    }
  };
useEffect(() => {
  if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };
 
  useEffect(() => {
    shuffleCards();
  }
  , []);

  useEffect(() => {
    if (cards.length && cards.every(card => card.matched)) {
      setTimeout(() => {
        setGameOver(true);
      }, 500);
    }
  }, [cards]);
  
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="turns">
        Turns: {turns}
      </div>
      <div className="card-grid">
        {cards.map(card => (
         <Card
         key={card.id}
          card={card} 
          handleChoice={handleChoice}
          flipped={showAll || card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          />
       ))}
      </div>
      {gameOver && (
  <div className="modal">
    <div className="modal-content">
      <h2>🎉 Congratulations!</h2>
      <p>You finished the game in {turns} turns.</p>
      <button onClick={() => {
        shuffleCards();
        setGameOver(false);
      }}>Play Again</button>
    </div>
  </div>
)}

    </div>
    
  );
}

export default App;
