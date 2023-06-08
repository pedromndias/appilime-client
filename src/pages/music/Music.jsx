import Iframe from 'react-iframe'
import logo from "../../assets/apple-logo.png"
import { ThemeContext } from '../../context/theme.context'
import { useContext } from 'react'
import ReactPlayer from 'react-player'

function Music() {
    const { theme} = useContext(ThemeContext)
    console.log(theme)
    // Create source depending on the theme:
    let playlistSourceLink
    if (theme === "darkTheme") playlistSourceLink = "https://www.youtube.com/watch?v=4WMBw2hX12o&list=RDEMatN94YxieMHPMjEeNTMaOA&start_radio=1&rv=_4kHxtiuML0"
    if (theme === "greenTheme") playlistSourceLink = "https://www.youtube.com/watch?v=kdzbuXYnwfE"
    if (theme === "redTheme") playlistSourceLink = "https://www.youtube.com/watch?v=W5Utkb85QCg"
    if (theme === "blueTheme") playlistSourceLink = "https://www.youtube.com/watch?v=UrxlRXKii10"
    console.log(playlistSourceLink);
  return (
    <div>
      <div className="show-music-warning">
        <h2>Please use a computer to play music</h2>
        <img src={logo} alt="logo" />
      </div>
      <div className="show-music-container">
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