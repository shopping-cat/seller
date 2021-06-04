import { Button } from 'antd'
import React, { ChangeEventHandler, useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { CreateItemImage, useCreateItemImage } from '../../graphql/itemImage'
import { SortableContainer, SortableElement, SortEndHandler } from 'react-sortable-hoc';
import arrayMove from 'array-move'
import imageCompression from 'browser-image-compression';


const Img = styled.img`
    width: 100px;
    height: 100px;
    object-fit:cover;
    background-color:#fff;
    margin: 4px;
`

const Input = styled.input`
    width: 0;
    height: 0;
`

const SortableItemContainer = styled.div`
    display: flex;
    flex-direction:row;
    flex-wrap:wrap;
`

const ImgContainer = styled.div`
    display:flex;
    flex-direction:column;
`

interface ItemImageUploadProps {
    onChange?: (urls: CreateItemImage[]) => void
    value?: CreateItemImage[]
}

const ItemImageUpload: React.FC<ItemImageUploadProps> = ({ onChange, value }) => {

    const ref = useRef<HTMLInputElement>(null)

    const [images, setImages] = useState<CreateItemImage[]>(value || [])
    const [createItemImage, { loading }] = useCreateItemImage()

    useEffect(() => {
        onChange && onChange(images)
    }, [images])

    const onSortEnd: SortEndHandler = useCallback(({ oldIndex, newIndex }) => {
        setImages(arrayMove(images, oldIndex, newIndex))
    }, [images])

    const onInput: ChangeEventHandler<HTMLInputElement> = useCallback(async ({ target }) => {
        for (const file of target.files) {
            try {
                const compressedFile = await imageCompression(file, {
                    maxSizeMB: 2
                })
                const { data } = await createItemImage({ variables: { image: compressedFile } })
                setImages(images => [...images, data.createItemImage])
            } catch (error) {
                console.log(error)
            }
        }
    }, [images])

    const onImageSelect = useCallback(() => {
        ref.current?.click()
    }, [ref])

    const onImageDelete = useCallback((id: number) => {
        setImages(images.filter(v => v.id !== id))
    }, [images])

    return (
        <div>
            {images.length < 10 && <Button loading={loading} type='dashed' onClick={onImageSelect} >사진 추가</Button>}
            <Input
                ref={ref}
                name='image'
                accept="image/png, image/jpeg"
                type='file'
                onChange={onInput}
                multiple
                disabled={loading}
            />
            <SortableList axis='xy' items={images.map(v => ({ ...v, onDelete: () => onImageDelete(v.id) }))} onSortEnd={onSortEnd} />
        </div>
    )
}

const SortableItem = SortableElement(({ value }) =>
    <ImgContainer>
        <Img src={value.uri} alt='itemImage' />
        <Button onClick={value.onDelete} >삭제</Button>
    </ImgContainer>
)

const SortableList = SortableContainer(({ items }) =>
    <SortableItemContainer >
        {items.map((v, i) => <SortableItem index={i} key={v.id} value={v} />)}
    </SortableItemContainer>
)

export default ItemImageUpload
