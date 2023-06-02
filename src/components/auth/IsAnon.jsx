// This component will be a wrapper to other components to render them only if the user is not logged in (anon).

import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { Navigate } from "react-router-dom"

function IsAnon(props) {
  // ? If the user is not logged in, render the children component. If not then redirect to main (private)
    // Use context:
    const {isLoggedIn} = useContext(AuthContext)
    if (!isLoggedIn) {
        return props.children
    } else {
        return <Navigate to="/main" />
    }
}

export default IsAnon