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
import ExpensesAddForm from "./pages/expenses/ExpensesAddForm";
import ExpensesDetails from "./pages/expenses/ExpensesDetails";
import Timer from "./pages/timer/Timer.jsx"
import GoogleSearch from "./pages/google/GoogleSearch";
import IsPrivate from "./components/auth/IsPrivate";
import IsAnon from "./components/auth/IsAnon";


function App() {
    return <div className="App app-container">
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
        <Route path="/expenses/create" element={<IsPrivate><ExpensesAddForm/> </IsPrivate>}/>
        <Route path="/expenses/:expenseId" element={<IsPrivate><ExpensesDetails /></IsPrivate>}/>

        <Route path="/timer" element={<IsPrivate><Timer /></IsPrivate>}/>
        <Route path="/google" element={<IsPrivate><GoogleSearch /></IsPrivate>} />

        {/* Error routes */}
        <Route path="/error" element={<Error />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>

      

      <Footer />

    </div>;
}

export default App;
