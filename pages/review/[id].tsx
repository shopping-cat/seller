import { useRouter } from 'next/dist/client/router'
import React from 'react'

const reviewDetail = () => {

    const { query } = useRouter()

    return (
        <div>
            review detail {query.id}
        </div>
    )
}

export default reviewDetail
