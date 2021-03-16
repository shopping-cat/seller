import { Button, Checkbox, Form, Input } from 'antd'
import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { auth } from '../lib/firebase'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display:flex;
    align-items:center;
    justify-content:center;
`

const FormContainer = styled(Form)`
    width: 50vw;
`

const login = () => {

    const onFinish = useCallback((v) => {
        auth.signInWithEmailAndPassword(v.email, v.password)
    }, [])


    return (
        <Container>
            <FormContainer
                name="basic"
                onFinish={onFinish}
            >
                <Form.Item
                    label="이메일"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: '이메일을 입력해주세요',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="비밀번호"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '비밀번호를 입력해주세요',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit">로그인</Button>
                </Form.Item>
            </FormContainer>
        </Container>
    )
}

export default login
