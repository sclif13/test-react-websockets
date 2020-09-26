import React, { useState, useContext } from "react"
import { Row, Col, Card, Form, Input, Button, notification } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { Store } from "antd/lib/form/interface"
import api from "../../api/api"
import { RootContext } from "../RootContext"

export default () => {
    const [loading, setLoading] = useState(false)
    const { setAuthenticated, setToken } = useContext(RootContext)
    const onFinish = async (values: Store) => {
        setLoading(true)
        try {
            const { headers } = await api.post("/login", values)
            setToken(headers["x-test-app-jwt-token"])
            setAuthenticated(true)
        } catch (err) {
            if (err.response) {
                notification.error({
                    message: err.response.data?.description || err.response.statusText,
                })
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
            <Col className="login-form">
                <Card title="SIGN IN">
                    <Form name="normal_login" initialValues={{ remember: true }} onFinish={onFinish}>
                        <Form.Item name="username" rules={[{ required: true, message: "Please input your Username!" }]}>
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Username"
                                disabled={loading}
                            />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                                disabled={loading}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" disabled={loading}>
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}
