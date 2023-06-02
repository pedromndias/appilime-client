// This component will be a wrapper to other components to render them only if the user is logged in. HOC: Higher Order Component

import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { Navigate } from "react-router-dom"

function IsPrivate(props) {
    // ? If the user is logged in, render the children component. If not then redirect to other place (public)
    // Use context:
    const {isLoggedIn} = useContext(AuthContext)
    if (isLoggedIn) {
        return props.children
    } else {
        // ? React does not allow us to use navigate on the base of the component, only on a function. So to redirect here we should return the component Navigate (from "react-router-dom"):
        return <Navigate to="/" />
    }
}

export default IsPrivate