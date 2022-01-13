import './TurnPara.css'

export default function TurnPara({ turns }) {

    return (
        <p>Tip: <span className='phplol'>Don't click php first.</span> Anyway, you've made {turns} {turns === 1 ? "turn" : "turns"} so far.</p>
    )
}
