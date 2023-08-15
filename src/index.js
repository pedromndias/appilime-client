import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "./context/auth.context";
import { ThemeWrapper } from "./context/theme.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
// ? Note the wrappers. Auth and Theme from context and BrowserRouter that enables navigation between the pages/components.
root.render(
    <BrowserRouter>
        <AuthWrapper>
            <ThemeWrapper>
                <App />
            </ThemeWrapper>
        </AuthWrapper>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
