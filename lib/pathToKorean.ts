const dict = {
    'dashboard': {
        name: '대시보드'
    },
    'order': {
        name: '주문관리',
        // 정상 프로세스
        'new': { name: '신규주문' },
        'onDelivery': { name: '배송중' },
        'completedDelivery': { name: '배송완료' },
        'confirmed': { name: '구매확정' },
        // 클레임
        'exchangeRequest': { name: '교환요청' },
        'refundRequest': { name: '환불요청' },
        'exchanged': { name: '교환처리' },
        'refunded': { name: '환불처리' }

    },
    'review': {
        name: '리뷰관리',
        default: {
            name: '리뷰세부'
        }
    },
    'shop': {
        name: '상점관리',
        'edit': { name: '수정' }
    },
    'item': {
        name: '상품관리',
        default: {
            name: '상품세부',
            'edit': { name: '수정' },
            'review': { name: '리뷰' }
        },
        'add': { name: '상품추가' }
    },
    'profit': {
        name: '수익관리'
    },
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