import React, { useCallback } from 'react'
import { useShop, useUpdateShop } from '../../graphql/shop'
import LoadingView from '../../components/View/LoadingView'
import ShopImageUpload from '../../components/Upload/ShopImageUpload'
import { Button, Form, Input, Space, Upload } from 'antd'
import styled from 'styled-components'
import { useRouter } from 'next/dist/client/router'

const Contianer = styled.div`
    width: 50%;
`

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const REFUND_EX = `예시)
1. 기본 안내
반품시 이름과 휴대폰 번호를 동봉해서 보내주세요. 금액은 반품이 확인된 이후에 진행 됩니다.

2. 교환/반품자명
쇼핑냥이

3. 교환/반품지 주소
우편번호 : 12345
주소 : 서울시 강남구 송파 타워 25층 53호
`
const EXCHANGE_EX = `예시)
1. 기본 안내
반품시 이름,휴대폰번호와 배송비 5,000원을 동봉해서 보내주세요.

2. 교환/반품자명
쇼핑냥이

3. 교환/반품지 주소
우편번호 : 12345
주소 : 서울시 강남구 송파 타워 25층 53호
`

const edit = () => {

    const { replace } = useRouter()

    const { data, loading } = useShop()
    const [updateShop, { loading: updateLoading }] = useUpdateShop()

    const onFinish = useCallback(async (v) => {
        try {
            await updateShop({
                variables: {
                    input: v
                }
            })
            replace('/shop')
        } catch (error) {

        }
    }, [])

    if (loading) return <LoadingView />

    return (
        <Contianer>
            <Form
                {...layout}
                initialValues={{
                    ...data.shop
                }}
                title='상품정보 수정'
                onFinish={onFinish}
            >
                <h1>기본정보</h1>
                <Form.Item
                    name='shopName'
                    label='상점이름'
                    rules={[{ required: true, message: '필수입니다.' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name='kakaoId'
                    label='카카오톡 아이디 (주문시 채팅 보내드립니다)'
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name='shopImage'
                    label='이미지'
                >
                    <ShopImageUpload />
                </Form.Item>
                <h1>정산</h1>
                <Form.Item
                    name='bankOwnerName'
                    label='예금주'
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name='bankName'
                    label='은행'
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name='bankAccountNumber'
                    label='계좌번호'
                >
                    <Input />
                </Form.Item>
                <h1>CS</h1>
                <Form.Item
                    name='kakaoLink'
                    label={<div>카카오톡 채널 채팅 링크 (추천!!) <a href='https://www.youtube.com/watch?v=NBk9xl-AJ_0' >참고 링크</a></div>}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name='csPhone'
                    label='고객센터 번호'
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='환불방법 예시'
                >
                    <Input.TextArea
                        disabled
                        value={REFUND_EX}
                        rows={10}
                    />
                </Form.Item>
                <Form.Item
                    name='refundInfo'
                    label='환불방법'
                    rules={[{ required: true, message: '필수입니다.' }]}
                >
                    <Input.TextArea
                        rows={10}
                    />
                </Form.Item>
                <Form.Item
                    label='교환방법 예시'
                >
                    <Input.TextArea
                        disabled
                        value={EXCHANGE_EX}
                        rows={10}
                    />
                </Form.Item>
                <Form.Item
                    name='exchangeInfo'
                    label='교환방법'
                    rules={[{ required: true, message: '필수입니다.' }]}
                >
                    <Input.TextArea
                        rows={10}
                    />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button loading={updateLoading} type="primary" htmlType="submit">수정</Button>
                </Form.Item>
            </Form>
            <span>기타 변경하고 싶은 점이 있으면 문의주세요</span>
        </Contianer>
    )
}

export default edit
