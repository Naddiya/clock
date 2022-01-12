import React, { useEffect, useState } from "react";

function App() {

    const [breakLength, setBreakLength] = useState(5);
    const [sessionLenght, setSessionLenght] = useState(25);
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [timer, setTimer] = useState(false);
    const [reset, setReset] = useState(false);
    const [session, switchSession] = useState(true);
    const [warning, setWarning] = useState(false);

    const updateTimer = (value) => {
        if (value === "start") {
            setTimer(true);
        } else if (value === "stop") {
            setTimer(false);
        } else if (value === "reset") {
            setReset(true);
        }
    };

    const increment = (value) => {
        if (value === 'break-increment' && breakLength < 59) {
            !session && setMinutes(minutes + 1);
            setBreakLength(breakLength + 1);
        } else if (value === 'session-increment' && sessionLenght < 59) {
            session && setSessionLenght(sessionLenght + 1);
            setMinutes(minutes + 1);
        }
    };
    const decrement = (value) => {
        if (value === 'break-decrement' && breakLength >= 1) {
            !session && setMinutes(minutes - 1);
            setBreakLength(breakLength - 1);
        } else if (value === "session-decrement" && sessionLenght >= 1) {
            session && setSessionLenght(sessionLenght - 1);
            setMinutes(minutes - 1);
        }
    };

    useEffect(() => {
        if (timer) {
            const interval = setInterval(() => {
                if (seconds === 0 && minutes > 0) {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                } else if (seconds > 0) {
                    setSeconds(seconds - 1);
                } else if (minutes > 0) {
                    setMinutes(minutes - 1);
                } else if (session && minutes === 0 && seconds === 0) {
                    switchSession(false);
                    setMinutes(breakLength);
                } else if (!session && minutes === 0 && seconds === 0) {
                    switchSession(true);
                    setMinutes(sessionLenght);
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [breakLength, minutes, seconds, session, sessionLenght, timer, warning]);

    useEffect(() => {
        if (reset) {
            setTimer(false);
            setSeconds(0);
            setBreakLength(5);
            setSessionLenght(25);
            setMinutes(25);
            switchSession(true);
            setTimeout(setReset(false), 500);
        }
    }, [breakLength, reset]);

    useEffect(() => {
        minutes < 1 ? setWarning(true) : setWarning(false);
    }, [minutes, warning]);

    useEffect(() => {
        if (minutes === 0 && seconds === 0) {
            const audio = new Audio("https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav");
            audio.play();
        }
    }, [minutes, seconds]);

    return (
        <div className="clock">
            <h1 className="clock-title">25 + 5 Clock</h1>
            <div className="clock-controls">
                <div id="break-label">
                    Break Length
                    <div className="clock-controls-break">
                        <button className="clock-controls-btn">
                            <i className="fa fa-arrow-down fa-3x" id="break-decrement" onClick={(e) => { decrement(e.target.id); }}></i>
                        </button>
                        <div className="clock-controls-break-display">
                            {breakLength}
                        </div>
                        <button className="clock-controls-btn" >
                            <i className="fa fa-arrow-up fa-3x" id="break-increment" onClick={(e) => { increment(e.target.id); }}></i>
                        </button>
                    </div>
                </div>
                <div id="session-label">
                    Session Length
                    <div className="clock-controls-session">
                        <button className="clock-controls-btn" >
                            <i id="session-decrement" onClick={(e) => { decrement(e.target.id); }} className="fa fa-arrow-down fa-3x"></i>
                        </button>
                        <div className="clock-controls-session-display">
                            {sessionLenght}
                        </div>
                        <button className="clock-controls-btn">
                            <i className="fa fa-arrow-up fa-3x" id="session-increment" onClick={(e) => { increment(e.target.id); }}></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className={`clock-display ${warning && "warning"}`}>
                <div id="timer-label" className="clock-display-title">
                    {session === true ? "Session" : "Break"}
                </div>
                <div id="time-left" className="clock-display-time">
                    {minutes < 10 ? `0${minutes}` : minutes}
                    :
                    {seconds < 10 ? `0${seconds}` : seconds}

                </div>
            </div>
            <div id="start_stop" className="clock-icons">
                <i className="fa fa-play-circle fa-3x" id="start" onClick={(e) => { updateTimer(e.target.id); }}></i>
                <i className="fa fa-pause-circle fa-3x" id="stop" onClick={(e) => { updateTimer(e.target.id); }}></i>
                <i className="fa fa-refresh fa-3x" id="reset" onClick={(e) => { updateTimer(e.target.id); }}></i>
                <audio
                    id="beep"
                    preload="auto"
                    src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
                >
                </audio>
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
