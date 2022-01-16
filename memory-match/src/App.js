import './App.css';
import { useEffect, useState } from 'react'
import SingleCard from './components/SingleCard'
import TurnPara from './components/TurnPara'
import Modal from './components/Modal';

const cardImages = [
    {"src": "/img/react-brands.png", matched: false},
    {"src": "/img/angular-brands.png", matched: false},
    {"src": "/img/vuejs-brands.png", matched: false},
    {"src": "/img/node-js-brands.png", matched: false},
    {"src": "/img/unity-brands.png", matched: false},
    {"src": "/img/php-brands.png", matched: false},
    {"src": "/img/github-brands.png", matched: false},
    {"src": "/img/aws-brands.png", matched: false}
]

function App() {

    const [showWinModal, setShowWinModal] = useState(false);
    const [showPhpModal, setShowPhpModal] = useState(false);
    const [initTurn, setInitTurn] = useState(true);
    const [cards, setCards] = useState ([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [matchCount, setMatchCount] = useState(0);

    // start a new game automatically
    useEffect(() => {
        shuffleCards()
    }, [])

    // shuffle cards
    const shuffleCards = () => {
        setShowWinModal(false);
        setShowPhpModal(false);
        setInitTurn(true);
        setMatchCount(0);
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }));

        setCards(shuffledCards)
        setTurns(0)
    }

    //handle a card choice
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
        if(card.src === "/img/php-brands.png" && initTurn) {
            setShowPhpModal(true);
        }
        else {
            setInitTurn(false);
        }
    }

    // compare the two cards, note that useEffect will fire every time anything in the dependency array changes
    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.src === choiceTwo.src) { // found a match
                setMatchCount(matchCount + 1);
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
                // determine if you've won
                console.log(matchCount);
                if (matchCount === 7) {
                    setShowWinModal(true);
                }
            } else {
                setTimeout(() => resetTurn(), 1000)
            }
        }
    }, [choiceOne, choiceTwo])

    // reset the cards
    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }

    return (
        <div className="App">

            {showWinModal && 
                (<Modal shuffleCards={shuffleCards} winOrPhp={"win"}>
                    <p>You did it in {turns} tries!</p>
                    <button onClick={shuffleCards}>Play again?</button>
                </Modal>)}

            {showPhpModal && 
            (<Modal shuffleCards={shuffleCards} winOrPhp={"php"}>
                <p>Oh no! You clicked php first and everything stopped responding.</p>
                <button onClick={shuffleCards}>Play again?</button>
            </Modal>)}

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
