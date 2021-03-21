const dict = {
    'dashboard': {
        name: '대시보드'
    },
    'order': {
        name: '주문관리',
        'new': { name: '신규주문' },
        'onDelivery': { name: '배송중' },
        'deliveryComplete': { name: '배송완료' },
        'exchange': { name: '교환' },
        'refund': { name: '환불' }
    },
    'inquery': {
        name: '문의관리'
    },
    'shop': {
        name: '상점관리'
    },
    'item': {
        name: '상품관리',
        default: {
            name: '상품세부',
            'modify': { name: '수정' },
        },
        'add': { name: '상품추가' }
    },
    'profit': {
        name: '수익관리'
    }
}

const pathToKorean = (path: string) => {
    if (path === '/') return []
    const result: { name: string, path: string }[] = []
    const splitedPath = path.slice(1).split('/')
    let myDict = dict
    for (let i = 0; i < splitedPath.length; i++) {
        if (Object.keys(myDict).includes(splitedPath[i])) {
            myDict = myDict[splitedPath[i]]
        } else {
            myDict = myDict['default']
        }

        let name = ''
        try {
            name = myDict['name']
        } catch (error) {
            name = '오류'
        }
        // console.log(splitedPath.slice(0, i + 1).join('/'))
        result.push({
            name: name,
            path: '/' + splitedPath.slice(0, i + 1).join('/')
        })
    }
    return result
}

export default pathToKorean