import { ArrowRightOutlined } from '@ant-design/icons'
import { Card, Col, Descriptions, List, Row, Space, Statistic } from 'antd'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import LabelText from '../../components/text/LabelText'
import dynamic from 'next/dynamic';
import { Line as AntdLine } from '@ant-design/charts'
import moneyFormat from '../../lib/moneyFormat'
import { useDashboard } from '../../graphql/dashboard'
import LoadingView from '../../components/View/LoadingView'
import dayjs from 'dayjs'

const Line = dynamic(
    () => import("@ant-design/charts").then((mod) => mod.Line) as any,
    { ssr: false },
) as typeof AntdLine


const Container = styled.div`
    display:flex;
    flex-direction:row;
`

const RowContainer = styled.div`
    flex-grow:1;
`


const dashboard = () => {

    const { push } = useRouter()
    const { data, loading } = useDashboard()

    if (loading) return <LoadingView />

    return (
        <Container >
            <RowContainer>
                <Row gutter={[16, 16]} >
                    <Col span={6} >
                        <Card title='주문' extra={<Link href='/order' ><a><ArrowRightOutlined /></a></Link>} >
                            <LabelText onPress={() => push('/order/new')} label='신규주문' >{data.shop.newOrderNum}</LabelText>
                            {/* <LabelText onPress={() => push('/order/deliveryReady')} label='배송준비' >{1}</LabelText> */}

                        </Card>
                    </Col>
                    <Col span={6} >
                        <Card title='배송' extra={<Link href='/order' ><a><ArrowRightOutlined /></a></Link>} >
                            <LabelText onPress={() => push('/order/onDelivery')} label='배송중' >{data.shop.onDeliveryOrderNum}</LabelText>
                            <LabelText onPress={() => push('/order/completedDelivery')} label='배송완료' >{data.shop.completedDeliveryOrderNum}</LabelText>
                        </Card>
                    </Col>
                    <Col span={6} >
                        <Card title='클레임' extra={<Link href='/order' ><a><ArrowRightOutlined /></a></Link>} >
                            <LabelText onPress={() => push('/order/exchangeRequest')} label='교환요청' >{data.shop.exchangeRequestOrderNum}</LabelText>
                            <LabelText onPress={() => push('/order/refundRequest')} label='환불요청' >{data.shop.refundRequestOrderNum}</LabelText>
                        </Card>
                    </Col>
                    <Col span={6} >
                        <Card title='정산' extra={<Link href='/profit' ><a><ArrowRightOutlined /></a></Link>} >
                            <LabelText onPress={() => push('/profit')} label='구매확정' >{data.shop.confirmedOrderNum}</LabelText>
                            <LabelText onPress={() => push('/profit')} label='정산 가능 금액' >{moneyFormat(data.shop.balance)}</LabelText>
                        </Card>
                    </Col>

                    <Col span={12} >
                        <Card
                            title='월별 수익'
                            extra={<Link href='/profit' ><a><ArrowRightOutlined /></a></Link>}
                        >
                            <Line
                                data={data.monthlyProfit.map((v, index) => ({ '수익': v, '월': (dayjs().add(index - data.monthlyProfit.length + 1, 'month').month() + 1).toString() }))}
                                xField='월'
                                yField='수익'
                                xAxis={{
                                    label: {
                                        formatter: v => v + '월'
                                    }
                                }}
                                yAxis={{
                                    label: {
                                        formatter: v => moneyFormat(Number(v))
                                    },
                                }}
                                point={{
                                    size: 5,
                                    shape: 'diamond',
                                    style: {
                                        fill: 'white',
                                        stroke: '#5B8FF9',
                                        lineWidth: 2,
                                    }
                                }}
                            />
                        </Card>
                    </Col>

                    <Col span={6} >
                        <Card
                            title={`신규리뷰`}
                            extra={<Link href='/review' ><a><ArrowRightOutlined /></a></Link>}
                        >
                            <List
                                dataSource={['문의드립니다']}
                                renderItem={item => (
                                    <List.Item>
                                        {item}
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                </Row>
            </RowContainer>
        </Container>
    )
}

export default dashboard
