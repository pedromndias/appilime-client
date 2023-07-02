import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"

function Sidebar() {
  // ? Let's create states to the drag functionality
  // When the component is pressed by the mouse:
  const [pressed, setPressed] = useState(false)
  // The position of the component. Start at {x: 20, y: 20}
  const [sideBarposition, setSideBarPosition] = useState({x: 0, y: 0})
  // useRef so we maintain a value between renders:
  const ref = useRef()

  // Create a function to change the the ref value of the position:
  const changePositionWhenDragged = () => {
    // Check the current value of our ref and translate it when there is a change of position in x and y:
    if (ref.current) {
      ref.current.style.transform = `translate(${sideBarposition.x}px, ${sideBarposition.y}px)`
    }
  }

  // useEffect to call changePositionWhenDragged when there is any position change (note the dependency)
  useEffect(() => {
    changePositionWhenDragged()
  }, [sideBarposition])

  // We should update the current position when the mouse is pressed:
  const mousePressedMove = (e) => {
    if (pressed) {
      setSideBarPosition( {
        x: sideBarposition.x + e.movementX,
        y: sideBarposition.y + e.movementY
      })
    }
  }

  // ? Note our return, the container has a reference to our ref and responds to onMouseMove, onMouseDown (change setPressed to true) and onMouseUp (change setPressed to false) events.
  return (
    <div className="sidebar-container" ref= {ref} onMouseMove={mousePressedMove} onMouseDown={() => setPressed(true)} onMouseUp={() => setPressed(false)}>
      <Link to={"/lists"}>To-Dos</Link>
      <Link to={"/expenses"}>Expenses</Link>
      <Link to={"/music"}>Music</Link>
      <Link to={"/game"}>Game</Link>
    </div>
  )
}

export default Sidebar