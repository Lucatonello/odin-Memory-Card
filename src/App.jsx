import { useState } from 'react'
import './App.css'

async function getCards() {
  try {
    let response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/");
    let data = await response.json();
    let deck_id = data.deck_id;

    response = await fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=12`);
    data = await response.json();
    let cards = data.cards;
    console.log(cards)
    return cards

  } catch(error) {
    throw new Error(error);
  }
} 
getCards();
function App() {
  const [count, setCount] = useState(0)
  return (
    <div className='card-wrapper'>
      
    </div>
  )
}

export default App
