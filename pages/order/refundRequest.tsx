import { Button, Form, Space, Table } from 'antd'
import dayjs from 'dayjs'
import Link from 'next/link'
import React, { useCallback } from 'react'
import LoadingView from '../../components/View/LoadingView'
import { useRefundOrder, useRefundRequestOrders } from '../../graphql/order'

const refundedRequest = () => {

    const { data, loading } = useRefundRequestOrders()

    const [refundOrder, { loading: refundLoading }] = useRefundOrder()

    const onConfirm = useCallback(async (id) => {
        if (refundLoading) return
        if (!confirm('상품을 확인하셨나요? 수락하시면 금액이 환불됩니다.')) return
        await refundOrder({ variables: { id } })
    }, [refundLoading])

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
                        title: '환불사유',
                        align: 'center',
                        render: (_, r) => <div>{r.reason}</div>
                    },
                    {
                        title: '상세사유',
                        align: 'center',
                        render: (_, r) => <div>{r.reasonDetail}</div>
                    },
                    {
                        title: '환불승인',
                        align: 'center',
                        render: (_, r) => {
                            if (r.state === '환불처리') return <div>환불처리됨</div>
                            if (r.state !== '환불중') return <div>환불불가능</div>
                            return <Space direction='vertical'>
                                <div>환불된 물건을 받으신 후에 눌러주세요</div>
                                <Button loading={refundLoading} onClick={() => onConfirm(r.id)} >환불승인</Button>
                            </Space>
                        }
                    },
                ]}
                dataSource={data.refundRequestOrders}
            />
        </div>
    )
}

export default refundedRequest
