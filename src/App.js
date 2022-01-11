import './App.css';
import React, { useState } from "react";

function App() {

    const [breakLength, setBreakLength] = useState(5);
    const [sessionLenght, setSessionLenght] = useState(25);
    const [timer, setTimer] = useState("25:00");

    

    return (
        <div className="App">
            <div id="break-label">
                Break Length
                <div id="break-decrement">
                    {breakLength}
                </div>
            </div>
            <div id="session-label">
                Session Length
                <div id="session-increment">
                    {sessionLenght}
                </div>
            </div>
            <div id="timer-label">
                Session
            </div>
            <div id="time-left"
                type="time"
                min="00:00"
                max="59:59"
                required
            >
                {timer}
            </div>
            <div id="start_stop">

            </div>
            <audio src="" id="beep"></audio>
            <div id="reset"></div>
        </div>
    );
}

export default App;
