import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Cascader, Form, Input, InputNumber, Select, Space, TreeSelect, Upload } from 'antd'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { CATEGORY } from '../../constants/value'
import ItemImageUpload from '../../components/Upload/ItemImageUpload'
import { CreateItemImage } from '../../graphql/itemImage'
import renderHTML from 'react-render-html';
import { useCreateItem } from '../../graphql/item'
import { useRouter } from 'next/dist/client/router'


const Contianer = styled.div`
    margin-top:24px;
    align-self:center;
`

const HTMLContainer = styled.div`
    width: 360px;
    height: 720px;
    background-color: #fff;
    margin-left: 16px;
    overflow:scroll;
`

const generateHtml = (content: string) => `
<!DOCTYPE html>
<html>
  <head>
    <style type="text/css">
        div.contentHtml * {
            max-width: 360px;
        }
      
    </style>
  </head>
  <body>
      <div class="contentHtml" >
        ${content || ''}
    </div>
  </body>
</html>
`

const add = () => {

    const { replace } = useRouter()

    const [images, setImages] = useState<CreateItemImage[]>([])
    const [html, setHtml] = useState('')

    const [createItem, { loading }] = useCreateItem()

    const onFinish = useCallback(async (v) => {

        const category1 = v.category[0]
        const category2 = v.category.length > 1 ? v.category[1] : null

        const input = {
            name: v.name,
            category1,
            category2,
            price: v.price,
            deliveryPrice: v.deliveryPrice,
            extraDeliveryPrice: v.extraDeliveryPrice,
            option: v.option ? { data: v.option } : null,
            requireInformation: { data: v.requireInformation },
            images: v.images.map((v: any) => v.id),
            html: v.html,
            type: v.type
        }
        alert('영업일로부터 3일 이내에 검토후 게시됩니다.')
        try {
            const { data } = await createItem({ variables: { input } })
            if (!!data) replace('/item')
        } catch (error) {
        }
    }, [images])

    const onError = useCallback((e) => {
        console.log(e)
    }, [])


    return (
        <Contianer>
            <Form
                initialValues={{
                    deliveryPrice: 2500,
                    extraDeliveryPrice: 8000
                }}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                name="basic"
                onFinish={onFinish}
                onError={onError}
            >
                <h1>기본 정보</h1>
                <Form.Item
                    label="상품명"
                    name="name"
                    rules={[{ required: true, message: '필수 입력란입니다.', }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="타입"
                    name="type"
                    rules={[{ required: true, message: '필수 입력란입니다.', }]}
                >
                    <Select>
                        <Select.Option value='cat' >고양이</Select.Option>
                        <Select.Option value='dog' >강아지</Select.Option>
                        <Select.Option value='both' >고양이,강아지</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="카테고리"
                    name='category'
                    rules={[{ required: true, message: '필수 입력란입니다.' }]}
                >
                    <Cascader
                        placeholder='카테고리를 골라주세요'
                        options={CATEGORY.map(c1 => ({ label: c1?.category, value: c1?.category, children: c1?.detailCategory && c1.detailCategory.map(c2 => ({ label: c2, value: c2 })) }))}
                    />
                </Form.Item>
                <h1>가격</h1>
                <Form.Item
                    label="가격"
                    name="price"
                    rules={[{ required: true, message: '필수 입력란입니다.' }, { type: 'number', message: '숫자만 입력가능합니다' }]}
                >
                    <InputNumber style={{ width: '50%' }} min={1} />
                </Form.Item>
                <Form.Item
                    label="배송비"
                    name="deliveryPrice"
                    rules={[{ type: 'number', message: '숫자만 입력가능합니다' }]}
                >
                    <InputNumber style={{ width: '50%' }} min={0} />
                </Form.Item>
                <Form.Item
                    label="산간지역 추가 배송비"
                    name="extraDeliveryPrice"
                    rules={[{ type: 'number', message: '숫자만 입력가능합니다' }]}
                >
                    <InputNumber style={{ width: '50%' }} min={1} />
                </Form.Item>

                <h1>상품 옵션</h1>
                <Form.List
                    name="option"
                    initialValue={[]}
                >
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item
                                    label={'상품옵션 ' + (index + 1)}
                                    key={field.key.toString()}
                                >
                                    <Space direction='horizontal' >
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'optionGroupName']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "필수 입력란입니다.",
                                                },
                                            ]}
                                            noStyle
                                            fieldKey={[field.fieldKey, 'title']}
                                            key={field.key.toString() + 1}
                                        >
                                            <Input placeholder="옵션 이름 예) 색상" style={{ width: 300 }} />
                                        </Form.Item>

                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(field.name)}
                                            style={{ marginLeft: 16 }}
                                        />
                                    </Space>
                                    <Form.Item  >
                                        <Form.List
                                            name={[field.name, 'optionDetails']}
                                            initialValue={[{}]}
                                            rules={[
                                                {
                                                    validator: async (_, optionDetails) => {
                                                        if (!optionDetails || optionDetails.length < 1) {
                                                            return Promise.reject(new Error('최소 1개는 입력해야합니다.'));
                                                        }
                                                    },
                                                },
                                            ]}
                                        >
                                            {(fields2, { add: add2, remove: remove2 }, { errors: errors2 }) => (
                                                <>
                                                    {fields2.map((field2, index2) => (
                                                        <Form.Item
                                                            style={{ marginTop: 16 }}
                                                            label={'옵션 세부 ' + (index2 + 1)}
                                                            key={field2.key.toString()}
                                                        >
                                                            <Form.Item
                                                                {...field2}
                                                                name={[field2.name, 'name']}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: "필수 입력란입니다.",
                                                                    },
                                                                ]}
                                                                fieldKey={[field2.fieldKey, 'name']}
                                                                key={field2.key.toString() + 1}
                                                                noStyle
                                                            >
                                                                <Input placeholder="옵션 세부 이름 예) 파란색" style={{ width: '40%' }} />
                                                            </Form.Item>
                                                            <Form.Item
                                                                {...field2}
                                                                name={[field2.name, 'price']}
                                                                fieldKey={[field2.fieldKey, 'price']}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: "필수 입력란입니다.",
                                                                    },
                                                                ]}
                                                                key={field2.key.toString() + 2}
                                                                noStyle
                                                            >
                                                                <InputNumber placeholder='가격' min={0} style={{ width: '40%' }} />
                                                            </Form.Item>
                                                            {fields2.length > 1 ? (
                                                                <MinusCircleOutlined
                                                                    className="dynamic-delete-button"
                                                                    onClick={() => remove2(field2.name)}
                                                                    style={{ marginLeft: 16 }}
                                                                />
                                                            ) : null}
                                                        </Form.Item>
                                                    ))}
                                                    {fields2.length < 10 && <Form.Item label=' ' >
                                                        <Button
                                                            type='ghost'
                                                            onClick={() => add2()}
                                                            icon={<PlusOutlined />}
                                                        >
                                                            옵션 세부 추가
                                                        </Button>
                                                        <Form.ErrorList errors={errors2} />
                                                    </Form.Item>}
                                                </>
                                            )}
                                        </Form.List>
                                    </Form.Item>
                                </Form.Item>
                            ))}
                            {fields.length < 5 && <Form.Item label=' ' >
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    icon={<PlusOutlined />}
                                >
                                    상품 옵션 추가
                                </Button>
                                <Form.ErrorList errors={errors} />
                            </Form.Item>}
                        </>
                    )}
                </Form.List>


                <h1>세부 정보</h1>
                <Form.List
                    name="requireInformation"
                    initialValue={[{}]}
                    rules={[
                        {
                            validator: async (_, names) => {
                                if (!names || names.length < 1) {
                                    return Promise.reject(new Error('최소 1개는 입력해야합니다.'));
                                }
                            },
                        },
                    ]}
                >
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item
                                    {...(index === 0 ? {
                                        labelCol: {
                                            xs: { span: 24 },
                                            sm: { span: 4 },
                                        },
                                        wrapperCol: {
                                            xs: { span: 24 },
                                            sm: { span: 20 },
                                        },
                                    } : {
                                        wrapperCol: {
                                            xs: { span: 24, offset: 0 },
                                            sm: { span: 20, offset: 4 },
                                        },
                                    })}
                                    label={index === 0 ? '필수 표기 정보' : ''}
                                    key={field.key.toString()}
                                >
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'title']}
                                        // validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                                required: true,
                                                message: "필수 입력란입니다.",
                                            },
                                        ]}
                                        fieldKey={[field.fieldKey, 'title']}
                                        key={field.key.toString() + 1}
                                        noStyle
                                    >
                                        <Input placeholder="필수 표기 정보 이름" style={{ width: '40%' }} />
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'content']}
                                        fieldKey={[field.fieldKey, 'content']}
                                        rules={[
                                            {
                                                required: true,
                                                message: "필수 입력란입니다.",
                                            },
                                        ]}
                                        key={field.key.toString() + 2}
                                        noStyle
                                    >
                                        <Input placeholder="필수 표기 정보 내용" style={{ width: '40%' }} />
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(field.name)}
                                            style={{ marginLeft: 16 }}
                                        />
                                    ) : null}
                                </Form.Item>
                            ))}
                            {fields.length < 50 && <Form.Item label=' ' >
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    icon={<PlusOutlined />}
                                >
                                    필수 표기 정보 추가
                                </Button>
                                <Form.ErrorList errors={errors} />
                            </Form.Item>}
                        </>
                    )}
                </Form.List>
                <Form.Item
                    label='사진(최대 9개)'
                    name='images'
                    rules={[
                        {
                            validator: async (_, images) => {
                                if (!images || images.length < 1) {
                                    return Promise.reject(new Error('최소 1개는 선택해야합니다.'));
                                }
                            },
                        },
                    ]}
                >
                    <ItemImageUpload onChange={v => setImages(v)} />
                </Form.Item>


                <Form.Item
                    label='내용 HTML'
                    name='html'
                    rules={[{ required: true, message: '필수 입력란입니다.', }]}
                >
                    <Space align='start' direction='horizontal' wrap>
                        <Input.TextArea style={{ width: 360 }} onChange={t => setHtml(t.target.value)} rows={20} />
                        <HTMLContainer>
                            {renderHTML(generateHtml(html))}
                        </HTMLContainer>

                    </Space>
                </Form.Item>

                <Form.Item label=' ' >
                    <Button loading={loading} type="primary" htmlType="submit">제출</Button>
                </Form.Item>


            </Form>
        </Contianer >
    )
}

export default add
