import axios from "axios"

export interface DeliveryCompany {
    id: string
    name: string
    tel: string
}

const getDeliveryCompanyList = async (): Promise<DeliveryCompany[]> => {
    try {
        const result = await axios.get('https://apis.tracker.delivery/carriers')
        return result.data
    } catch (error) {
        throw new Error('택배사 리스트 조회 실패')
    }

}

export default getDeliveryCompanyList