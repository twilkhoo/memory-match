import './SingleCard.css'

export default function SingleCard({ card }) {
    return (
        <div className="card">
            <div>
                <img src={card.src} className="front" alt="front of the card" />
                <img src="/img/cover.png" className="back" alt="back of the card"/>
            </div>
        </div>
    )
}
