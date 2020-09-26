import React, { useContext, useEffect, useRef, useState, useCallback } from "react"
import { RootContext } from "../RootContext"
import DateTimeView from "../DateTimeView"
import api from "../../api/api"
import { Row, Col, Card, Button, notification } from "antd"

export default () => {
    const { token, setAuthenticated, setToken } = useContext(RootContext)
    const ws = useRef<WebSocket | null>(null)
    const [serverTime, setServerTime] = useState<Date | null>(null)
    const [connected, setConnected] = useState(false)
    const logOut = useCallback(() => {
        setAuthenticated(false)
        setToken("")
    }, [setAuthenticated, setToken])

    const connect = useCallback(async () => {
        try {
            const { data } = await api.get("/subscribe", {
                headers: {
                    "x-test-app-jwt-token": token,
                },
            })
            ws.current = new WebSocket(data.url)
            ws.current.onopen = () => {
                setConnected(true)
            }
            ws.current.onclose = (e) => {
                setConnected(false)
                setTimeout(() => {
                    if (ws) {
                        connect()
                    }
                }, 1000)
            }
            ws.current.onmessage = ({ data }) => {
                const json = JSON.parse(data)
                setServerTime(new Date(json.server_time * 1000))
            }
        } catch (err) {
            if (err.response) {
                if (err.response?.status === 401) {
                    logOut()
                }
                notification.error({
                    message: err.response.data?.description || err.response.statusText,
                })
            }
        }
    }, [token, logOut])

    useEffect(() => {
        connect()
        return () => {
            ws.current?.close()
        }
    }, [connect])

    return (
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
            <Col className="login-form">
                <Card title="SERVER TIME">
                    <DateTimeView date={serverTime} connected={connected} />
                    <Button type="primary" className="login-form-button" onClick={logOut}>
                        Log out
                    </Button>
                </Card>
            </Col>
        </Row>
    )
}
