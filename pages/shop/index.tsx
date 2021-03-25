import { Button, Descriptions, Image } from 'antd'
import Link from 'next/link'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import LoadingView from '../../components/View/LoadingView'
import { useShop } from '../../graphql/shop'


const Container = styled.div`
    background-color:#fff;
    padding:24px;
`

const shop = () => {

    const { data, loading } = useShop()


    if (loading) return <LoadingView />

    return (
        <Container>
            <Descriptions title='상점정보' extra={<Link href='/shop/edit'><a><Button type='primary' >수정</Button></a></Link>} bordered >
                <Descriptions.Item span={3} label='상점이름' >{data.shop.shopName}</Descriptions.Item>
                <Descriptions.Item span={1.5} label='이메일' >{data.shop.seller.email}</Descriptions.Item>
                <Descriptions.Item span={1.5} label='사업자등록번호' >{data.shop.seller.licenseNumber}</Descriptions.Item>
                <Descriptions.Item span={1.5} label='평점' >{data.shop.rate}({data.shop.rateNum})</Descriptions.Item>
                <Descriptions.Item span={1.5} label='총 상품 수' >{data.shop.itemNum}개</Descriptions.Item>
                <Descriptions.Item span={3} label='상점이미지' ><Image src={data.shop.shopImage} style={{ height: 300, width: 300, objectFit: 'cover' }} /></Descriptions.Item>

            </Descriptions>
        </Container>
    )
}

export default shop
