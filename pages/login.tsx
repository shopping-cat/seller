import React, { useEffect } from 'react'
import { auth } from '../lib/firebase'

const login = () => {

    useEffect(() => {
        // auth.signInWithEmailAndPassword('123@gmail.com', '123123')
    }, [])


    return (
        <div>
            <h1>login</h1>
        </div>
    )
}

export default login
