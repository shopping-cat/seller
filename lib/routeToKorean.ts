const dict = {
    'dashboard': '대시보드'
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