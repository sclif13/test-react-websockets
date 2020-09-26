import React, { useEffect, useState } from "react"

export type DefaultContextType = {
    authenticated: Boolean
    token: string | null
    setAuthenticated: Function
    setToken: Function
}

export type RootContextProviderType = {
    children: React.ReactNode
}

export const RootContext = React.createContext<DefaultContextType>({
    authenticated: false,
    token: "",
    setAuthenticated: () => {},
    setToken: () => {},
})

export default (props: RootContextProviderType) => {
    const prevAuth: Boolean = window.localStorage.getItem("authenticated") === "true"
    const prevToken: string | null = window.localStorage.getItem("token") || null
    const [authenticated, setAuthenticated] = useState(prevAuth)
    const [token, setToken] = useState(prevToken)
    useEffect(() => {
        window.localStorage.setItem("authenticated", authenticated.toString())
        window.localStorage.setItem("token", token || "")
    }, [authenticated, token])
    const defaultContext = {
        authenticated,
        token,
        setAuthenticated,
        setToken,
    }

    return <RootContext.Provider value={defaultContext}>{props.children}</RootContext.Provider>
}
