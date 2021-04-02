import { Table } from 'antd'
import dayjs from 'dayjs'
import Link from 'next/link'
import React from 'react'
import LoadingView from '../../components/View/LoadingView'
import { useExchangedOrders } from '../../graphql/order'

const exchanged = () => {

    const { data, loading } = useExchangedOrders()

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
                        title: '교환사유',
                        align: 'center',
                        render: (_, r) => <div>{r.reason}</div>
                    },
                    {
                        title: '상세사유',
                        align: 'center',
                        render: (_, r) => <div>{r.reasonDetail}</div>
                    }
                ]}
                dataSource={data.exchangedOrders}
            />
        </div>
    )
}

export default exchanged
