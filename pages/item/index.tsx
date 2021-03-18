import React, { useState } from 'react'

import { Space, Table } from 'antd';
import { useItems } from '../../graphql/item';
import moneyFormat from '../../lib/moneyFormat';
import Link from 'next/link';
import Highlighter from 'react-highlight-words';
import Search from 'antd/lib/input/Search';
import { LoadingOutlined } from '@ant-design/icons';
import LoadingView from '../../components/View/LoadingView';



const item = () => {

    const { data, loading } = useItems()
    const [search, setSearch] = useState('')


    const searchedData = data?.items.filter(t => t.name.toLowerCase().includes(search.toLowerCase()))

    if (loading) return <LoadingView />

    return (
        <div>
            <Search
                placeholder='상품명으로 검색하기'
                onChange={t => setSearch(t.target.value)}
                style={{ width: 300, marginBottom: 16 }}
            />

            <Table
                columns={[
                    {
                        title: '상품명',
                        dataIndex: 'name',
                        fixed: 'left',
                        align: 'center',
                        render: t => <Highlighter
                            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                            searchWords={[search]}
                            autoEscape
                            textToHighlight={t ? t.toString() : ''}
                        />
                    },
                    {
                        title: '가격',
                        dataIndex: 'price',
                        render: t => <div>{moneyFormat(t)}</div>,
                        sorter: (a, b) => a.price - b.price,
                        align: 'center'
                    },
                    {
                        title: '배송비',
                        dataIndex: 'deliveryPrice',
                        filters: [
                            {
                                text: '무료배송만',
                                value: true
                            }
                        ],
                        render: t => <div>{t === 0 ? '무료배송' : moneyFormat(t)}</div>,
                        onFilter: (value, record) => record.deliveryPrice === 0,
                        align: 'center'
                    },
                    {
                        title: '상태',
                        dataIndex: 'state',
                        render: t => <div>{t === 'sale' ? '판매중' : t === 'stop' ? '판매중지' : '재고없음'}</div>,
                        filters: [
                            {
                                text: '판매중',
                                value: 'sale',
                            },
                            {
                                text: '판매중지',
                                value: 'stop',
                            },
                            {
                                text: '재고없음',
                                value: 'noStock'
                            }
                        ],
                        onFilter: (value, record) => record.state.indexOf(value as string) === 0,
                        align: 'center'
                    },
                    {
                        title: '총 구매확정',
                        dataIndex: 'totalOrderNum',
                        align: 'center',
                        sorter: (a, b) => a.totalOrderNum - b.totalOrderNum,
                    },
                    {
                        title: '좋아요',
                        dataIndex: 'likeNum',
                        align: 'center',
                        sorter: (a, b) => a.likeNum - b.likeNum,
                    },
                    {
                        title: '평점',
                        dataIndex: 'rate',
                        align: 'center',
                        sorter: (a, b) => a.rate - b.rate
                    },
                    {
                        title: '리뷰',
                        dataIndex: 'reviewNum',
                        align: 'center',
                        sorter: (a, b) => a.reviewNum - b.reviewNum
                    },
                    {
                        title: '액션',
                        dataIndex: 'id',
                        align: 'center',
                        render: t => <Space size={16} >
                            <Link href={`/item/${t}`} ><a>자세히</a></Link>
                            <Link href={`/item/${t}/modify`} ><a>수정</a></Link>
                        </Space>
                        ,
                        fixed: 'right'
                    }
                ]}
                // scroll={{ x: 1500 }}
                sticky
                dataSource={searchedData}
            />
        </div>
    )
}

export default item
