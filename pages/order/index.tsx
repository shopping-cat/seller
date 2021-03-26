/*
payment 정상처리 이후
신규주문 (구매접수) -> action[취소(유저 요청 취소(문의), 재고부족 기타이유 등), 송장등록]      상품명 + 옵션 + 갯수
배송중 (배송중) 송장등록된 상품등록된 상품들만 -> 이후 [배송완료, 구매확정은] 자동으로 이루어짐    상품명 + 송장번호
배송완료 (배송완료) -> 액션 없음                                                    상품명 
구매확정 (구매확정) -> 액션없음                                                     상품명 
------------------------------------------------------------------------
환불요청 (교환중) -> 받은후에 환불처리 버튼 누르면 부분취소 이루어지고 환불처리됨                                     상품명
교환요청 (환불중) -> 받은후에 개인적으로 처리해야함 이메일, 전화번호 전송 이후 상황종료되면 교환처리 버튼눌러서 교환처리로 바뀜   상품명
교환처리 (환불 처리) -> 액션없음                                                                        상품명
교환처리 (교환 처리) -> 액션없음                                                                        상품명
*/
import { ArrowRightOutlined } from '@ant-design/icons'
import { Card, Col, List, Row } from 'antd'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import LoadingView from '../../components/View/LoadingView'
import { useOrderInfos } from '../../graphql/order'


const Container = styled.div`
    flex-grow:1;
`



const order = () => {

    const { } = useRouter()

    const { data, loading } = useOrderInfos()

    if (loading) return <LoadingView />

    const isRefundOrExchange = !!(data.shop.refundRequestOrderNum || data.shop.exchangeRequestOrderNum)

    const RefundExchangeCols = () =>
        <>
            <Col span={6} >
                <Card headStyle={{ color: !!data.shop.refundRequestOrderNum && 'red' }} title={`환불요청 (${data.shop.refundRequestOrderNum})`} extra={<Link href='/order/refundRequest' ><a><ArrowRightOutlined /></a></Link>} >
                    <List
                        dataSource={data.refundRequestOrders}
                        renderItem={item => (<List.Item>{item.item + ' ' + item.stringOptionNum}</List.Item>)}
                    />
                </Card>
            </Col>
            <Col span={6} >
                <Card headStyle={{ color: !!data.shop.exchangeRequestOrderNum && 'red' }} title={`교환요청 (${data.shop.exchangeRequestOrderNum})`} extra={<Link href='/order/exchangeRequest' ><a><ArrowRightOutlined /></a></Link>} >
                    <List
                        dataSource={data.exchangeRequestOrders}
                        renderItem={item => (<List.Item>{item.item + ' ' + item.stringOptionNum}</List.Item>)}
                    />
                </Card>
            </Col>
            <Col span={6} >
                <Card title={`환불처리 (${data.shop.refundedOrderNum})`} extra={<Link href='/order/refunded' ><a><ArrowRightOutlined /></a></Link>} >
                    <List
                        dataSource={data.refundedOrders}
                        renderItem={item => (<List.Item>{item.item + ' ' + item.stringOptionNum}</List.Item>)}
                    />
                </Card>
            </Col>
            <Col span={6} >
                <Card title={`교환처리 (${data.shop.exchangedOrderNum})`} extra={<Link href='/order/exchanged' ><a><ArrowRightOutlined /></a></Link>} >
                    <List
                        dataSource={data.exchangedOrders}
                        renderItem={item => (<List.Item>{item.item + ' ' + item.stringOptionNum}</List.Item>)}
                    />
                </Card>
            </Col>
        </>

    return (
        <Container>
            <Row gutter={[16, 16]} >
                {isRefundOrExchange && <RefundExchangeCols />}

                <Col span={6} >
                    <Card title={`신규주문 (${data.shop.newOrderNum})`} extra={<Link href='/order/new' ><a><ArrowRightOutlined /></a></Link>} >
                        <List
                            dataSource={data.newOrders}
                            renderItem={item => (<List.Item>{item.item + ' ' + item.stringOptionNum}</List.Item>)}
                        />
                    </Card>
                </Col>
                <Col span={6} >
                    <Card title={`배송중 (${data.shop.onDeliveryOrderNum})`} extra={<Link href='/order/onDelivery' ><a><ArrowRightOutlined /></a></Link>} >
                        <List
                            dataSource={data.onDeliveryOrders}
                            renderItem={item => (<List.Item>{item.item + ' ' + item.stringOptionNum}</List.Item>)}
                        />
                    </Card>
                </Col>
                <Col span={6} >
                    <Card title={`배송완료 (${data.shop.completedDeliveryOrderNum})`} extra={<Link href='/order/completedDelivery' ><a><ArrowRightOutlined /></a></Link>} >
                        <List
                            dataSource={data.completedDeliveryOrders}
                            renderItem={item => (<List.Item>{item.item + ' ' + item.stringOptionNum}</List.Item>)}
                        />
                    </Card>
                </Col>
                <Col span={6} >
                    <Card title={`구매확정 (${data.shop.confirmedOrderNum})`} extra={<Link href='/order/confirmed' ><a><ArrowRightOutlined /></a></Link>} >
                        <List
                            dataSource={data.confirmedOrders}
                            renderItem={item => (<List.Item>{item.item + ' ' + item.stringOptionNum}</List.Item>)}
                        />
                    </Card>
                </Col>

                {!isRefundOrExchange && <RefundExchangeCols />}
            </Row>
        </Container>
    )
}

export default order
