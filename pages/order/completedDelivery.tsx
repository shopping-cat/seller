import { Table } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import LoadingView from '../../components/View/LoadingView'
import { useCompletedDeliveryOrders } from '../../graphql/order'
import dateFormat from '../../lib/dateFormat'

const completedDelivery = () => {
    const { data, loading } = useCompletedDeliveryOrders()

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
                        title: '주소',
                        align: 'center',
                        render: (_, r) => <div>{r.payment.address}</div>,
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
                        title: '배송메모',
                        align: 'center',
                        render: (_, r) => <div>{r.payment.deliveryMemo}</div>,
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
                    }
                ]}
                dataSource={data.completedDeliveryOrders}
            />
        </div>
    )
}

export default completedDelivery