export type ID = number // autoIncreasement
export type PaymentState =
    '결제요청' | // PG누르기 직전
    '결제취소' | // 결제는 안됫을때
    '입금대기' | // 가상계좌 확인
    '구매접수' | // 30 분정도  텀을 둠 // 이때는 유저가 환불 할 수 있음
    '정상처리' | // 정상적으로 주문이 됨
    '취소처리' | // 모든 아이템이 구매접수 상태에서 유저가 전체 취소를 했을때
    '오류처리' // 구매접수 이후 오류에 대해
export type OrderState = // 각각 아이템에 해당됨
    '구매접수' | // 접수
    '취소처리' | // 유저가 구매접수 단계에서 전체 취소 or 오류로 인한 전체 취소
    '상점취소처리' | // 재고 부족 등의 이유로 상점에서 취소하는 경우
    '배송중' | '배송완료' | '구매확정' | // 정상 
    '환불중' | '환불처리' | // 환불 
    '교환중' | '교환처리' // 교환
export type Category = string | null
export type RecommendState = 'none' | 'liked' | 'unliked'

export type ItemState =
    '판매중' |
    '판매중지' |
    '재고없음' |
    '상품등록요청' |
    '상품수정요청'

export type ItemType = 'cat' | 'dog' | 'both'

export type ProfitReceiptState = '정산요청' | '정산완료'

export type ItemOption = {
    data: {
        optionGroupName: string
        optionDetails: {
            name: string
            price: number
        }[]
    }[]
} | null


export type ItemRequireInformation = {
    data: {
        title: string
        content: string
    }[]
} | null