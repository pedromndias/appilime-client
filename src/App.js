import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/navigation/Footer";
import Navbar from "./components/navigation/Navbar";
import Home from "./pages/Home"
import Signup from "./pages/auth/Signup.jsx"
import Login from "./pages/auth/Login.jsx"
import Error from "./pages/errors/Error";
import NotFound from "./pages/errors/NotFound";
import Main from "./pages/private/Main.jsx"
import Profile from "./pages/private/Profile.jsx"
import TodoList from "./pages/lists/TodoList";
import TodoListAddForm from "./pages/lists/TodoListAddForm";
import TodoListDetails from "./pages/lists/TodoListDetails";
import Expenses from "./pages/expenses/Expenses";
import ExpensesAddNew from "./pages/expenses/ExpensesAddNew";
import ExpensesDetails from "./pages/expenses/ExpensesDetails";
import Timer from "./components/widgets/Timer.jsx"
import Game from "./pages/google/Game";
import Music from "./pages/music/Music";
import IsPrivate from "./components/auth/IsPrivate";
import IsAnon from "./components/auth/IsAnon";

// Import ThemeContext so we can access its states and functions:
import { ThemeContext } from "./context/theme.context";
import { useContext } from "react";


function App() {
    // Get the theme from context:
    const {theme} = useContext(ThemeContext)
    
    return <div className={`App app-container ${theme}`}>
      <Navbar />
      
      {/* Let's define our routes: */}
      <Routes>
        {/* Note the IsAnon as wrapper: */}
        <Route path="/" element={<IsAnon><Home /></IsAnon>}/>
        <Route path="/auth/signup" element={<IsAnon><Signup /></IsAnon>}/>
        <Route path="/auth/login" element={<IsAnon><Login /></IsAnon>}/>
        
        {/* Note the IsPrivate as wrapper: */}
        <Route path="/main" element={<IsPrivate><Main /></IsPrivate>}/>
        <Route path="/profile" element={<IsPrivate><Profile /></IsPrivate>}/>

        <Route path="/lists" element={<IsPrivate><TodoList /></IsPrivate>}/>
        <Route path="/lists/create" element={<IsPrivate><TodoListAddForm /></IsPrivate>}/>
        <Route path="/lists/:todoListId" element={<IsPrivate><TodoListDetails /></IsPrivate>}/>

        <Route path="/expenses" element={<IsPrivate><Expenses /></IsPrivate>} />
        <Route path="/expenses/create" element={<IsPrivate><ExpensesAddNew/> </IsPrivate>}/>
        <Route path="/expenses/:expenseId" element={<IsPrivate><ExpensesDetails /></IsPrivate>}/>

        <Route path="/timer" element={<IsPrivate><Timer /></IsPrivate>}/>
        <Route path="/game" element={<IsPrivate><Game /></IsPrivate>} />
        <Route path="/music" element={<IsPrivate><Music /></IsPrivate>} />

        {/* Error routes */}
        <Route path="/error" element={<Error />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>

      <Footer />

    </div>;
}

export default App;
