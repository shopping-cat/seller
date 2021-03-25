import React, { useCallback } from 'react'
import { useShop, useUpdateShop } from '../../graphql/shop'
import LoadingView from '../../components/View/LoadingView'
import ShopImageUpload from '../../components/Upload/ShopImageUpload'
import { Button, Form, Input, Upload } from 'antd'
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
                <Form.Item
                    name='shopName'
                    label='상점이름'
                    rules={[{ required: true, message: '필수입니다.' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name='shopImage'
                    label='이미지'
                >
                    <ShopImageUpload />
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
