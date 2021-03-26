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

const data = [
    {
        '월': '1',
        '수익': 3303623,
    },
    {
        '월': '2',
        '수익': 1255303,
    },
    {
        '월': '3',
        '수익': 3350230,
    },
    {
        '월': '4',
        '수익': 5235053,
    },
    {
        '월': '5',
        '수익': 3523523,
    },
    {
        '월': '6',
        '수익': 6436344,
    },
]

const dashboard = () => {

    const { push } = useRouter()
    // const { data } = useItem({ variables: { id: 1 } })


    return (
        <Container >
            <RowContainer>
                <Row gutter={[16, 16]} >
                    <Col span={6} >
                        <Card title='주문' extra={<Link href='/order' ><a><ArrowRightOutlined /></a></Link>} >
                            <LabelText onPress={() => push('/order/new')} label='신규주문' >{1}</LabelText>
                            {/* <LabelText onPress={() => push('/order/deliveryReady')} label='배송준비' >{1}</LabelText> */}

                        </Card>
                    </Col>
                    <Col span={6} >
                        <Card title='배송' extra={<Link href='/order' ><a><ArrowRightOutlined /></a></Link>} >
                            <LabelText onPress={() => push('/order/onDelivery')} label='배송중' >{1}</LabelText>
                            <LabelText onPress={() => push('/order/completedDelivery')} label='배송완료' >{1}</LabelText>
                        </Card>
                    </Col>
                    <Col span={6} >
                        <Card title='클레임' extra={<Link href='/order' ><a><ArrowRightOutlined /></a></Link>} >
                            <LabelText onPress={() => push('/order/exchangeRequest')} label='교환요청' >{1}</LabelText>
                            <LabelText onPress={() => push('/order/refundRequest')} label='환불요청' >{1}</LabelText>
                        </Card>
                    </Col>
                    <Col span={6} >
                        <Card title='정산' extra={<Link href='/profit' ><a><ArrowRightOutlined /></a></Link>} >
                            <LabelText onPress={() => push('/profit')} label='정산예정' >{1}</LabelText>
                            <LabelText onPress={() => push('/profit')} label='오늘정산완료' >{1}</LabelText>
                        </Card>
                    </Col>

                    <Col span={12} >
                        <Card
                            title='수익'
                            extra={<Link href='/profit' ><a><ArrowRightOutlined /></a></Link>}
                        >
                            <Statistic title='잔고' value={112893} style={{ marginBottom: 24 }} />
                            <Line
                                data={data}
                                xField='월'
                                yField='수익'
                                xAxis={{
                                    label: {
                                        formatter: v => v + '월'
                                    }
                                }}
                                yAxis={{
                                    label: {
                                        formatter: v => moneyFormat(Number(v)),
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
                            title={`미답변문의 (${10})`}
                            extra={<Link href='/inquery' ><a><ArrowRightOutlined /></a></Link>}
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

                    <Col span={6} >
                        <Card
                            title='공지사항'
                            extra={<Link href='/notification' ><a><ArrowRightOutlined /></a></Link>}
                        >
                            <List
                                dataSource={['공지사항']}
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
