import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button, Input, Form, Select } from 'antd';
import EtcImageUpload from '../../components/Upload/EtcImageUpload';
import { useCreateShop } from '../../graphql/shop';
import { toast } from 'react-toastify';
import { useRouter } from 'next/dist/client/router';

const Container = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const InnerContainer = styled.div`
    width: 1000px;
    padding: 80px 0;
`

interface Inputs {
    email: string
    licenseNumber: string
    bizType: string
    bizRegistration: string

    shopName: string
    kakaoId: string

    bankAccountNumber: string
    bankName: string
    bankOwnerName: string

    kakaoLink?: string
    csPhone?: string

    managerName: string
    managerPhone: string
    managerEmail: string

    storeLink?: string
}

const signup = () => {

    const [createShop, { loading }] = useCreateShop()

    const { register, handleSubmit, control } = useForm<Inputs>()

    const { replace } = useRouter()

    const onSubmit: SubmitHandler<Inputs> = useCallback(async (data) => {
        try {
            console.log(data)
            const { data: d } = await createShop({ variables: { input: data } })
            alert(`검토 후 ${d.createShop.seller.email}로 승인 메일 보내드리겠습니다.`)
            replace('/login')
        } catch (error) {
            // toast(error.message)
        }
    }, [])

    return (
        <Container>
            <InnerContainer>
                <Form onFinish={handleSubmit(onSubmit)} >
                    <h1>사업자 정보</h1>
                    <Form.Item label="아이디로 사용하실 이메일" required>
                        <Input {...register('email')} />
                    </Form.Item>

                    <Form.Item label="사업자 번호" required>
                        <Input {...register('licenseNumber')} />
                    </Form.Item>

                    <Form.Item label="개인/법인" required>
                        <Controller
                            control={control}
                            name='bizType'
                            render={({ field: { value, onChange } }) => (
                                <Select value={value} onChange={v => onChange(v)} >
                                    <Select.Option value='개인' >개인</Select.Option>
                                    <Select.Option value='법인' >법인</Select.Option>
                                </Select>
                            )}
                        />
                    </Form.Item>

                    <Form.Item label="사업자 등록증 사진" required>
                        <Controller
                            control={control}
                            name='bizRegistration'
                            render={({ field: { value, onChange } }) => (
                                <EtcImageUpload value={value} onChange={onChange} />
                            )}
                        />
                    </Form.Item>

                    <h1>상점 기본 정보</h1>

                    <Form.Item label="상점이름" required>
                        <Input {...register('shopName')} />
                    </Form.Item>

                    <label>{`카카오톡 앱 실행 > 하단 탭 중 친구목록 (맨 왼쪽) > 내 프로필 클릭 > 오른쪽 상단 톱니모양 클릭 > 카카오톡 ID`}</label>
                    <Form.Item label="주문 접수시 알림톡 받으실 카카오 아이디" required>
                        <Input {...register('kakaoId')} />
                    </Form.Item>


                    <h1>정산 계좌</h1>
                    <Form.Item label="계좌번호" required>
                        <Input {...register('bankAccountNumber')} />
                    </Form.Item>
                    <Form.Item label="은행" required>
                        <Input {...register('bankName')} />
                    </Form.Item>
                    <Form.Item label="예금주" required>
                        <Input {...register('bankOwnerName')} />
                    </Form.Item>

                    <h1>CS 정보 (둘 중 하나는 필수로 해주세요)</h1>
                    <Form.Item label="카카오 채널 링크" >
                        <Input {...register('kakaoLink')} />
                    </Form.Item>
                    <Form.Item label="고객센터 전화번호" >
                        <Input {...register('csPhone')} />
                    </Form.Item>

                    <h1>담당자</h1>
                    <Form.Item label="이름" required>
                        <Input {...register('managerName')} />
                    </Form.Item>
                    <Form.Item label="전화번호" required>
                        <Input {...register('managerPhone')} />
                    </Form.Item>
                    <Form.Item label="이메일" required>
                        <Input {...register('managerEmail')} />
                    </Form.Item>

                    <h1>기타</h1>
                    <Form.Item label="정보 유효 확인을 위한 자사 쇼핑몰, 스마트스토어 링크" >
                        <Input {...register('storeLink')} />
                    </Form.Item>

                    <Form.Item>
                        <Button type='primary' htmlType="submit" loading={loading} >제출</Button>
                    </Form.Item>
                </Form>
            </InnerContainer>
        </Container>
    )
}

export default signup
