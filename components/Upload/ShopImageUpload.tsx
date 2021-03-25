import { Image, Upload } from 'antd'
import React, { ChangeEventHandler, useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useUploadShopImage } from '../../graphql/shop'

const Input = styled.input`
    width: 0;
    height: 0;
`

const Img = styled(Image)`
    width: 300px;
    height: 300px;
    object-fit:cover;
`

interface ShopImageUploadProps {
    value?: string
    onChange?: (v: string) => void
}


const ShopImageUpload: React.FC<ShopImageUploadProps> = ({ value, onChange }) => {

    const ref = useRef<HTMLInputElement>(null)

    const [image, setImage] = useState(value || '')
    const [uploadShopImage, { loading }] = useUploadShopImage()

    const onInput: ChangeEventHandler<HTMLInputElement> = useCallback(async ({ target }) => {
        try {
            const file = target.files[0]
            const { data } = await uploadShopImage({ variables: { image: file } })
            setImage(data.uploadShopImage)
        } catch (error) {

        }
    }, [])

    useEffect(() => {
        onChange && onChange(image)
    }, [image])


    return (
        <div>
            <Img
                src={image}
                alt='shopImage'
                preview={false}
                onClick={() => ref.current?.click()}
            />
            <Input
                ref={ref}
                name='image'
                accept="image/png, image/jpeg"
                type='file'
                onChange={onInput}
                disabled={loading}
            />
        </div>

    )
}

export default ShopImageUpload
