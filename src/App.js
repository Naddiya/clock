import React, { useState } from "react";

function App() {

    const [breakLength, setBreakLength] = useState(5);
    const [sessionLenght, setSessionLenght] = useState(25);
    const [timer, setTimer] = useState("25:00");



    return (
        <div className="clock">
            <h1 className="clock-title">25 + 5 Clock</h1>
            <div className="clock-controls">
                <div id="break-label">
                    Break Length
                    <div id="break-decrement" className="clock-controls-numbers">
                        <i class="fa fa-arrow-down"></i>
                        {breakLength}
                        <i class="fa fa-arrow-up"></i>
                    </div>
                </div>
                <div id="session-label">
                    Session Length
                    <div id="session-increment" className="clock-controls-numbers">
                        <i class="fa fa-arrow-down"></i>
                        {sessionLenght}
                        <i class="fa fa-arrow-up"></i>
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

            <i className="fa fa-play-circle fa-3x"></i>
            <i className="fa fa-pause-circle fa-3x"></i>
            <i className="fa fa-refresh fa-3x" id="reset"></i>

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
