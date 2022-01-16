import './Modal.css'

import ReactDOM from 'react-dom'
import './Modal.css'

export default function Modal({ children, winOrPhp }) {
    return ReactDOM.createPortal((
        <div className="modal-backdrop" style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            background: winOrPhp === "win" ? "rgba(0,255,0,0.5)" : "rgba(255,0,0,0.5)"
        }}>
            <div className="modal">
                {children}
            </div>
        </div>
    ), document.body)
}