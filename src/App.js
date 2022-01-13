import React, { useEffect, useState } from "react";

const App = () => {

    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(parseInt(0, 10));
    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(25);
    const [timer, setTimer] = useState(false);
    const [reset, setReset] = useState(false);
    const [warning, setWarning] = useState(false);
    const [session, setSession] = useState("Session");
    const [playing, setPlaying] = useState(false);

    const startStopTimer = (value) => {
        if (value === "start") {
            setTimer(true);
        } else if (value === "stop") {
            setTimer(false);
        } else if (value === "reset") {
            setReset(true);
        }
    };
    const incrementSession = (e) => {
        if (!timer && sessionLength < 60) {
            setSessionLength(sessionLength + 1);
            if (session === "Session") {
                if (seconds !== 0) {
                    setSeconds(0);
                } else if (seconds === 0) {
                    setMinutes(minutes + 1);
                }
            }
        }
    };
    const decrementSession = () => {
        if (!timer && sessionLength > 1) {
            setSessionLength(sessionLength - 1);
            if (session === "Session") {
                if (seconds !== 0) {
                    setSeconds(0);
                } else if (seconds === 0) {
                    setMinutes(minutes - 1);
                }
            }
        }
    };
    const incrementBreak = () => {
        if (!timer && breakLength < 60) {
            setBreakLength(breakLength + 1);
            if (session === "Break") {
                if (seconds !== 0) {
                    setSeconds(0);
                } else if (seconds === 0) {
                    setMinutes(minutes + 1);
                }
            }
        }
    };
    const decrementBreak = () => {
        if (!timer && breakLength > 1) {
            setBreakLength(breakLength - 1);
            if (session === "Break") {
                if (seconds !== 0) {
                    setSeconds(0);
                } else if (seconds === 0) {
                    setMinutes(minutes - 1);
                }
            }
        }
    };
    // countdown rules
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
                } else if (minutes === 0 && seconds === 0) {
                    setPlaying(true);
                    setTimer(false);
                    if (session === "Session") {
                        setSession("Break");
                        setMinutes(breakLength);
                        setTimer(true);
                    } else if (session === "Break") {
                        setSession("Session");
                        setMinutes(sessionLength);
                        setTimer(true);
                    }
                    setPlaying(false);
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [breakLength, minutes, seconds, session, sessionLength, timer, warning]);
    // reset rules
    useEffect(() => {
        if (reset) {
            setTimer(false);
            setSessionLength(25);
            setBreakLength(5);
            setMinutes(25);
            setSeconds(0);
            setSession("Session");
            setPlaying(false);
        }
        setTimeout(setReset(false), 200);
    }, [breakLength, reset]);
    // warning if one second left
    useEffect(() => {
        minutes < 1 ? setWarning(true) : setWarning(false);
    }, [minutes, seconds, warning]);
    // play sound
    useEffect(() => {
        const audio = new Audio("https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav");
        playing ? audio.play() : audio.pause();
    },
        [playing]
    );

    return (
        <div className="clock">
            <h1 className="clock-title">25 + 5 Clock</h1>
            <div className="clock-controls">
                <div id="break-label">
                    Break Length
                    <div className="clock-controls-break" >
                        <button className="clock-controls-btn">
                            <i className="fa fa-arrow-down fa-3x" id="break-decrement" onClick={decrementBreak}></i>
                        </button>
                        <div id="break-length" className="clock-controls-break-display">
                            {breakLength}
                        </div>
                        <button className="clock-controls-btn" >
                            <i className="fa fa-arrow-up fa-3x" id="break-increment" onClick={incrementBreak}></i>
                        </button>
                    </div>
                </div>
                <div id="session-label">
                    Session Length
                    <div className="clock-controls-session">
                        <button className="clock-controls-btn"  >
                            <i id="session-decrement" onClick={decrementSession} className="fa fa-arrow-down fa-3x"></i>
                        </button>
                        <div id="session-length" className="clock-controls-session-display">
                            {sessionLength}
                        </div>
                        <button className="clock-controls-btn" onClick={incrementSession}>
                            <i className="fa fa-arrow-up fa-3x" id="session-increment" value="+"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className={`clock-display ${warning && "warning"}`}>
                <div id="timer-label" className="clock-display-title">
                    {session}
                </div>
                <div id="time-left" className="clock-display-time">
                    {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </div>
            </div>
            <div id="start_stop" className="clock-icons">
                <i className="fa fa-play-circle fa-3x" id="start" onClick={(e) => { startStopTimer(e.target.id); }}></i>
                <i className="fa fa-pause-circle fa-3x" id="stop" onClick={(e) => { startStopTimer(e.target.id); }}></i>
                <i className="fa fa-refresh fa-3x" id="reset" onClick={(e) => { startStopTimer(e.target.id); }}></i>
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
};

export default App;
