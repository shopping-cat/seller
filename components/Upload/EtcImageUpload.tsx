import { Button, Image, Upload } from 'antd'
import imageCompression from 'browser-image-compression'
import React, { ChangeEventHandler, useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useUploadEtcImage } from '../../graphql/shop'

const Input = styled.input`
    width: 0;
    height: 0;
`

const Img = styled(Image)`
    width: 300px;
    height: 300px;
    object-fit:cover;
`

interface EtcImageUploadProps {
    value?: string
    onChange?: (v: string) => void
}


const EtcImageUpload: React.FC<EtcImageUploadProps> = ({ value, onChange }) => {

    const ref = useRef<HTMLInputElement>(null)

    const [image, setImage] = useState(value || '')
    const [uploadEtcImage, { loading }] = useUploadEtcImage()

    const onInput: ChangeEventHandler<HTMLInputElement> = useCallback(async ({ target }) => {
        try {
            const file = target.files[0]
            const compressedFile = await imageCompression(file, {
                maxSizeMB: 2
            })
            const { data } = await uploadEtcImage({ variables: { image: compressedFile } })
            setImage(data.uploadEtcImage)
        } catch (error) {

        }
    }, [])

    useEffect(() => {
        if (!onChange || !image) return
        onChange(image)
    }, [image])


    return (
        <div>
            {image && <Img
                src={image}
                alt='shopImage'
                preview={false}
                onClick={() => ref.current?.click()}
            />}
            {!image && <Button onClick={() => ref.current.click()} >이미지 선택</Button>}
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

export default EtcImageUpload
