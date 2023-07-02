import logo from "../assets/logo-01.png"
import todosPic from "../assets/Todo-Lists-screenshot.jpg"
import expensesPic from "../assets/Expenses-screenshot.jpg"
import computerPic from "../assets/computer-screenshot.jpg"
import mobilePic from "../assets/mobile-screenshot.jpg"
import themesPic from "../assets/themes-screenshot.jpg"
import musicPic from "../assets/music-screenshot.jpg"
import gamePic from "../assets/game-screenshot.jpg"

function About() {
    
  return (
    <div id="top" className="about-container">
        <img id="about-container-logo" src={logo} alt="appilime logo" />
        <h1>appilime</h1>
        <p className="about-container-slogan">the happy lime app</p>
        <br />
        <p className="about-container-description">
            Appilime is a productivity app with focus environment and task features like To-Dos List, Expenses tracker, Timer, Weather, crypto prices and many more.
        </p>
        <br />
        <h3>
            Save time with Appilime 🕰️
        </h3>
        <p className="about-container-p">
            Have all your daily tasks together in one place. No need to open extra browser tabs or other programs for your day by day functionalities.
        </p>
        <p className="about-container-p">Example of different Lists of To-Do's:</p>
        <img src={todosPic} alt="todo-list" />
        <br />
        <p className=".about-container-p">Example of an Expense List:</p>
        <img src={expensesPic} alt="expenses" />
        <br />
        <br />
        <br />
        <hr className="about-container-hr"/>
        <h3>
            Works on any screen 🖥️ 💻 📱
        </h3>
        <p className="about-container-p">
            Appilime was designed to run on any screen. You can use it on your desktop, laptop or your phone on the go. If you login, your data will be saved in your account.
        </p>
        <div className="about-container-responsive">
            <img id="about-container-responsive-computer" src={computerPic} alt="appilime on computer" />
            <img id="about-container-responsive-mobile" src={mobilePic} alt="appilime on mobile" />
        </div>
        <br />
        <br />
        <br />
        <hr className="about-container-hr"/>
        <h3>
            Introducing THEMES! 🎨
        </h3>
        <p className="about-container-p">
            Some app features will adapt to your mood, just tell us how you feel today! 🤓 😌 🥳 🫤
        </p>
        <img src={themesPic} alt="themes" />
        <br />
        <br />
        <br />
        <hr className="about-container-hr"/>
        
        <h3>
            Listen to music according to your mood 🎹
        </h3>
        <p>
            A suggested playlist will appear on the "Music" tab:
        </p>
        <img src={musicPic} alt="music" />
        <br />
        <br />
        <br />
        <hr className="about-container-hr"/>
        <h3>Need a break? ☕️</h3>
        <p>
            In case you need a break from your study/work, there's a simple but very fun game as well. It's a motorcycle game with two levels. Try to avoid the other vehicles!
        </p>
        <img src={gamePic} alt="game" />
        <br />
        <br />
        <br />
        <br />
        <a className="about-container-link-back" href="#">⬆ Back to top ⬆</a>
        <br />

    </div>
  )
}

export default About