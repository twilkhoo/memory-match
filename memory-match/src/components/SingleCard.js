import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped, disabled }) {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img src={card.src} className="front" alt="front of the card" />
                <img src="/img/debut-light.png" className="back" onClick={handleClick} alt="back of the card"/>
            </div>
        </div>
    )
}
