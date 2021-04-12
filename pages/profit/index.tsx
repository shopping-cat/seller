import { Line as AntdLine } from '@ant-design/charts'
import { Button, Col, Row, Space, Statistic, Table } from 'antd'
import dayjs from 'dayjs'
import dynamic from 'next/dynamic'
import React, { useCallback } from 'react'
import styled from 'styled-components'
import LabelText from '../../components/text/LabelText'
import LoadingView from '../../components/View/LoadingView'
import { useCreateProfitReceipt, useProfit } from '../../graphql/profitReceipt'
import dateFormat from '../../lib/dateFormat'
import moneyFormat from '../../lib/moneyFormat'

const Line = dynamic(
    () => import("@ant-design/charts").then((mod) => mod.Line) as any,
    { ssr: false },
) as typeof AntdLine

const Container = styled.div`
    background-color:#fff;
    padding:24px;
`


const profit = () => {

    const { data } = useProfit()
    const [createProfitReceipt, { loading }] = useCreateProfitReceipt()

    const onRequestCalculate = useCallback(() => {
        if (loading) return
        if (!confirm(`${moneyFormat(data.shop.balance)}원이 영업일로 3일 이내에 입금됩니다.`)) return
        createProfitReceipt()
    }, [loading, data])

    if (!data) return <LoadingView />

    return (
        <Container>

            <Row>
                <Col span={18} >
                    <h1 style={{ marginBottom: 24 }} >달별 정산 금액</h1>
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
                </Col>
                <Col span={6} >
                    <div style={{ marginLeft: 24 }} >
                        <Statistic title='잔고' value={data.shop.balance} style={{ marginBottom: 24 }} />
                        <LabelText label='예금주이름'>{data.shop.bankOwnerName}</LabelText>
                        <LabelText label='은행'>{data.shop.bankName}</LabelText>
                        <LabelText label='계좌번호'>{data.shop.bankAccountNumber}</LabelText>
                        <div style={{ marginTop: 24 }} >쇼핑냥이는 셀러분의 매출 신고방법을 따로 안내해 드리지 않으며 매출 신고와 관련된 문의사항은 국세청이나 세무사무실에 문의바랍니다. 월별 출금내역은 세무 신고 시의 참고이며 반드시 귀사의 회계자료와 비교 후 처리하시기 바랍니다.</div>
                        <Button style={{ marginTop: 16 }} onClick={onRequestCalculate} loading={loading} type='primary' >정산요청</Button>
                    </div>
                </Col>

            </Row>
            <h1 style={{ margin: '24px 0' }} >정산 내역</h1>
            <Table
                columns={[
                    {
                        title: '상태',
                        render: (_, r) => <div>{r.state}</div>,
                        align: 'center',
                    },
                    {
                        title: '날짜',
                        render: (_, r) => <div>{dateFormat(r.createdAt)}</div>,
                        align: 'center',
                    },
                    {
                        title: '출금 금액',
                        render: (_, r) => <div>{moneyFormat(r.price)}</div>,
                        align: 'center',
                    },
                    {
                        title: '수수료 10%',
                        render: (_, r) => <div>{moneyFormat(r.commission)}</div>,
                        align: 'center',
                    },
                    {
                        title: '실제 거래금액',
                        render: (_, r) => <div>{moneyFormat(r.price + r.commission)}</div>,
                        align: 'center',
                    },
                ]}
                dataSource={data.profitReceipts}
            />
        </Container>
    )
}

export default profit
