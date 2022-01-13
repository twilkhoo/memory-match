import './App.css';
import { useEffect, useState } from 'react'
import SingleCard from './components/SingleCard'
import TurnPara from './components/TurnPara';

const cardImages = [
    {"src": "/img/helmet-1.png", matched: false},
    {"src": "/img/potion-1.png", matched: false},
    {"src": "/img/ring-1.png", matched: false},
    {"src": "/img/scroll-1.png", matched: false},
    {"src": "/img/shield-1.png", matched: false},
    {"src": "/img/sword-1.png", matched: false}
]

function App() {

    const [cards, setCards] = useState ([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);

    // shuffle cards
    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }));

        setCards(shuffledCards)
        setTurns(0)
    }

    //handle a choice
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
        
    }

    // compare the two cards, note that useEffect will fire every time anything in the dependency array changes
    useEffect(() => {

        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.src === choiceTwo.src) {

                setCards(prevCards => {
                    return prevCards.map((card) => {
                        if (card.src === choiceOne.src) {
                            return {...card, matched: true}
                        } else {
                            return card
                        }
                    })
                })

                resetTurn()
            } else {
                setTimeout(() => resetTurn(), 1000)
            }
            
        }
    }, [choiceOne, choiceTwo])

    console.log(cards)

    // reset the cards
    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }

    // start a new game automatically
    useEffect(() => {
        shuffleCards()
    }, [])

    return (
        <div className="App">
            <h1>Techstack Match</h1>
            <TurnPara turns={turns}/>
            <div className="card-grid">
                {cards.map((card) => (
                    <SingleCard 
                        key={card.id} 
                        card={card} 
                        handleChoice={handleChoice} 
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                        disabled={disabled}
                    />
                ))}
            </div>
            <br/>
            <button onClick={shuffleCards}>Restart</button>
        </div>
    );
}

export default App;
