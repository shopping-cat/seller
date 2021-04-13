import { Button, Image, Popover, Rate, Space, Table } from 'antd'
import React from 'react'
import dateFormat from '../../lib/dateFormat'
import LoadingView from '../../components/View/LoadingView'
import { useRecentReviews } from '../../graphql/itemReview'
import dayjs from 'dayjs'

const review = () => {

    const { data, loading } = useRecentReviews()

    if (loading) return <LoadingView />

    return (
        <div>
            <Space direction='horizontal' style={{ marginBottom: 16 }} >
                <h1>총 리뷰 수 : {data.shop.rateNum}</h1>
                <h1>평균 평점 : {data.shop.rate}</h1>
            </Space>
            <Table
                columns={[
                    {
                        title: '유저',
                        dataIndex: 'user',
                        render: (v) => <Space>
                            <Image style={{ width: 32, height: 32, borderRadius: 16, marginRight: 8 }} src={v.photo} />
                            <span>{v.name}</span>
                        </Space>,
                        align: 'center'
                    },
                    {
                        title: '작성일',
                        dataIndex: 'createdAt',
                        sorter: (a, b) => dayjs(a.createdAt).toDate().getTime() - dayjs(b.createdAt).toDate().getTime(),
                        render: (v) => <span>{dateFormat(v)}</span>,
                        align: 'center'
                    },
                    {
                        title: '평점',
                        dataIndex: 'rate',
                        sorter: (a, b) => a.rate - b.rate,
                        align: 'center'
                    },
                    {
                        title: '추천수',
                        dataIndex: 'likeNum',
                        sorter: (a, b) => a.likeNum - b.likeNum,
                        align: 'center'
                    },
                    {
                        title: '상품이름',
                        dataIndex: 'item',
                        align: 'center',
                        render: (v) => <div>{v.name}</div>
                    },
                    {
                        title: '옵션/수량 정보',
                        dataIndex: 'order',
                        align: 'center',
                        render: (v) => <div>{v.stringOptionNum}</div>
                    },
                    {
                        title: '내용',
                        dataIndex: 'content',
                        align: 'center',
                        render: (_, r) =>
                            <Popover
                                trigger='click'
                                placement='topRight'
                                content={
                                    <div style={{ maxWidth: 500 }} >
                                        <Space wrap direction='horizontal' >
                                            {r.images.map(v =>
                                                <Image
                                                    key={v.id}
                                                    style={{ width: 80, height: 80, objectFit: 'cover' }}
                                                    src={v.uri}
                                                />
                                            )}
                                        </Space>
                                        <div>{r.content}</div>
                                    </div>
                                }
                            >
                                <Button>내용보기</Button>
                            </Popover>
                    }
                ]}
                dataSource={data.recentReviews}
            />
        </div>
    )
}

export default review
