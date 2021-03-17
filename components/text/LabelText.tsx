import React from 'react'
import styled from 'styled-components'

interface LabelTextProps {
    label: string
    onPress?: () => void
}

const Container = styled.div`
    display:flex;
    align-items: center;
    justify-content:space-between;
    margin-bottom:8px;
    &:hover {
        cursor:pointer;
    }
`

const LabelText: React.FC<LabelTextProps> = ({ label, children, onPress }) => {
    return (
        <Container onClick={onPress} >
            <div>{label}</div>
            <div>{children}</div>
        </Container>
    )
}

export default LabelText
