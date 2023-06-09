import githubLogo from "../../assets/github-mark.png"

function Footer() {
  return (
    <div className="footer">
      
        <p>Made with ♥︎ by Pedro</p><a href="https://github.com/pedromndias/appilime-client" target="_blank" rel="noreferrer"><img className="github-logo" src={githubLogo} alt="github logo" /></a>
    </div>
  )
}

export default Footer