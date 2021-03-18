import { LoadingOutlined } from '@ant-design/icons'
import React from 'react'
import styled from 'styled-components'
import { Spin } from 'antd';


const Container = styled.div`
    margin-top:40vh;
    flex-grow:1;
    display:flex;
    align-items:center;
    justify-content:center;
`

const LoadingView = () => {
    return (
        <Container>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 56 }} />} />
        </Container>
    )
}

export default LoadingView
