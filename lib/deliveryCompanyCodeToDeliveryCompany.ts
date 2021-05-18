const list = require('../assets/deliveryCompanyList.json')

const deliveryCompanyCodeToDeliveryCompany = (code: string): string => {
    try {
        return list.data.find((v: any) => v.Code === code).Name
    } catch (error) {
        throw '알 수 없는 배송사'
    }

}

export default deliveryCompanyCodeToDeliveryCompany