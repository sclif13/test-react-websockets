import React, { useContext } from "react"
import SignIn from "./components/SignIn"
import WSContainer from "./components/WSContainer"
import { RootContext } from "./components/RootContext"

function App() {
    const { authenticated } = useContext(RootContext)
    return authenticated ? <WSContainer /> : <SignIn />
}

export default App
