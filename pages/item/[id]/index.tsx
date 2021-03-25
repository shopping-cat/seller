import { Button, Carousel, Col, Descriptions, Image, Row, Space } from 'antd'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import LoadingView from '../../../components/View/LoadingView'
import { useDeleteItemUpdate, useItem } from '../../../graphql/item'
import generateHTML from '../../../lib/generateHTML'
import moneyFormat from '../../../lib/moneyFormat'

const ContentContainer = styled.div`
    background-color:#fff;
    padding: 16px;
`


const HTMLContainer = styled.div`
    height: 80vh;
    width: 360px;
    overflow:scroll;
    background-color:#fff;
`

const EditBtn = styled(Button)`
    position:absolute;
    top: 16px;
    right: 32px;
`

const ItemUpdateBtnContainer = styled.div`
    position:absolute;
    top: 40px;
    right: 32px;
`

const itemDetail = () => {

    const { query, asPath } = useRouter()

    const { data, loading, refetch } = useItem({
        variables: { id: Number(query.id) },
        fetchPolicy: 'network-only'
    })
    const [deleteItemUpdate, { loading: cancelLoading }] = useDeleteItemUpdate()

    const onCancelItemUpdate = useCallback(async () => {
        if (!data) return
        if (!confirm('취소시 복구 할 수 없습니다.')) refetch
        await deleteItemUpdate({ variables: { id: data.item.id } })
        refetch()
    }, [data])


    if (loading) return <LoadingView />


    return (
        <Row gutter={[16, 1]}>
            {data.item.updateItem && <>
                <Col span={12} >
                    <h1>업데이트 요청한 상품 데이터</h1>
                    <ContentContainer>
                        <ItemUpdateBtnContainer  >
                            <Button style={{ marginRight: 16 }} loading={cancelLoading} type='dashed' onClick={onCancelItemUpdate} >업데이트 요청 취소</Button>
                            <Link href={asPath + '/edit'} ><a><Button type='primary' >수정</Button></a></Link>
                        </ItemUpdateBtnContainer>
                        <h2>이미지</h2>
                        <Space wrap direction='horizontal' size={8} >
                            {data.item.updateItem.images.map(v =>
                                <Image
                                    key={v.id}
                                    src={v.uri}
                                    height={150}
                                    width={150}
                                    style={{ objectFit: 'cover' }}
                                />
                            )}
                        </Space>
                        <Descriptions title='상품정보' bordered style={{ marginTop: 32 }} >
                            <Descriptions.Item span={3} label='상품명' >{data.item.updateItem.name}</Descriptions.Item>

                            <Descriptions.Item span={1.5} label='카테고리2' >{data.item.updateItem.category1 || '기타'}</Descriptions.Item>
                            <Descriptions.Item span={1.5} label='카테고리1' >{data.item.updateItem.category2 || '기타'}</Descriptions.Item>
                        </Descriptions>

                        <Descriptions title='가격' bordered style={{ marginTop: 32 }} >
                            <Descriptions.Item label='기본가격' >{moneyFormat(data.item.updateItem.price)}</Descriptions.Item>
                            <Descriptions.Item label='현재세일률' >{data.item.updateItem.sale}%</Descriptions.Item>
                            <Descriptions.Item label='현재판매가격' >{moneyFormat(data.item.updateItem.salePrice)}</Descriptions.Item>

                            <Descriptions.Item span={1.5} label='배송비' >{moneyFormat(data.item.updateItem.deliveryPrice)}</Descriptions.Item>
                            <Descriptions.Item span={1.5} label='산간지역 추가배송비' >{moneyFormat(data.item.updateItem.extraDeliveryPrice)}</Descriptions.Item>
                        </Descriptions>

                        <Descriptions title='필수 표기 정보' bordered style={{ margin: '32px 0' }} >
                            {data.item.updateItem.requireInformation.data.map(v =>
                                <>
                                    <Descriptions.Item span={1.5} label='이름' >{v.title}</Descriptions.Item>
                                    <Descriptions.Item span={1.5} label='내용' >{v.content}</Descriptions.Item>
                                </>
                            )}
                        </Descriptions>

                        <h2>상품 옵션</h2>
                        {data.item.updateItem.option && data.item.updateItem.option.data.map(v =>
                            <Descriptions title={'옵션1 - ' + v.optionGroupName} bordered style={{ marginTop: 32, marginLeft: 32 }} >
                                {v.optionDetails.map(v =>
                                    <>
                                        <Descriptions.Item span={1.5} label='이름' >{v.name}</Descriptions.Item>
                                        <Descriptions.Item span={1.5} label='가격' >{moneyFormat(v.price)}</Descriptions.Item>
                                    </>
                                )}
                            </Descriptions>
                        )}
                    </ContentContainer>
                </Col>
                <Col span={12} >
                    <HTMLContainer>
                        <div dangerouslySetInnerHTML={{ __html: generateHTML(data.item.updateItem.html) }} />
                    </HTMLContainer>
                </Col>
            </>}


            <Col span={12} >
                {data.item.updateItem && <h1>현재 게시중인 상품내용</h1>}
                <ContentContainer>
                    {!data.item.updateItem && <Link href={asPath + '/edit'} ><a><EditBtn type='primary' >수정</EditBtn></a></Link>}
                    <h2>이미지</h2>
                    <Space wrap direction='horizontal' size={8} >
                        {data.item.images.map(v =>
                            <Image
                                key={v.id}
                                src={v.uri}
                                height={150}
                                width={150}
                                style={{ objectFit: 'cover' }}
                            />
                        )}
                    </Space>
                    <Descriptions title='상품정보' bordered style={{ marginTop: 32 }} >
                        <Descriptions.Item label='상품명' >{data.item.name}</Descriptions.Item>
                        <Descriptions.Item label='현재상태' >{data.item.state}</Descriptions.Item>
                        <Descriptions.Item label='평점' >{data.item.rate}</Descriptions.Item>

                        <Descriptions.Item label='구매확정 수' >{moneyFormat(data.item.totalOrderNum)}</Descriptions.Item>
                        <Descriptions.Item label='좋아요 수' >{moneyFormat(data.item.likeNum)}</Descriptions.Item>
                        <Descriptions.Item label='리뷰 수' ><Link href={asPath + '/review'} ><a>{moneyFormat(data.item.reviewNum)}</a></Link></Descriptions.Item>

                        <Descriptions.Item span={1.5} label='카테고리2' >{data.item.category1 || '기타'}</Descriptions.Item>
                        <Descriptions.Item span={1.5} label='카테고리1' >{data.item.category2 || '기타'}</Descriptions.Item>
                    </Descriptions>

                    <Descriptions title='가격' bordered style={{ marginTop: 32 }} >
                        <Descriptions.Item label='기본가격' >{moneyFormat(data.item.price)}</Descriptions.Item>
                        <Descriptions.Item label='현재세일률' >{data.item.sale}%</Descriptions.Item>
                        <Descriptions.Item label='현재판매가격' >{moneyFormat(data.item.salePrice)}</Descriptions.Item>

                        <Descriptions.Item span={1.5} label='배송비' >{moneyFormat(data.item.deliveryPrice)}</Descriptions.Item>
                        <Descriptions.Item span={1.5} label='산간지역 추가배송비' >{moneyFormat(data.item.extraDeliveryPrice)}</Descriptions.Item>
                    </Descriptions>

                    <Descriptions title='필수 표기 정보' bordered style={{ margin: '32px 0' }} >
                        {data.item.requireInformation.data.map(v =>
                            <>
                                <Descriptions.Item span={1.5} label='이름' >{v.title}</Descriptions.Item>
                                <Descriptions.Item span={1.5} label='내용' >{v.content}</Descriptions.Item>
                            </>
                        )}
                    </Descriptions>

                    <h2>상품 옵션</h2>
                    {data.item.option && data.item.option.data.map(v =>
                        <Descriptions title={'옵션1 - ' + v.optionGroupName} bordered style={{ marginTop: 32, marginLeft: 32 }} >
                            {v.optionDetails.map(v =>
                                <>
                                    <Descriptions.Item span={1.5} label='이름' >{v.name}</Descriptions.Item>
                                    <Descriptions.Item span={1.5} label='가격' >{moneyFormat(v.price)}</Descriptions.Item>
                                </>
                            )}
                        </Descriptions>
                    )}




                </ContentContainer>
            </Col>
            <Col span={12} >
                <HTMLContainer>
                    <div dangerouslySetInnerHTML={{ __html: generateHTML(data.item.html) }} />
                </HTMLContainer>
            </Col>
        </Row >
    )
}

export default itemDetail
