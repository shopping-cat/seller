import { Button, Form, Input, Select, Space, Table } from 'antd'
import React, { useCallback } from 'react'
import LoadingView from '../../components/View/LoadingView'
import { useNewOrders, useRegistDelivery, useCancelOrder } from '../../graphql/order'
import useRefreshing from '../../hooks/useRefreshing'

const list = require('../../assets/deliveryCompanyList.json')

const newOrder = () => {

    const { data, fetchMore, loading, refetch } = useNewOrders()
    const { onRefresh, refreshing } = useRefreshing(refetch)
    const [registDelivery, { loading: registLoading }] = useRegistDelivery()
    const [cancelOrder, { loading: cancelLoading }] = useCancelOrder()

    const onDelivery = useCallback(async (v) => {
        if (registLoading || cancelLoading) return
        await registDelivery({
            variables: v
        })
    }, [registLoading, cancelLoading])

    const onCancel = useCallback(async (v) => {
        if (registLoading || cancelLoading) return
        await cancelOrder({
            variables: v
        })
    }, [registLoading, cancelLoading])

    if (loading || refreshing) return <LoadingView />

    return (
        <div>
            <Space style={{ marginBottom: 16 }} >
                <Button type='primary' onClick={onRefresh} >새로고침</Button>
            </Space>
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
                        title: '송장등록',
                        align: 'center',
                        render: (_, r) => {
                            if (r.state === '배송중') return <div>배송중</div>
                            if (r.state !== '구매접수') return <div>송장등록불가능</div>
                            return <Form onFinish={(v) => onDelivery({ id: r.id, ...v })}  >
                                <Form.Item name='deliveryCompanyCode' style={{ margin: 0 }} rules={[{ required: true }]} >
                                    <Select placeholder='택배사' >
                                        {list.data.map(v => <Select.Option value={v.Code} >{v.Name}</Select.Option>)}
                                    </Select>
                                </Form.Item >
                                <Form.Item name='deliveryNumber' style={{ margin: 0 }} rules={[{ required: true }]} >
                                    <Input placeholder='송장번호' />
                                </Form.Item>
                                <Form.Item style={{ margin: 0 }}>
                                    <Button loading={registLoading} htmlType='submit' type='primary' >제출</Button>
                                </Form.Item>
                            </Form>
                        }
                    },
                    {
                        title: '주문취소',
                        align: 'center',
                        render: (_, r) => {
                            if (r.state === '상점취소처리') return <div>{r.reason}</div>
                            if (r.state !== '구매접수') return <div>취소불가능</div>
                            return <Form onFinish={(v) => onCancel({ id: r.id, ...v })} >
                                <Form.Item name='reason' rules={[{ required: true }]} >
                                    <Input placeholder='취소사유 예) 재고없음' minLength={2} />
                                </Form.Item>
                                <Form.Item>
                                    <Button loading={cancelLoading} htmlType='submit'  >주문취소</Button>
                                </Form.Item>
                            </Form>
                        }

                    }
                ]}
                dataSource={data.newOrders}
            />
        </div>
    )
}

export default newOrder
