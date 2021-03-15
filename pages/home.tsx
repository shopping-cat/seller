import React from 'react'
import { useItem } from '../graphql/item'

const home = () => {
    const { data } = useItem({ variables: { id: 1 } })


    return (
        <div>
            <p>{data?.item.name || ''}</p>
        </div>
    )
}

export default home
