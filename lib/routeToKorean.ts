const dict = {
    'dashboard': '대시보드',
    'order': '주문관리',
    'inquery': '문의관리',
    'shop': '상점관리',
    'item': '상품관리',
    'profit': '수익관리'
}

const routeToKorean = (route: string) => {
    try {
        const korean = dict[route]
        return korean || route
    } catch (error) {
        return route
    }
}

export default routeToKorean