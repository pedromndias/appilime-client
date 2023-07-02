import logo from "../../assets/apple-computers.png"
import { ThemeContext } from '../../context/theme.context'
import { useContext } from 'react'
import ReactPlayer from 'react-player'

function Music() {
    const { theme} = useContext(ThemeContext)
    console.log(theme)
    // Create source and mood depending on the theme:
    let playlistSourceLink
    if (theme === "darkTheme") playlistSourceLink = "https://www.youtube.com/watch?v=4WMBw2hX12o&list=RDEMatN94YxieMHPMjEeNTMaOA&start_radio=1&rv=_4kHxtiuML0"
    if (theme === "greenTheme") playlistSourceLink = "https://www.youtube.com/watch?v=kdzbuXYnwfE"
    if (theme === "redTheme") playlistSourceLink = "https://www.youtube.com/watch?v=W5Utkb85QCg"
    if (theme === "blueTheme") playlistSourceLink = "https://www.youtube.com/watch?v=UrxlRXKii10"
    // console.log(playlistSourceLink);
    let mood
    if (theme === "darkTheme") mood = "focus"
    if (theme === "greenTheme") mood = "relaxing"
    if (theme === "redTheme") mood = "exciting"
    if (theme === "blueTheme") mood = "melancholic"
    
  return (
    <div className="music-container-general">
      <div className="show-music-warning">
        <h2>Please use a computer to play music</h2>
        <img src={logo} alt="logo" />
      </div>
      <div className="show-music-container">
        <h2>Some {mood} music:</h2>
        <ReactPlayer url={playlistSourceLink}
        style={{margin: "50px auto", maxWidth: "900px"}}
        controls={true}
        config={{
          youtube: {
            playerVars: { color: 'red' },
          },
        }}/>
      </div>
        
    </div>
  )
}

export default Music