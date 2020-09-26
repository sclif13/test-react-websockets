import React, { useContext } from "react"
import SignIn from "./components/SignIn"
import WSConteiner from "./components/WSConteiner"
import { RootContext } from "./components/RootContext"

function App() {
    const { authenticated } = useContext(RootContext)
    return authenticated ? <WSConteiner /> : <SignIn />
}

export default App
