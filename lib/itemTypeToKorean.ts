import { ItemType } from "../constants/type"

const itemTypeToKorean = (type: ItemType) => {
    if (type === 'cat') return '고양이'
    if (type === 'dog') return '강아지'
    return '고양이,강아지'
}

export default itemTypeToKorean