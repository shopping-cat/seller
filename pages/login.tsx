import React, { useEffect } from 'react'
import { auth } from '../lib/firebase'

const login = () => {

    useEffect(() => {
        auth.signOut()
    }, [])


    return (
        <div>
            <h1>login</h1>
        </div>
    )
}

export default login