import React from 'react'
import { Table } from 'antd'
import { useOnDeliveryOrders } from '../../graphql/order'
import LoadingView from '../../components/View/LoadingView'

const onDelivery = () => {

    const { data, loading } = useOnDeliveryOrders()

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
                ]}
                dataSource={data.onDeliveryOrders}
            />
        </div>
    )
}

export default onDelivery
