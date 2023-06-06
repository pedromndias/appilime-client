import { Link } from "react-router-dom"

function Sidebar() {
  return (
    <div className="sidebar-container">
      <Link to={"/lists"}>To-Dos</Link>
      <Link to={"/expenses"}>Expenses</Link>
      <Link to={"/timer"}>Timer</Link>
      <Link to={"/google"}>Google</Link>
    </div>
  )
}

export default Sidebar