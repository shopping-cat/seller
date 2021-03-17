import React from 'react'
import Layout from '../../components/Layout'
import { useItem } from '../../graphql/item'

const dashboard = () => {
    const { data } = useItem({ variables: { id: 1 } })


    return (
        <div>
            <p>{data?.item.name || ''}</p>
        </div>
    )
}

export default dashboard
