import { useEffect, useState } from 'react'
import './App.css'


function App() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clickedCards, setCLickedCards] = useState(new Set())
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  async function getCards() {
    try {
      let response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/");
      let data = await response.json();
      let deck_id = data.deck_id;
  
      response = await fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=12`);
      data = await response.json();
      let cards = data.cards;
      console.log(cards)
      setCards(cards)
      setLoading(false)
  
    } catch(error) {
      console.error(error);
      setLoading(false)
    }
  } 

  useEffect(() => {
    getCards();
  }, []);
  
 
  function shuffleCards() {
    let shuffledCards = [...cards];
    for (let i = 0; i < shuffledCards.length; i++) {
      const j = Math.floor(Math.random() * (shuffledCards.length));
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }
    setCards(shuffledCards);
  }

  function handleCardClick(e) {
    let currentCard = e.target.src;
    if (clickedCards.has(currentCard)) {
      setScore(0);
      setCLickedCards(new Set())
    }
    else {
      let newScore = score + 1;
      setScore(newScore)
      setCLickedCards(new Set(clickedCards).add(currentCard));
      if (newScore > bestScore) {
        setBestScore(newScore);
      }
    } 
    shuffleCards();
  }



  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div id='wrapper'>
      <header>
        <h1>Memory Card</h1>
        <p>Get points by clicking on an image but don't click on any more than once!</p>
        <aside>
          <p>Score: {score}</p>
          <p>Best score: {bestScore}</p>
        </aside>
      </header>
      <hr />
      <div className='card-wrapper'>
        {cards.map((card, index) => (
          <img onClick={handleCardClick} className='card' key={index} src={card.image} alt={`card-${index}`} />
      ))}
      </div>
    
    </div>
  )
}

export default App
