import React, { useState } from "react";

function App() {

    const [breakLength, setBreakLength] = useState(5);
    const [sessionLenght, setSessionLenght] = useState(25);
    const [timer, setTimer] = useState("25:00");


    const increment = (e) => {
        if (e.target.id === 'break-increment' && breakLength < 59) {
            setBreakLength(breakLength + 1);
        } else if (e.target.id === 'session-increment' && sessionLenght < 59) {
            setSessionLenght(sessionLenght + 1);
        }
    };
    const decrement = (e) => {
        if (e.target.id === 'break-decrement' && breakLength > 1) {
            setBreakLength(breakLength - 1);
        } else if (e.target.id === "session-decrement" && sessionLenght > 1) {
            setSessionLenght(sessionLenght - 1);
        }
    };

    return (
        <div className="clock">
            <h1 className="clock-title">25 + 5 Clock</h1>
            <div className="clock-controls">
                <div id="break-label">
                    Break Length
                    <div className="clock-controls-break">
                        <button className="clock-controls-btn">
                            <i className="fa fa-arrow-down fa-3x" id="break-decrement" onClick={decrement}></i>
                        </button>
                        <div className="clock-controls-break-display">
                            {breakLength}
                        </div>
                        <button className="clock-controls-btn" >
                            <i className="fa fa-arrow-up fa-3x" id="break-increment" onClick={increment}></i>
                        </button>
                    </div>
                </div>
                <div id="session-label">
                    Session Length
                    <div className="clock-controls-session">
                        <button className="clock-controls-btn" >
                            <i id="session-decrement" onClick={decrement} className="fa fa-arrow-down fa-3x"></i>
                        </button>
                        <div className="clock-controls-session-display">
                            {sessionLenght}
                        </div>
                        <button className="clock-controls-btn">
                            <i className="fa fa-arrow-up fa-3x" id="session-increment" onClick={increment}></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="clock-display">
                <div id="timer-label" className="clock-display-title">
                    Session
                </div>
                <div id="time-left"
                    className="clock-display-time"
                    type="time"
                    min="00:00"
                    max="59:59"
                    required
                >
                    {timer}
                </div>
            </div>
            <div id="start_stop">
            </div>
            <audio src="" id="beep"></audio>
            <div className="clock-icons">
                <i className="fa fa-play-circle fa-3x"></i>
                <i className="fa fa-pause-circle fa-3x"></i>
                <i className="fa fa-refresh fa-3x" id="reset"></i>
            </div>
            <div className="clock-signature">
                <p>
                    Designed by Peter Weinberg
                </p>
                <p>
                    Coded by Nadia
                </p>
            </div>
        </div>
    );
}

export default App;
