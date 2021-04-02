import { Button, Form, Space, Table } from 'antd'
import dayjs from 'dayjs'
import React, { useCallback } from 'react'
import LoadingView from '../../components/View/LoadingView'
import { useExchangeRequestOrders, useExchangeOrder } from '../../graphql/order'

const exchangeRequest = () => {

    const { data, loading } = useExchangeRequestOrders()

    const [exchangeOrder, { loading: exchangeLoading }] = useExchangeOrder()

    const onConfirm = useCallback(async (id) => {
        if (exchangeLoading) return
        if (!confirm('상품을 받고 교환할 상품도 보냈나요?')) return
        await exchangeOrder({ variables: { id } })
    }, [exchangeLoading])

    if (loading) return <LoadingView />

    return (
        <div>
            <Table
                columns={[
                    {
                        title: '유저이름',
                        align: 'center',
                        render: (_, r) => <div>{r.user.name}</div>
                    },
                    {
                        title: '상품/옵션/수량',
                        align: 'center',
                        render: (_, r) => <div>{r.item.name} ({r.stringOptionNum})</div>,
                    },
                    {
                        title: '우편번호',
                        align: 'center',
                        render: (_, r) => <div>{r.payment.postCode}</div>,
                    },
                    {
                        title: '수령인',
                        align: 'center',
                        render: (_, r) => <div>{r.payment.addressName}</div>,
                    },
                    {
                        title: '수령인 전화번호',
                        align: 'center',
                        render: (_, r) => <div>{r.payment.addressPhone}</div>,
                    },
                    {
                        title: '택배사/송장번호',
                        align: 'center',
                        render: (_, r) => <div>
                            <div>{r.deliveryCompany}</div>
                            <div>{r.deliveryNumber}</div>
                        </div>
                    },
                    {
                        title: '배송완료일',
                        align: 'center',
                        render: (_, r) => <div>{dayjs(r.deliveryCompletionDate).format('YYYY.MM.DD HH시')}</div>
                    },
                    {
                        title: '교환',
                        align: 'center',
                        render: (_, r) => <div>{r.reason}</div>
                    },
                    {
                        title: '상세사유',
                        align: 'center',
                        render: (_, r) => <div>{r.reasonDetail}</div>
                    },
                    {
                        title: '교환승인',
                        align: 'center',
                        render: (_, r) => {
                            if (r.state === '교환처리') return <div>교환처리됨</div>
                            if (r.state !== '교환중') return <div>교환처리됨</div>
                            return <Space direction='vertical'>
                                <div>교환할 물품을 보낸후에 눌러주세요</div>
                                <Button loading={exchangeLoading} onClick={() => onConfirm(r.id)} >교환승인</Button>
                            </Space>
                        }
                    }
                ]}
                dataSource={data.exchangeRequestOrders}
            />
        </div>
    )
}

export default exchangeRequest
