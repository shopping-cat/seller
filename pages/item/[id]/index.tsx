import { Button, Carousel, Col, Descriptions, Image, Row, Space } from 'antd'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import LoadingView from '../../../components/View/LoadingView'
import { useItem } from '../../../graphql/item'
import generateHTML from '../../../lib/generateHTML'
import moneyFormat from '../../../lib/moneyFormat'

const ContentContainer = styled.div`
    background-color:#fff;
    padding: 16px;
`


const HTMLContainer = styled.div`
    height: 80vh;
    overflow:scroll;
    background-color:#fff;
`

const ModifyBtn = styled(Button)`
    position:absolute;
    top: 16px;
    right: 32px;
`

const itemDetail = () => {

    const { query, asPath } = useRouter()

    const { data, loading, refetch } = useItem({
        variables: { id: Number(query.id) },
        fetchPolicy: 'network-only'
    })




    if (loading) return <LoadingView />


    return (
        <Row gutter={[16, 1]}>
            <Col span={12} >
                <ContentContainer>
                    <Link href={asPath + '/modify'} ><a><ModifyBtn type='primary' >수정</ModifyBtn></a></Link>
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
                        <Descriptions.Item label='리뷰 수' ><Link href='review' ><a>{moneyFormat(data.item.reviewNum)}</a></Link></Descriptions.Item>

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
