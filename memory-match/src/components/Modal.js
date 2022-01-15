import './Modal.css'

import ReactDOM from 'react-dom'
import './Modal.css'

export default function Modal({ children, shuffleCards }) {
    return ReactDOM.createPortal((
        <div className="modal-backdrop">
            <div className="modal" style={{
                border: "4px solid", 
                borderColor: "#555555",
                textAlign: "center"
            }}>
                {children}
                <button onClick={shuffleCards}>Restart</button>
            </div>
        </div>
    ), document.body)
}