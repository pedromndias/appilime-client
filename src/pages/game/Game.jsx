// Use Iframe from the react-iframe package to embed an external page on our app:
import Iframe from 'react-iframe'
import logo from "../../assets/apple-computers.png"

function Game() {
  return (
    <div className='game-container-general'>
      <div className="show-game-warning">
        <h2>Please use a computer to play the game</h2>
        <img src={logo} alt="logo" />
      </div>
      <div className="show-game-container">
      <Iframe url="https://pedromndias.github.io/lets-ride-to-france-game/" className="show-game"/>
      </div>
        
    </div>
  )
}

export default Game