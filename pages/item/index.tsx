import React, { useCallback, useState } from 'react'

import { Button, Select, Space, Table } from 'antd';
import { useItems, useUpdateItemState, useDeleteItem } from '../../graphql/item';
import moneyFormat from '../../lib/moneyFormat';
import Link from 'next/link';
import Highlighter from 'react-highlight-words';
import Search from 'antd/lib/input/Search';
import { LoadingOutlined } from '@ant-design/icons';
import LoadingView from '../../components/View/LoadingView';
import useRefreshing from '../../hooks/useRefreshing';

const { Option } = Select



const item = () => {

    const [search, setSearch] = useState('')

    const { data, loading, refetch } = useItems({ fetchPolicy: 'network-only' })
    const { refreshing, onRefresh } = useRefreshing(refetch)
    const [updateItemState, { loading: updateItemStateLoading }] = useUpdateItemState()
    const [deleteItem] = useDeleteItem()

    const onChangeState = useCallback(async (id: number, value: string) => {
        await updateItemState({
            variables: {
                id,
                state: value
            }
        })
    }, [])

    const onDelete = useCallback(async (id: number) => {
        if (confirm('삭제후에는 복구할 수 없습니다.')) {
            await deleteItem({ variables: { id } })
            onRefresh()
        }
    }, [onRefresh])


    const searchedData = data?.items.filter(t => t.name.toLowerCase().includes(search.toLowerCase())).map(v => ({ ...v, key: v.id }))

    if (loading || refreshing) return <LoadingView />

    return (
        <div>
            <Space direction='horizontal' style={{ marginBottom: 16 }}  >
                <Search
                    placeholder='상품명으로 검색하기'
                    onChange={t => setSearch(t.target.value)}
                    style={{ width: 300 }}
                />

                <Button onClick={onRefresh} >새로고침</Button>
                <Link href='/item/add' ><Button type='primary' >상품추가</Button></Link>
            </Space>

            <Table
                columns={[
                    {
                        title: '상품명',
                        dataIndex: 'name',
                        fixed: 'left',
                        align: 'center',
                        render: (t, record) => <Highlighter
                            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                            searchWords={[search]}
                            autoEscape
                            textToHighlight={t ? t.toString() + (record.updateItem ? `(수정요청)` : '') : ''}
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
                        filters: [
                            {
                                text: '판매중',
                                value: '판매중'
                            },
                            {
                                text: '판매중지',
                                value: '판매중지'
                            },
                            {
                                text: '재고없음',
                                value: '재고없음'
                            },
                            {
                                text: '상품등록요청',
                                value: '상품등록요청'
                            },
                        ],
                        render: (t, record) =>
                            <>
                                {t === '상품등록요청'
                                    ?
                                    <div>{t}</div>
                                    :
                                    <Select
                                        onChange={(v) => onChangeState(record.id, v)}
                                        loading={updateItemStateLoading}
                                        value={t}
                                    >
                                        <Option value='판매중'>판매중</Option>
                                        <Option value='판매중지'>판매중지</Option>
                                        <Option value='재고없음'>재고없음</Option>
                                    </Select>
                                }
                            </>
                        ,
                        onFilter: (value, record) => record.state === value,
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
                        render: (t, r) => <Space size={16} >
                            <Link href={`/item/${t}`} ><a>자세히</a></Link>
                            <Link href={`/item/${t}/edit`} ><a>수정</a></Link>
                            {r.state === '상품등록요청' && <a onClick={() => onDelete(r.id)} >삭제</a>}
                            {r.state !== '상품등록요청' && <Link href={`/item/${t}/review`} ><a>리뷰</a></Link>}
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
