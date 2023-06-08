import { useEffect, useState, useRef } from "react"
import Sidebar from "./navigation/Sidebar"

function Timer() {
  // ? Let's create states to the drag functionality
  // When the component is pressed by the mouse:
  const [pressed, setPressed] = useState(false)
  // The position of the component. Start at {x: 20, y: 20}
  const [cryptoPricesComponentPosition, setCryptoPricesComponentPosition] = useState({x: 0, y: 0})
  // useRef so we maintain a value between renders:
  const ref = useRef()

  // Create a function to change the the ref value of the position:
  const changePositionWhenDragged = () => {
    // Check the current value of our ref and translate it when there is a change of position in x and y:
    if (ref.current) {
      ref.current.style.transform = `translate(${cryptoPricesComponentPosition.x}px, ${cryptoPricesComponentPosition.y}px)`
    }
  }
  // useEffect to call changePositionWhenDragged when there is any position change (note the dependency)
  useEffect(() => {
    changePositionWhenDragged()
  }, [cryptoPricesComponentPosition])

  // We should update the current position when the mouse is pressed:
  const mousePressedMove = (e) => {
    if (pressed) {
      setCryptoPricesComponentPosition( {
        x: cryptoPricesComponentPosition.x + e.movementX,
        y: cryptoPricesComponentPosition.y + e.movementY
      })
    }
  }
  
  // Create state for minutes and seconds:
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  // Create state for when the timer should be active:
  const [isActive, setIsActive] = useState(false)
  // Create state for a message:
  const [message, setMessage] = useState("");

  // useEffect to run the setInterval when the component mounts and isActive, minutes or  seconds are updadated:
  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          if (minutes === 0) {
            setIsActive(false);
            // Change the message:
            setMessage("Timer has finished!");
            clearInterval(intervalId);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    }
    // Clear the interval when the component is unmounted:
    return () => clearInterval(intervalId);
  }, [isActive, minutes, seconds]);

  // Create handlers for when the time starts:
  const startTimer = () => {
    if (minutes > 0 || seconds > 0) {
      setIsActive(true)
      setMessage("")
    }
  }

  // Create a handler to reset the timer:
  const resetTimer = () => {
    setIsActive(false);
    setMinutes(0);
    setSeconds(0);
  }

  return (
    <div ref= {ref} onMouseMove={mousePressedMove} onMouseDown={() => setPressed(true)} onMouseUp={() => setPressed(false)}>
      <div className="timer-container">
        <h1>Timer</h1>
          <div>
          <div className="timer-container-inputs">
            <input
              type="number"
              min={0}
              max={999}
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
            />
            <input
              type="number"
              min={0}
              max={59}
              value={seconds}
              onChange={(e) => setSeconds(Number(e.target.value))}
            />
          </div>
          <div className="timer-container-buttons">
            <button className="timer-container-button" onClick={startTimer}>Start</button>
            <button className="timer-container-button timer-container-button-reset" onClick={resetTimer}>Reset</button>
          </div>
          <div>
            {isActive && <h3 className="timer-container-info">
              {/* Note the padStart so the there are always 2 digits showing: */}
              {minutes.toString().padStart(2, '0')}:
              {seconds.toString().padStart(2, '0')}
            </h3>}
          </div>
          {!isActive && <h3 className="timer-container-info">{message}</h3>}
        </div>
      </div>
    </div>
  )
}

export default Timer